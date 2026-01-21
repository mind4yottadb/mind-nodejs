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

describe("globals.hasValue()", async () => {
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

describe("globals.hasNodes()", async () => {
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

describe("globals.getValue()", async () => {
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

describe("globals.readValue()", async () => {
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

describe("globals.killValue()", async () => {
    it("ensure no nodes are killed on root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue(1)
        await ydb.db.globals.temp._(1, 2, 3).setValue(1)
        await ydb.db.globals.temp.killValue()
        let res = await ydb.db.globals.temp.hasValue()
        expect(res).to.be.false
        res = await ydb.db.globals.temp.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("kill non existing node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp._(3).killValue()
        let res = await ydb.db.globals.temp._(3).hasValue()
        expect(res).to.be.false
        res = await ydb.db.globals.temp._(93).hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("ensure no nodes are killed", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue(1)
        await ydb.db.globals.temp._(1, 2, 3).setValue(1)
        await ydb.db.globals.temp._(1, 2).setValue(12)
        await ydb.db.globals.temp._(1, 2).killValue()

        let res = await ydb.db.globals.temp._(1, 2).hasValue()
        expect(res).to.be.false
        res = await ydb.db.globals.temp._(1, 2).hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });
})

describe("globals.killTree()", async () => {
    it("ensure all nodes are killed on root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue(1)
        await ydb.db.globals.temp._(1, 2, 3).setValue(1)
        await ydb.db.globals.temp.killTree()
        let res = await ydb.db.globals.temp.hasValue()
        expect(res).to.be.false
        res = await ydb.db.globals.temp.hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("ensure all nodes are killed ", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue(1)
        await ydb.db.globals.temp._(1, 2, 3).setValue(1)
        await ydb.db.globals.temp._(1, 4, 3).setValue(1)
        await ydb.db.globals.temp._(1, 2).killTree()
        let res = await ydb.db.globals.temp._(1, 2).hasValue()
        expect(res).to.be.false
        res = await ydb.db.globals.temp._(1, 2).hasNodes()
        expect(res).to.be.false
        res = await ydb.db.globals.temp._(1).hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });
})

describe("globals.getPiece()", async () => {
    it("get piece of non existing node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        let res = await ydb.db.globals.temp.getPiece()
        expect(res.length === 0).to.be.true

        ydb.disconnect()
    });

    it("get piece of existing node w/default separator", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue('piece1^piece2^piece3^piece4^piece5^piece6')
        let res = await ydb.db.globals.temp.getPiece('^', 2)
        expect(res).to.contain('piece2')

        ydb.disconnect()
    });

    it("get piece of existing node w/default separator and end", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue('piece1^piece2^piece3^piece4^piece5^piece6')
        let res = await ydb.db.globals.temp.getPiece('^', 2, 4)
        expect(res).to.contain('piece2^piece3^piece4')

        ydb.disconnect()
    });

    it("get piece of existing node w/different separator", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.globals.temp.getPiece(',', 2)
        expect(res).to.contain('piece2')

        ydb.disconnect()
    });

    it("get piece of existing node w/different separator and end", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.globals.temp.getPiece(',', 2, 4)
        expect(res).to.contain('piece2,piece3,piece4')

        ydb.disconnect()
    });

    it("get piece of existing node w/bad separator", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.globals.temp.getPiece('^', 2)
        expect(res.length === 0).to.be.true

        ydb.disconnect()
    });

    it("get piece of existing node w/bad separator", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.globals.temp.getPiece()
        expect(res).to.contain('piece1,piece2,piece3,piece4,piece5,piece6')

        ydb.disconnect()
    });
})

describe("globals.setValue()", async () => {
    it("pass an array instead on number or string", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setValue([1, 4, 5])
        } catch (err) {
            expect(err.message).to.contain('data must be either a string or a number')
        }
        ydb.disconnect()
    });

    it("pass an object instead on number or string", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setValue({test: 34})
        } catch (err) {
            expect(err.message).to.contain('data must be either a string or a number')
        }
        ydb.disconnect()
    });

    it("set empty string value of root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue()
        let res = await ydb.db.globals.temp.getValue()
        expect(res.length === 0).to.be.true

        ydb.disconnect()
    });

    it("set string value of root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue('This is value for the test global')
        let res = await ydb.db.globals.temp.getValue()
        expect(res).to.contain('This is value for the test global')

        ydb.disconnect()
    });

    it("set number value of root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setValue(12.34)
        let res = await ydb.db.globals.temp.getValue()
        expect(typeof res).to.contain('number')
        expect(res === 12.34).to.be.true

        ydb.disconnect()
    });

    it("set string value of node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp._('p1', 23).setValue('This is value for the test global')
        let res = await ydb.db.globals.temp._('p1', 23).getValue()
        expect(res).to.contain('This is value for the test global')

        ydb.disconnect()
    });

    it("set number value of node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp._('p1', 23).setValue(12.34)
        let res = await ydb.db.globals.temp._('p1', 23).getValue()
        expect(typeof res).to.contain('number')
        expect(res === 12.34).to.be.true

        ydb.disconnect()
    });
})

describe("globals.setPiece()", async () => {
    it("set piece of non existing node with empty string", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setPiece('', ',', 3)
        const res = await ydb.db.globals.temp.getValue()
        expect(res).to.contain(',,')

        ydb.disconnect()
    });

    it("set piece of non existing node with string", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setPiece('my string', ',', 3)
        const res = await ydb.db.globals.temp.getValue()
        expect(res).to.contain(',,my string')

        ydb.disconnect()
    });

    it("set piece of existing node with string", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setPiece('aaa', ',', 3)
        await ydb.db.globals.temp.setPiece('bbb', ',', 9)
        const res = await ydb.db.globals.temp.getValue()
        expect(res).to.contain(',,aaa,,,,,,bbb')

        ydb.disconnect()
    });
})

