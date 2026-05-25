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
    // ******************
    // stateful
    // ******************
    createSession: async function (that) {
        return new Promise(async (resolve, reject) => {
            if (that.type !== 'stateful') {
                reject(new Error('This function is not available is stateless mode'))

                return
            }
        })
    },

    getSessionByGUID: async function (that, GUID) {
        return new Promise(async (resolve, reject) => {
            if (that.type !== 'stateful') {
                reject(new Error('This function is not available is stateless mode'))

                return
            }
        })

    },

    terminateSession: async function (that, GUID) {
        return new Promise(async (resolve, reject) => {
            if (that.type !== 'stateful') {
                reject(new Error('This function is not available is stateless mode'))

                return
            }
        })
    },
}