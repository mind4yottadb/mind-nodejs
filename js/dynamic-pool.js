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
    createNewSession: async function (that, classModule, timeout) {
        return new Promise(async (resolve, reject) => {

        })
    },
    getSessionByGUID: async function (that, classModule, GUID, timeout) {
        return new Promise(async (resolve, reject) => {

        })
    },

    terminateSession: async function (that, classModule, GUID) {
        return new Promise(async (resolve, reject) => {

        })
    },

    getStatus: async function (that, classModule, GUID) {
        return new Promise(async (resolve, reject) => {

        })
    },

    verifyConnection: async function (that, classModule) {
        return new Promise(async (resolve, reject) => {
            const session = new classModule.exports.session

            try {
                await session.connect(that.host, that.port, that.username, that.password, that.options)

                resolve()

            } catch (err) {
                reject(err)
            }

            session.disconnect()
        })
    },
}