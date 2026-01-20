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

const {expect} = require("chai");
const {createYdbInstance} = require("../utils.cjs");

describe("global.hasValue()", async () => {
    it("test a valid global root", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest.hasValue()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid global root", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTestEmptyRoot.hasValue()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("test a valid global root", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest._().hasValue()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid global root", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTestEmptyRoot._().hasValue()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("test a valid global", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest._(1, 2, 3, 4, 7).hasValue()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid global", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest._(1, 2, 3, 4, 5).hasValue()
        expect(res).to.be.false

        ydb.disconnect()
    });
})

describe("global.hasNodes()", async () => {
    it("test a valid global root", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid global root", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTestEmptyRoot.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid global", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest._(1, 2, 4).hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("test a valid global", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest._(1, 2, 3, 4).hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });
})

describe("global.getValue()", async () => {
    it("test a valid global root number", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest.getValue()
        expect(typeof res).to.have.string('number')

        ydb.disconnect()
    });

    it("test a valid global string", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest._(1, 2, 3, 4, 5, 6).getValue()
        expect(typeof res).to.have.string('string')
        expect(res).to.have.string('this is a string')

        ydb.disconnect()
    });

    it("test an invalid global path", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest._(1, 2, "this is bad", 4, 5, 6).getValue()
        expect(typeof res).to.have.string('string')
        expect(res).to.have.string('')

        ydb.disconnect()
    });
})

describe("global.readValue()", async () => {
    it("test a valid global root number", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest.readValue()
        expect(typeof res).to.have.string('number')

        ydb.disconnect()
    });

    it("test a valid global string", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.globals.globalTest._(1, 2, 3, 4, 5, 6).readValue()
        expect(typeof res).to.have.string('string')
        expect(res).to.have.string('this is a string')

        ydb.disconnect()
    });

    it("test a bad path global", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.db.globals.globalTest._(1, 2, 67, 4, 5, 6).readValue()
            expect(typeof res).to.have.string('string')
            expect(res).to.have.string('this is a string')
        } catch (err) {
            expect(err.message).to.contain('^globalTest(1,2,67,4,5,6): path not found')
        }
        ydb.disconnect()
    });
})

describe("global.killValue()", async () => {
    it("ensure no nodes are killed on root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue(1)
        await ydb.db.globals.temp._(1, 2, 3).setValue(1)
        await ydb.db.globals.temp.killValue()
        res = await ydb.db.globals.temp.hasValue()
        expect(res).to.be.false
        res = await ydb.db.globals.temp.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("kill non existing node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp._(3).killValue()
        res = await ydb.db.globals.temp._(3).hasValue()
        expect(res).to.be.false
        res = await ydb.db.globals.temp._(93).hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("ensure no nodes are killed on root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue(1)
        await ydb.db.globals.temp._(1, 2, 3).setValue(1)
        await ydb.db.globals.temp.killValue()
        res = await ydb.db.globals.temp.hasValue()
        expect(res).to.be.false
        res = await ydb.db.globals.temp.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

})