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

const utils = require('../utils');

class Fs {
    // ************************************
    // readFile
    // ************************************
    readFile = function (filename) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (filename === undefined) {
                reject(new Error('the filename has not been provided'))

                return
            }

            if (utils.validateTypeOfField(filename, 'string') === false) {
                reject(new Error('Parameter filename must be a string'))

                return
            }

            // send command
            const opCode = 'fs.readFile'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(filename)
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

    // ************************************
    // writeFile
    // ************************************
    writeFile = function (filename, data = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }



            if (filename === undefined) {
                reject(new Error('the filename has not been provided'))

                return
            }

            if (utils.validateTypeOfField(filename, 'string') === false) {
                reject(new Error('Parameter filename must be a string'))

                return
            }

            if (utils.validateTypeOfField(data, 'string') === false) {
                reject(new Error('Parameter data must be a string'))

                return
            }

            // send command
            const opCode = 'fs.writeFile'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(filename) +
                RESP3.build.blob(data)
            );

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve()
            })
        })
    }

    // ************************************
    // appendFile
    // ************************************
    appendFile = function (filename, data = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }



            if (filename === undefined) {
                reject(new Error('the filename has not been provided'))

                return
            }

            if (utils.validateTypeOfField(filename, 'string') === false) {
                reject(new Error('Parameter filename must be a string'))

                return
            }

            if (utils.validateTypeOfField(data, 'string') === false) {
                reject(new Error('Parameter data must be a string'))

                return
            }

            // send command
            const opCode = 'fs.appendFile'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(filename) +
                RESP3.build.blob(data)
            );

            that.reader(data => {
                if (data.charAt(0) === '-' || data.indexOf('+ok') === -1) {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve()
            })
        })
    }

    // ************************************
    // readDir
    // ************************************
    readDir = function (path, mask = '*') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }



            if (path === undefined) {
                reject(new Error('the path has not been provided'))

                return
            }

            if (utils.validateTypeOfField(path, 'string') === false) {
                reject(new Error('Parameter path must be a string'))

                return
            }

            if (utils.validateTypeOfField(mask, 'string') === false) {
                reject(new Error('Parameter mask must be a string'))

                return
            }
            // send command
            const opCode = 'fs.readDir'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(path) +
                RESP3.build.blob(mask)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(RESP3.parse.blob(data).split(','))
            })
        })
    }

    // ************************************
    // readTree
    // ************************************
    readTree = function (path, mask = '*') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) {
                reject(new Error('Not logged in'))

                return
            }



            if (path === undefined) {
                reject(new Error('the path has not been provided'))

                return
            }

            if (utils.validateTypeOfField(path, 'string') === false) {
                reject(new Error('Parameter path must be a string'))

                return
            }

            if (utils.validateTypeOfField(mask, 'string') === false) {
                reject(new Error('Parameter mask must be a string'))

                return
            }

            // send command
            const opCode = 'fs.readTree'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(path) +
                RESP3.build.blob(mask)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(RESP3.parse.blob(data).split(','))
            })
        })
    }

    // ************************************
    // removeFile
    // ************************************
    removeFile = function (filename) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (filename === undefined) {
                reject(new Error('the filename has not been provided'))

                return
            }

            if (utils.validateTypeOfField(filename, 'string') === false) {
                reject(new Error('Parameter filename must be a string'))

                return
            }

            // send command
            const opCode = 'fs.removeFile'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(filename)
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

    // ************************************
    // renameFile
    // ************************************
    renameFile = function (filename, newFilename) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (filename === undefined) {
                reject(new Error('the filename has not been provided'))

                return
            }

            if (utils.validateTypeOfField(filename, 'string') === false) {
                reject(new Error('Parameter filename must be a string'))

                return
            }

            if (newFilename === undefined) {
                reject(new Error('the newFilename has not been provided'))

                return
            }

            if (utils.validateTypeOfField(newFilename, 'string') === false) {
                reject(new Error('Parameter newFilename must be a string'))

                return
            }

            // send command
            const opCode = 'fs.renameFile'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(filename) +
                RESP3.build.blob(newFilename)
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

    // ************************************
    // stat
    // ************************************
    stat = function (filename) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (filename === undefined) {
                reject(new Error('the filename has not been provided'))

                return
            }

            if (utils.validateTypeOfField(filename, 'string') === false) {
                reject(new Error('Parameter filename must be a string'))

                return
            }

            // send command
            const opCode = 'fs.stat'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(filename)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                data = RESP3.parse.blob(data).split(RESP3.CRLF)
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
    copyfile = function (source, destination) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (source === undefined) {
                reject(new Error('the source has not been provided'))

                return
            }

            if (utils.validateTypeOfField(source, 'string') === false) {
                reject(new Error('Parameter source must be a string'))

                return
            }

            if (destination === undefined) {
                reject(new Error('the destination has not been provided'))

                return
            }

            if (utils.validateTypeOfField(destination, 'string') === false) {
                reject(new Error('Parameter destination must be a string'))

                return
            }

            // send command
            const opCode = 'fs.copyfile'
            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(source) +
                RESP3.build.blob(destination)
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

    // ************************************
    // mkdir
    // ************************************
    mkdir = function (path) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (path === undefined) {
                reject(new Error('the path has not been provided'))

                return
            }

            if (utils.validateTypeOfField(path, 'string') === false) {
                reject(new Error('Parameter path must be a string'))

                return
            }

            // send command
            const opCode = 'fs.mkdir'
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

    // ************************************
    // expandPath
    // ************************************
    expandPath = function (path = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (path === undefined) {
                reject(new Error('the path has not been provided'))

                return
            }

            if (utils.validateTypeOfField(path, 'string') === false) {
                reject(new Error('Parameter path must be a string'))

                return
            }

            // send command
            const opCode = 'fs.expandPath'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(path)
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

    // ************************************
    // rmdir
    // ************************************
    rmdir = function (path = '') {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (path === undefined) {
                reject(new Error('the path has not been provided'))

                return
            }

            if (utils.validateTypeOfField(path, 'string') === false) {
                reject(new Error('Parameter path must be a string'))

                return
            }

            // send command
            const opCode = 'fs.rmdir'
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

    // ************************************
    // isDir
    // ************************************
    isDir = function (filename) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (filename === undefined) {
                reject(new Error('the filename has not been provided'))

                return
            }

            if (utils.validateTypeOfField(filename, 'string') === false) {
                reject(new Error('Parameter filename must be a string'))

                return
            }

            // send command
            const opCode = 'fs.isDir'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(filename)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(RESP3.parse.boolean(data))
            })
        })
    }

    // ************************************
    // isFile
    // ************************************
    isFile = function (filename) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (filename === undefined) {
                reject(new Error('the filename has not been provided'))

                return
            }

            if (utils.validateTypeOfField(filename, 'string') === false) {
                reject(new Error('Parameter filename must be a string'))

                return
            }

            // send command
            const opCode = 'fs.isFile'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(filename)
            );

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(RESP3.parse.simpleError(data)))

                    return
                }

                resolve(RESP3.parse.boolean(data))
            })
        })
    }
}

module.exports = Fs