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

const utils = require("./utils");

class Process {
    pid = null
    env = {}

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
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve(data.slice(data.indexOf(RESP3.CRLF) + 2, data.length - 2))
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
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve(data.slice(1))
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
                    reject(new Error(data.slice(1, -2)))
                }

                resolve(data.slice(1, -2))
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
                    reject(new Error(data.slice(1, -2)))
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
                    reject(new Error(data.slice(1, -2)))
                }

                resolve(parseInt(data.slice(1, -2)))
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
                    reject(new Error(data.slice(1, -2)))
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
                    reject(new Error(data.slice(1, -2)))
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
}

module.exports = Process


