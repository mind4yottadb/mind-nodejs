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

const Burst = require('./burst')
const utils = require('./utils')

class Session {
    burstsSize = 10         // 2-50
    burstsDistance = 10     // 3-10 secs.

    bursts = []

    constructor(burstsSize, burstsDistance) {
        if (!burstsSize || !burstsDistance) {
            throw new Error('Session: no burstsSize or burstsDistance provided')
        }

        this.burstsDistance = burstsDistance
        this.burstsSize = burstsSize

    }

    run = async function () {
        for (let ix = 0; ix < this.burstsSize; ix++) {
            const burst = new Burst(utils.getRandom(1, 5), utils.getRandom(1, 10))

            await burst.run()

            const delay = (utils.getRandom(1, this.burstsDistance * 1000))
            console.log('sleeping...' + delay)

            await utils.sleep(delay)
        }

    }
}

module.exports = Session