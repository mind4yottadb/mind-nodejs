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

describe("vars.hasValue()", async () => {
    it("test a valid var root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.setValue(23)
        const res = await ydb.db.vars.uVars.hasValue()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid var root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._(23).setValue(23)
        const res = await ydb.db.vars.uVars.hasValue()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("test a valid var root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.setValue(23)
        const res = await ydb.db.vars.uVars._().hasValue()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid var root", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.vars.uVars._('').hasValue()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("test a valid var", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._(1, 2, 3, 4, 7).setValue(23)
        const res = await ydb.db.vars.uVars._(1, 2, 3, 4, 7).hasValue()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid global", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.vars.uVars._(1, 2, 3, 4, 5).hasValue()
        expect(res).to.be.false

        ydb.disconnect()
    });
})

describe("vars.hasNodes()", async () => {
    it("test a valid var root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._(23).setValue(23)
        const res = await ydb.db.vars.uVars.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid var root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._(23).setValue(23)
        const res = await ydb.db.vars.uVars.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid global", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.vars.uVars._(1, 2, 4).hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("test a valid global", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._(1, 2, 3, 4, 5).setValue(23)
        const res = await ydb.db.vars.uVars._(1, 2, 3, 4).hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });
})

describe("vars.getValue()", async () => {
    it("test a valid var root number", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._().setValue(23)
        const res = await ydb.db.vars.uVars.getValue()
        expect(typeof res).to.have.string('number')

        ydb.disconnect()
    });

    it("test a valid var string", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._(1, 2, 3, 4, 5, 6).setValue('this is a string')
        const res = await ydb.db.vars.uVars._(1, 2, 3, 4, 5, 6).getValue()
        expect(typeof res).to.have.string('string')
        expect(res).to.have.string('this is a string')

        ydb.disconnect()
    });

    it("test an invalid var path", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.db.vars.uVars._(1, 2, "this is bad", 4, 5, 6).getValue()
        expect(typeof res).to.have.string('string')
        expect(res).to.have.string('')

        ydb.disconnect()
    });
})

describe("vars.readValue()", async () => {
    it("test a valid var root number", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._().setValue(23)
        const res = await ydb.db.vars.uVars.readValue()
        expect(typeof res).to.have.string('number')

        ydb.disconnect()
    });

    it("test a valid var string", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._(1, 2, 3, 4, 5, 6).setValue('this is a string')
        const res = await ydb.db.vars.uVars._(1, 2, 3, 4, 5, 6).readValue()
        expect(typeof res).to.have.string('string')
        expect(res).to.have.string('this is a string')

        ydb.disconnect()
    });

    it("test a bad path global", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.db.vars.uVars._(1, 2, 67, 4, 5, 6).readValue()
            expect(typeof res).to.have.string('string')
            expect(res).to.have.string('this is a string')
        } catch (err) {
            expect(err.message).to.contain('uVars(1,2,67,4,5,6): path not found')
        }
        ydb.disconnect()
    });
})

describe("vars.killValue()", async () => {
    it("ensure no nodes are killed on root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars._().setValue(1)
        await ydb.db.vars.uVars._(1, 2, 3).setValue(1)
        await ydb.db.vars.uVars._().killValue()
        let res = await ydb.db.vars.uVars.hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.uVars.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("kill non existing node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars._(3).killValue()
        let res = await ydb.db.vars.uVars._(3).hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.uVars._(93).hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("ensure no nodes are killed", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue(1)
        await ydb.db.vars.uVars._(1, 2, 3).setValue(1)
        await ydb.db.vars.uVars._(1, 2).setValue(12)
        await ydb.db.vars.uVars._(1, 2).killValue()

        let res = await ydb.db.vars.uVars._(1, 2).hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.uVars._(1, 2).hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });
})

describe("vars.killTree()", async () => {
    it("ensure all nodes are killed on root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue(1)
        await ydb.db.vars.uVars._(1, 2, 3).setValue(1)
        await ydb.db.vars.uVars.killTree()
        let res = await ydb.db.vars.uVars.hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.uVars.hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("ensure all nodes are killed ", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue(1)
        await ydb.db.vars.uVars._(1, 2, 3).setValue(1)
        await ydb.db.vars.uVars._(1, 4, 3).setValue(1)
        await ydb.db.vars.uVars._(1, 2).killTree()
        let res = await ydb.db.vars.uVars._(1, 2).hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.uVars._(1, 2).hasNodes()
        expect(res).to.be.false
        res = await ydb.db.vars.uVars._(1).hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });
})

describe("vars.getPiece()", async () => {
    it("get piece of non existing node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        let res = await ydb.db.vars.uVars.getPiece()
        expect(res.length === 0).to.be.true

        ydb.disconnect()
    });

    it("get piece of existing node w/default separator", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue('piece1^piece2^piece3^piece4^piece5^piece6')
        let res = await ydb.db.vars.uVars.getPiece('^', 2)
        expect(res).to.contain('piece2')

        ydb.disconnect()
    });

    it("get piece of existing node w/default separator and end", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue('piece1^piece2^piece3^piece4^piece5^piece6')
        let res = await ydb.db.vars.uVars.getPiece('^', 2, 4)
        expect(res).to.contain('piece2^piece3^piece4')

        ydb.disconnect()
    });

    it("get piece of existing node w/different separator", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.vars.uVars.getPiece(',', 2)
        expect(res).to.contain('piece2')

        ydb.disconnect()
    });

    it("get piece of existing node w/different separator and end", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.vars.uVars.getPiece(',', 2, 4)
        expect(res).to.contain('piece2,piece3,piece4')

        ydb.disconnect()
    });

    it("get piece of existing node w/bad separator", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.vars.uVars.getPiece('^', 2)
        expect(res.length === 0).to.be.true

        ydb.disconnect()
    });

    it("get piece of existing node w/bad separator", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.vars.uVars.getPiece()
        expect(res).to.contain('piece1,piece2,piece3,piece4,piece5,piece6')

        ydb.disconnect()
    });
})

describe("vars.setValue()", async () => {
    it("pass an array instead on number or string", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.vars.uVars.killTree()
            await ydb.db.vars.uVars.setValue([1, 4, 5])
        } catch (err) {
            expect(err.message).to.contain('data must be either a string or a number')
        }
        ydb.disconnect()
    });

    it("pass an object instead on number or string", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.vars.uVars.killTree()
            await ydb.db.vars.uVars.setValue({test: 34})
        } catch (err) {
            expect(err.message).to.contain('data must be either a string or a number')
        }
        ydb.disconnect()
    });

    it("set empty string value of root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue()
        let res = await ydb.db.vars.uVars.getValue()
        expect(res.length === 0).to.be.true

        ydb.disconnect()
    });

    it("set string value of root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue('This is value for the test global')
        let res = await ydb.db.vars.uVars.getValue()
        expect(res).to.contain('This is value for the test global')

        ydb.disconnect()
    });

    it("set number value of root", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setValue(12.34)
        let res = await ydb.db.vars.uVars.getValue()
        expect(typeof res).to.contain('number')
        expect(res === 12.34).to.be.true

        ydb.disconnect()
    });

    it("set string value of node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars._('p1', 23).setValue('This is value for the test global')
        let res = await ydb.db.vars.uVars._('p1', 23).getValue()
        expect(res).to.contain('This is value for the test global')

        ydb.disconnect()
    });

    it("set number value of node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars._('p1', 23).setValue(12.34)
        let res = await ydb.db.vars.uVars._('p1', 23).getValue()
        expect(typeof res).to.contain('number')
        expect(res === 12.34).to.be.true

        ydb.disconnect()
    });
})

describe("vars.setPiece()", async () => {
    it("set piece of non existing node with empty string", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setPiece('', ',', 3)
        const res = await ydb.db.vars.uVars.getValue()
        expect(res).to.contain(',,')

        ydb.disconnect()
    });

    it("set piece of non existing node with string", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setPiece('my string', ',', 3)
        const res = await ydb.db.vars.uVars.getValue()
        expect(res).to.contain(',,my string')

        ydb.disconnect()
    });

    it("set piece of existing node with string", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.vars.uVars.killTree()
        await ydb.db.vars.uVars.setPiece('aaa', ',', 3)
        await ydb.db.vars.uVars.setPiece('bbb', ',', 9)
        const res = await ydb.db.vars.uVars.getValue()
        expect(res).to.contain(',,aaa,,,,,,bbb')

        ydb.disconnect()
    });
})

