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
const errors = require('../errors.js')

class Global extends Glvn {
    spaceOnDisk = function () {

    }

    addLock = function (timeout = 0) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            if (typeof timeout !== 'number') {
                reject(new Error(errors.TIMEOUT_MUST_BE_NUMBER + 'timeout must be a number'))
            }

            if (timeout < 0) {
                reject(new Error(errors.TIMEOUT_NOT_POSITIVE_NUMBER + 'timeout must be a positive number'))
            }

            if (that.objRoot.process._groupLocksFlag === true) {
                that.objRoot.process._locks.push(utils.generateGlvn(that))

                resolve()

                return
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
                    reject(new Error(RESP3.parse.simpleError(data)))

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
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            if (that.objRoot.process._groupLocksFlag === true) {
                const glvn = utils.generateGlvn(that)

                const ix = that.objRoot.process._locks.findIndex(lGlvn => glvn === lGlvn)
                if (ix > -1) that.objRoot.process._locks.splice(ix, 1)

                resolve()

                return
            }

            // send command
            const opCode = 'glvn.removeLock'

            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that))
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

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
