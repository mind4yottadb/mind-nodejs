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

const buildParametersText = fn => {
    let text = ''

    if (fn.returns && fn.returns !== '') {
        text += '<' + fn.returns + '> = '
    } else {
        text += '<void> = '
    }

    text += fn.name + '('

    if (fn.parameters && fn.parameters.length > 0) {
        fn.parameters.forEach(param => {
            text += param.name + ' <' + param.datatype + '>, '

        })

        text = text.slice(0, -2)
    }

    return text += ')'
}

module.exports = {
    parse: function (that, writer, reader) {
        const appendToObject = (namespace, that) => {
            Object.defineProperties(namespace, {
                objRoot: {
                    value: that,
                    enumerable: false,
                    configurable: false,
                    writable: false,
                },
                writer: {
                    value: writer,
                    enumerable: false,
                    configurable: false,
                    writable: false,
                },
                reader: {
                    value: reader,
                    enumerable: false,
                    configurable: false,
                    writable: false,
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
                    that[namespace.name][fn.name] = function (...args) {
                        return uApi.method(that[namespace.name].objRoot, reader, writer, fn, namespace.name, args)
                    }

                    if (fn.showSignature && fn.showSignature === true) {
                        Object.defineProperties(that[namespace.name], {
                            [fn.name + '_signature']: {
                                value: buildParametersText(fn),
                                enumerable: true,
                                configurable: false,
                                writable: false,
                            },
                        })
                    }

                    if (fn.description && fn.description.length > 0 && fn.showDescription && fn.showDescription === true) {
                        Object.defineProperties(that[namespace.name], {
                            [fn.name + '_description']: {
                                value: fn.description,
                                enumerable: true,
                                configurable: false,
                                writable: false,
                            },
                        })
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
                            that[namespace.name][child.name][fn.name] = function (...args) {
                                return uApi.method(that[namespace.name][child.name].objRoot, reader, writer, fn, namespace.name + "." + child.name, args)
                            }

                            if (fn.showSignature && fn.showSignature === true) {
                                Object.defineProperties(that[namespace.name][child.name], {
                                    [fn.name + '_signature']: {
                                        value: buildParametersText(fn),
                                        enumerable: true,
                                        configurable: false,
                                        writable: false,
                                    },
                                })
                            }

                            if (fn.description && fn.description.length > 0 && fn.showDescription && fn.showDescription === true) {
                                Object.defineProperties(that[namespace.name][child.name], {
                                    [fn.name + '_description']: {
                                        value: fn.description,
                                        enumerable: true,
                                        configurable: false,
                                        writable: false,
                                    },
                                })
                            }
                        })
                    }

                    // create properties if needed
                    if (child.properties && child.properties.length > 0) {
                        child.properties.forEach(fn => {
                            Object.defineProperties(that[namespace.name][child.name], {
                                [fn.name]: {
                                    value: fn.value,
                                    enumerable: true,
                                    writable: false
                                },
                            })
                        })
                    }

                    // create children
                    if (child.children && child.children.length > 0) {
                        child.children.forEach(child2 => {
                            that[namespace.name][child.name][child2.name] = {}
                            appendToObject(that[namespace.name][child.name][child2.name], that)

                            // create methods if needed
                            if (child2.methods && child2.methods.length > 0) {
                                child2.methods.forEach(fn => {
                                    that[namespace.name][child.name][child2.name][fn.name] = function (...args) {
                                        return uApi.method(that[namespace.name][child.name][child2.name].objRoot, reader, writer, fn, namespace.name + "." + child.name + '.' + child2.name, args)
                                    }

                                    if (fn.showSignature && fn.showSignature === true) {
                                        Object.defineProperties(that[namespace.name][child.name][child2.name], {
                                            [fn.name + '_signature']: {
                                                value: buildParametersText(fn),
                                                enumerable: true,
                                                configurable: false,
                                                writable: false,
                                            },
                                        })
                                    }

                                    if (fn.description && fn.description.length > 0 && fn.showDescription && fn.showDescription === true) {
                                        Object.defineProperties(that[namespace.name][child.name][child2.name], {
                                            [fn.name + '_description']: {
                                                value: fn.description,
                                                enumerable: true,
                                                configurable: false,
                                                writable: false,
                                            },
                                        })
                                    }
                                })
                            }

                            // create properties if needed
                            if (child2.properties && child2.properties.length > 0) {
                                child2.properties.forEach(fn => {
                                    Object.defineProperties(that[namespace.name][child.name][child2.name], {
                                        [fn.name]: {
                                            value: fn.value,
                                            enumerable: true,
                                            writable: false
                                        },
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}