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
const {createYdbInstance} = require("../../utils.cjs");
const mindServer = require("../../../js");

describe("_staticPool.", async () => {
    it("_staticPool._register()", async () => {

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

    it("_staticPool.getPoolStats(): 2 procs", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const val = await pool.devOps.getPoolStats()

        expect(val.length).to.equal(2)

        pool.destroy()
    });

    it("_staticPool.getPoolStats(): 8 procs", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(8)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const val = await pool.devOps.getPoolStats()

        expect(val.length).to.equal(8)

        pool.destroy()
    });

    it("_staticPool.getPoolStats(): 16 procs + extension", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(16, 2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const val = await pool.devOps.getPoolStats()

        expect(val.length).to.equal(16)

        pool.destroy()
    });

    it("_staticPool.getPoolStats(): 32 procs", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(32)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const val = await pool.devOps.getPoolStats()

        expect(val.length).to.equal(32)

        pool.destroy()
    });

    it("_staticPool.getPoolStats(): validate all fields", async function () {
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
})