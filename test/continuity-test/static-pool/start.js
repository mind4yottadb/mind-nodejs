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
const utils = require('./utils')

const process = require('process')

let startTime

process.on('SIGINT', () => {
    const endTime = Date.now()

    console.log('ctrl-c detected')

    // compute time difference
    const diff = new Date("1970-01-01T00:00:00Z")
    diff.setMilliseconds(endTime.valueOf() - startTime.valueOf())

    const duration = utils.dumpTime(diff)
    const startTimeAsDate = new Date(startTime)
    const endTimeAsDate = new Date(endTime)

    console.log('Start time:\t\t\t' + startTimeAsDate.toTimeString())
    console.log('End time:\t\t\t' + endTimeAsDate.toTimeString())
    console.log('Duration:\t\t\t' + duration)
    console.log('\nParameters:')
    console.log(utils.params)
    console.log('\nStatus:')
    console.log(pool.pool.getStatus())

    process.exit(0)
})

const start = async () => {
    await pool.init(utils.params.pool.size, utils.params.pool.extension)
    startTime = Date.now()

    if (utils.params.dumpTotals === true) {
        setInterval(async () => {
            const status = pool.pool.getStatus()

            const now = new Date()
            const nowFormatted = now.toTimeString().split(' ')[0]
            console.log(nowFormatted + ':', status.stats.sessionsCreatedOk, '/', status.stats.extendsCreatedOk)

        }, 60000 * utils.params.dumpTotalsDelay)
    }

    while (true) {
        for (let i = 0; i < utils.params.mainLoopThreads; i++) {
            const session = new Session()
            session.run()
        }

        await utils.sleep(60000 * 4)
    }
}

start()