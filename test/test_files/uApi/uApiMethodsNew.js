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

describe("uApi methods: returns", async () => {
    it("returns string", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.testParams0RetStr()

        expect(typeof res === 'string').to.be.true

        ydb.disconnect()
    });

    it("returns int", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.testParams0RetInt()

        expect(typeof res === 'number').to.be.true

        ydb.disconnect()
    });

    it("returns float", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.testParams0RetFloat()

        expect(typeof res === 'number').to.be.true

        ydb.disconnect()
    });

    it("returns boolean true", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.testParams0RetBooleanTrue()

        expect(typeof res === 'boolean').to.be.true

        ydb.disconnect()
    });

    it("returns boolean false", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.testParams0RetBooleanFalse()

        expect(typeof res === 'boolean').to.be.true

        ydb.disconnect()
    });

    it("returns object", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.testParams0RetObject()

        expect(typeof res === 'object').to.be.true

        ydb.disconnect()
    });
    it("returns null", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.testParams0RetNull()

        expect(res === null).to.be.true

        ydb.disconnect()
    });

    it("returns simple error", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.testParams0ErrSimple()

        } catch (err) {
            expect(err.message).have.string('this is a simple error')
        }

        ydb.disconnect()
    });

    it("returns null", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.testParams0ErrBlob()

        } catch (err) {
            expect(err.message).have.string('This is a blob error\\nwith more\\nextended text\\nand multiple lines')
        }

        ydb.disconnect()
    });
})

describe("uApi methods: parameters execution", async () => {
    it("1 param: string", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.level_1_1.method_1_par('this is the string')

        expect(typeof res === 'object').to.be.true
        expect(res.param1).to.have.string('this is the string')

        ydb.disconnect()
    });

    it("2 params: string/int", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.level_1_1.method_2_par('this is the string', 12)

        expect(typeof res === 'object').to.be.true
        expect(res.param1).to.have.string('this is the string')
        expect(res.param2 === 12).to.be.true

        ydb.disconnect()
    });

    it("3 params: string/int/float", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.level_1_1.method_3_par('this is the string', 12, 45.3456)

        expect(typeof res === 'object').to.be.true
        expect(res.param1).to.have.string('this is the string')
        expect(res.param2 === 12).to.be.true
        expect(res.param3 === 45.3456).to.be.true

        ydb.disconnect()
    });

    it("4 params: string/int/float/boolean", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.level_1_1.method_4_par('this is the string', 12, 45.3456, true)

        expect(typeof res === 'object').to.be.true
        expect(res.param1).to.have.string('this is the string')
        expect(res.param2 === 12).to.be.true
        expect(res.param3 === 45.3456).to.be.true
        expect(res.param4).to.be.true

        ydb.disconnect()
    });

    it("5 params: string/int/float/boolean/boolean", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.level_1_1.method_5_par('this is the string', 12, 45.3456, true, false)

        expect(typeof res === 'object').to.be.true
        expect(res.param1).to.have.string('this is the string')
        expect(res.param2 === 12).to.be.true
        expect(res.param3 === 45.3456).to.be.true
        expect(res.param4).to.be.true
        expect(res.param5).to.be.false

        ydb.disconnect()
    });

    it("6 params: string/int/float/boolean/boolean/object", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        const res = await ydb.level_1.level_1_1.method_6_par('this is the string', 12, 45.3456, true, false, {
            fieldObj1: 'test',
            fieldObj2: [
                'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'
            ]
        })

        expect(typeof res === 'object').to.be.true
        expect(res.param1).to.have.string('this is the string')
        expect(res.param2 === 12).to.be.true
        expect(res.param3 === 45.3456).to.be.true
        expect(res.param4).to.be.true
        expect(res.param5).to.be.false
        expect(typeof res.param6).to.have.string('object')

        ydb.disconnect()
    });

})

describe("uApi methods: parameters checking: datatype", async () => {
    it("1 param: string", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_1_par(12)

        } catch (err) {
            expect(err.message).have.string('Parameter 1: "paramStr" must be a string')
        }

        ydb.disconnect()
    });

    it("1 param: string", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_1_par(12.23)

        } catch (err) {
            expect(err.message).have.string('Parameter 1: "paramStr" must be a string')
        }

        ydb.disconnect()
    });

    it("1 param: string", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_1_par(true)

        } catch (err) {
            expect(err.message).have.string('Parameter 1: "paramStr" must be a string')
        }

        ydb.disconnect()
    });

    it("1 param: string", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_1_par({test: 23})

        } catch (err) {
            expect(err.message).have.string('Parameter 1: "paramStr" must be a string')
        }

        ydb.disconnect()
    });

    it("1 param: string", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_1_par(['12', 45, 66])

        } catch (err) {
            expect(err.message).have.string('Parameter 1: "paramStr" must be a string')
        }

        ydb.disconnect()
    });

    it("6 params: string/int/float/boolean/boolean/object", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_6_par('test', 12, 12, false, false, false)

        } catch (err) {
            expect(err.message).have.string('Parameter 6: "paramObject" must be a object')
        }

        ydb.disconnect()
    });

    it("6 params: string/int/float/boolean/boolean/object", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_6_par('test', 12, 12, false, {}, {})

        } catch (err) {
            expect(err.message).have.string('Parameter 5: "paramBoolean2" must be a boolean')
        }

        ydb.disconnect()
    });

    it("6 params: string/int/float/boolean/boolean/object", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_6_par('test', 12, true, false, false, false)

        } catch (err) {
            expect(err.message).have.string('Parameter 3: "paramFloat" must be a number')
        }

        ydb.disconnect()
    });

    it("6 params: string/int/float/boolean/boolean/object", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_6_par('test', true, 12, false, false, false)

        } catch (err) {
            expect(err.message).have.string('Parameter 2: "paramInt" must be a number')
        }

        ydb.disconnect()
    });

    it("1 param, two params passed", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_1_par('23test', 33)

        } catch (err) {
            expect(err.message).have.string('Expected 1 parameters, got 2')
        }

        ydb.disconnect()
    });

    it("2 params, 3 params passed", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_2_par('23test', 23, 77)

        } catch (err) {
            expect(err.message).have.string('Expected 2 parameters, got 3')
        }

        ydb.disconnect()
    });


    it("2 params, 1 param passed", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_2_par('23test')

        } catch (err) {
            expect(err.message).have.string('Expected 2 parameters, got 1')
        }

        ydb.disconnect()
    });

    it("3 params, 1 param passed", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_3_par('23test')

        } catch (err) {
            expect(err.message).have.string('Expected 3 parameters, got 1')
        }

        ydb.disconnect()
    });

    it("3 params, 2 param passed", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_2_par('23test', 12)

        } catch (err) {
            expect(err.message).have.string('Expected 2 parameters, got 2')
        }

        ydb.disconnect()
    });

    it("6 params, 4 param passed", async () => {
        const ydb = await createYdbInstance('test-methods-new')

        try {
            const res = await ydb.level_1.level_1_1.method_6_par('23test', 34, 56, false)

        } catch (err) {
            expect(err.message).have.string('Expected 6 parameters, got 4')
        }

        ydb.disconnect()
    });
})