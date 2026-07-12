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

const pool = require('./pool')
const Burst = require('./burst')
const process = require('process')

const start = async () => {
    await pool.init()

    const test = new Burst(20, 5)

    console.log(test)

    await test.burst()

    process.exit()
}

const initialize = async () => {

}


start()