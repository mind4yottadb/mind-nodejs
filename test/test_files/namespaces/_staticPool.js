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

        ydb.db.globals.addName('_mindPools')

        const val = await ydb.db.globals._mindPools._(pool.guid, "pids").findNext()
        expect(typeof val).to.have.string('number')

        pool.destroy()

        ydb.disconnect()
    });

    it("_staticPool.getPoolStats()", async function () {
        this.timeout(20000)

        const pool = new mindServer.staticPool(32)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const val = await pool.devOps.getPoolStats()

        expect(val.length).to.equal(32)

        pool.destroy()

    });
})