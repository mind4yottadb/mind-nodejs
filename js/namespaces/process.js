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

const utils = require("../utils");

class Process {
    pid = null

    exec = function (command, shell = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            if (command === '') {
                reject(new Error('the command has not been provided'))

                return
            }

            if (utils.validateTypeOfField(command, 'string') === false) {
                reject(new Error('Parameter command must be a string'))

                return
            }

            if (utils.validateTypeOfField(shell, 'string') === false) {
                reject(new Error('Parameter shell must be a string'))

                return
            }

            // send command
            const opCode = 'process.exec'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(command) +
                RESP3.build.blob(shell)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(RESP3.parse.blob(data))
            })
        })
    }

    spawn = function (command, logFile = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            if (command === '') {
                reject(new Error('the command has not been provided'))

                return
            }

            if (utils.validateTypeOfField(command, 'string') === false) {
                reject(new Error('Parameter command must be a string'))

                return
            }

            if (utils.validateTypeOfField(logFile, 'string') === false) {
                reject(new Error('Parameter logFile must be a string'))

                return
            }

            // send command
            const opCode = 'process.spawn'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(command) +
                RESP3.build.blob(logFile)
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

    cwdGet = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.cwdGet'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
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

    cwdSet = function (path) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            if (path === '') {
                reject(new Error('the path has not been provided'))

                return
            }

            if (utils.validateTypeOfField(path, 'string') === false) {
                reject(new Error('Parameter path must be a string'))

                return
            }

            // send command
            const opCode = 'process.cwdSet'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(path)
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

    unixtime = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.unixtime'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(parseInt(RESP3.parse.simpleString(data)))
            })
        })
    }

    now = function (resolution = 'ms') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            if (resolution !== 'ms' && resolution !== 'us') {
                reject(new Error('Resolution can be either ms (milliseconds) or us (microseconds)'))

                return
            }

            // send command
            const opCode = 'process.now'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(resolution)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(parseInt(RESP3.parse.simpleString(data)))
            })
        })
    }

    datetime = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.datetime'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                data = data.slice(2 + data.indexOf(RESP3.CRLF), -2).split(RESP3.CRLF)
                const res = {}

                for (let ix = 0; ix < data.length; ix += 2) {
                    res[data[ix].slice(1)] = parseInt(data[ix + 1].slice(1))
                }

                resolve(res)
            })
        })
    }

    memUsage = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.memUsage'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                data = data.slice(2 + data.indexOf(RESP3.CRLF), -2).split(RESP3.CRLF)
                const res = {}

                for (let ix = 0; ix < data.length; ix += 2) {
                    res[data[ix].slice(1)] = parseInt(data[ix + 1].slice(1))
                }

                resolve(res)
            })
        })
    }

    getEnvVars = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.getEnvVars'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                data = data.slice(2 + data.indexOf(RESP3.CRLF), -2).split(RESP3.CRLF)
                const res = {}

                for (let ix = 0; ix < data.length; ix += 2) {
                    res[data[ix].slice(1)] = data[ix + 1].slice(1)
                }

                resolve(res)
            })
        })
    }

    horolog = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.horolog'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                data = data.slice(2 + data.indexOf(RESP3.CRLF), -2).split(RESP3.CRLF)
                const res = {}

                for (let ix = 0; ix < data.length; ix += 2) {
                    res[data[ix].slice(1)] = data[ix + 1].slice(1)
                }

                resolve(res)
            })
        })
    }

    showLocks = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.showLocks'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                data = data.slice(2 + data.indexOf(RESP3.CRLF), -2).split(RESP3.CRLF)
                const res = {}

                try {
                    for (let ix = 0; ix < data.length; ix += 2) {
                        res[data[ix].slice(1)] = data[ix + 1].slice(1)
                    }
                } catch (err) {
                }

                resolve(res)
            })
        })
    }

    removeAllLocks = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.removeAllLocks'
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

    groupLocks = function () {
        this._groupLocksFlag = true
    }

    clearLocksGroup = function () {
        this._groupLocksFlag = false
        this._locks = []
    }

    commitLocks = function (timeout = 0) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            if (that._groupLocksFlag === false) {
                reject(new Error('No lock group started, execute groupLocks() first'))

                return
            }

            if (that._locks.length === 0) {
                reject(new Error('No locks defined'))

                return
            }

            if (typeof timeout !== 'number') {
                reject(new Error('timeout must be a number'))
            }

            if (timeout < 0) {
                reject(new Error('timeout must be a positive number'))
            }

            // send command
            const opCode = 'process.commitLocks'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(that._locks.concat(',')) +
                RESP3.build.blob(timeout)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(data.slice(1, -2))
            })
        })
    }

    syslogMessage = function (message = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof message !== 'string') {
                reject(new Error('message must be a string'))

                return
            }

            // send command
            const opCode = 'process.syslogMessage'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(message)
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

    _init = function (obj) {
        Object.defineProperties(obj, {
            _locks: {
                value: [],
                enumerable: false,
                configurable: true,
                writable: true
            },

            _groupLocksFlag: {
                value: false,
                enumerable: false,
                configurable: true,
                writable: true
            }
        })

        Object.defineProperties(obj, {
            _init: {
                enumerable: false,
            }

        })
    }
}

module.exports = Process


