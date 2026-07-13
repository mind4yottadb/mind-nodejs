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

process.on('SIGINT', () => {
    console.log('ctrl-c detected')
    console.log(pool.pool.getStatus())
    process.exit(0)
})

const start = async () => {
    await pool.init(32, 40)

    for (let i = 0; i < 70; i++) {
        const session = new Session()
        session.run()

    }

    console.log('init completed...')

    //process.exit()
}

const initialize = async () => {

}


start()