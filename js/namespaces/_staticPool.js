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

class _staticPool {
    _register = function (pool) {
        const that = this
        const RESP3 = that.objRoot.RESP3
        const pids = []

        pool.sessions.forEach(session => {
            pids.push(session.session.process.pid)
        })

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))
            }

            // send command
            const opCode = 'pool.register'

            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(JSON.stringify(pids))
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(RESP3.parse.simpleString(data))
            })
        })
    }

    _getPoolStats = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))
            }

            // send command
            const opCode = 'pool.getPoolStats'

            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(JSON.parse(RESP3.parse.blob(data)))
            })
        })
    }
}

module.exports = _staticPool
