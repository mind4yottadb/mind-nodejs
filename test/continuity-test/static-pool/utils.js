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

module.exports = {
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },

    sleep: async msDelay => {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, msDelay)
        })
    },


    params: {
        burst: {
            commands: {
                min: 1,
                max: 5
            },
            separation: {
                min: 1,
                max: 5
            }
        },
        session: {
            bustsSize: {
                min: 2,
                max: 50
            },
            distance: {
                min: 3,
                max: 10
            }
        }
    }
}

