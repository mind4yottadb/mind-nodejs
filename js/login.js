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

const uapi = require("./uapi")
const fs = require("fs");

const driverName = 'mind4yottadb.js'
const driverVersion = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version
const driverDescription = 'MIND for YottaDB node.js driver'

module.exports = async function (that, writer, reader, resolve, reject, username, password, options) {
    const opCode = 'server.login'
    const credentials = username + ':' + password

    that.RESP3._init(that)
    const RESP3 = that.RESP3

    // send command
    writer(
        "*6" + RESP3.CRLF +
        RESP3.build.blob(opCode) +
        RESP3.build.blob(credentials) +
        RESP3.build.blob(driverName) +
        RESP3.build.blob(driverVersion) +
        RESP3.build.blob(driverDescription) +
        RESP3.build.blob((options.uApi && options.uApi.appName) || '')
    );

    // process response
    reader(data => {
        if (data.charAt(0) === '-') {
            reject(new Error(RESP3.parse.simpleError(data)))

            return
        }

        const dataA = data.split(RESP3.CRLF)
        let ix = 0
        let iy = 0

        // check header
        if (dataA[ix].charAt(0) === '-') {
            reject(new Error(dataA[0].slice(1)))

            return
        }

        // proceed with the server array
        ix += 2
        const serverLength = parseInt(dataA[ix].slice(1))

        iy = ix
        for (ix = ix + 1; ix < iy + serverLength * 2; ix += 2) {
            Object.defineProperties(that.server, {
                [RESP3.parse.simpleString(dataA[ix])]: {
                    value: RESP3.parse.simpleString(dataA[ix + 1]),
                    enumerable: true,
                    configurable: true
                }
            })
        }

        const mindVersion = that.server.mindVersion
        if (mindVersion < that.requiresMind) {
            reject(new Error('invalid mind server version, expected ' + that.requiresMind + ' or higher, but found ' + mindVersion))

            return
        }

        // proceed with the process array
        if (dataA[ix] !== '%1') {
            reject(new Error('invalid packet signature at line: ' + ix + ' Expected: %1'))

            return
        }

        const processLength = parseInt(dataA[ix].slice(1))

        // continue with process
        iy = ix
        for (ix = ix + 1; ix < iy + processLength * 2; ix += 2) {
            const name = RESP3.parse.simpleString(dataA[ix])

            const strValue = RESP3.parse.simpleString(dataA[ix + 1])
            Object.defineProperties(that.process, {
                [RESP3.parse.simpleString(dataA[ix])]: {
                    value: isNaN(parseInt(strValue)) ? strValue : parseInt(strValue),
                    enumerable: true,
                    configurable: true,
                    writable: false
                }
            })
        }

        // finally the user api
        const uApiJson = RESP3.parse.blob(data.slice(data.indexOf('\r\n$') + 2))
        const uApi = JSON.parse(uApiJson === '' ? '{}' : uApiJson)

        Object.defineProperties(that, {
            uApi: {
                value: uApi.client === undefined ? null : uApi.client,
                enumerable: false,
                configurable: true,
                writable: false
            }
        })

        // append reader, writer and root to make them available to deeper levels
        appendToObject(that.fs, that)
        appendToObject(that.process, that)
        appendToObject(that.server, that)
        appendToObject(that.session, that)
        appendToObject(that.db, that)

        appendToObject(that.db.vars, that)
        appendToObject(that.db.globals, that)

        // and initialize some classes
        that.server._init(that.server)
        that.process._init(that.process)
        that.db.globals._init(that.db.globals)
        that.db.vars._init(that.db.vars)

        // make RESP3 not enumerable
        Object.defineProperties(that, {
            RESP3: {
                enumerable: false,
                configurable: false
            },
        })

        // now we can add vars and globals names, if any, from the options object
        if (uApi && uApi.server && uApi.server.vars && uApi.server.vars.length > 0) {
            uApi.server.vars.forEach(_var => {
                try {
                    that.db.vars.addName(_var)

                } catch (err) {
                    reject(new Error('Error occurred adding var name: ' + _var + ': ' + err.message))
                }
            })
        }

        if (options && options.db && options.db.globals) {
            options.db.globals.forEach(_var => {
                try {
                    that.db.globals.addName(_var)

                } catch (err) {
                    reject(new Error('Error occurred adding global name: ' + _var + ': ' + err.message))
                }
            })
        }

        // and add, if present, the user API
        if (that.uApi !== null) {
            uapi.parse(that, writer, reader)
        }

        // resolve the promise
        resolve()
    })

    const appendToObject = (namespace, that) => {
        Object.defineProperties(namespace, {
            objRoot: {
                value: that,
                enumerable: false,
                configurable: false
            },
            writer: {
                value: writer,
                enumerable: false,
                configurable: false
            },
            reader: {
                value: reader,
                enumerable: false,
                configurable: false
            }
        })
    }
}
