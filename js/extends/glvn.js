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

class Glvn {
    _path = ''

    _ = function (...path) {

        try {
            utils.validateGlvnPath(path)
        } catch (err) {
            throw err
        }

        this._path = utils.convertPathTo$Name(path)

        return this
    }

    hasValue = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.hasValue'

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

                if (data.charAt(0) !== '#') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve(data.slice(0, -2) === RESP3.true)
            })
        })
    }

    hasNodes = function (path) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.hasNodes'

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

                if (data.charAt(0) !== '#') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve(data.slice(0, -2) === RESP3.true)
            })
        })
    }

    getTree = function (path) {

    }

    setTree = function (path, data) {

    }

    getValue = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.getValue'

            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that))
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))
                }

                if (data.charAt(0) === '(') {
                    resolve(parseFloat(data.slice(1, -2)))

                } else if (data.charAt(0) === '$') {
                    resolve(RESP3.parse.blob(data))

                } else {
                    reject(new Error(data.slice(1, -2)))
                }
            })
        })
    }

    readValue = function (path) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.readValue'

            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that))
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))
                }

                if (data.charAt(0) === '(') {
                    resolve(parseFloat(data.slice(1, -2)))

                } else if (data.charAt(0) === '$') {
                    resolve(RESP3.parse.blob(data.slice(1)))

                } else {
                    reject(new Error(data.slice(1, -2)))
                }
            })
        })
    }

    killValue = function (path) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.killValue'

            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that))
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    killTree = function (path) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.killTree'

            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that))
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    getPiece = function (pieceChar = '^', start = 1, end) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof pieceChar !== 'string') {
                reject(new Error('pieceChar must be a string'))

                return
            }

            if (typeof start !== 'number') {
                reject(new Error('start must be a number'))

                return
            }

            if (start < 1) {
                reject(new Error('start must be greater than 0'))

                return
            }

            if (typeof end === 'undefined') {
                end = start

            } else if (typeof end !== 'number') {
                reject(new Error('end must be a number'))

                return

            } else if (end < 1) {
                reject(new Error('start must be greater than 0'))

                return
            }

            // send command
            const opCode = 'glvn.getPiece'

            that.writer("*5" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(pieceChar) +
                RESP3.build.blob(start) +
                RESP3.build.blob(end)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))
                }

                if (data.charAt(0) === '(') {
                    resolve(parseFloat(data.slice(1, -2)))

                } else if (data.charAt(0) === '$') {
                    resolve(RESP3.parse.blob(data.slice(1)))

                } else {
                    reject(new Error(data.slice(1, -2)))
                }
            })
        })
    }

    setValue = function (data = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof data !== 'string' && typeof data !== 'number') {
                reject(new Error('data must be either a string or a number'))

                return
            }

            // send command
            const opCode = 'glvn.setValue'
            let newData = ''

            if (typeof data === 'string') {
                newData = RESP3.build.blob(data.toString())
            } else newData = '(' + data.toString() + RESP3.CRLF

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(newData)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })

    }

    setPiece = function (data, pieceChar = '^', start = 1, end) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof data !== 'string' && typeof data !== 'number') {
                reject(new Error('data must be either a string or a number'))

                return

            }

            if (typeof pieceChar !== 'string') {
                reject(new Error('pieceChar must be a string'))

                return
            }

            if (typeof start !== 'number') {
                reject(new Error('start must be a number'))

                return
            }

            if (start < 1) {
                reject(new Error('start must be greater than 0'))

                return
            }

            if (typeof end === 'undefined') {
                end = start

            } else if (typeof end !== 'number') {
                reject(new Error('end must be a number'))

                return

            } else if (end < 1) {
                reject(new Error('start must be greater than 0'))

                return
            }

            // send command
            const opCode = 'glvn.setPiece'

            that.writer("*6" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(data.toString()) +
                RESP3.build.blob(pieceChar) +
                RESP3.build.blob(start) +
                RESP3.build.blob(end)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    merge = function (path, glvn) {

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

module
    .exports = Glvn
