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

const GlvnManagement = require('../extends/glvnManagement')

class Vars extends GlvnManagement {
    _type = 'vars'

    _init = function (obj) {
        Object.defineProperties(obj, {
            _type: {
                enumerable: false,
                configurable: false,
                writable: false
            },
        })

        Object.defineProperties(obj, {
            addName: {
                enumerable: true,
                configurable: false,
                writable: false
            },
        })

        Object.defineProperties(obj, {
            removeName: {
                enumerable: true,
                configurable: false,
                writable: false
            },
        })

        Object.defineProperties(obj, {
            _init: {
                enumerable: false,
            }
        })
    }
}

module.exports = Vars
