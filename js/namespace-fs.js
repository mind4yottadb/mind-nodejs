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
                RESP3.getBlob(opCode) +
                RESP3.getBlob(filename)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))
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
                RESP3.getBlob(opCode) +
                RESP3.getBlob(filename) +
                RESP3.getBlob(data)
            );

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(data.slice(1)))
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
                RESP3.getBlob(opCode) +
                RESP3.getBlob(filename) +
                RESP3.getBlob(data)
            );

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(data.slice(1)))
                }
                resolve()
            })
        })
    }

    // ************************************
    // readdir
    // ************************************
    readdir = function (path = '', mask = '*') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.readdir'
            that.writer("*3" + RESP3.CRLF +
                RESP3.getBlob(opCode) +
                RESP3.getBlob(path) +
                RESP3.getBlob(mask)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.getBlob(data).slice(1)))
                }
                resolve(RESP3.extractBlob(data).split(','))
            })
        })
    }

    // ************************************
    // readtree
    // ************************************
    readtree = function (path = '', mask = '*') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.readtree'
            that.writer("*3" + RESP3.CRLF +
                RESP3.getBlob(opCode) +
                RESP3.getBlob(path) +
                RESP3.getBlob(mask)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))
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
                RESP3.getBlob(opCode) +
                RESP3.getBlob(filename)
            );

            that.reader(data => {
                console.log(data)
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))
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
                RESP3.getBlob(opCode) +
                RESP3.getBlob(filename) +
                RESP3.getBlob(newFilename)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))
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
                RESP3.getBlob(opCode) +
                RESP3.getBlob(filename)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))
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
                RESP3.getBlob(opCode) +
                RESP3.getBlob(source) +
                RESP3.getBlob(destination)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))
                }
                resolve()
            })
        })
    }

    mkdir = function (path = '') {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.rootThat.connected === false || that.rootThat.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'fs.mkdir'
            that.writer("*2" + RESP3.CRLF +
                RESP3.getBlob(opCode) +
                RESP3.getBlob(path)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))
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
                RESP3.getBlob(opCode) +
                RESP3.getBlob(path)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))
                }
                resolve(data.slice(1))
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
                RESP3.getBlob(opCode) +
                RESP3.getBlob(path)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))
                }
                resolve()
            })
        })
    }
}

module.exports = fs