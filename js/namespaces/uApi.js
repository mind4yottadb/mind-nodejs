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


const funct =


module.exports = {
    funct: function (that, reader, writer, fn, params) {
        const RESP3 = that.RESP3
        console.log('------')
        console.log(params)

        const filename = params[0]

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

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
            writer("*2" + RESP3.CRLF +
                RESP3.build.blob(opCode) +
                RESP3.build.blob(filename)
            );

            reader(data => {
                if (data.charAt(0) === '-') {
                    reject(new Error(data.slice(1)))

                    return
                }

                resolve(RESP3.parse.blob(data))
            })
        })
    },


}