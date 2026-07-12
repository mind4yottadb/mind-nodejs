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

const mind = require("../../../js")

module.exports = {
    init: async function (maxSize = 10, extension = 0) {
        const pool = new mind.staticPool(maxSize, extension)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        module.exports.pool = pool
    },

    pool: null
}

