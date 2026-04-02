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
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                if (data.charAt(0) !== '#') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(data.slice(0, -2) === RESP3.true)
            })
        })
    }

    hasNodes = function () {
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
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                if (data.charAt(0) !== '#') {
                    reject(new Error(RESP3.parse.simpleError(data)))

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
                    reject(new Error(RESP3.parse.simpleError(data)))
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

    readValue = function () {
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
                    reject(new Error(RESP3.parse.simpleError(data)))
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

    killValue = function () {
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
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve()
            })
        })
    }

    killTree = function () {
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
                    reject(new Error(RESP3.parse.simpleError(data)))

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
                    reject(new Error(RESP3.parse.simpleError(data)))
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
                    reject(new Error(RESP3.parse.simpleError(data)))

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
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve()
            })
        })
    }

    setJSON = function (json = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof json !== 'string') {
                reject(new Error('JSON must be a string'))

                return
            }

            // send command
            const opCode = 'glvn.setJSON'
            let newData = ''

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(json)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve()
            })
        })
    }

    setObject = function (obj = {}) {
        const that = this
        const RESP3 = that.objRoot.RESP3
        let json

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof obj !== 'object' || obj === null) {
                reject(new Error('obj must be an object'))

                return
            }

            try {
                json = JSON.stringify(obj)

            } catch (err) {
                reject(new Error('error parsing object: ' + err.message))

                return
            }

            // send command
            const opCode = 'glvn.setJSON'
            let newData = ''

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(json)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve()
            })
        })
    }

    getJSON = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.getJSON'
            let newData = ''

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

                resolve(RESP3.parse.blob(data))
            })
        })
    }

    getObject = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.getJSON'
            let newData = ''

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

                resolve(JSON.parse(RESP3.parse.blob(data)))
            })
        })
    }

    increment = function (incrementBy = 1) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof incrementBy !== 'number') {
                reject(new Error('incrementBy must be a number'))
            }

            if (incrementBy === 0 || incrementBy < 0) {
                reject(new Error('incrementBy must be a positive number'))
            }

            // send command
            const opCode = 'glvn.increment'

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(incrementBy)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                if (data.charAt(0) !== ',' && data.charAt(0) !== ':') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(parseFloat(data.slice(1, -2)))
            })
        })
    }

    decrement = function (decrementBy = 1) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof decrementBy !== 'number') {
                reject(new Error('decrementBy must be a number'))
            }

            if (decrementBy === 0 || decrementBy < 0) {
                reject(new Error('decrementBy must be a positive number'))
            }

            // send command
            const opCode = 'glvn.decrement'

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(decrementBy)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                if (data.charAt(0) !== ',' && data.charAt(0) !== ':') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(parseFloat(data.slice(1, -2)))
            })
        })
    }

    findNext = function (findValue = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof findValue !== 'number' && typeof findValue !== 'string') {
                reject(new Error('findValue must be a number or a string'))
            }

            // send command
            const opCode = 'glvn.findNext'

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(findValue)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))
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

    findPrev = function (findValue = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof findValue !== 'number' && typeof findValue !== 'string') {
                reject(new Error('findValue must be a number or a string'))
            }

            // send command
            const opCode = 'glvn.findPrev'

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(findValue)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))
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

    query = function (glvn = undefined) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (glvn && typeof glvn !== 'string') {
                reject(new Error('glvn must be a string'))
            }

            // send command
            const opCode = 'glvn.query'

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(glvn || '')
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))
                }

                if (data.charAt(0) === '$') {
                    resolve(RESP3.parse.blob(data))

                } else {
                    reject(new Error(data.slice(1, -2)))
                }
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

module.exports = Glvn
