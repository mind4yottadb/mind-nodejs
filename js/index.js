/*###############################################################
#                                                               #
# Copyright (c) 2025-2026 DnaSoft BV and/or its subsidiaries.   #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
###############################################################*/

const net = require('net')
const tls = require('tls')
const EventEmitter = require('node:events');

const nsProcess = require('./namespaces/process')
const nsServer = require('./namespaces/server')
const nsFs = require('./namespaces/fs')
const nsRESP3 = require('./namespaces/RESP3')
const nsDb = require('./namespaces/db')
const nsDbms = require('./namespaces/dbms')
const nsSession = require('./namespaces/session')
const pool = require('./static-pool')

const login = require('./login')
const utils = require('./utils')

const requiredMind = '0.24.0'         // required server version

module.exports = {
    session: class mind extends EventEmitter {
        // ********************************
        // public methods and properties
        // ********************************
        connected = false               // true if connected
        loggedIn = false                // true if logged in
        useTls = false                  // true if tls is used
        #socket = null                      // socket object
        hTimer = null                       // connect timeout timer

        requiresMind = requiredMind         // required server version

        // namespaces
        server = new nsServer
        process = new nsProcess
        fs = new nsFs
        RESP3 = new nsRESP3
        db = new nsDb
        dbms = new nsDbms
        session = new nsSession

        connect = (host, port, username, password, options = {}) => {
            const that = this

            return new Promise(function (resolve, reject) {
                // perform validation
                if (typeof host !== 'string' || host === '') {
                    reject(new Error('host must be a string'));

                    return
                }

                if (typeof port !== 'number') {
                    reject(new Error('port must be a number'));

                    return
                }

                if (typeof username !== 'string' || username === '') {
                    reject(new Error('username must be a string'));

                    return
                }

                if (typeof password !== 'string' || password === '') {
                    reject(new Error('password must be a string'));

                    return
                }

                const err = utils.validateConnectOptions(options)
                if (err !== '') {
                    reject(new Error(err))

                    return
                }

                let hTimer = that.hTimer
                if ((options.connectTimeout && options.connectTimeout === 0) || options.connectTimeout === undefined) {
                    hTimer = that.hTimer = null

                } else {
                    hTimer = that.hTimer = setTimeout(function () {
                        that.#socket.destroy()

                        reject(new Error('timeout while trying to connect...'))

                    }, options.connectTimeout || 5000)
                }
                // TLS or plain
                if (options && options.useTls && options && options.useTls === true) {
                    that.userTls = true
                    try {
                        that.#socket = tls.connect(port, host, {rejectUnauthorized: (options && options.tlsRejectSelfSigned === false) ? false : true});
                        that.#socket.once('secureConnect', function () {
                            // on connected
                            socketInit(that, that.#socket, that.#writePacket, that.#readPacket, resolve, reject, username, password, options)
                        });
                        that.#socket.on('error', function (err) {
                            // on error
                            reject(err)
                        });
                    } catch (err) {
                        reject(err)

                        return
                    }

                } else {
                    if ((!options.protocol) || (options && options.protocol === 'tcp')) {
                        // TCP
                        try {
                            that.#socket = net.createConnection(port, host, async () => {
                                socketInit(that, that.#socket, that.#writePacket, that.#readPacket, resolve, reject, username, password, options)
                            })

                        } catch (err) {
                            reject(err)

                            return
                        }

                    } else {
                        // UDS
                        try {
                            that.#socket = net.createConnection(host, async () => {
                                socketInit(that, that.#socket, that.#writePacket, that.#readPacket, resolve, reject, username, password, options)
                            })

                        } catch (err) {
                            reject(err)

                            return
                        }
                    }
                }

                const socketInit = async function (that, lSocket, lWriter, lReader, resolve, reject, username, password, options) {
                    that.connected = true

                    if (hTimer !== null) clearTimeout(hTimer)

                    // mount event handler and route it to the event emitter
                    lSocket
                        .on('end', () => {
                            if (hTimer !== null) clearTimeout(hTimer)

                            that.disconnect()

                            that.emit('disconnect', new Error('Disconnected'))
                        })
                        // mount event handler and route it to the event emitter
                        .on('error', err => {
                            if (hTimer !== null) clearTimeout(hTimer)

                            that.emit('socketError', err)

                            reject(err)
                        })

                    // force utf-8 encoding
                    lSocket.setEncoding('utf8')

                    // sends out the app name, if present
                    const appString = '+appName:' + (options.uApi && options.uApi.appName ? options.uApi.appName : '') + '\n'
                    lWriter(appString)

                    // perform the login
                    try {
                        await login(that, lWriter, lReader, resolve, reject, username, password, options)

                        that.loggedIn = true

                    } catch (err) {
                        that.connected = false
                        that.loggedIn = false

                        that.disconnect()
                    }
                }

                Object.defineProperties(that, {
                    hTimer: {
                        enumerable: false,
                        configurable: true
                    },
                })
            })
        }

        disconnect = () => {
            if (this.#socket) {
                if (this.hTimer !== null) clearTimeout(this.hTimer)
                this.#socket.destroy()
            }
            this.connected = false
            this.loggedIn = false

            this.server = new nsServer
            this.process = new nsProcess
            this.fs = new nsFs
            this.RESP3 = new nsRESP3
            this.db = new nsDb
            this.dbms = new nsDbms
            this.session = new nsSession
        }

        // ********************************
        // private methods and properties
        // ********************************
        #writePacket = (msg) => {
            const that = this

            let total_sent = 0;
            while (total_sent < msg.length) {
                const msg_sliced = msg.slice(total_sent, msg.length);
                const sentOk = that.#socket.write(msg_sliced);

                if (!sentOk) throw new Error('RuntimeError: socket connection broken');

                total_sent = total_sent + msg_sliced.length;
            }
        }

        #readPacket = (callback) => {
            const commandTerminator = '\x03\r\n\x03\r\n'
            let buff = ''
            const that = this

            this.#socket.on('data', function (data) {
                buff += data.toString()

                // wait for packet terminator
                if (buff.slice(-6) === commandTerminator) {
                    that.#socket.removeAllListeners('data')
                    callback(buff.slice(0, -6))
                }
            })
        }
    },

    staticPool: class StaticPool {
        size = 0                        // size (in sessions)
        extension = 0                   // extension size (in sessions)
        extensionInUse = 0              // how many extension sessions are currently in use
        sessions = []                     // sessions array
        host = ''                        // credentials to connect extensions
        port = 0                        // credentials to connect extensions
        username = ''                   // credentials to connect extensions
        password = ''                   // credentials to connect extensions
        options = {}                        // credentials to connect extensions
        timerTick = false               // internal timer

        sessionsCreatedOk = 0           // how many sessions were created
        sessionsCreatedInError = 0      // how many session got error on creation
        extendsCreatedOk = 0            // how many extends got created
        extendsCreatedInError = 0       // how many extends got error on creation
        extendsRemoved = 0              // how many extends got removed
        noMoreSlotsHits = 0             // how many times no more slots were available and the getSession() had to wait
        timeoutExpired = 0              // how many times a timeout expired while getting a session
        remoteDisconnects = 0           // how many sessions got remotely disconnected

        constructor(size, extension = 0, credentials = {}) {
            if (typeof size === 'undefined') {
                throw new Error('Missing pool size')
            }

            if (typeof size !== 'number') {
                throw new Error('Pool size must be a number')
            }

            if (extension && typeof extension !== 'number') {
                throw new Error('Pool extension must be a number')
            }

            if (size < 2) {
                throw new Error('Pool size must be at least 2')
            }

            if (extension && extension < 1) {
                throw new Error('Pool extension must be at least 1')
            }

            this.size = size
            this.extension = extension

            this.host = credentials.host
            this.port = credentials.port
            this.username = credentials.username
            this.password = credentials.password
            this.options = credentials.options

            Object.defineProperties(this, {
                size: {
                    enumerable: false,
                    configurable: true
                },
                extension: {
                    enumerable: false,
                    configurable: true
                },
                extensionInUse: {
                    enumerable: false,
                    configurable: true
                },
                sessions: {
                    enumerable: false,
                    configurable: true
                },
                waitQueue: {
                    enumerable: false,
                    configurable: true
                },
                host: {
                    enumerable: false,
                    configurable: true
                },
                port: {
                    enumerable: false,
                    configurable: true
                },
                username: {
                    enumerable: false,
                    configurable: true
                },
                password: {
                    enumerable: false,
                    configurable: true
                },
                options: {
                    enumerable: false,
                    configurable: true
                },
                timerTick: {
                    enumerable: false,
                    configurable: true
                },
            })
        }

        // ******************
        // stateless
        // ******************
        create = async function (host, port, username, password, options = {}) {
            return new Promise(async (resolve, reject) => {
                try {
                    await pool.sessionsPool.create(this, module, host, port, username, password, options)

                    resolve()

                } catch (err) {
                    reject(err)
                }

            })
        }

        destroy = function () {
            pool.sessionsPool.destroy(this)
        }

        getSession = async function (timeout = 0) {
            return await pool.sessionsPool.getSessions(this, module, timeout)
        }

        // ******************
        // STATUS
        // ******************
        getStatus = function () {
            return pool.sessionsPool.getStatus(this)
        }

        // ******************
        // hide internal props in object to programmers
        // ******************
        hidePropsInObject = function (obj) {
            Object.defineProperties(obj.session, {
                that: {
                    enumerable: false,
                    configurable: true
                },
                ix: {
                    enumerable: false,
                    configurable: true
                },
                poolSlot: {
                    enumerable: false,
                    configurable: true
                },
                hTimer: {
                    enumerable: false,
                    configurable: true
                },
            })
        }
    },

    dynamicPool: class DynamicPool {
        maxSize = 0
        sessions = []
        host = ''
        port = 0
        username = ''
        password = ''
        options = {}

        constructor(host, port, userrname, password, options = {}, maxSize = 0) {
            if (typeof maxSize === 'undefined') {
                throw new Error('Missing maximum pool size')
            }

            if (typeof maxSize !== 'number') {
                throw new Error('Pool maximum size must be a number')
            }

            this.host = host
            this.port = port
            this.username = userrname
            this.password = password
            this.maxSize = maxSize

            Object.defineProperties(this, {
                maxSize: {
                    enumerable: false,
                    configurable: true
                },
                sessions: {
                    enumerable: false,
                    configurable: true
                },
                host: {
                    enumerable: false,
                    configurable: true
                },
                port: {
                    enumerable: false,
                    configurable: true
                },
                username: {
                    enumerable: false,
                    configurable: true
                },
                password: {
                    enumerable: false,
                    configurable: true
                },
                options: {
                    enumerable: false,
                    configurable: true
                },
            })
        }

        // ******************
        // stateful
        // ******************
        createSession = async function () {
            await pool.sessionsPool.createSession(this, module)
        }

        getSessionByGUID = async function (GUID) {
            await pool.sessionsPool.getSessionByGUID(this, GUID)
        }

        terminateSession = async function (GUID) {
            await pool.sessionsPool.terminateSession(this, GUID)

        }
    }
}
