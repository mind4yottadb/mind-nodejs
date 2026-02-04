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
    funct: function (that, reader, writer, fn, namespace, params) {
        const RESP3 = that.RESP3

        console.log(fn)
        console.log(params)

        return new Promise(function (resolve, reject) {
            if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

            // validate parameters
            try {
                parseParams(fn, params)

            } catch (err) {
                reject(err)

                return
            }

            // prepare parameters


            // prepare command

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

const parseParams = function (fn, params) {

    if (fn.parameters && fn.parameters.length > 0) {
        params.forEach(function (param, ix) {
            const datatype = typeof param

            switch (datatype) {
                case 'string': {


                    break
                }
                case 'number': {


                    break
                }
                case 'boolean': {


                    break
                }
                case 'object': {


                    break
                }

                case 'array': {

                    break
                }

                default: {

                }

            }

        })

    } else if ((!fn.parameters || fn.parameters.length === 0) && params.length > 0) {
        throw (new Error('This method has no parameters'))
    }
}