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

class server {
    hostName = ''
    mindVersion = ''
    ydbVersion = ''
    platform = ''
    architecture = ''

    pinfo = function (pid = 0) {
        const that = this

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // send command
            const opCode = 'server.pinfo'
            that.writer("*2" + RESP3.CRLF +
                RESP3.buildBlob(opCode) +
                RESP3.buildBlob(pid.toString())
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

module.exports = server

