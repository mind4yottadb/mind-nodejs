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
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue(23)
        const res = await ydb.db.vars.aaa.hasValue()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid var root", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._(23).setValue(23)
        const res = await ydb.db.vars.aaa.hasValue()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("test a valid var root 2", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue(23)
        const res = await ydb.db.vars.aaa._().hasValue()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid var root", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        const res = await ydb.db.vars.aaa._().hasValue()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("test a valid var", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._(1, 2, 3, 4, 7).setValue(23)
        const res = await ydb.db.vars.aaa._(1, 2, 3, 4, 7).hasValue()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid global", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        const res = await ydb.db.vars.aaa._(1, 2, 3, 4, 5).hasValue()
        expect(res).to.be.false

        ydb.disconnect()
    });
})

describe("vars.hasNodes()", async () => {
    it("test a valid var root", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._(23).setValue(23)
        const res = await ydb.db.vars.aaa.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid var root", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._(23).setValue(23)
        const res = await ydb.db.vars.aaa.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("test an invalid global", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        const res = await ydb.db.vars.aaa._(1, 2, 4).hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("test a valid global", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._(1, 2, 3, 4, 5).setValue(23)
        const res = await ydb.db.vars.aaa._(1, 2, 3, 4).hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });
})

describe("vars.getValue()", async () => {
    it("test a valid var root number", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._().setValue(23)
        const res = await ydb.db.vars.aaa.getValue()
        expect(typeof res).to.have.string('number')

        ydb.disconnect()
    });

    it("test a valid var string", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._(1, 2, 3, 4, 5, 6).setValue('this is a string')
        const res = await ydb.db.vars.aaa._(1, 2, 3, 4, 5, 6).getValue()
        expect(typeof res).to.have.string('string')
        expect(res).to.have.string('this is a string')

        ydb.disconnect()
    });

    it("test an invalid var path", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        const res = await ydb.db.vars.aaa._(1, 2, "this is bad", 4, 5, 6).getValue()
        expect(typeof res).to.have.string('string')
        expect(res).to.have.string('')

        ydb.disconnect()
    });
})

describe("vars.readValue()", async () => {
    it("test a valid var root number", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._().setValue(23)
        const res = await ydb.db.vars.aaa.readValue()
        expect(typeof res).to.have.string('number')

        ydb.disconnect()
    });

    it("test a valid var string", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._(1, 2, 3, 4, 5, 6).setValue('this is a string')
        const res = await ydb.db.vars.aaa._(1, 2, 3, 4, 5, 6).readValue()
        expect(typeof res).to.have.string('string')
        expect(res).to.have.string('this is a string')

        ydb.disconnect()
    });

    it("test a bad path global", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            const res = await ydb.db.vars.aaa._(1, 2, 67, 4, 5, 6).readValue()
            expect(typeof res).to.have.string('string')
            expect(res).to.have.string('this is a string')
        } catch (err) {
            expect(err.message).to.contain('aaa(1,2,67,4,5,6): path not found')
        }
        ydb.disconnect()
    });
})

describe("vars.killValue()", async () => {
    it("ensure no nodes are killed on root", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa._().setValue(1)
        await ydb.db.vars.aaa._(1, 2, 3).setValue(1)
        await ydb.db.vars.aaa._().killValue()
        let res = await ydb.db.vars.aaa.hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.aaa.hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });

    it("kill non existing node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._(3).killValue()
        let res = await ydb.db.vars.aaa._(3).hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.aaa._(93).hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("ensure no nodes are killed", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue(1)
        await ydb.db.vars.aaa._(1, 2, 3).setValue(1)
        await ydb.db.vars.aaa._(1, 2).setValue(12)
        await ydb.db.vars.aaa._(1, 2).killValue()

        let res = await ydb.db.vars.aaa._(1, 2).hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.aaa._(1, 2).hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });
})

describe("vars.killTree()", async () => {
    it("ensure all nodes are killed on root", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue(1)
        await ydb.db.vars.aaa._(1, 2, 3).setValue(1)
        await ydb.db.vars.aaa.killTree()
        let res = await ydb.db.vars.aaa.hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.aaa.hasNodes()
        expect(res).to.be.false

        ydb.disconnect()
    });

    it("ensure all nodes are killed ", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue(1)
        await ydb.db.vars.aaa._(1, 2, 3).setValue(1)
        await ydb.db.vars.aaa._(1, 4, 3).setValue(1)
        await ydb.db.vars.aaa._(1, 2).killTree()
        let res = await ydb.db.vars.aaa._(1, 2).hasValue()
        expect(res).to.be.false
        res = await ydb.db.vars.aaa._(1, 2).hasNodes()
        expect(res).to.be.false
        res = await ydb.db.vars.aaa._(1).hasNodes()
        expect(res).to.be.true

        ydb.disconnect()
    });
})

describe("vars.getPiece()", async () => {
    it("get piece of non existing node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        let res = await ydb.db.vars.aaa.getPiece()
        expect(res.length === 0).to.be.true

        ydb.disconnect()
    });

    it("get piece of existing node w/default separator", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue('piece1^piece2^piece3^piece4^piece5^piece6')
        let res = await ydb.db.vars.aaa.getPiece('^', 2)
        expect(res).to.contain('piece2')

        ydb.disconnect()
    });

    it("get piece of existing node w/default separator and end", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue('piece1^piece2^piece3^piece4^piece5^piece6')
        let res = await ydb.db.vars.aaa.getPiece('^', 2, 4)
        expect(res).to.contain('piece2^piece3^piece4')

        ydb.disconnect()
    });

    it("get piece of existing node w/different separator", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.vars.aaa.getPiece(',', 2)
        expect(res).to.contain('piece2')

        ydb.disconnect()
    });

    it("get piece of existing node w/different separator and end", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.vars.aaa.getPiece(',', 2, 4)
        expect(res).to.contain('piece2,piece3,piece4')

        ydb.disconnect()
    });

    it("get piece of existing node w/bad separator", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.vars.aaa.getPiece('^', 2)
        expect(res.length === 0).to.be.true

        ydb.disconnect()
    });

    it("get piece of existing node w/bad separator", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue('piece1,piece2,piece3,piece4,piece5,piece6')
        let res = await ydb.db.vars.aaa.getPiece()
        expect(res).to.contain('piece1,piece2,piece3,piece4,piece5,piece6')

        ydb.disconnect()
    });
})

describe("vars.setValue()", async () => {
    it("pass an array instead on number or string", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setValue([1, 4, 5])
        } catch (err) {
            expect(err.message).to.contain('data must be either a string or a number')
        }
        ydb.disconnect()
    });

    it("pass an object instead on number or string", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setValue({test: 34})
        } catch (err) {
            expect(err.message).to.contain('data must be either a string or a number')
        }
        ydb.disconnect()
    });

    it("set empty string value of root", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue()
        let res = await ydb.db.vars.aaa.getValue()
        expect(res.length === 0).to.be.true

        ydb.disconnect()
    });

    it("set string value of root", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue('This is value for the test global')
        let res = await ydb.db.vars.aaa.getValue()
        expect(res).to.contain('This is value for the test global')

        ydb.disconnect()
    });

    it("set number value of root", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setValue(12.34)
        let res = await ydb.db.vars.aaa.getValue()
        expect(typeof res).to.contain('number')
        expect(res === 12.34).to.be.true

        ydb.disconnect()
    });

    it("set string value of node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('p1', 23).setValue('This is value for the test global')
        let res = await ydb.db.vars.aaa._('p1', 23).getValue()
        expect(res).to.contain('This is value for the test global')

        ydb.disconnect()
    });

    it("set number value of node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('p1', 23).setValue(12.34)
        let res = await ydb.db.vars.aaa._('p1', 23).getValue()
        expect(typeof res).to.contain('number')
        expect(res === 12.34).to.be.true

        ydb.disconnect()
    });
})

describe("vars.setPiece()", async () => {
    it("set piece of non existing node with empty string", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setPiece('', ',', 3)
        const res = await ydb.db.vars.aaa.getValue()
        expect(res).to.contain(',,')

        ydb.disconnect()
    });

    it("set piece of non existing node with string", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setPiece('my string', ',', 3)
        const res = await ydb.db.vars.aaa.getValue()
        expect(res).to.contain(',,my string')

        ydb.disconnect()
    });

    it("set piece of existing node with string", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setPiece('aaa', ',', 3)
        await ydb.db.vars.aaa.setPiece('bbb', ',', 9)
        const res = await ydb.db.vars.aaa.getValue()
        expect(res).to.contain(',,aaa,,,,,,bbb')

        ydb.disconnect()
    });
})

describe("vars.addName()", async () => {
    it("adds invalid name", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.addName('12glbname')

        } catch (err) {
            expect(err.message).to.contain('Invalid name, must be alphanumeric with first char alphabetic or underscore')
        }
        ydb.disconnect()
    });

    it("adds invalid name", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.addName('##glbname')
        } catch (err) {
            expect(err.message).to.contain('Invalid name, must be alphanumeric with first char alphabetic or underscore')
        }
        ydb.disconnect()
    });

    it("adds invalid name", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.addName('almostg@@d')
        } catch (err) {
            expect(err.message).to.contain('Invalid name, must be alphanumeric with first char alphabetic or underscore')
        }
        ydb.disconnect()
    });

    it("adds valid name", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.addName('thisisok')
        expect(ydb.db.vars.thisisok !== undefined).to.be.true

        ydb.disconnect()
    });

    it("adds valid name", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.addName('t2hisisok')
        expect(ydb.db.vars.t2hisisok !== undefined).to.be.true

        ydb.disconnect()
    });

    it("adds valid name", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.addName('_t2hisisok')
        expect(ydb.db.vars._t2hisisok !== undefined).to.be.true

        ydb.disconnect()
    });

    it("adds valid name", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.addName('_12t2hisisok')
        expect(ydb.db.vars._12t2hisisok !== undefined).to.be.true

        ydb.disconnect()
    });
})

describe("vars.removeName()", async () => {
    it("removes valid name", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.addName('_12t2hisisok')
        expect(ydb.db.vars._12t2hisisok !== undefined).to.be.true

        await ydb.db.vars.removeName('_12t2hisisok')
        expect(ydb.db.vars._12t2hisisok === undefined).to.be.true

        ydb.disconnect()
    });

    it("removes invalid name", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.removeName('donotexist')
            expect(ydb.db.vars._12t2hisisok === undefined).to.be.true

        } catch (err) {
            expect(err.message).to.contain('Name not found')
        }
        ydb.disconnect()
    });
})

describe("vars.setJSON()", async () => {
    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setJSON({})

        } catch (err) {
            expect(err.message).to.have.string('JSON must be a string')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setJSON([])

        } catch (err) {
            expect(err.message).to.have.string('JSON must be a string')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setJSON(33)

        } catch (err) {
            expect(err.message).to.have.string('JSON must be a string')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setJSON(false)

        } catch (err) {
            expect(err.message).to.have.string('JSON must be a string')
        }

        ydb.disconnect()
    });

    it("empty string", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setJSON('')

        } catch (err) {
            expect(err.message).to.have.string('No JSON provided')
        }

        ydb.disconnect()
    });

    it("bad json", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setJSON('{[[[-23{]')

        } catch (err) {
            console.log(err)
            expect(err.message).to.have.string('Error parsing JSON: Missing property name')
        }

        ydb.disconnect()
    });

    it("valid json", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            const obj = {
                test1: 'mindjsontest',
                myArray: [
                    'entry1', 'entry2', 'entry3'
                ]
            }
            await ydb.db.vars.aaa.setJSON(JSON.stringify(obj))

            let value = await ydb.db.vars.aaa._('test1').getValue()
            expect(value).to.have.string('mindjsontest')

        } catch (err) {
            expect(err.message).to.have.string('Error parsing JSON: Missing property name')
        }

        ydb.disconnect()
    });

})

describe("vars.setObject()", async () => {
    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setObject('thisisastring')

        } catch (err) {
            expect(err.message).to.have.string('obj must be an object')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setObject(23)

        } catch (err) {
            expect(err.message).to.have.string('obj must be an object')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setObject(null)

        } catch (err) {
            expect(err.message).to.have.string('obj must be an object')
        }

        ydb.disconnect()
    });

    it("valid object", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.killTree()
            await ydb.db.vars.aaa.setObject({
                field1: 12, field2: [
                    'entry1', 'entry2', 'entry3'
                ]
            })

            let value = await ydb.db.vars.aaa._('field2', 1).getValue()
            expect(value).to.have.string('mindjsontest')

        } catch (err) {
            expect(err.message).to.have.string('entry')
        }

        ydb.disconnect()
    });
})

describe("vars.getJSON()", async () => {
    it("get json out of non-existing node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setObject({
            field1: 12, field2: [
                'entry1', 'entry2', 'entry3'
            ]
        })

        let json = await ydb.db.vars.aaa._("zzz").getJSON()
        expect(json).to.have.string('{}')

        ydb.disconnect()
    });

    it("get valid json", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setObject({
            field1: 12, field2: [
                'entry1', 'entry2', 'entry3'
            ]
        })

        let json = await ydb.db.vars.aaa.getJSON()
        expect(json).to.have.string('{"field1":12,"field2":["entry1","entry2","entry3"]}')

        ydb.disconnect()
    });
})

describe("vars.getObject()", async () => {
    it("get json out of non-existing node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setObject({
            field1: 12, field2: [
                'entry1', 'entry2', 'entry3'
            ]
        })

        let obj = await ydb.db.vars.aaa._("zzz").getObject()
        expect(typeof obj === 'object').to.be.true

        ydb.disconnect()
    });

    it("get valid json", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa.setObject({
            field1: 12, field2: [
                'entry1', 'entry2', 'entry3'
            ]
        })

        let obj = await ydb.db.vars.aaa.getObject()
        expect(obj.field2[1]).to.have.string('entry2')

        ydb.disconnect()
    });
})

describe("vars.increment()", async () => {
    it("increment on killed node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killValue()
        const res = await ydb.db.vars.aaa.increment()

        expect(res === 1).to.be.true

        ydb.disconnect()
    });

    it("increment on existing string node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue('string')
        const res = await ydb.db.vars.aaa.increment()

        expect(res === 1).to.be.true

        ydb.disconnect()
    });

    it("increment on existing numeric node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue(22)
        const res = await ydb.db.vars.aaa.increment()

        expect(res === 23).to.be.true

        ydb.disconnect()
    });

    it("increment on existing numeric node with float", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue(22.01)
        const res = await ydb.db.vars.aaa.increment(0.001)

        expect(res === 22.011).to.be.true

        ydb.disconnect()
    });

    it("increment on existing numeric node with large int", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue(1E6)
        const res = await ydb.db.vars.aaa.increment(2E6)

        expect(res === 3000000).to.be.true

        ydb.disconnect()
    });

    it("increment with zero as increment value", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.setValue(1E6)
            const res = await ydb.db.vars.aaa.increment(0)

        } catch (err) {
            expect(err.message).to.have.string('incrementBy must be a positive number')
        }

        ydb.disconnect()
    });

    it("increment with negative number as increment value", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.setValue(1E6)
            const res = await ydb.db.vars.aaa.increment(0)

        } catch (err) {
            expect(err.message).to.have.string('incrementBy must be a positive number')
        }

        ydb.disconnect()
    });
})

describe("vars.decrement()", async () => {
    it("decrement on killed node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killValue()
        const res = await ydb.db.vars.aaa.decrement()

        expect(res === -1).to.be.true

        ydb.disconnect()
    });

    it("decrement on existing string node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue('string')
        const res = await ydb.db.vars.aaa.decrement()

        expect(res === -1).to.be.true

        ydb.disconnect()
    });

    it("decrement on existing numeric node", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue(22)
        const res = await ydb.db.vars.aaa.decrement()

        expect(res === 21).to.be.true

        ydb.disconnect()
    });

    it("decrement on existing numeric node with float", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue(22.01)
        const res = await ydb.db.vars.aaa.decrement(0.001)

        expect(res === 22.009).to.be.true

        ydb.disconnect()
    });

    it("decrement on existing numeric node with large int", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.setValue(1E6)
        const res = await ydb.db.vars.aaa.decrement(2E6)

        expect(res === -1000000).to.be.true

        ydb.disconnect()
    });

    it("decrement with zero as decrement value", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.setValue(1E6)
            const res = await ydb.db.vars.aaa.decrement(0)

        } catch (err) {
            expect(err.message).to.have.string('decrementBy must be a positive number')
        }

        ydb.disconnect()
    });

    it("decrement with negative number as decrement value", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        try {
            await ydb.db.vars.aaa.setValue(1E6)
            const res = await ydb.db.vars.aaa.decrement(0)

        } catch (err) {
            expect(err.message).to.have.string('decrementBy must be a positive number')
        }

        ydb.disconnect()
    });
})

describe("globals.findNext()", async function () {
    this.timeout(20000)

    it("with no param and no data ", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        const res = await ydb.db.vars.aaa.findNext()

        expect(res === '').to.be.true

        ydb.disconnect()
    });

    it("with array param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.findNext(['test'])

        } catch (err) {
            expect(err.message === 'findValue must be a number or a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with object param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.findNext({x: 'test'})

        } catch (err) {
            expect(err.message === 'findValue must be a number or a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with boolean param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.findNext(false)

        } catch (err) {
            expect(err.message === 'findValue must be a number or a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with null param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.findNext(null)

        } catch (err) {
            expect(err.message === 'findValue must be a number or a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with empty string as param, 1 subscript on root, expect string back", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('myString').setValue('hey')

        const res = await ydb.db.vars.aaa.findNext()
        expect(res).to.have.string('myString')


        ydb.disconnect()
    });

    it("with empty string as param, 1 subscript as second subscript, expect string back", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('myString', 23).setValue('hey')

        const res = await ydb.db.vars.aaa.findNext()
        expect(res).to.have.string('myString')

        ydb.disconnect()
    });

    it("with first subscript as param, 1 subscript as second subscript, expect string back", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('myString', 23).setValue('hey')

        const res = await ydb.db.vars.aaa._('myString').findNext()
        expect(res === 23).to.be.true

        ydb.disconnect()
    });

    it("with first subscript as param, 5 subscript as second subscript, expect string back", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('myString').setObject([
            "entry1",
            "entry2",
            "entry3",
            "entry4",
            "entry5",
        ])

        let res = await ydb.db.vars.aaa._('myString').findNext()
        expect(res === 1).to.be.true

        res = await ydb.db.vars.aaa._('myString').findNext(res)
        expect(res === 2).to.be.true

        res = await ydb.db.vars.aaa._('myString').findNext(res)
        expect(res === 3).to.be.true

        res = await ydb.db.vars.aaa._('myString').findNext(res)
        expect(res === 4).to.be.true

        res = await ydb.db.vars.aaa._('myString').findNext(res)
        expect(res === 5).to.be.true

        res = await ydb.db.vars.aaa._('myString').findNext(res)
        expect(res === '').to.be.true

        ydb.disconnect()
    });
})

describe("globals.findPrev()", async function () {
    this.timeout(20000)

    it("with no param and no data ", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        const res = await ydb.db.vars.aaa.findPrev()

        expect(res === '').to.be.true

        ydb.disconnect()
    });

    it("with array param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.findPrev(['test'])

        } catch (err) {
            expect(err.message === 'findValue must be a number or a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with object param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.findPrev({x: 'test'})

        } catch (err) {
            expect(err.message === 'findValue must be a number or a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with boolean param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.findPrev(false)

        } catch (err) {
            expect(err.message === 'findValue must be a number or a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with null param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.findPrev(null)

        } catch (err) {
            expect(err.message === 'findValue must be a number or a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with empty string as param, 1 subscript on root, expect string back", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('myString').setValue('hey')

        const res = await ydb.db.vars.aaa.findPrev()
        expect(res).to.have.string('myString')


        ydb.disconnect()
    });

    it("with empty string as param, 1 subscript as second subscript, expect string back", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('myString', 23).setValue('hey')

        const res = await ydb.db.vars.aaa.findPrev()
        expect(res).to.have.string('myString')

        ydb.disconnect()
    });

    it("with first subscript as param, 1 subscript as second subscript, expect string back", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('myString', 23).setValue('hey')

        const res = await ydb.db.vars.aaa._('myString').findPrev()
        expect(res === 23).to.be.true

        ydb.disconnect()
    });

    it("with first subscript as param, 5 subscript as second subscript, expect string back", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        await ydb.db.vars.aaa._('myString').setObject([
            "entry1",
            "entry2",
            "entry3",
            "entry4",
            "entry5",
        ])

        let res = await ydb.db.vars.aaa._('myString').findPrev()
        expect(res === 5).to.be.true

        res = await ydb.db.vars.aaa._('myString').findPrev(res)
        expect(res === 4).to.be.true

        res = await ydb.db.vars.aaa._('myString').findPrev(res)
        expect(res === 3).to.be.true

        res = await ydb.db.vars.aaa._('myString').findPrev(res)
        expect(res === 2).to.be.true

        res = await ydb.db.vars.aaa._('myString').findPrev(res)
        expect(res === 1).to.be.true

        res = await ydb.db.vars.aaa._('myString').findPrev(res)
        expect(res === '').to.be.true

        ydb.disconnect()
    });
})

describe("globals.query()", async function () {
    this.timeout(20000)

    it("with no param and no data ", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        const res = await ydb.db.vars.aaa.query()

        expect(res === '').to.be.true

        ydb.disconnect()
    });

    it("with array param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.query(['test'])

        } catch (err) {
            expect(err.message === 'glvn must be a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with object param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.query({x: 'test'})

        } catch (err) {
            expect(err.message === 'glvn must be a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with boolean param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.query(false)

        } catch (err) {
            expect(err.message === 'glvn must be a string').to.be.true

        }

        ydb.disconnect()
    });

    it("with null param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        await ydb.db.vars.aaa.killTree()
        try {
            const res = await ydb.db.vars.aaa.query(null)

        } catch (err) {
            expect(err.message === 'glvn must be a string').to.be.true

        }

        ydb.disconnect()
    });

    it("find next $name with no param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        const gbl = ydb.db.vars.aaa

        await gbl.killTree()
        await gbl._("testNode").setObject({
            test1: {ciao: 'test1val'},
            test2: 'test2',
            test3: 'test3',
        })

        let res = await gbl.query()

        expect(res).to.have.string('aaa("testNode","test1","ciao")')

        ydb.disconnect()
    });

    it("find next $name with  param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        const gbl = ydb.db.vars.aaa

        await gbl.killTree()
        await gbl._("testNode").setObject({
            test1: {ciao: 'test1val'},
            test2: 'test2',
            test3: 'test3',
        })

        let res = await ydb.db.vars.aaa.query('aaa("testNode","test1","ciao")')

        expect(res).to.have.string('aaa("testNode","test2")')

        ydb.disconnect()
    });
})