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
const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

const nsProcess = require('./namespaces/process')
const nsServer = require('./namespaces/server')
const nsFs = require('./namespaces/fs')
const nsRESP3 = require('./namespaces/RESP3')
const nsDb = require('./namespaces/db')
const nsDbms = require('./namespaces/dbms')
const nsSession = require('./namespaces/session')

const login = require('./login')
const utils = require('./utils')

module.exports = class mind extends EventEmitter {
    // ********************************
    // public methods and properties
    // ********************************
    connected = false
    loggedIn = false

    #socket = null

    requiresMind = '0.10.0'

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
            that.#socket = net.createConnection(port, host, async () => {
                that.connected = true

                // mount event handler and route it to the event emitter
                that.#socket
                    .on('end', () => {
                        that.disconnect()

                        that.emit('disconnect', new Error('Disconnected'))
                    })
                    // mount event handler and route it to the event emitter
                    .on('error', err => {
                        that.emit('error', err)
                        reject(err)
                    })

                // perform the login
                try {
                    await login(that, that.#writePacket, that.#readPacket, resolve, reject, username, password, options)

                    that.loggedIn = true

                } catch (err) {
                    that.connected = false
                    that.loggedIn = false

                    that.disconnect()
                }
            })
        })
    }

    disconnect = () => {
        this.#socket.destroy()
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
}

