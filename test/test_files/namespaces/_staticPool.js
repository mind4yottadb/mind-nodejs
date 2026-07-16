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

        ydb.db.globals.addName('_mindSessions')

        const val = await ydb.db.globals._mindSessions._('pools', pool.guid, "pids").findNext()
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
                await mind._staticPool._changeServerSetting('logLevel', [1, 2, 3, 4])
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

        it("with 2 pools", async function () {
            const pool1 = new mindServer.staticPool(2)
            const pool2 = new mindServer.staticPool(2)

            await pool1.create('127.0.0.1', 10000, 'admin', 'admin')
            await pool2.create('127.0.0.1', 10000, 'admin', 'admin')

            const mind1 = await pool1.devOps._getDevOpsSession()
            const mind2 = await pool2.devOps._getDevOpsSession()

            try {
                await mind1._staticPool._changeServerSetting('logLevel', 3)
                const settings = await pool1.sessions[0].session.session.getCurrentSettings()
                expect(settings.logLevel).to.be.equal(3)

                await mind2._staticPool._changeServerSetting('logLevel', 3)
                const settings2 = await pool2.sessions[0].session.session.getCurrentSettings()
                expect(settings2.logLevel).to.be.equal(3)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool1.destroy()
            pool2.destroy()
        });

        it("with 4 pools", async function () {
            const pool1 = new mindServer.staticPool(2)
            const pool2 = new mindServer.staticPool(2)
            const pool3 = new mindServer.staticPool(2)
            const pool4 = new mindServer.staticPool(2)

            await pool1.create('127.0.0.1', 10000, 'admin', 'admin')
            await pool2.create('127.0.0.1', 10000, 'admin', 'admin')
            await pool3.create('127.0.0.1', 10000, 'admin', 'admin')
            await pool4.create('127.0.0.1', 10000, 'admin', 'admin')

            const mind1 = await pool1.devOps._getDevOpsSession()
            const mind2 = await pool2.devOps._getDevOpsSession()
            const mind3 = await pool3.devOps._getDevOpsSession()
            const mind4 = await pool4.devOps._getDevOpsSession()

            try {
                await mind1._staticPool._changeServerSetting('logLevel', 3)
                const settings = await pool1.sessions[0].session.session.getCurrentSettings()
                expect(settings.logLevel).to.be.equal(3)

                await mind2._staticPool._changeServerSetting('logLevel', 3)
                const settings2 = await pool2.sessions[0].session.session.getCurrentSettings()
                expect(settings2.logLevel).to.be.equal(3)

                await mind3._staticPool._changeServerSetting('logLevel', 3)
                const settings3 = await pool3.sessions[0].session.session.getCurrentSettings()
                expect(settings3.logLevel).to.be.equal(3)

                await mind4._staticPool._changeServerSetting('logLevel', 3)
                const settings4 = await pool4.sessions[0].session.session.getCurrentSettings()
                expect(settings4.logLevel).to.be.equal(3)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool1.destroy()
            pool2.destroy()
            pool3.destroy()
            pool4.destroy()
        });

        it("pool of 8, verify all processes", async function () {
            const pool = new mindServer.staticPool(8)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel', 3)

                for (let ix = 0; ix < pool.sessions.length - 1; ix++) {
                    const settings = await pool.sessions[ix].session.session.getCurrentSettings()
                    expect(settings.logLevel).to.be.equal(3)
                }

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("pool of 16, verify all processes", async function () {
            const pool = new mindServer.staticPool(16)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel', 3)

                for (let ix = 0; ix < pool.sessions.length - 1; ix++) {
                    const settings = await pool.sessions[ix].session.session.getCurrentSettings()
                    expect(settings.logLevel).to.be.equal(3)
                }

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("pool of 32, verify all processes", async function () {
            const pool = new mindServer.staticPool(32)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')
            const mind = await pool.devOps._getDevOpsSession()

            try {
                await mind._staticPool._changeServerSetting('logLevel', 3)

                for (let ix = 0; ix < pool.sessions.length - 1; ix++) {
                    const settings = await pool.sessions[ix].session.session.getCurrentSettings()
                    expect(settings.logLevel).to.be.equal(3)
                }

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });
    })

    describe("_resetSettings.", async () => {
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

    })
})
