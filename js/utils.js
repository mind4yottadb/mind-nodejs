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

    validateConnectOptions: options => {

        if (typeof options !== 'object') {
            return 'options must be an object'
        }

        if (Array.isArray(options)) {
            return 'options cannot be an array'
        }

        if (Object.keys(options).length === 0) {
            return ''
        }

        if (options.useTls && typeof options.useTls !== 'boolean') {
            return 'options.useTls must be a boolean'
        }

        if (options.tlsRejectSelfSigned && typeof options.tlsRejectSelfSigned !== 'boolean') {
            return 'options.tlsRejectSelfSigned must be a boolean'
        }

        if (options.db && typeof options.db !== 'object') {
            return 'options.db must be an object'
        }

        if (options.db && options.db.globals && !Array.isArray(options.db.globals)) {
            return 'options.db.globals must be an array'
        }

        if (options.db && options.db.vars && !Array.isArray(options.db.vars)) {
            return 'options.db.vars must be an array'
        }

        if (options.db && options.db.vars) {
            let err = ''

            options.db.vars.forEach(entry => {
                if (typeof entry !== 'string') {
                    err = 'Entries in options.app.vars must be a string'
                }
            })

            if (err !== '') return err
        }

        if (options.db && options.db.globals) {
            let err = ''

            options.db.globals.forEach(entry => {
                if (typeof entry !== 'string') {
                    err = 'Entries in options.app.globals must be a string'
                }
            })

            if (err !== '') return err
        }

        if (options.uApi && typeof options.uApi !== 'object') {
            return 'options.uApi must be an object'
        }

        if (options.uApi && options.uApi.appName) {
            if (typeof options.uApi.appName !== 'string') {
                return 'options.uApi.appName must be a string'
            }
        }

        return ''
    },

    validateGlvnName: name => {
        if (name === undefined || typeof name !== 'string') {
            throw new Error('Name empty or not string type')
        }

        const baseIndex = name.charAt(0) === '_' ? 1 : 0
        let strRegex = new RegExp(/^[a-z0-9]+$/i)
        let result = strRegex.test(name.slice(baseIndex))
        let result2 = false

        strRegex = new RegExp(/^[a-z]+$/i)
        result2 = (name.charAt(0) === '_' || strRegex.test(name.charAt(0)))

        if (!result || !result2) {
            throw new Error('Invalid name, must be alphanumeric with first char alphabetic or underscore')
        }
    },

    validateGlvnPath: path => {
        for (const sub of path) {
            if (typeof sub !== 'string' && typeof sub !== 'number') {
                throw new Error('Subpath must be a string or number')
            }

            if (typeof sub === 'string' && sub === '') {
                throw new Error('String in path is empty')
            }
        }
    },

    convertPathTo$Name: path => {
        let ret = ''

        for (const sub of path) {
            if (typeof sub === 'string') {
                ret += '"' + sub + '"'
            } else {
                ret += sub.toString()
            }
            ret += ','
        }

        return ret.slice(0, -1)
    },

    generateGlvn: that => (that._type === 'globals' ? '^' : '') + that._glvnName.replace('_', '%') + (that._path !== '' ? '(' + that._path + ')' : ''),

    appendToObject: (namespace, that) => {
        Object.defineProperties(namespace, {
            objRoot: {
                value: that.objRoot,
                enumerable: false,
                configurable: false
            },
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
}