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

class GlvnBasic {
    next = function () {
        console.log('>>>>NEXT')
    }

    hasValue = function (path) {
        const that = this
        const RESP3 = that.objRoot.RESP3


        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'glvn.hasValue'
            that.writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(this.name)
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

    hasNodes = function (path) {

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

    }

    killTree = function (path) {


    }

    getPiece = function (path) {

    }

    setPiece = function (path, data, separator, start) {

    }

    merge = function (path, glvn) {

    }
}

module.exports = GlvnBasic
