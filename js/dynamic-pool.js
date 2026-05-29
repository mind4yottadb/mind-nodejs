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

const errors = require('./errors')

module.exports = {
    createNewSession: async function (that, classModule, timeout) {
        return new Promise(async (resolve, reject) => {
                const session = new classModule.exports.session

            if (that.maxSize > 0 && Object.keys(that.sessions).length === that.maxSize) {
                reject(new Error(errors.POOL_NO_MORE_SLOTS + 'you reached the maximum number of slots available for this pool'))

                return
            }

                try {
                    await session.connect(that.host, that.port, that.username, that.password, that.options)

                    Object.assign(that.sessions, {
                        [session.session.GUID]: {
                            session: session,
                            inUse: false
                        }
                    })

                    Object.assign(session, {
                        done: function () {
                            that.sessions[session.session.GUID].inUse = false
                        }
                    })

                    resolve(session)

                } catch
                    (err) {
                    reject(err)
                }
            }
        )
    },

    getSessionByGUID: async function (that, classModule, GUID, timeout) {
        return new Promise(async (resolve, reject) => {
            try {
                if (that.sessions[GUID] === undefined) {
                    reject(new Error('guid does not exist'))

                    return
                }

                // TODO: this should be change in a queue with 0 ms timer
                if (that.sessions[GUID].inUse === true) {
                    reject(new Error('session in use'))

                    return
                }

                that.sessions[GUID].inUse = true

                resolve(that.sessions[GUID].session)

            } catch (err) {
                reject(err)
            }
        })
    },

    terminateSession: async function (that, GUID) {
        return new Promise(async (resolve, reject) => {

        })
    },

    terminatePool: async function (that) {
        return new Promise(async (resolve, reject) => {

        })
    },

    getStatus: async function (that, GUID) {
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