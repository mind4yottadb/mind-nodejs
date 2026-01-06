/*###############################################################
#                                                               #
# Copyright (c) 2025 DnaSoft BV and/or its subsidiaries.        #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
###############################################################*/

class RESP3 {
    buildBlob = str => '$' + str.length.toString() + '\r\n' + str + '\r\n'
    buildStreamedString = () => ''
    buildBlobError = str => '$' + str.length.toString() + '\r\n' + str + '\r\n'
    buildSimpleString = str => ''
    buildSimpleError = str => ''

    extractBlob = str => str.slice(2 + str.indexOf('\r\n'), -2)
    extractSimpleString = str => str.slice(1)


    _null = () => ''
    _true = () => ''
    _false = () => ''

    _int = () => ''
    _double = () => ''
    bigNumber = () => ''

    array = () => {

    }

    map = () => {

    }

    _init = that => {
        Object.defineProperties(that.RESP3, {
            CRLF: {
                value: '\r\n',
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