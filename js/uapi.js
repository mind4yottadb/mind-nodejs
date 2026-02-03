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

const utils = require("./utils");
const uApi = require('./namespaces/uApi')

const vm = require("vm");

module.exports = {
    parse: function (that, writer, reader) {
        const appendToObject = (namespace, that) => {
            Object.defineProperties(namespace, {
                objRoot: {
                    value: that,
                    enumerable: false,
                    configurable: false
                },
                writer: {
                    value: writer,
                    enumerable: false,
                    configurable: false
                },
                reader: {
                    value: reader,
                    enumerable: false,
                    configurable: false
                }
            })
        }

        that.uApi.forEach(namespace => {
            // create the namespace
            that[namespace.name] = {}
            appendToObject(that[namespace.name], that)

            // create functions and methods if needed
            if (namespace.functions && namespace.functions.length > 0) {
                namespace.functions.forEach(fn => {
                    const functionName = fn.entryPoint.split('^')[0]

                    that[namespace.name][functionName] = function (...params) {
                        return uApi.funct(that[namespace.name].objRoot, reader, writer, fn, params)
                    }
                })
            }

            // create children
            if (namespace.children && namespace.children.length > 0) {
                namespace.children.forEach(child => {
                    console.log(child)
                    that[namespace.name][child.name] = {}
                    appendToObject(that[namespace.name][child.name], that)

                    // create functions and methods if needed
                    if (child.functions && child.functions.length > 0) {
                        child.functions.forEach(fn => {
                            const functionName = fn.entryPoint.split('^')[0]

                            that[namespace.name][child.name][functionName] = function (...params) {
                                return uApi.funct(that[namespace.name][child.name].objRoot, reader, writer, fn, params)
                            }
                        })
                    }

                })

            }
        })

    },

}