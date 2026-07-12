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
const Session = require('./session')

const process = require('process')

const start = async () => {
    await pool.init()

    const session = new Session(20, 5)

    console.log(session)

    await session.run()

    process.exit()
}

const initialize = async () => {

}


start()