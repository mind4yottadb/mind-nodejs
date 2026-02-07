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

class RESP3 {

    build = {
        blobError: str => '!' + str.length.toString() + '\r\n' + str + '\r\n',
        simpleError: str => '-' + str + '\r\n',

        simpleString: str => '+' + str + '\r\n',
        blob: str => '$' + str.toString().length.toString() + '\r\n' + str.toString() + '\r\n',
        verbatimString: (str, type) => '=' + (str.length + 4).toString() + '\r\n' + type + ':' + str + '\r\n',
        streamedString: () => '',

        _null: () => '_\r\n',
        _true: () => '#t\r\n',
        _false: () => '#f\r\n',

        int: val => '#f' + val.toString() + '\r\n',
        double: val => ',' + val.toString() + '\r\n',
        bigNumber: num => '(' + num.toString() + '\r\n'
    }

    parse = {
        extractToken: str => str.slice(1, str.slice(-2) === '\r\n' ? -2 : str.length),

        map: str => str,

        blob: str => str.slice(2 + str.indexOf('\r\n'), -2),

        simpleString: function (str) {
            return this.extractToken(str)
        },

        simpleError: function (str) {
            return this.extractToken(str)
        },

        boolean: function (str) {
            return this.extractToken(str) === 't'
        },

        null: function (str) {
            return this.extractToken(str)
        },

        int: function (str) {
            return parseInt(this.extractToken(str))
        },

        double: function (str) {
            return parseFloat(this.extractToken(str))
        },

        bigNumber: function (str) {
            return this.extractToken(str)
        },

        returns: function (str) {
            const type = str.charAt(0)

            switch (type) {
                case '+':
                    return this.simpleString(str)

                case '$':
                    return this.blob(str)

                case ':':
                    return this.int(str)

                case ',':
                    return this.double(str)

                case '#':
                    return this.boolean(str)

                case '=':
                    return JSON.parse(str.slice(6 + str.indexOf('\r\n'), -2))

                default :
                    return this.simpleError('INVALID RESP3 datatype')
            }
        }
    }

    convert = {
        jsArrayToRESP3: array => {

        },

        jsObjectToRESP3: object => {

        }
    }

    _init = that => {
        Object.defineProperties(that.RESP3, {
            extractToken: {
                value: str => str.slice(1, str.slice(-2) === '\r\n' ? -2 : str.length),
                enumerable: false,
                configurable: true,
                writable: false
            },
            CRLF: {
                value: '\r\n',
                enumerable: true,
                configurable: true,
                writable: false
            },

            LF: {
                value: '\n',
                enumerable: true,
                configurable: true,
                writable: false
            },

            null: {
                value: '_',
                enumerable: true,
                configurable: true,
                writable: false
            },

            boolean: {
                value: '#',
                enumerable: true,
                configurable: true,
                writable: false
            },

            true: {
                value: '#t',
                enumerable: true,
                configurable: true,
                writable: false
            },

            false: {
                value: '#f',
                enumerable: true,
                configurable: true,
                writable: false
            },

            int: {
                value: ':',
                enumerable: true,
                configurable: true,
                writable: false
            },

            double: {
                value: ',',
                enumerable: true,
                configurable: true,
                writable: false
            },

            bigNumber: {
                value: '(',
                enumerable: true,
                configurable: true,
                writable: false
            },

            _init: {
                enumerable: false,
            }
        })

        Object.defineProperties(that.RESP3.parse, {
            extractToken: {
                enumerable: false,
                configurable: true,
                writable: false
            },
        })
    }
}

module.exports = RESP3