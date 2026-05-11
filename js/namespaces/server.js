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

class Server {
    hostName = ''
    mindVersion = ''
    ydbVersion = ''
    platform = ''
    architecture = ''

    pinfo = function (pid = 0) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))
            }



            if (utils.validateTypeOfField(pid, 'number') === false) {
                reject(new Error('Parameter pid must be a number'))

                return
            }

            // send command
            const opCode = 'server.pinfo'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(pid.toString())
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

    SIG_INT = 2
    SIG_KIL = 9

    kill = function (pid, sigNumber = 2) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }

            if (utils.validateTypeOfField(pid, 'number') === false) {
                reject(new Error('Parameter pid must be a number'))

                return
            }

            if (pid === 0) {
                reject(new Error('the path has not been provided'))

                return
            }

            if (utils.validateTypeOfField(sigNumber, 'number') === false) {
                reject(new Error('Parameter sigNumber must be a number'))

                return
            }

            // send command
            const opCode = 'server.kill'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(pid.toString()) +
                RESP3.build.blob(sigNumber.toString())
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                that.reader(data => {
                    if (data.charAt(0) === '-') {
                        reject(new Error(RESP3.parse.simpleError(data)))

                        return
                    }

                    resolve()
                })
            })
        })
    }

    GUID = function (dashed = true, braced = false) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }

            if (typeof dashed !== 'boolean' || typeof braced !== 'boolean') {
                reject(new Error('Parameter must be a boolean'))
            }

            // send command
            const opCode = 'server.GUID'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob((dashed === true ? 'D' : '') + (braced === true ? 'B' : ''))
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

    stats = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }

            // send command
            const opCode = 'server.stats'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                if (data.indexOf('+no data') > -1) {
                    reject(new Error('No stats enabled on server'))

                    return
                }

                resolve(JSON.parse(RESP3.parse.blob(data)))
            })
        })
    }

    listSessions = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }

            // send command
            const opCode = 'server.listSessions'
            that.writer("*1" + RESP3.CRLF +
                RESP3.build.blob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                if (data.indexOf('+no data') > -1) {
                    reject(new Error('No stats enabled on server'))

                    return
                }

                resolve(JSON.parse(RESP3.parse.blob(data)))
            })
        })
    }

    plist = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }

            // send command
            const opCode = 'server.plist'
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

    unixtime = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }

            // send command
            const opCode = 'server.unixtime'
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
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }

            if (resolution !== 'ms' && resolution !== 'us') {
                reject(new Error('Resolution can be either ms (milliseconds) or us (microseconds)'))

                return
            }

            // send command
            const opCode = 'server.now'
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
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }

            // send command
            const opCode = 'server.datetime'
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

    horolog = function () {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }

            // send command
            const opCode = 'server.horolog'
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

    _init = function (obj) {
        Object.defineProperties(obj, {
            SIG_INT: {
                value: 2,
                enumerable: true,
                configurable: false,
                writable: false
            }

        })

        Object.defineProperties(obj, {
            SIG_KIL: {
                value: 9,
                enumerable: true,
                configurable: false,
                writable: false
            }

        })

        Object.defineProperties(obj, {
            _init: {
                enumerable: false,
            }

        })
    }
}

module.exports = Server

