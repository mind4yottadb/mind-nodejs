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
        method: function (that, reader, writer, fn, namespace, args) {
            const RESP3 = that.RESP3
            const package = []

            return new Promise(function (resolve, reject) {
                if (that.connected === false || that.loggedIn === false) reject(new Error('Not logged in'))

                // validate parameters
                try {
                    parseParams(fn, args)

                } catch (err) {
                    reject(err)

                    return
                }

                // prepare parameters
                args.forEach((arg, ix) => {
                    switch (typeof arg) {
                        case 'boolean':
                            args[ix] = arg === true ? '1' : '0'

                            break
                        case 'number':
                            args[ix] = arg.toString()

                            break
                        case 'object':
                            args[ix] = JSON.stringify(arg)

                            break
                        default:
                    }
                })

                // prepare package
                package.push(RESP3.build.blob(namespace + '.' + fn.name))
                args.forEach(arg => {
                    package.push(RESP3.build.blob(arg))
                })

                // send package
                writer('*' + (package.length) + RESP3.CRLF + package.join(''))


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

const parseParams = function (fn, args) {
    if (fn.parameters && fn.parameters.length > 0) {
        // when # of params is < that requested
        if (fn.parameters.length !== args.length) {
            throw new Error('Expected ' + fn.parameters.length + ' parameters, got ' + args.length + '.')
        }

        // validate datatype of each parameter
        fn.parameters.forEach(function (param, ix) {
            switch (param.datatype) {
                case 'integer':
                case 'float': {
                    if (typeof args[ix] !== 'number') {
                        throw new Error('Parameter ' + (ix + 1) + ': "' + param.name + '" must be a number.')
                    }

                    if (args[ix].indexOf('.') > -1 && param.datatype === 'integer') {
                        throw new Error('Parameter ' + (ix + 1) + ': "' + param.name + '" must be an int.')
                    }

                    break
                }

                default: {
                    if (typeof args[ix] !== param.datatype) {
                        throw new Error('Parameter ' + (ix + 1) + ': "' + param.name + '" must be a ' + param.datatype + '.')
                    }

                    break
                }
            }
        })

        // when args are passed, but not needed
    } else if ((!fn.parameters || fn.parameters.length === 0) && args.length > 0) {
        throw (new Error('This method has no parameters'))
    }
}