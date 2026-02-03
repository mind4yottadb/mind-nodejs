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

const utils = require("../utils");

module.exports = {
    funct: function (...params) {
        let functionObj = {}
        let functionName = ''
        Object.keys(this).forEach(key => {
            if (key.indexOf('Obj') > -1) {
                functionObj = this[key]

            } else {
                functionName = key
            }

        })

        console.log(functionName)
        console.log(functionObj)

    }

}