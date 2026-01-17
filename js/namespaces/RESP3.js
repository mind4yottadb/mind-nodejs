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
        blob: str => '$' + str.length.toString() + '\r\n' + str + '\r\n',
        verbatimString: (str, type) => '=' + (str.length + 4).toString() + '\r\n' + type + ':' + str + '\r\n',
        streamedString: () => '',

        _null: () => '_\r\n',
        _true: () => '#t\r\n',
        _false: () => '#f\r\n',

        int: val => '#f' + val.toString() + '\r\n',
        double: val => ',' + val.toString() + '\r\n',
        bigNumber: num => '(' + num.toString() + '\r\n'
    }

    extract = {     // to be renamed parse
        blob: str => str.slice(2 + str.indexOf('\r\n'), -2),
        simpleString: str => str.slice(1)

    }

    convert = {
        jsArrayToRESP3: array => {

        },

        jsObjectToRESP3: object => {

        }
    }

    _init = that => {
        Object.defineProperties(that.RESP3, {
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
    }
}

module.exports = RESP3