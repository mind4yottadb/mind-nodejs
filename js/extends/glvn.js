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

                resolve(data === RESP3.true)
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

                resolve(data === RESP3.true)
            })
        })
    }

    getTree = function (path) {

    }

    setTree = function (path, data) {

    }

    getValue = function (path) {

    }

    readValue = function (path) {

    }

    setValue = function (path, data) {

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

    getPiece = function (path) {

    }

    setPiece = function (path, data, separator, start) {

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

module.exports = Glvn
