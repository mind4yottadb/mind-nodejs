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

const {exit} = require('process')
const {expect} = require("chai");
const {createYdbInstance, sleep} = require("../../utils.cjs");
const mindServer = require("../../../js");

describe("Pool static: creation / destroy", async () => {
    describe("Pool creation: size", async () => {
        it("with no param at all", async () => {
            try {
                const pool = new mindServer.staticPool()

            } catch (err) {
                expect(err.message).to.have.string('Missing pool size')
            }
        });

        it("with string as pool size", async () => {
            try {
                const pool = new mindServer.staticPool('test')

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with boolean as pool size", async () => {
            try {
                const pool = new mindServer.staticPool(false)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with null as pool size", async () => {
            try {
                const pool = new mindServer.staticPool(null)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with object as pool size", async () => {
            try {
                const pool = new mindServer.staticPool({test: 12})

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with number < 2", async () => {
            try {
                const pool = new mindServer.staticPool(1)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be at least 2')
            }
        });

        it("with number < 2", async () => {
            try {
                const pool = new mindServer.staticPool(-23)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be at least 2')
            }
        });
    })

    describe("Pool creation: extend", async () => {
        it("with string as extend size", async () => {
            try {
                const pool = new mindServer.staticPool(64, 'test')

            } catch (err) {
                expect(err.message).to.have.string('Pool extension must be a number')
            }
        });

        it("with number < 1", async () => {
            try {
                const pool = new mindServer.staticPool(64, -2)

            } catch (err) {
                expect(err.message).to.have.string('Pool extension must be at least 1')
            }
        });
    })

    describe("Pool creation: create()", async () => {
        it("invalid, missing parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create()

            } catch (err) {
                expect(err.message).to.have.string('host must be a string')
            }
        })

        it("invalid, missing parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost')

            } catch (err) {
                expect(err.message).to.have.string('port must be a number')
            }
        })

        it("invalid, missing parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost', 100)

            } catch (err) {
                expect(err.message).to.have.string('username must be a string')
            }
        })

        it("invalid, missing password parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost', 100, "user")

            } catch (err) {
                expect(err.message).to.have.string('password must be a string')
            }
        })

        it("invalid, missing password parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost', 100, "user", "pass", "options")

            } catch (err) {
                expect(err.message).to.have.string('options must be an object')
            }
        })


        it("invalid, with no extension", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('127.0.0.1', 10000, 'admin', 'admin2', {})

            } catch (err) {
                expect(err.message).to.have.string('LOGIN_FAILED,Invalid credentials')
            }
        })

        it("valid, with no extension", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);

            pool.destroy()
        });

        it("valid, with extension", async () => {
            const pool = new mindServer.staticPool(8, 4)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(8);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);

            pool.destroy()
        });

        it("validate devOps session", async () => {
            const pool = new mindServer.staticPool(8, 4)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

            expect(pool.devOps.session.server !== undefined).to.be.true
            expect(typeof pool.devOps.session.done === 'function').to.be.true

            pool.destroy()
        });
    })

    describe("Pool creation: destroy()", async () => {
        it("with not initialized pool", async () => {
            const pool = new mindServer.staticPool(8, 4)

            try {
                pool.destroy()
            } catch (err) {
                expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
            }
        })

        it("valid", async () => {
            const pool = new mindServer.staticPool(8, 4)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(8);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);

            pool.destroy()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })
    })

    describe("Pool creation: rundown()", async function () {
        this.timeout(30000)
        it("with not initialized pool", async () => {
            const pool = new mindServer.staticPool(8, 4)

            try {
                pool.rundown()
            } catch (err) {
                expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
            }
        })

        it("valid (3) with nothing executing", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);

            await pool.rundown()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("valid (24) with nothing executing", async () => {
            const pool = new mindServer.staticPool(24)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(24);

            await pool.rundown()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("valid (3) with timed locks executing", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);

            const session1 = await pool.getSession()
            const session2 = await pool.getSession()

            session1.db.globals.addName('test')
            session2.db.globals.addName('test')

            await session1.db.globals.test.addLock()

            setTimeout(async () => {
                await pool.rundown()

            }, 1000)

            await session2.db.globals.test.addLock(3)

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("with not initialized pool", async () => {
            const pool = new mindServer.staticPool(8, 4)

            try {
                pool.rundown()
            } catch (err) {
                expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
            }
        })

        it("valid (3,3) with nothing executing", async () => {
            const pool = new mindServer.staticPool(3, 3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);

            await pool.rundown()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("valid (24,3) with nothing executing", async () => {
            const pool = new mindServer.staticPool(24)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(24, 3);

            await pool.rundown()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("valid (3,3) with timed locks executing", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3, 3);

            const session1 = await pool.getSession()
            const session2 = await pool.getSession()

            session1.db.globals.addName('test')
            session2.db.globals.addName('test')

            await session1.db.globals.test.addLock()

            setTimeout(async () => {
                await pool.rundown()

            }, 1000)

            await session2.db.globals.test.addLock(3)

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })
    })

    describe("Enumerable pool structure ", async function () {
        this.timeout(30000)

        it("before init", async () => {
            const pool = new mindServer.staticPool(2, 2)
            const struct = JSON.parse(JSON.stringify(pool))

            expect(typeof struct.stats === 'undefined').to.be.true
            expect(typeof struct.devOps.session === 'undefined').to.be.true
            expect(typeof struct.devOps.sessionInUse === 'undefined').to.be.true

            pool.rundown()
        })

        it("after init", async () => {
            const pool = new mindServer.staticPool(2, 2)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

            const struct = JSON.parse(JSON.stringify(pool))

            expect(typeof struct.stats === 'undefined').to.be.true
            expect(typeof struct.devOps.session === 'undefined').to.be.true
            expect(typeof struct.devOps.sessionInUse === 'undefined').to.be.true

            pool.rundown()
        })
    })
})

describe("getStatus()", async () => {
    it("check info fields", async function () {
        const pool = new mindServer.staticPool(2)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(typeof status.GUID).to.have.string('string')
        expect(status.GUID.length).to.be.equal(36)

        expect(status.host).to.have.string('127.0.0.1')
        expect(status.port).to.be.equal(10000)
        expect(status.username).to.have.string('admin')
        expect(typeof status.options).to.have.string('object')
        expect(status.initialized).to.be.true

        pool.destroy()
    });

    it("check info fields for not initialized", async function () {
        const pool = new mindServer.staticPool(2)
        //await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(status.GUID).to.have.string('')
        expect(status.host).to.have.string('')
        expect(status.port).to.be.equal(0)
        expect(typeof status.options).to.have.string('object')
        expect(status.initialized).to.be.false
    });

    it("check size fields 1", async function () {
        const pool = new mindServer.staticPool(2)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(status.size).to.be.equal(2)
        expect(status.extensions).to.be.equal(0)
        expect(status.sessionsTotal).to.be.equal(2)
        expect(status.sessionsExtendedInUse).to.be.equal(0)
        expect(status.sessionsInUse).to.be.equal(0)

        pool.destroy()
    });

    it("check size fields 2", async function () {
        const pool = new mindServer.staticPool(5, 3)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(status.size).to.be.equal(5)
        expect(status.extensions).to.be.equal(3)
        expect(status.sessionsTotal).to.be.equal(5)
        expect(status.sessionsExtendedInUse).to.be.equal(0)
        expect(status.sessionsInUse).to.be.equal(0)

        pool.destroy()
    });

    it("check stats", async function () {
        const pool = new mindServer.staticPool(5, 3)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(status.stats.sessionsCreatedOk).to.be.equal(0)
        expect(status.stats.sessionsCreatedInError).to.be.equal(0)
        expect(status.stats.sessionsPeak).to.be.equal(0)
        expect(status.stats.sessionsDone).to.be.equal(0)
        expect(status.stats.extendsCreatedOk).to.be.equal(0)
        expect(status.stats.extendsCreatedInError).to.be.equal(0)
        expect(status.stats.extendsRemoved).to.be.equal(0)
        expect(status.stats.extendsPeak).to.be.equal(0)
        expect(status.stats.extendsDone).to.be.equal(0)
        expect(status.stats.noMoreSlotsHits).to.be.equal(0)
        expect(status.stats.noMoreSlotsHitsResolved).to.be.equal(0)
        expect(status.stats.timeoutExpired).to.be.equal(0)
        expect(status.stats.remoteDisconnects).to.be.equal(0)

        pool.destroy()
    });

    it("check stats with formatted numbers", async function () {
        const pool = new mindServer.staticPool(5, 3)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus(true)

        expect(typeof status.stats.sessionsCreatedOk).to.be.equal('string')
        expect(typeof status.stats.sessionsCreatedInError).to.be.equal('string')
        expect(typeof status.stats.sessionsPeak).to.be.equal('string')
        expect(typeof status.stats.sessionsDone).to.be.equal('string')
        expect(typeof status.stats.extendsCreatedOk).to.be.equal('string')
        expect(typeof status.stats.extendsCreatedInError).to.be.equal('string')
        expect(typeof status.stats.extendsRemoved).to.be.equal('string')
        expect(typeof status.stats.extendsPeak).to.be.equal('string')
        expect(typeof status.stats.extendsDone).to.be.equal('string')
        expect(typeof status.stats.noMoreSlotsHits).to.be.equal('string')
        expect(typeof status.stats.noMoreSlotsHitsResolved).to.be.equal('string')
        expect(typeof status.stats.timeoutExpired).to.be.equal('string')
        expect(typeof status.stats.remoteDisconnects).to.be.equal('string')

        pool.destroy()
    });
})