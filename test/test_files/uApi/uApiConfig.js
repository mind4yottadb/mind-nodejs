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

describe("uApi config", async () => {
    it("when no appName is provided", async () => {

        const ydb = await createYdbInstance()

        expect(1 === 1).to.be.true

        ydb.disconnect()
    });

    it("when appName is not a string", async () => {
        let ydb

        try {
            ydb = await createYdbInstance([1, 2, 3])

        } catch (err) {
            expect(err.message).to.have.string('options.uApi.appName must be a string')
        }

        if (ydb) ydb.disconnect()
    });

    it("when appName is not a string", async () => {
        let ydb

        try {
            ydb = await createYdbInstance(23.45)

        } catch (err) {
            expect(err.message).to.have.string('options.uApi.appName must be a string')
        }

        if (ydb) ydb.disconnect()
    });

    it("when appName is not a string", async () => {
        let ydb

        try {
            ydb = await createYdbInstance({
                aa: 23
            })

        } catch (err) {
            expect(err.message).to.have.string('options.uApi.appName must be a string')
        }

        if (ydb) ydb.disconnect()
    });

    it("when appName is not a string", async () => {
        let ydb

        try {
            ydb = await createYdbInstance(true)

        } catch (err) {
            expect(err.message).to.have.string('options.uApi.appName must be a string')
        }

        if (ydb) ydb.disconnect()
    });

    it("when appName is not a string", async () => {
        let ydb

        try {
            ydb = await createYdbInstance(undefined)

        } catch (err) {
            expect(err.message).to.have.string('options.uApi.appName must be a string')
        }

        if (ydb) ydb.disconnect()
    });

    it("when appName is not a string", async () => {
        let ydb

        try {
            ydb = await createYdbInstance(null)

        } catch (err) {
            expect(err.message).to.have.string('options.uApi.appName+' +
                ' must be a string')
        }

        if (ydb) ydb.disconnect()
    });

    it("when appName doesn't exist in server", async () => {
        let ydb

        try {
            ydb = await createYdbInstance('myvirtualapp')

        } catch (err) {
            expect(err.message).to.have.string('app: myvirtualapp not found')
        }

        if (ydb) ydb.disconnect()
    });
})

describe("uApi object structure: tree", async () => {
    it("one root level only", async () => {
        const ydb = await createYdbInstance('test-obj-structure-11')

        expect(ydb.level_1 !== undefined).to.be.true
        expect(ydb.level_1.method_1 !== undefined).to.be.true
        expect(ydb.level_1.prop1 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("two root levels", async () => {
        const ydb = await createYdbInstance('test-obj-structure-12')

        expect(ydb.level_1 !== undefined).to.be.true
        expect(ydb.level_1.method_1 !== undefined).to.be.true
        expect(ydb.level_1.prop1 !== undefined).to.be.true

        expect(ydb.level_2 !== undefined).to.be.true
        expect(ydb.level_2.method_2_1 !== undefined).to.be.true
        expect(ydb.level_2.prop2 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("three root levels", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13')

        expect(ydb.level_1 !== undefined).to.be.true
        expect(ydb.level_1.method_1 !== undefined).to.be.true
        expect(ydb.level_1.prop1 !== undefined).to.be.true

        expect(ydb.level_2 !== undefined).to.be.true
        expect(ydb.level_2.method_2_1 !== undefined).to.be.true
        expect(ydb.level_2.prop2 !== undefined).to.be.true

        expect(ydb.level_3 !== undefined).to.be.true
        expect(ydb.level_3.method_3_1 !== undefined).to.be.true
        expect(ydb.level_3.prop3 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("one root level only", async () => {
        const ydb = await createYdbInstance('test-obj-structure-11-23')

        expect(ydb.level_1 !== undefined).to.be.true
        expect(ydb.level_1.method_1 !== undefined).to.be.true
        expect(ydb.level_1.prop1 !== undefined).to.be.true

        expect(ydb.level_1.level_1_1 !== undefined).to.be.true
        expect(ydb.level_1.level_1_2 !== undefined).to.be.true
        expect(ydb.level_1.level_1_3 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("3 multi-levels", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x')

        expect(ydb.level_1 !== undefined).to.be.true
        expect(ydb.level_1.method_1 !== undefined).to.be.true
        expect(ydb.level_1.prop1 !== undefined).to.be.true

        expect(ydb.level_1.level_1_1 !== undefined).to.be.true
        expect(ydb.level_1.level_1_2 !== undefined).to.be.true
        expect(ydb.level_1.level_1_3 !== undefined).to.be.true

        expect(ydb.level_1.level_1_1.level_1_1_1 !== undefined).to.be.true
        expect(ydb.level_1.level_1_1.level_1_1_2 !== undefined).to.be.true
        expect(ydb.level_1.level_1_1.level_1_1_3 !== undefined).to.be.true

        expect(ydb.level_1.level_1_2.level_1_2_1 !== undefined).to.be.true
        expect(ydb.level_1.level_1_2.level_1_2_2 !== undefined).to.be.true
        expect(ydb.level_1.level_1_2.level_1_2_3 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("4 multi-levels", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-4x-desc')

        expect(ydb.level_1 !== undefined).to.be.true
        expect(ydb.level_1.method_1 !== undefined).to.be.true
        expect(ydb.level_1.prop1 !== undefined).to.be.true

        expect(ydb.level_1.level_1_1 !== undefined).to.be.true
        expect(ydb.level_1.level_1_2 !== undefined).to.be.true
        expect(ydb.level_1.level_1_3 !== undefined).to.be.true

        expect(ydb.level_1.level_1_1.level_1_1_1 !== undefined).to.be.true
        expect(ydb.level_1.level_1_1.level_1_1_2 !== undefined).to.be.true
        expect(ydb.level_1.level_1_1.level_1_1_3 !== undefined).to.be.true

        expect(ydb.level_1.level_1_2.level_1_2_1 !== undefined).to.be.true
        expect(ydb.level_1.level_1_2.level_1_2_2 !== undefined).to.be.true
        expect(ydb.level_1.level_1_2.level_1_2_3 !== undefined).to.be.true

        expect(ydb.level_1.level_1_1.level_1_1_1.level_1_1_1_1 !== undefined).to.be.true

        ydb.disconnect()
    });
})

describe("uApi object structure: methods", async () => {
    it("one root level only, methods", async () => {
        const ydb = await createYdbInstance('test-obj-structure-11')

        expect(typeof ydb.level_1.method_1 === 'function').to.be.true
        expect(typeof ydb.level_1.method_2 === 'function').to.be.true
        expect(typeof ydb.level_1.method_3 === 'function').to.be.true
        expect(typeof ydb.level_1.method_4 === 'function').to.be.true

        ydb.disconnect()
    });

    it("second level, methods", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x')

        expect(typeof ydb.level_1.level_1_1.method_1 === 'function').to.be.true

        ydb.disconnect()
    });

    it("third level, methods", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x')

        expect(typeof ydb.level_1.level_1_1.level_1_1_1.method_1 === 'function').to.be.true

        ydb.disconnect()
    });
})

describe("uApi object structure: properties", async () => {
    it("one root level only, methods", async () => {
        const ydb = await createYdbInstance('test-obj-structure-11')

        expect(typeof ydb.level_1.prop1 === 'string').to.be.true

        ydb.disconnect()
    });

    it("second level, methods", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x')

        expect(typeof ydb.level_1.level_1_1.prop1 === 'string').to.be.true

        ydb.disconnect()
    });

    it("third level, methods", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x')

        expect(typeof ydb.level_1.level_1_1.level_1_1_1.prop1 === 'string').to.be.true

        ydb.disconnect()
    });
})

describe("uApi object structure: method description ", async () => {
    it("first level", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.method_1_description).to.have.string('method_1 description')

        ydb.disconnect()
    });

    it("second level", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.level_1_1.method_1_description).to.have.string('level_1_1.method_1 description')

        ydb.disconnect()
    });

    it("third level", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.level_1_1.level_1_1_1.method_1_description).to.have.string('method_1 description')

        ydb.disconnect()
    });

    it("4th level", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-4x-desc')

        expect(ydb.level_1.level_1_1.level_1_1_1.level_1_1_1_1.method_1111_description).to.have.string('method_1111 description')

        ydb.disconnect()
    });
})

describe("uApi object structure: method signature: returns ", async () => {
    it("first level returns <void>", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.method_1_signature).to.have.string('method_1()')

        ydb.disconnect()
    });

    it("first level returns <string>", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.method_string_signature).to.have.string('string = method_string()')

        ydb.disconnect()
    });

    it("first level returns <int>", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.method_int_signature).to.have.string('int = method_int()')

        ydb.disconnect()
    });

    it("first level returns <float>", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.method_float_signature).to.have.string('float = method_float()')

        ydb.disconnect()
    });

    it("first level returns <boolean>", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.method_boolean_signature).to.have.string('boolean = method_boolean()')

        ydb.disconnect()
    });

    it("first level returns <object>", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.method_object_signature).to.have.string('object = method_object()')

        ydb.disconnect()
    });

})

describe("uApi object structure: method signature: parameters ", async () => {
    it("one param", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.level_1_1.level_1_1_2.method_1_par_signature).to.have.string('method_1_par(par1 as string)')

        ydb.disconnect()
    });

    it("two params", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.level_1_1.level_1_1_2.method_2_par_signature).to.have.string('(par1 as string, par2 as object)')

        ydb.disconnect()
    });

    it("three params", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.level_1_1.level_1_1_2.method_3_par_signature).to.have.string('(par1 as string, par2 as object, par3 as int)')

        ydb.disconnect()
    });

    it("four params", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.level_1_1.level_1_1_2.method_4_par_signature).to.have.string('par1 as string, par2 as object, par3 as int, par4 as float)')

        ydb.disconnect()
    });

    it("five params", async () => {
        const ydb = await createYdbInstance('test-obj-structure-13-23-3x-desc')

        expect(ydb.level_1.level_1_1.level_1_1_2.method_5_par_signature).to.have.string('par1 as string, par2 as object, par3 as int, par4 as float, par5 as boolean)')

        ydb.disconnect()
    });
})

describe("uApi shared vars", async () => {
    it("existence testVar1", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar1 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("existence testVar2", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar2 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("existence testVar3", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar3 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("existence testVar4", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar4 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("existence testVar5", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar5 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("existence testVar6", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar6 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("existence testVar7", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar7 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("existence testVar8", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar8 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("existence testVar9", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar9 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("existence testVar10", async () => {
        const ydb = await createYdbInstance('test-vars')

        expect(ydb.db.vars.testVar10 !== undefined).to.be.true

        ydb.disconnect()
    });

    it("test testVar1", async () => {
        const ydb = await createYdbInstance('test-vars')
        const var1 = ydb.db.vars.testVar1

        await var1.setValue('testVar1');
        const res = await var1.getValue()

        expect(res).to.have.string('testVar1');

        ydb.disconnect()
    });

    it("test testVar2", async () => {
        const ydb = await createYdbInstance('test-vars')
        const node = ydb.db.vars.testVar2

        await node.setValue('testVar2');
        const res = await node.getValue()

        expect(res).to.have.string('testVar2');

        ydb.disconnect()
    });
    it("test testVar3", async () => {
        const ydb = await createYdbInstance('test-vars')
        const node = ydb.db.vars.testVar3

        await node.setValue('testVar3');
        const res = await node.getValue()

        expect(res).to.have.string('testVar3');

        ydb.disconnect()
    });
    it("test testVar4", async () => {
        const ydb = await createYdbInstance('test-vars')
        const node = ydb.db.vars.testVar4

        await node.setValue('testVar4');
        const res = await node.getValue()

        expect(res).to.have.string('testVar4');

        ydb.disconnect()
    });
    it("test testVar5", async () => {
        const ydb = await createYdbInstance('test-vars')
        const node = ydb.db.vars.testVar5

        await node.setValue('testVar5');
        const res = await node.getValue()

        expect(res).to.have.string('testVar5');

        ydb.disconnect()
    });
    it("test testVar6", async () => {
        const ydb = await createYdbInstance('test-vars')
        const node = ydb.db.vars.testVar6

        await node.setValue('testVar6');
        const res = await node.getValue()

        expect(res).to.have.string('testVar6');

        ydb.disconnect()
    });
    it("test testVar7", async () => {
        const ydb = await createYdbInstance('test-vars')
        const node = ydb.db.vars.testVar7

        await node.setValue('testVar7');
        const res = await node.getValue()

        expect(res).to.have.string('testVar7');

        ydb.disconnect()
    });
    it("test testVar8", async () => {
        const ydb = await createYdbInstance('test-vars')
        const node = ydb.db.vars.testVar8

        await node.setValue('testVar8');
        const res = await node.getValue()

        expect(res).to.have.string('testVar8');

        ydb.disconnect()
    });
    it("test testVar9", async () => {
        const ydb = await createYdbInstance('test-vars')
        const node = ydb.db.vars.testVar9

        await node.setValue('testVar9');
        const res = await node.getValue()

        expect(res).to.have.string('testVar9');

        ydb.disconnect()
    });
    it("test testVar10", async () => {
        const ydb = await createYdbInstance('test-vars')
        const node = ydb.db.vars.testVar10

        await node.setValue('testVar10');
        const res = await node.getValue()

        expect(res).to.have.string('testVar10');

        ydb.disconnect()
    });


})