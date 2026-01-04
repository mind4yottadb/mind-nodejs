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

class fs {
    // ************************************
    // readFile
    // ************************************
    readFile = function (filename = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.rootThat.connected === false || that.rootThat.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.readFile'
            that.writer("*2" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(filename)
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

    // ************************************
    // writeFile
    // ************************************
    writeFile = function (filename = '', data = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.writeFile'
            that.writer("*3" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(filename) +
                RESP3.buildBlob(data)
            );

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    // ************************************
    // appendFile
    // ************************************
    appendFile = function (filename = '', data = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.appendFile'
            that.writer("*3" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(filename) +
                RESP3.buildBlob(data)
            );

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    // ************************************
    // readDir
    // ************************************
    readDir = function (path = '', mask = '*') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.readDir'
            that.writer("*3" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(path) +
                RESP3.buildBlob(mask)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve(RESP3.extractBlob(data).split(','))
            })
        })
    }

    // ************************************
    // readTree
    // ************************************
    readTree = function (path = '', mask = '*') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.readTree'
            that.writer("*3" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(path) +
                RESP3.buildBlob(mask)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve(RESP3.extractBlob(data).split(','))
            })
        })
    }

    // ************************************
    // removeFile
    // ************************************
    removeFile = function (filename = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.rootThat.connected === false || that.rootThat.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.removeFile'
            that.writer("*2" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(filename)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    // ************************************
    // renameFile
    // ************************************
    renameFile = function (filename = '', newFilename = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.rootThat.connected === false || that.rootThat.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.renameFile'
            that.writer("*3" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(filename) +
                RESP3.buildBlob(newFilename)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    // ************************************
    // stat
    // ************************************
    stat = function (filename = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.rootThat.connected === false || that.rootThat.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.stat'
            that.writer("*2" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(filename)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

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

    // ************************************
    // copyfile
    // ************************************
    copyfile = function (source = '', destination = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.rootThat.connected === false || that.rootThat.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.copyfile'
            that.writer("*3" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(source) +
                RESP3.buildBlob(destination)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    // ************************************
    // mkdir
    // ************************************
    mkdir = function (path = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.rootThat.connected === false || that.rootThat.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.mkdir'
            that.writer("*2" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(path)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }

    expandPath = function (path = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.rootThat.connected === false || that.rootThat.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.expandPath'
            that.writer("*2" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(path)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve(data.slice(1, -2))
            })
        })
    }
    rmdir = function (path = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.rootThat.connected === false || that.rootThat.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.rmdir'
            that.writer("*2" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(path)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve()
            })
        })
    }
}

module.exports = fs