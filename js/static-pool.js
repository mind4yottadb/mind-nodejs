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
const {size} = require("lodash");

module.exports = {
    create: async function (that, classModule, host, port, username, password, options) {
        return new Promise(async (resolve, reject) => {
            // regular sessions
            for (let ix = 0; ix < that.size; ix++) {
                const session = new classModule.exports.session

                try {
                    await session.connect(host, port, username, password, options)

                    that.sessions.push({
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

            // devOps session
            that.devOps.session = new classModule.exports.session

            try {
                await that.devOps.session.connect(host, port, username, password, options)
                that.devOps.sessionInUse = true

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

                // flag the devOps session as not in use
                that.devOps.sessionInUse = false

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

    changeSize: function (that, classModule, newSize) {
        return new Promise(async (resolve, reject) => {
            if (that.sessions.length === 0) {
                reject(new Error(errors.POOL_NOT_INITIALIZED + 'pool not initialized'))

                return
            }

            if (typeof newSize !== 'number') {
                reject(new Error(errors.PARAM_NOT_NUMBER + 'newSize must be a number'))

                return
            }

            if (newSize < 2) {
                reject(new Error(errors.POOL_SIZE_NOT_MIN_TWO + 'newSize must be greater than 1'))

                return
            }

            if (newSize === that.size) {
                reject(new Error(errors.POOL_NEWSIZE_SAME_AS_SIZE + 'the new size must be different than the current size'))

                return
            }

            if (newSize > that.size) {
                // we can extend the size, let's connect the new sessions
                for (let ix = 0; ix < newSize - that.size; ix++) {
                    const session = new classModule.exports.session

                    try {
                        await session.connect(that.host, that.port, that.username, that.password, that.options)
                        that.sessions.push({
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

                // update size
                that.size = newSize

                resolve()

            } else {
                // we need to shrink
                // we start allocating the sessions to be removed, then disconnect them and change the size
                const freeSlots = that.sessions.filter(session => session.inUse === false)

                // verify that there are enough sessions to be removed
                if (newSize > freeSlots.length) {
                    reject(new Error(errors.POOL_TOO_MANY_SESSIONS_IN_USE + 'Can not shrink due to sessions in use'))

                    return
                }

                // lock up the free sessions to ensure nobody gets them while disconnecting
                freeSlots.forEach(session => {
                    session.session.inUse = true
                })

                // disconnect them and remove them from the sessions array
                let deleteCount = 0
                let ix = that.sessions.length

                while (ix--) {
                    if (that.sessions.sessionInUse === true) continue
                    if (deleteCount === that.size - newSize) break

                    deleteCount++

                    freeSlots[ix].session.disconnect()

                    that.sessions.splice(ix, 1)
                }

                // update size
                that.size = newSize

                resolve()
            }
        })
    },

    changeExtension: function (that, numSessions) {

    },

    destroy: function (that) {
        if (that.sessions.length === 0) {
            throw new Error(errors.POOL_NOT_INITIALIZED + 'pool not initialized')
        }

        that.sessions.forEach(async session => session.session.disconnect())

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

            let session
            try {
                session = await that._getDevOpsSession()
                const res = await session._staticPool._getPoolStats()

                session.done()

                return res

            } catch (err) {
                try {
                    session.done()
                } catch (err) {
                }

                throw new Error(err.message)
            }
        },

        setLogLevel: async function (that, logLevel) {
            return new Promise(async (resolve, reject) => {
                let session

                try {
                    session = await that._getDevOpsSession()
                    await session._staticPool._changeServerSetting('logLevel', logLevel)

                    session.done()

                    resolve()

                } catch (err) {
                    try {
                        session.done()
                    } catch (err) {
                    }

                    reject(err.message)
                }
            })
        },

        setDumpResponse: async function (that, value) {
            return new Promise(async (resolve, reject) => {
                let session

                try {
                    session = await that._getDevOpsSession()
                    await session._staticPool._changeServerSetting('dumpResponse', value)

                    session.done()

                    resolve()

                } catch (err) {
                    try {
                        session.done()
                    } catch (err) {
                    }

                    reject(err.message)
                }
            })
        },

        setDumpRequest: async function (that, value) {
            return new Promise(async (resolve, reject) => {
                let session

                try {
                    session = await that._getDevOpsSession()
                    await session._staticPool._changeServerSetting('dumpRequest', value)

                    session.done()

                    resolve()

                } catch (err) {
                    try {
                        session.done()
                    } catch (err) {
                    }

                    reject(err.message)
                }
            })
        },

        setStats: async function (that, value) {
            return new Promise(async (resolve, reject) => {
                let session

                try {
                    session = await that._getDevOpsSession()
                    await session._staticPool._changeServerSetting('stats', value)

                    session.done()

                    resolve()

                } catch (err) {
                    try {
                        session.done()
                    } catch (err) {
                    }

                    reject(err.message)
                }
            })
        },

        setErrorDump: async function (that, value) {
            return new Promise(async (resolve, reject) => {
                let session

                try {
                    session = await that._getDevOpsSession()
                    await session._staticPool._changeServerSetting('errorDump', value)

                    session.done()

                    resolve()

                } catch (err) {
                    try {
                        session.done()
                    } catch (err) {
                    }

                    reject(err.message)
                }
            })
        },

        setIdleTimeout: async function (that, timeout) {
            return new Promise(async (resolve, reject) => {
                let session

                try {
                    session = await that._getDevOpsSession()
                    await session._staticPool._changeServerSetting('idleTimeout', timeout)

                    session.done()

                    resolve()

                } catch (err) {
                    try {
                        session.done()
                    } catch (err) {
                    }

                    reject(err.message)
                }
            })
        },

        resetSettings: async function (that) {
            return new Promise(async (resolve, reject) => {
                let session

                try {
                    session = await that._getDevOpsSession()
                    await session._staticPool._changeServerSetting('RESET_SETTINGS', 0)

                    session.done()

                    resolve()

                } catch (err) {
                    try {
                        session.done()
                    } catch (err) {
                    }

                    reject(err.message)
                }
            })
        }
    }
}