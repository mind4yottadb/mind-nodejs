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

            // create methods if needed
            if (namespace.methods && namespace.methods.length > 0) {
                namespace.methods.forEach(fn => {
                    const functionName = fn.name

                    that[namespace.name][functionName] = function (...params) {
                        return uApi.funct(that[namespace.name].objRoot, reader, writer, fn, namespace.name, params)
                    }
                })
            }

            // create properties if needed
            if (namespace.properties && namespace.properties.length > 0) {
                namespace.properties.forEach(fn => {
                    Object.defineProperties(that[namespace.name], {
                        [fn.name]: {
                            value: fn.value,
                            enumerable: true,
                            configurable: false,
                            writable: false
                        },
                    })
                })
            }

            // create children
            if (namespace.children && namespace.children.length > 0) {
                namespace.children.forEach(child => {
                    that[namespace.name][child.name] = {}
                    appendToObject(that[namespace.name][child.name], that)

                    // create methods if needed
                    if (child.methods && child.methods.length > 0) {
                        child.methods.forEach(fn => {
                            const functionName = fn.name

                            that[namespace.name][child.name][functionName] = function (...params) {
                                return uApi.funct(that[namespace.name][child.name].objRoot, reader, writer, fn, namespace.name + "." + child.name, params)
                            }
                        })
                    }
                })
            }
        })
    },
}