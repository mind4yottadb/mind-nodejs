/*###############################################################
#                                                               #
# Copyright (c) 2026 DnaSoft BV and/or its subsidiaries.        #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
###############################################################*/

const utils = require("../utils");
const errors = require('../errors.js')

class Sessions {
    stats = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            // send command
            const opCode = 'session.stats'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                if (data.indexOf('+no data') > -1) {
                    //reject(new Error('No stats enabled on server'))
                    resolve({})

                    return
                }

                resolve(JSON.parse(RESP3.parse.blob(data)))
            })
        })
    }

    resetStats = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            // send command
            const opCode = 'session.resetStats'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve()
            })
        })
    }

    timeSinceConnect = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            // send command
            const opCode = 'session.timeSinceConnect'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(RESP3.parse.double(data))
            })
        })
    }

    log = function (logString = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            if (typeof logString !== 'string') {
                reject(new Error(errors.PARAM_NOT_STRING + 'logString parameter must be a string'))

                return
            }

            // send command
            const opCode = 'session.log'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(logString)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve()
            })
        })
    }
}

module.exports = Sessions
