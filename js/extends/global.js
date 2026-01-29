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

const Glvn = require("./glvn")
const utils = require("../utils");

class Global extends Glvn {
    spaceOnDisk = function () {

    }

    increment = function (incrementBy = 1) {
        const that = this
        const RESP3 = that.objRoot.RESP3

        return new Promise(function (resolve, reject) {
            if (that.objRoot.connected === false || that.objRoot.loggedIn === false) reject(new Error('Not logged in'))

            if (typeof incrementBy !== 'number') {
                reject(new Error('incrementBy must be a number'))
            }

            if (incrementBy === 0 || incrementBy < 0) {
                reject(new Error('incrementBy must be a positive number'))
            }

            // send command
            const opCode = 'glvn.increment'

            that.writer("*3" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(utils.generateGlvn(that)) +
                RESP3.build.blob(incrementBy)
            );

            that._path = ''

            that.reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                if (data.charAt(0) !== ',' && data.charAt(0) !== ':') {
                    reject(new Error(data.slice(1, -2)))

                    return
                }

                resolve(data.slice(1, -2))
            })
        })
    }
}

module.exports = Global
