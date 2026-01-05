/*###############################################################
#                                                               #
# Copyright (c) 2025 DnaSoft BV and/or its subsidiaries.        #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
###############################################################*/

const RESP3 = require("./RESP3");

class process {
    arch = null
    pid = null
    platform = null
    env = {}

    exec = function (command = '', shell = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.exec'
            that.writer("*3" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(command) +
                RESP3.buildBlob(shell)
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

    spawn = function (command = '', logFile = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.spawn'
            that.writer("*3" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(command) +
                RESP3.buildBlob(logFile)
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

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.cwdGet'
            that.writer("*1" + RESP3.CRLF +
                RESP3.buildBlob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))
                }

                resolve(data.slice(1, -2))
            })
        })
    }

    cwdSet = function (path = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.cwdSet'
            that.writer("*2" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(path)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))
                }

                //that.cwd = path
                resolve()
            })
        })
    }

    unixtime = function () {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'process.unixtime'
            that.writer("*1" + RESP3.CRLF +
                RESP3.buildBlob(opCode)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))
                }

                //that.cwd = path
                resolve(data.slice(1, -2))
            })
        })

    }
}

module.exports = process


