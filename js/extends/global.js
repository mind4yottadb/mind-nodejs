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

const Glvn = require("./glvn")
const utils = require("../utils");

class Global extends Glvn {
    spaceOnDisk = function () {

    }

    addLock = function (timeout = 0) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof timeout !== 'number') {
                reject(new Error('timeout must be a number'))
            }

            if (timeout < 0) {
                reject(new Error('timeout must be a positive number'))
            }

            // send command
            const opCode = 'glvn.addLock'

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(timeout)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    removeLock = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.removeLock'

            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that))
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    _init = function (obj) {
        Object.defineProperties(obj, {
            _path: {
                enumerable: false,
                configurable: false,
                writable: true
            },
        })

        Object.defineProperties(obj, {
            _init: {
                enumerable: false,
            }
        })
    }

}

module.exports = Global
