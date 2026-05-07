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

describe("uApi app server-code with so", async () => {
    it("verify that function in .so executes", async () => {

        const ydb = await createYdbInstance('hooks-and-code')

        const ret = await ydb.soTest.shouldReturn1()
        expect(ret).to.be.equal(1)

        ydb.disconnect()
    });

    it("verify that function in .so executes", async () => {

        const ydb = await createYdbInstance('hooks-and-code')

        ydb.db.globals.addName('_mindSo')
        await ydb.db.globals._mindSo.killTree()

        await ydb.soTest.onInit()

        const ret = await ydb.db.globals._mindSo.getValue()
        expect(ret).to.be.equal(1)

        ydb.disconnect()
    });

    it("verify that function in .so executes", async () => {

        const ydb = await createYdbInstance('hooks-and-code')

        ydb.db.globals.addName('_mindSo')
        await ydb.db.globals._mindSo.killTree()

        await ydb.soTest.onTerminate()

        const ret = await ydb.db.globals._mindSo.getValue()
        expect(ret).to.be.equal(0)

        ydb.disconnect()
    });

    it("verify that function in .so executes", async () => {

        const ydb = await createYdbInstance('hooks-and-code')

        ydb.db.globals.addName('_mindSo')
        await ydb.db.globals._mindSo.killTree()

        await ydb.soTest.onError()

        const ret = await ydb.db.globals._mindSo.getValue()
        expect(ret).to.be.equal(2)

        ydb.disconnect()
    });
})