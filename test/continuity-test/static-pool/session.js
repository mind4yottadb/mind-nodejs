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
    run = async function () {
        for (let ix = utils.params.session.bustsSize.min; ix < utils.params.session.bustsSize.max; ix++) {
            const burst = new Burst()

            await burst.run()

            const delay = (utils.getRandom(utils.params.session.distance.min, utils.params.session.distance.max))
            console.log('sleeping...' + delay)

            await utils.sleep(delay * 1000)
        }

    }
}

module.exports = Session