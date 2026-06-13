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

class Session {
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

    getCurrentSettings = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            // send command
            const opCode = 'session.getCurrentSettings'
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

    setIdleTimeout = function (timeout) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            if (typeof (timeout) !== 'number') {
                reject(new Error(errors.PARAM_NOT_NUMBER + 'timeout must be a number greater than -1'))

                return
            }

            if (timeout < 0) {
                reject(new Error(errors.PARAM_NOT_ZERO_OR_GREATER + 'timeout must be zero or higher'))

                return
            }

            // send command
            const opCode = 'session.setIdleTimeout'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(timeout)
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

                resolve()
            })
        })
    }

    setErrorDump = function (value) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            if (typeof (value) !== 'number') {
                reject(new Error(errors.PARAM_NOT_NUMBER + 'timeout must be a number greater than -1'))

                return
            }

            if (value < 0 || value > 2) {
                reject(new Error(errors.PARAM_NOT_ZERO_OR_GREATER + 'timeout must be between 0 and 2'))

                return
            }

            // send command
            const opCode = 'session.setErrorDump'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(value)
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

                resolve()
            })
        })
    }

    setStats = function (value) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            if (typeof (value) !== 'number') {
                reject(new Error(errors.PARAM_NOT_NUMBER + 'timeout must be a number greater than -1'))

                return
            }

            if (value < 0 || value > 2) {
                reject(new Error(errors.PARAM_NOT_BETWEEN_ZERO_AND_ONE + 'timeout must be between 0 and 2'))

                return
            }

            // send command
            const opCode = 'session.setStats'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(value)
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

                resolve()
            })
        })
    }

    setDumpRequest = function (value) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            if (typeof (value) !== 'number') {
                reject(new Error(errors.PARAM_NOT_NUMBER + 'timeout must be a number greater than -1'))

                return
            }

            if (value < 0 || value > 1) {
                reject(new Error(errors.PARAM_NOT_ZERO_OR_ONE + 'timeout must be between 0 and 1'))

                return
            }

            // send command
            const opCode = 'session.setDumpRequest'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(value)
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

                resolve()
            })
        })
    }

    setDumpResponse = function (value) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            if (typeof (value) !== 'number') {
                reject(new Error(errors.PARAM_NOT_NUMBER + 'timeout must be a number greater than -1'))

                return
            }

            if (value < 0 || value > 1) {
                reject(new Error(errors.PARAM_NOT_ZERO_OR_ONE + 'timeout must be between 0 and 1'))

                return
            }

            // send command
            const opCode = 'session.setDumpResponse'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(value)
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

                resolve()
            })
        })
    }

    setLogLevel = function (value) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            if (typeof (value) !== 'number') {
                reject(new Error(errors.PARAM_NOT_NUMBER + 'timeout must be a number greater than -1'))

                return
            }

            if (value < 0 || value > 3) {
                reject(new Error(errors.PARAM_NOT_BETWEEN_ZERO_AND_THREE + 'timeout must be between 0 and 3'))

                return
            }

            // send command
            const opCode = 'session.setLogLevel'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(value)
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

                resolve()
            })
        })

    }

    resetSettings = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error(errors.NOT_LOGGED_IN + 'Not logged in'))

                return
            }

            // send command
            const opCode = 'session.resetSettings'
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

                resolve()
            })
        })
    }

    _init = function (obj) {
        Object.defineProperties(obj, {
            ERROR_DUMP_NONE: {
                value: 0,
                enumerable: true,
                configurable: true,
                writable: false
            },

            ERROR_DUMP_BRIEF: {
                value: 1,
                enumerable: true,
                configurable: true,
                writable: false
            },

            ERROR_DUMP_FULL: {
                value: 2,
                enumerable: true,
                configurable: true,
                writable: false
            },

            STATS_NONE: {
                value: 0,
                enumerable: true,
                configurable: true,
                writable: false
            },

            STATS_GRAND_TOTALS: {
                value: 1,
                enumerable: true,
                configurable: true,
                writable: false
            },

            STATS_DETAILS: {
                value: 2,
                enumerable: true,
                configurable: true,
                writable: false
            },

            DUMP_REQUEST_OFF: {
                value: 0,
                enumerable: true,
                configurable: true,
                writable: false
            },

            DUMP_REQUEST_ON: {
                value: 1,
                enumerable: true,
                configurable: true,
                writable: false
            },

            DUMP_RESPONSE_OFF: {
                value: 0,
                enumerable: true,
                configurable: true,
                writable: false
            },

            DUMP_RESPONSE_ON: {
                value: 1,
                enumerable: true,
                configurable: true,
                writable: false
            },

            LOG_LEVEL_NONE: {
                value: 0,
                enumerable: true,
                configurable: true,
                writable: false
            },

            LOG_LEVEL_SESSIONS: {
                value: 1,
                enumerable: true,
                configurable: true,
                writable: false
            },

            LOG_LEVEL_COMMANDS: {
                value: 2,
                enumerable: true,
                configurable: true,
                writable: false
            },

            LOG_LEVEL_TIMINGS: {
                value: 3,
                enumerable: true,
                configurable: true,
                writable: false
            },
        })
        Object.defineProperties(obj, {
            _init: {
                enumerable: false,
            }

        })
    }
}

module.exports = Session
