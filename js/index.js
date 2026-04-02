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

const login = require('./login')
const utils = require('./utils')

module.exports = {
    session: class mind extends EventEmitter {
        // ********************************
        // public methods and properties
        // ********************************
        connected = false
        loggedIn = false
        useTls = false
        #socket = null
        hTimer = null

        requiresMind = '0.21.0'

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

            const hTmeoutTimer = setTimeout(() => {
                throw new Error('Timeout while trying to connect...')

            }, 1E9)

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
                }

                let hTimer = that.hTimer
                if (options && options.connectTimeout === 0) {
                    hTimer = that.hTimer = null

                } else {
                    hTimer = that.hTimer = setTimeout(function () {
                        that.#socket.destroy()

                        throw new Error('timeout while trying to connect...')

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
                        throw err
                    }

                } else {
                    that.#socket = net.createConnection(port, host, async () => {
                        socketInit(that, that.#socket, that.#writePacket, that.#readPacket, resolve, reject, username, password, options)
                    })
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

    sessionsPool: class Pool {
        size = 0
        extension = 0
        extensionInUse = 0
        sessions = []
        waitQueue = []
        host = ''
        port = 0
        username = ''
        password = ''
        options = {}

        constructor(size, extension = 0) {
            if (!size) {
                throw new Error('Missing pool size')
            }

            if (typeof size !== 'number') {
                throw new Error('Pool size must be a number')
            }

            if (extension && typeof extension !== 'number') {
                throw new Error('Pool extension must be a number')
            }

            this.size = size
            this.extension = extension
        }

        create = async function (host, port, username, password, options = {}) {
            return new Promise(async (resolve, reject) => {
                for (let ix = 0; ix < this.size; ix++) {
                    const session = new module.exports.session

                    try {
                        await session.connect(host, port, username, password, options)

                    } catch (err) {
                        reject(err.message)
                    }
                    this.sessions.push({
                        session: session,
                        inUse: false,
                        isExtension: false
                    })
                }

                this.host = host
                this.port = port
                this.username = username
                this.password = password
                this.options = options

                resolve()
            })
        }

        destroy = async function () {
            return new Promise(async (resolve) => {
                this.sessions.forEach(async session => await session.session.disconnect())

                resolve()
            })
        }

        extend = async () => {

        }

        getSession = function (timeout = 0) {
            return new Promise(async (resolve, reject) => {
                this.sessions[1].inUse = true
                this.sessions[2].inUse = true
                this.sessions[0].inUse = true

                const freeSlots = this.sessions.filter(session => session.inUse === false)

                console.log('free slots: ', freeSlots.length)

                // can we get a normal session?
                if (freeSlots.length > 0) {
                    freeSlots[0].inUse = true

                    console.log('new slot')

                    Object.assign(freeSlots[0].session, {
                        poolSlot: freeSlots[0],
                        done: function () {
                            this.poolSlot.inUse = false
                        }
                    })
                    resolve(freeSlots[0].session)

                    return
                }

                // can we extend?
                if (this.extension > 0 && this.extension - this.extensionInUse > 0) {
                    console.log('extending')
                    const session = new module.exports.session

                    try {
                        await session.connect(this.host, this.port, this.username, this.password, this.options)

                    } catch (err) {
                        reject(err.message)
                    }

                    const newSession = {
                        session: session,
                        inUse: true,
                        isExtension: true
                    }

                    this.sessions.push(newSession)


                    Object.assign(newSession.session, {
                        that: this,
                        ix: this.sessions.length - 1,
                        poolSlot: newSession,

                        done: function () {
                            this.poolSlot.session.disconnect()
                            console.log('extend disconnected')
                            this.that.sessions.splice(this.ix, 1)

                            this.that.extensionInUse--

                            this.poolSlot.inUse = false
                        }
                    })

                    this.extensionInUse++

                    resolve(newSession.session)
                }

                // do we have a timeout?
                let hTimeout = 0
                if (timeout > 0) {
                    // setup main timer
                    hTimeout = setTimeout(async () => {
                        reject(new Error('timoeut expired while trying to get a session'))

                    }, timeout)

                }

                const hInterval = setInterval(async () => {
                    // is there a slot available?
                    console.log('allocating on timeout')

                    const freeSlots = this.sessions.filter(session => session.inUse === false)

                    if (freeSlots.length > 0) {
                        clearTimeout(hTimeout)
                        clearInterval(hInterval
                        )
                        freeSlots[0].inUse = true

                        resolve(freeSlots[0].session)

                        return
                    }

                    // can we extend?
                    if (this.extension > 0 && this.extension - this.extensionInUse > 0) {
                        console.log('extending on timeout')
                        const session = new module.exports.session

                        try {
                            await session.connect(this.host, this.port, this.username, this.password, this.options)

                        } catch (err) {
                            reject(err.message)
                        }

                        this.sessions.push(newSession)


                        const newSession = {
                            session: session,
                            inUse: true,
                            isExtension: true
                        }

                        Object.assign(newSession.session, {
                            poolSlot: newSession,
                            done: function () {
                                this.poolSlot.inUse = false

                            }
                        })

                        this.extensionInUse++

                        clearTimeout(hTimeout)
                        clearInterval(hInterval)

                        resolve(newSession.session)
                    }

                }, 50)
            })
        }
    }

}
