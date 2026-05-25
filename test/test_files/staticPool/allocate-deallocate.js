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

const {expect} = require("chai");
const {createYdbInstance, sleep} = require("../../utils.cjs");
const mindServer = require("../../../js");

describe("Pool stateless: allocate / deallocate", async () => {
    describe("getSession with no timeout, within ranges", async () => {
        it("get 1 session, check extra method", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            const session = await pool.getSession()

            expect(typeof session.done === "function").to.be.true

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(1);
            expect(status.sessionsExtended).to.equal(0);

            pool.destroy()
        })

        it("get 1 extended session, check extra method", async () => {
            const pool = new mindServer.staticPool(3, 1)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            const session = await pool.getSession()
            const session2 = await pool.getSession()
            const session3 = await pool.getSession()
            const session4 = await pool.getSession()

            expect(typeof session4.done === "function").to.be.true

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(4);
            expect(status.sessionsInUse).to.equal(4);
            expect(status.sessionsExtended).to.equal(1);

            pool.destroy()
        })

        it("get 1 session, check count", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            const session = await pool.getSession()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(1);
            expect(status.sessionsExtended).to.equal(0);

            pool.destroy()
        })

        it("get 2 sessions, check count", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            const session1 = await pool.getSession()
            const session2 = await pool.getSession()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(2);
            expect(status.sessionsExtended).to.equal(0);

            pool.destroy()
        })

        it("get 3 sessions, check count", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            const session1 = await pool.getSession()
            const session2 = await pool.getSession()
            const session3 = await pool.getSession()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(3);
            expect(status.sessionsExtended).to.equal(0);

            pool.destroy()
        })

        it("get 4 sessions, 3 regular and 1 extended, check count", async () => {
            const pool = new mindServer.staticPool(3, 1)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            const session1 = await pool.getSession()
            const session2 = await pool.getSession()
            const session3 = await pool.getSession()
            const session4 = await pool.getSession()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(4);
            expect(status.sessionsInUse).to.equal(4);
            expect(status.sessionsExtended).to.equal(1);

            await pool.destroy()
        })
    })

    describe("getSession without timeout, outside range", async () => {
        it("get 3 session, done() one after one second", async () => {
            const pool = new mindServer.staticPool(2)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(2);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            const session = await pool.getSession()
            const session2 = await pool.getSession()

            setTimeout(async () => {
                session.done()

            }, 1000)

            const session3 = await pool.getSession()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(2);
            expect(status.sessionsInUse).to.equal(2);
            expect(status.sessionsExtended).to.equal(0);

            pool.destroy()
        })

        it("get 4 session, done() one after one second, extend", async () => {
            const pool = new mindServer.staticPool(2, 1)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(2);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            const session = await pool.getSession()
            const session2 = await pool.getSession()
            const session3 = await pool.getSession()

            setTimeout(async () => {
                session.done()

            }, 1000)

            const session4 = await pool.getSession()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(3);
            expect(status.sessionsExtended).to.equal(1);

            session4.done()

            pool.destroy()
        })

        it("get 4 session, done() one after one second, extend, then done() all", async () => {
            const pool = new mindServer.staticPool(2, 1)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(2);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            let session = await pool.getSession()
            const dir = await session.fs.isDir('/opt')
            const session2 = await pool.getSession()
            const session3 = await pool.getSession()

            setTimeout(async () => {
                session.done()
                session = null

            }, 1000)

            const session4 = await pool.getSession()

            session2.done()
            session3.done()
            session4.done()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(2);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            pool.destroy()
        })

        it("get 4 session, done() one after 5 seconds, tryo to get session with 1 sec timeout, should error out", async () => {
            const pool = new mindServer.staticPool(2, 1)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(2);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            let session = await pool.getSession()
            const dir = await session.fs.isDir('/opt')
            const session2 = await pool.getSession()
            const session3 = await pool.getSession()

            setTimeout(async () => {
                session.done()
                session = null

            }, 5000)

            try {
                const session4 = await pool.getSession(1000)

            } catch (err) {
                expect(err.message).to.have.string('timeout expired while trying to get a session')
            }

            pool.destroy()
        })

        it("get 4 session, done() one after 5 seconds, try to get session with 1 sec timeout, check timeoutExpired prop", async () => {
            const pool = new mindServer.staticPool(2, 1)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(2);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            let session = await pool.getSession()
            const session2 = await pool.getSession()
            const session3 = await pool.getSession()

            setTimeout(async () => {
                session.done()
                session = null

            }, 5000)

            try {
                const session4 = await pool.getSession(1000)

            } catch (err) {
                expect(err.message).to.have.string('timeout expired while trying to get a session')

                expect(pool.stats.timeoutExpired).to.be.greaterThan(0)
            }

            pool.destroy()
        })

        it("small pool, no extension, randomly get and release sessions, trigger some waitHits in stats", async () => {
            const pool = new mindServer.staticPool(2)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }

            let max1 = 100
            let max2 = 100
            let max3 = 100
            let max4 = 100

            const int1 = setInterval((async () => {
                max1--

                if (max1 === 0) {
                    clearInterval(int1)

                    return
                }

                const session = await pool.getSession()

                try {
                    const cwd = await session.process.cwdGet()

                } catch (err) {
                    console.log(err.message)
                }
                session.done()

            }), getRandomInt(5) * 10)

            const int2 = setInterval((async () => {
                max2--

                if (max2 === 0) {
                    clearInterval(int2)

                    return
                }

                const session = await pool.getSession()

                try {
                    const cwd = await session.process.cwdGet()

                } catch (err) {
                    console.log(err.message)
                }
                session.done()

            }), getRandomInt(10) * 10)

            const int3 = setInterval((async () => {
                max3--

                if (max3 === 0) {
                    clearInterval(int3)

                    return
                }

                const session = await pool.getSession()
                try {
                    const cwd = await session.process.cwdGet()

                } catch (err) {
                    console.log(err.message)
                }
                session.done()

            }), getRandomInt(10) * 10)

            const int4 = setInterval((async () => {
                max4--

                if (max4 === 0) {
                    clearInterval(int4)

                    return
                }

                const session = await pool.getSession()
                try {
                    const cwd = await session.process.cwdGet()

                } catch (err) {
                    console.log(err.message)
                }
                session.done()

            }), getRandomInt(10) * 10)

            await sleep(6000)

            clearInterval(int1)
            clearInterval(int2)
            clearInterval(int3)
            clearInterval(int4)

            pool.destroy()

            const status = pool.getStatus()

            expect(status.sessionsInUse).to.be.equal(0);
            expect(status.stats.sessionsCreatedOk).to.be.greaterThan(0)
            expect(status.stats.extendsCreatedOk).to.be.equal(0)
            expect(status.stats.noMoreSlotsHits).to.be.greaterThan(0)
        })

        it("small pool, with extension, randomly get and release sessions, trigger some waitHits in stats", async () => {
            let pool = new mindServer.staticPool(2, 20)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }

            let max1 = 150
            let max2 = 150
            let max3 = 150
            let max4 = 150

            const int1 = setInterval((async () => {
                max1--

                if (max1 === 0) {
                    clearInterval(int1)

                    return
                }

                const session = await pool.getSession()

                try {
                    const cwd = await session.process.cwdGet()

                } catch (err) {
                    console.log(err.message)
                }
                session.done()

            }), getRandomInt(5) * 10)

            const int2 = setInterval((async () => {
                max2--

                if (max2 === 0) {
                    clearInterval(int2)

                    return
                }

                const session = await pool.getSession()

                try {
                    const cwd = await session.process.cwdGet()

                } catch (err) {
                    console.log(err.message)
                }
                session.done()

            }), getRandomInt(10) * 10)

            const int3 = setInterval((async () => {
                max3--

                if (max3 === 0) {
                    clearInterval(int3)

                    return
                }

                const session = await pool.getSession()
                try {
                    const cwd = await session.process.cwdGet()

                } catch (err) {
                    console.log(err.message)
                }
                session.done()

            }), getRandomInt(10) * 10)

            const int4 = setInterval((async () => {
                max4--

                if (max4 === 0) {
                    clearInterval(int4)

                    return
                }

                const session = await pool.getSession()
                try {
                    const cwd = await session.process.cwdGet()

                } catch (err) {
                    console.log(err.message)
                }
                session.done()

            }), getRandomInt(10) * 10)

            await sleep(9000)

            clearInterval(int1)
            clearInterval(int2)
            clearInterval(int3)
            clearInterval(int4)

            pool.destroy()

            const status = pool.getStatus()

            expect(status.sessionsInUse).to.be.equal(0);
            expect(status.stats.sessionsCreatedOk).to.be.greaterThan(0)
            expect(status.stats.extendsCreatedOk).to.be.greaterThan(0)
            expect(status.stats.noMoreSlotsHits).to.be.equal(0)
            expect(status.stats.extendsRemoved).to.be.equal(status.stats.extendsCreatedOk)
        })
    })
})