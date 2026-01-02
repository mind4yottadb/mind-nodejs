/*###############################################################
#                                                               #
# Copyright (c) 2025 DnaSoft BV and/or its subsidiaries.        #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
###############################################################*/

const RESP3 = require("./RESP3");

const driverName = 'mind4yottadb'
const driverVersion = '0.1.0md'
const driverDescription = 'MIND for YottaDB node.js driver'

module.exports = async function (that, writer, reader, resolve, reject, username, password) {
    const opCode = 'server.login'
    const credentials = username + ':' + password

    // send command
    writer("*5" + RESP3.CRLF +
        RESP3.getBlob(opCode) + RESP3.getBlob(credentials) +
        RESP3.getBlob(driverName) + RESP3.getBlob(driverVersion) + RESP3.getBlob(driverDescription)
    );

    // process response
    reader(data => {
        const dataA = data.split(RESP3.CRLF)
        let ix = 0
        let iy = 0

        // check header
        if (dataA[ix].charAt(0) === '-') {
            reject(dataA[0].slice(1))
        }

        if (dataA[ix] !== '*4') {
            reject('invalid packet signature at line: ' + ix + ' Expected: *4')
        }

        // proceed with the server array
        ix += 2
        const serverLength = parseInt(dataA[ix].slice(1))

        iy = ix
        for (ix = ix + 1; ix < iy + serverLength * 2; ix += 2) {
            Object.defineProperties(that.server, {
                [RESP3.extractSimpleString(dataA[ix])]: {
                    value: RESP3.extractSimpleString(dataA[ix + 1]),
                    enumerable: true,
                    configurable: true
                }
            })
        }

        const mindVersion = that.server.mindVersion
        if (mindVersion < that.requiresMind) {
            reject(new Error('invalid mind server version, expected ' + that.requiresMind + ' or higher, but found ' + mindVersion))
        }

        // proceed with the process array
        if (dataA[ix] !== '%3') reject(new Error('invalid packet signature at line: ' + ix + ' Expected: %3'))

        const processLength = parseInt(dataA[ix].slice(1))

        // continue
        iy = ix
        for (ix = ix + 1; ix < iy + processLength * 2; ix += 2) {
            const name = RESP3.extractSimpleString(dataA[ix])

            const strValue = RESP3.extractSimpleString(dataA[ix + 1])
            Object.defineProperties(that.process, {
                [RESP3.extractSimpleString(dataA[ix])]: {
                    value: isNaN(parseInt(strValue)) ? strValue : parseInt(strValue),
                    enumerable: true,
                    configurable: true
                }
            })
        }

        // and terminate with the env vars
        const envLength = parseInt(dataA[ix].slice(1))

        Object.defineProperties(that.process, {
            env: {
                value: {},
                enumerable: true,
                configurable: true
            }
        })

        iy = ix
        for (ix = ix + 1; ix < iy + envLength * 2 - 1; ix += 2) {
            const strValue = RESP3.extractSimpleString(dataA[ix + 1])

            Object.defineProperties(that.process.env, {
                [RESP3.extractSimpleString(dataA[ix])]: {
                    value: isNaN(parseInt(strValue)) ? strValue : parseInt(strValue),
                    enumerable: true,
                    configurable: true,
                    writable: false
                }
            })
        }

        // append reader, writer and root to make them available to deeper levels
        Object.defineProperties(that.fs, {
            rootThat: {
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

        // append reader, writer and root to make them available to deeper levels
        Object.defineProperties(that.process, {
            rootThat: {
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

        // resolve the promise
        resolve()
    })
}