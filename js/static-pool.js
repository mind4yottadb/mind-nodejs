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

module.exports = {
    sessionsPool: {
        // ******************
        // stateless
        // ******************
        create: async function (that, classModule, host, port, username, password, options) {
            return new Promise(async (resolve, reject) => {
                if (that.type !== 'stateless') {
                    reject(new Error('This function is not available is stateful mode'))

                    return
                }

                for (let ix = 0; ix < that.size; ix++) {
                    const session = new classModule.exports.session

                    try {
                        await session.connect(host, port, username, password, options)

                    } catch (err) {
                        reject(err)

                        return
                    }
                    that.sessions.push({
                        session: session,
                        inUse: false,
                        isExtension: false
                    })
                }

                that.host = host
                that.port = port
                that.username = username
                that.password = password
                that.options = options

                resolve()
            })
        },

        destroy: function (that) {
            if (that.type !== 'stateless') {
                return new Error('This function is not available is stateful mode')
            }

            that.sessions.forEach(async session => session.session.disconnect())

            that.sessions = []
        },

        getSessions: async function (that, classModule, timeout) {
            return new Promise(async (resolve, reject) => {
                if (that.type !== 'stateless') {
                    return new Error('This function is not available is stateful mode')
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
                        reject(err.message)

                        return
                    }

                    const newSession = {
                        session: session,
                        inUse: true,
                        isExtension: true
                    }

                    that.sessions.push(newSession)

                    Object.assign(newSession.session, {
                        that: that,
                        ix: that.sessions.length - 1,
                        poolSlot: newSession,

                        done: function () {
                            this.poolSlot.session.disconnect()

                            this.that.sessions.splice(this.ix, 1)

                            this.that.extensionInUse--

                            this.poolSlot.inUse = false
                        }
                    })

                    that.hidePropsInObject(newSession)

                    that.extensionInUse++

                    resolve(newSession.session)

                    return
                }

                // do we have a timeout?
                let hTimeout = 0
                if (timeout > 0) {
                    // setup main timer
                    hTimeout = setTimeout(async () => {
                        reject(new Error('timeout expired while trying to get a session'))

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
                            reject(err.message)

                            return
                        }

                        const newSession = {
                            session: session,
                            inUse: true,
                            isExtension: true
                        }

                        that.sessions.push(newSession)

                        Object.assign(newSession.session, {
                            that: that,
                            ix: that.sessions.length - 1,
                            poolSlot: newSession,
                            done: function () {
                                this.poolSlot.session.disconnect()
                                this.that.sessions.splice(this.ix, 1)

                                this.that.extensionInUse--

                                this.poolSlot.inUse = false
                            }
                        })

                        that.hidePropsInObject(newSession)

                        that.extensionInUse++

                        resolve(newSession.session)
                    }
                }, 0)
            })
        },

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

        getStatus: function (that) {
            const sessionsInUse = that.sessions.filter(session => session.inUse === true)
            const sessionsExtended = that.sessions.filter(session => session.isExtension === true)
            const sessionsTotal = that.sessions.length

            return {
                sessionsTotal: sessionsTotal,
                sessionsExtended: sessionsExtended.length,
                sessionsInUse: sessionsInUse.length,
                stats: {
                    sessionsCreatedOk: that.sessionsCreatedOk,
                    sessionsCreatedInError: that.sessionsCreatedInError,
                    extendsCreatedOk: that.extendsCreatedOk,
                    extendsCreatedInError: that.extendsCreatedInError,
                    extendsRemoved: that.extendsRemoved,
                    noMoreSlotsHits: that.noMoreSlotsHits
                }
            }
        }
    },
    dynamicPool: {
        getSession: async function (that, classModule, host, port, username, password, options) {

        },

        releaseSession: async function (that) {

        },

        getStatus: function (that) {

        }
    }
}