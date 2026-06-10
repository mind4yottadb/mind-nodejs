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

describe("_staticPool.", async () => {
    it("_register()", async () => {

        const ydb = await createYdbInstance()
        const pool = new mindServer.staticPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        expect(pool.guid !== '').to.be.true

        ydb.db.globals.addName('_mindPools')

        const val = await ydb.db.globals._mindPools._(pool.guid, "pids").findNext()
        expect(typeof val).to.have.string('number')

        pool.destroy()

        ydb.disconnect()
    });

    it("getPoolStats(): 2 procs", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const val = await pool.devOps.getPoolStats()

        expect(val.length).to.equal(2)

        pool.destroy()
    });

    it("getPoolStats(): 8 procs", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(8)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const val = await pool.devOps.getPoolStats()

        expect(val.length).to.equal(8)

        pool.destroy()
    });

    it("getPoolStats(): 16 procs + extension", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(16, 2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const val = await pool.devOps.getPoolStats()

        expect(val.length).to.equal(16)

        pool.destroy()
    });

    it("getPoolStats(): 32 procs", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(32)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const val = await pool.devOps.getPoolStats()

        expect(val.length).to.equal(32)

        pool.destroy()
    });

    it("getPoolStats(): validate all fields", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const ret = await pool.devOps.getPoolStats()
        expect(ret[0].cpu.cstime !== undefined).to.be.true
        expect(ret[0].cpu.cutime !== undefined).to.be.true
        expect(ret[0].cpu.stime !== undefined).to.be.true
        expect(ret[0].cpu.utime !== undefined).to.be.true

        expect(ret[0].memory.VmHWM !== undefined).to.be.true
        expect(ret[0].memory.VmLck !== undefined).to.be.true
        expect(ret[0].memory.VmPeak !== undefined).to.be.true
        expect(ret[0].memory.VmRss !== undefined).to.be.true
        expect(ret[0].memory.VmSize !== undefined).to.be.true

        expect(ret[0].pid !== undefined).to.be.true
        expect(ret[0].state !== undefined).to.be.true

        pool.destroy()
    });

    describe("_changeServerSettings.", async () => {
        it("pool not initialized", async function () {
            const pool = new mindServer.staticPool(2)

            try {
                const mind = await pool.devOps._getDevOpsSession()
                await mind._staticPool._changeServerSetting()

                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
            }
        });

        it("with no params", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting()
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_STRING')
            }

            pool.destroy()
        });

        it("with number as first param", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting(32)
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_STRING')
            }

            pool.destroy()
        });

        it("with boolean as first param", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting(true)
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_STRING')
            }

            pool.destroy()
        });

        it("with null as first param", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting(null)
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_STRING')
            }

            pool.destroy()
        });

        it("with object as first param", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting({a: 2})
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_STRING')
            }

            pool.destroy()
        });

        it("with array as first param", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting([1, 2, 3])
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_STRING')
            }

            pool.destroy()
        });

        it("with valid name param", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel')
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with valid name param,string as value", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel', 'high')
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with valid name param, boolean as value", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel', true)
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with valid name param, null as value", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel', null)
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with valid name param, object as value", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel', {a: 4})
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with valid name param, array as value", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel'[1, 2, 3, 4])
                expect(1 === 2).to.be.true

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with valid name param, valid value", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel', 3)

                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.logLevel).to.be.equal(3)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });
    })
})