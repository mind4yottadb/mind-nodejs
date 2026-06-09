/*###############################################################
#                                                               #
# Copyright (c) 2025-2026 DnaSoft BV and/or its subsidiaries.   #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
###############################################################*/
const errors = require("./errors");

module.exports = {
    create: async function (that, classModule, host, port, username, password, options) {
        return new Promise(async (resolve, reject) => {
            for (let ix = 0; ix < that.size; ix++) {
                const session = new classModule.exports.session

                try {
                    await session.connect(host, port, username, password, options)

                    const sessionLength = that.sessions.push({
                        session: session,
                        inUse: false,
                        isExtension: false
                    })

                    session.on('disconnect', function () {
                        for (let ix in that.sessions) {
                            if (that.sessions[ix].session.session.GUID === this.session.GUID) {
                                that.sessions.splice(ix, 1)
                            }
                        }

                        that.stats.remoteDisconnects++
                        that.size--
                    })

                } catch (err) {
                    reject(err)

                    return
                }
            }

            that.devOps.session = new classModule.exports.session

            try {
                await that.devOps.session.connect(host, port, username, password, options)

                Object.assign(that.devOps.session, {
                    done: function () {
                        that.devOps.sessionInUse = false
                    }
                })

                // initialize the pids and register the unique guid for this pool
                that.guid = await that.devOps.session._staticPool._register(that)

                // and make it read only
                Object.defineProperties(that, {
                    guid: {
                        writable: false,
                    },
                })

            } catch (err) {
                reject(err)

                return
            }

            that.host = host
            that.port = port
            that.username = username
            that.password = password
            that.options = options

            that.devOps.sessionInUse = false

            resolve()
        })
    },

    shrink: function (that, numSessions) {

    },

    expand: function (that, classModule, numSessions) {

    },

    changeExtension: function (that, numSessions) {

    },

    destroy: function (that) {
        if (that.sessions.length === 0) {
            throw new Error(errors.POOL_NOT_INITIALIZED + 'pool not initialized')
        }

        that.sessions.forEach(async session => await session.session.disconnect())

        that.devOps.session.disconnect()

        that.sessions = []
    },

    rundown: function (that) {

    },

    getSession: async function (that, classModule, timeout) {
        return new Promise(async (resolve, reject) => {
            if (that.sessions.length === 0) {
                reject(new Error(errors.POOL_NOT_INITIALIZED + 'pool not initialized'))

                return
            }

            const freeSlots = that.sessions.filter(session => session.inUse === false)
            let hInterval = null

            // can we get a normal session?
            if (freeSlots.length > 0) {
                freeSlots[0].inUse = true

                Object.assign(freeSlots[0].session, {
                    that: that,
                    ix: that.sessions.length - 1,
                    poolSlot: freeSlots[0],
                    done: function () {
                        this.poolSlot.inUse = false
                    }
                })

                that.stats.sessionsCreatedOk++

                that.hidePropsInObject(freeSlots[0])

                resolve(freeSlots[0].session)

                return
            }

            // can we extend?
            if (that.extension > 0 && that.extension - that.extensionInUse > 0) {
                const session = new classModule.exports.session

                try {
                    await session.connect(that.host, that.port, that.username, that.password, that.options)

                } catch (err) {
                    that.stats.extendsCreatedInError++

                    reject(err.message)

                    return
                }

                const newSession = {
                    session: session,
                    inUse: true,
                    isExtension: true
                }

                that.sessions.push(newSession)

                that.stats.extendsCreatedOk++

                Object.assign(newSession.session, {
                    that: that,
                    ix: that.sessions.length - 1,
                    poolSlot: newSession,

                    done: function () {
                        this.poolSlot.session.disconnect()

                        this.that.sessions.splice(this.ix, 1)

                        this.that.extensionInUse--

                        that.stats.extendsRemoved++

                        this.poolSlot.inUse = false
                    }
                })

                session.on('disconnect', function () {
                    this.that.sessions.splice(this.ix, 1)
                    that.stats.remoteDisconnects++
                    that.extensionInUse--
                    that.extendsRemoved++
                })

                that.hidePropsInObject(newSession)

                that.extensionInUse++

                resolve(newSession.session)

                return
            }

            that.stats.noMoreSlotsHits++

            that.timerTick -= false

            // do we have a timeout?
            let hTimeout = 0
            if (timeout > 0) {
                // setup main timer
                hTimeout = setTimeout(async () => {
                    that.stats.timeoutExpired++

                    reject(new Error(errors.TIMEOUT_OCCURRED + 'timeout expired while trying to get a session'))

                }, timeout)

            }

            hInterval = setInterval(async () => {
                // is there a slot available?
                if (that.timerTick === true) {
                    clearInterval(hInterval)
                    hInterval = null

                    return
                }

                const freeSlots = that.sessions.filter(session => session.inUse === false)

                if (freeSlots.length > 0) {
                    that.timerTick = true

                    clearTimeout(hTimeout)
                    clearInterval(hInterval)
                    hInterval = null

                    Object.assign(freeSlots[0].session, {
                        that: that,
                        ix: that.sessions.length - 1,
                        poolSlot: freeSlots[0],
                        done: function () {
                            this.poolSlot.inUse = false
                        }
                    })

                    that.hidePropsInObject(freeSlots[0])

                    freeSlots[0].inUse = true

                    that.stats.sessionsCreatedOk++

                    resolve(freeSlots[0].session)

                    return
                }

                // can we extend?
                if (that.extension > 0 && that.extension - that.extensionInUse > 0) {
                    that.timerTick = true

                    clearTimeout(hTimeout)
                    clearInterval(hInterval)
                    hInterval = null

                    const session = new classModule.exports.session

                    try {
                        await session.connect(that.host, that.port, that.username, that.password, that.options)

                    } catch (err) {
                        that.stats.extendsCreatedInError++

                        reject(err.message)

                        return
                    }

                    const newSession = {
                        session: session,
                        inUse: true,
                        isExtension: true
                    }

                    that.sessions.push(newSession)

                    that.stats.extendsCreatedOk++

                    Object.assign(newSession.session, {
                        that: that,
                        ix: that.sessions.length - 1,
                        poolSlot: newSession,
                        done: function () {
                            this.poolSlot.session.disconnect()
                            this.that.sessions.splice(this.ix, 1)

                            this.that.extensionInUse--

                            that.stats.extendsRemoved++

                            this.poolSlot.inUse = false
                        }
                    })

                    session.on('disconnect', function () {
                        this.that.sessions.splice(this.ix, 1)
                        that.stats.remoteDisconnects++
                        that.extensionInUse--
                        that.extendsRemoved++
                    })

                    that.hidePropsInObject(newSession)

                    that.extensionInUse++

                    resolve(newSession.session)
                }
            }, 0)
        })
    },

    getStatus: function (that) {
        const sessionsInUse = that.sessions.filter(session => session.inUse === true)
        const sessionsExtended = that.sessions.filter(session => session.isExtension === true)
        const sessionsTotal = that.sessions.length

        return {
            sessionsTotal: sessionsTotal,
            sessionsExtended: sessionsExtended.length,
            sessionsInUse: sessionsInUse.length,
            stats: that.stats
        }
    },

    devOps: {
        _getDevOpsSession: async function (that, timeout = 0) {
            if (Object.keys(that.session).length === 0 || (that.session.loggedIn && that.session.loggedIn === false)) {
                throw new Error(errors.POOL_NOT_INITIALIZED + 'pool not initialized')
            }

            if (that.sessionInUse === true) {
                throw new Error(errors.POOL_DEVOPS_SESSION_IN_USE + 'devOps session inUse')
            }

            that.sessionInUse = true

            return that.session
        },

        getPoolStats: async function (that) {
            if (Object.keys(that.session).length === 0 || (that.session.loggedIn && that.session.loggedIn === false)) {
                throw new Error(errors.POOL_NOT_INITIALIZED + 'pool not initialized')
            }

            const session = await that._getDevOpsSession()
            const res = await session._staticPool._getPoolStats()

            session.done()

            return res
        },
    }
}