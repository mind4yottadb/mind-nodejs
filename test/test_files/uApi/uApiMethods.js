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

describe("uApi methods", async () => {
    it("returns string", async () => {
        const ydb = await createYdbInstance('test-methods')

        const res = await ydb.level_1.testParams0RetStr()
        expect(typeof res === 'string').to.be.true

        ydb.disconnect()
    });

    it("returns int", async () => {
        const ydb = await createYdbInstance('test-methods')

        const res = await ydb.level_1.testParams0RetInt()
        expect(typeof res === 'number').to.be.true

        ydb.disconnect()
    });

    it("returns float", async () => {
        const ydb = await createYdbInstance('test-methods')

        const res = await ydb.level_1.testParams0RetFloat()
        expect(typeof res === 'number').to.be.true

        ydb.disconnect()
    });

    it("returns boolean true", async () => {
        const ydb = await createYdbInstance('test-methods')

        const res = await ydb.level_1.testParams0RetBooleanTrue()
        expect(typeof res === 'boolean').to.be.true

        ydb.disconnect()
    });

    it("returns boolean false", async () => {
        const ydb = await createYdbInstance('test-methods')

        const res = await ydb.level_1.testParams0RetBooleanFalse()
        expect(typeof res === 'boolean').to.be.true

        ydb.disconnect()
    });

    it("returns object", async () => {
        const ydb = await createYdbInstance('test-methods')

        const res = await ydb.level_1.testParams0RetObject()
        expect(typeof res === 'object').to.be.true

        ydb.disconnect()
    });
    it("returns null", async () => {
        const ydb = await createYdbInstance('test-methods')

        const res = await ydb.level_1.testParams0RetNull()
        expect(res === null).to.be.true

        ydb.disconnect()
    });


})