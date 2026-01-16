/*###############################################################
#                                                               #
# Copyright (c) 2025-2026 DnaSoft BV and/or its subsidiaries.   #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
###############################################################*/

module.exports = {
    validateTypeOfField: (param, type) => {
        return (typeof param === type)
    },

    validateEmptyField: value => {

    },

    validateGlvnName: name => {
        if (name === undefined || typeof name !== 'string') {
            throw new Error('Name empty or not string type')
        }

        let strRegex = new RegExp(/^[a-z0-9]+$/i)
        let result = strRegex.test(name)

        strRegex = new RegExp(/^[a-z]+$/i)
        let result2 = strRegex.test(name.charAt(0))

        if (!result || !result2) {
            throw new Error('Invalid name, must be alphanumeric with first char alphabetic')
        }
    },

    appendToObject: (namespace, that) => {
        Object.defineProperties(namespace, {
            objRoot: that.objRoot,
            writer: {
                value: that.writer,
                enumerable: false,
                configurable: false
            },
            reader: {
                value: that.reader,
                enumerable: false,
                configurable: false
            }
        })
    },

    validateGlvnPath: path => {
        console.log(path)

        return true
    },

    convertPathTo$Name: path => {

    }
}