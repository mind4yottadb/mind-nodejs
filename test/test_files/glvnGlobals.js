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
const {createYdbInstance, sleep} = require("../utils.cjs");

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

describe("globals.addName()", async () => {
    it("adds invalid name", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.addName('12glbname')

        } catch (err) {
            expect(err.message).to.contain('Invalid name, must be alphanumeric with first char alphabetic or underscore')
        }
        ydb.disconnect()
    });

    it("adds invalid name", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.addName('##glbname')
        } catch (err) {
            expect(err.message).to.contain('Invalid name, must be alphanumeric with first char alphabetic or underscore')
        }
        ydb.disconnect()
    });

    it("adds invalid name", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.addName('almostg@@d')
        } catch (err) {
            expect(err.message).to.contain('Invalid name, must be alphanumeric with first char alphabetic or underscore')
        }
        ydb.disconnect()
    });

    it("adds valid name", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.addName('thisisok')
        expect(ydb.db.globals.thisisok !== undefined).to.be.true

        ydb.disconnect()
    });

    it("adds valid name", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.addName('t2hisisok')
        expect(ydb.db.globals.t2hisisok !== undefined).to.be.true

        ydb.disconnect()
    });

    it("adds valid name", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.addName('_t2hisisok')
        expect(ydb.db.globals._t2hisisok !== undefined).to.be.true

        ydb.disconnect()
    });

    it("adds valid name", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.addName('_12t2hisisok')
        expect(ydb.db.globals._12t2hisisok !== undefined).to.be.true

        ydb.disconnect()
    });
})

describe("globals.removeName()", async () => {
    it("removes valid name", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.addName('_12t2hisisok')
        expect(ydb.db.globals._12t2hisisok !== undefined).to.be.true

        await ydb.db.globals.removeName('_12t2hisisok')
        expect(ydb.db.globals._12t2hisisok === undefined).to.be.true

        ydb.disconnect()
    });

    it("removes invalid name", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.removeName('donotexist')
            expect(ydb.db.globals._12t2hisisok === undefined).to.be.true

        } catch (err) {
            expect(err.message).to.contain('Name not found')
        }
        ydb.disconnect()
    });
})

describe("globals.setJSON()", async () => {
    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setJSON({})

        } catch (err) {
            expect(err.message).to.have.string('JSON must be a string')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setJSON([])

        } catch (err) {
            expect(err.message).to.have.string('JSON must be a string')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setJSON(33)

        } catch (err) {
            expect(err.message).to.have.string('JSON must be a string')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setJSON(false)

        } catch (err) {
            expect(err.message).to.have.string('JSON must be a string')
        }

        ydb.disconnect()
    });

    it("empty string", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setJSON('')

        } catch (err) {
            expect(err.message).to.have.string('No JSON provided')
        }

        ydb.disconnect()
    });

    it("bad json", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setJSON('{[[[-23{]')

        } catch (err) {
            console.log(err)
            expect(err.message).to.have.string('Error parsing JSON: Missing property name')
        }

        ydb.disconnect()
    });

    it("valid json", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            const obj = {
                test1: 'mindjsontest',
                myArray: [
                    'entry1', 'entry2', 'entry3'
                ]
            }
            await ydb.db.globals.temp.setJSON(JSON.stringify(obj))

            let value = await ydb.db.globals.temp._('test1').getValue()
            expect(value).to.have.string('mindjsontest')

        } catch (err) {
            expect(err.message).to.have.string('Error parsing JSON: Missing property name')
        }

        ydb.disconnect()
    });

})

describe("globals.setObject()", async () => {
    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setObject('thisisastring')

        } catch (err) {
            expect(err.message).to.have.string('obj must be an object')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setObject(23)

        } catch (err) {
            expect(err.message).to.have.string('obj must be an object')
        }

        ydb.disconnect()
    });

    it("bad DATA TYPE", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setObject(null)

        } catch (err) {
            expect(err.message).to.have.string('obj must be an object')
        }

        ydb.disconnect()
    });

    it("valid object", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.killTree()
            await ydb.db.globals.temp.setObject({
                field1: 12, field2: [
                    'entry1', 'entry2', 'entry3'
                ]
            })

            let value = await ydb.db.globals.temp._('field2', 1).getValue()
            expect(value).to.have.string('mindjsontest')

        } catch (err) {
            expect(err.message).to.have.string('entry')
        }

        ydb.disconnect()
    });
})

describe("globals.getJSON()", async () => {
    it("get json out of non-existing node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setObject({
            field1: 12, field2: [
                'entry1', 'entry2', 'entry3'
            ]
        })

        let json = await ydb.db.globals.temp._("zzz").getJSON()
        expect(json).to.have.string('{}')

        ydb.disconnect()
    });

    it("get valid json", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setObject({
            field1: 12, field2: [
                'entry1', 'entry2', 'entry3'
            ]
        })

        let json = await ydb.db.globals.temp.getJSON()
        expect(json).to.have.string('{"field1":12,"field2":["entry1","entry2","entry3"]}')

        ydb.disconnect()
    });
})

describe("globals.getObject()", async () => {
    it("get json out of non-existing node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setObject({
            field1: 12, field2: [
                'entry1', 'entry2', 'entry3'
            ]
        })

        let obj = await ydb.db.globals.temp._("zzz").getObject()
        expect(typeof obj === 'object').to.be.true

        ydb.disconnect()
    });

    it("get valid json", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killTree()
        await ydb.db.globals.temp.setObject({
            field1: 12, field2: [
                'entry1', 'entry2', 'entry3'
            ]
        })

        let obj = await ydb.db.globals.temp.getObject()
        expect(obj.field2[1]).to.have.string('entry2')

        ydb.disconnect()
    });
})

describe("globals.increment()", async () => {
    it("increment on killed node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killValue()
        const res = await ydb.db.globals.temp.increment()

        expect(res === 1).to.be.true

        ydb.disconnect()
    });

    it("increment on existing string node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue('string')
        const res = await ydb.db.globals.temp.increment()

        expect(res === 1).to.be.true

        ydb.disconnect()
    });

    it("increment on existing numeric node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue(22)
        const res = await ydb.db.globals.temp.increment()

        expect(res === 23).to.be.true

        ydb.disconnect()
    });

    it("increment on existing numeric node with float", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue(22.01)
        const res = await ydb.db.globals.temp.increment(0.001)

        expect(res === 22.011).to.be.true

        ydb.disconnect()
    });

    it("increment on existing numeric node with large int", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue(1E6)
        const res = await ydb.db.globals.temp.increment(2E6)

        expect(res === 3000000).to.be.true

        ydb.disconnect()
    });

    it("increment with zero as increment value", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.setValue(1E6)
            const res = await ydb.db.globals.temp.increment(0)

        } catch (err) {
            expect(err.message).to.have.string('incrementBy must be a positive number')
        }

        ydb.disconnect()
    });

    it("increment with negative number as increment value", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.setValue(1E6)
            const res = await ydb.db.globals.temp.increment(0)

        } catch (err) {
            expect(err.message).to.have.string('incrementBy must be a positive number')
        }

        ydb.disconnect()
    });
})

describe("globals.decrement()", async () => {
    it("decrement on killed node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.killValue()
        const res = await ydb.db.globals.temp.decrement()

        expect(res === -1).to.be.true

        ydb.disconnect()
    });

    it("decrement on existing string node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue('string')
        const res = await ydb.db.globals.temp.decrement()

        expect(res === -1).to.be.true

        ydb.disconnect()
    });

    it("decrement on existing numeric node", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue(22)
        const res = await ydb.db.globals.temp.decrement()

        expect(res === 21).to.be.true

        ydb.disconnect()
    });

    it("decrement on existing numeric node with float", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue(22.01)
        const res = await ydb.db.globals.temp.decrement(0.001)

        expect(res === 22.009).to.be.true

        ydb.disconnect()
    });

    it("decrement on existing numeric node with large int", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.setValue(1E6)
        const res = await ydb.db.globals.temp.decrement(2E6)

        expect(res === -1000000).to.be.true

        ydb.disconnect()
    });

    it("decrement with zero as decrement value", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.setValue(1E6)
            const res = await ydb.db.globals.temp.decrement(0)

        } catch (err) {
            expect(err.message).to.have.string('decrementBy must be a positive number')
        }

        ydb.disconnect()
    });

    it("decrement with negative number as decrement value", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.db.globals.temp.setValue(1E6)
            const res = await ydb.db.globals.temp.decrement(0)

        } catch (err) {
            expect(err.message).to.have.string('decrementBy must be a positive number')
        }

        ydb.disconnect()
    });
})

describe("globals.addLock()", async function () {
    this.timeout(20000)

    it("lock without timeout regular", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.addLock()

        const res = await ydb.process.showLocks()

        expect(res['^temp'] === '1').to.be.true

        ydb.disconnect()
    });

    it("lock with timeout, lock set ", async function () {
        const ydb = await createYdbInstance()
        const ydb2 = await createYdbInstance()

        await ydb2.db.globals.temp.addLock()

        setTimeout(async () => {
            ydb2.disconnect()

        }, 2000)

        await ydb.db.globals.temp.addLock(4)
        const res = await ydb.process.showLocks()

        expect(res['^temp'] === '1').to.be.true

        ydb.disconnect()
    });

    it("lock without timeout, lock set ", async function () {
        const ydb = await createYdbInstance()
        const ydb2 = await createYdbInstance()

        await ydb2.db.globals.temp.addLock()

        setTimeout(async () => {
            ydb2.disconnect()

        }, 2000)

        await ydb.db.globals.temp.addLock()
        const res = await ydb.process.showLocks()

        expect(res['^temp'] === '1').to.be.true

        ydb.disconnect()
    });

    it("lock with timeout, elapsed ", async () => {
        const ydb = await createYdbInstance()
        const ydb2 = await createYdbInstance()

        try {
            await ydb2.db.globals.temp.addLock()
            await ydb.db.globals.temp.addLock(3)

        } catch (err) {
            expect(err.message).to.have.string('timeout elapsed')
        }

        ydb.disconnect()
        ydb2.disconnect()
    });
})

describe("globals.removeLock()", async function () {
    this.timeout(20000)

    it("adds and then remove a lock ", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.addLock()
        await ydb.db.globals.temp.removeLock()
        const res = await ydb.process.showLocks()

        expect(Object.keys(res).length === 0).to.be.true

        ydb.disconnect()
    });
})

