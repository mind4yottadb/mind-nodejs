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
    #CRLF = '\r\n'
    #LF = '\n'
    build = {

        blob: str => '$' + str.length.toString() + '\r\n' + str + '\r\n',
        streamedString: () => {

        },
        blobError: str => '$' + str.length.toString() + '\r\n' + str + '\r\n',
        simpleString: str => '',
        simpleError: str => '',

        _null: () => '',
        _true: () => '',
        _false: () => '',

        _int: () => '',
        _double: () => '',
        bigNumber: () => '',

        array: () => {

        },

        map: () => {

        },


    }

    get CRLF() {
        return this.#CRLF
    }

    get LF() {
        return this.#LF
    }

}

module.exports = RESP3