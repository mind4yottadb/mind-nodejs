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

describe("uApi methods: test existing function", async () => {
    it("isNumber^%mindUtils: '12er'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.isNumber('12er')

        expect(res).to.be.false

        ydb.disconnect()
    });

    it("isNumber^%mindUtils: '12'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.isNumber('12')

        expect(res).to.be.true

        ydb.disconnect()
    });

    it("isNumber^%mindUtils: '12.23'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.isNumber('12.23')

        expect(res).to.be.true

        ydb.disconnect()
    });
    it("isNumber^%mindUtils: '34.67667+'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.isNumber('34.67667+')

        expect(res).to.be.false

        ydb.disconnect()
    });

    it("isValidApiName^%mindUtils: '12er'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.isValidApiName('12er')

        expect(res).to.be.false

        ydb.disconnect()
    });

    it("isValidApiName^%mindUtils: '_12er'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.isValidApiName('_12er')

        expect(res).to.be.true

        ydb.disconnect()
    });

    it("isValidApiName^%mindUtils: '__aa'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.isValidApiName('__aa')

        expect(res).to.be.true

        ydb.disconnect()
    });

    it("isValidApiName^%mindUtils: '12er'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.isValidApiName('12er')

        expect(res).to.be.false

        ydb.disconnect()
    });

    it("isValidApiName^%mindUtils: '_1er'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.isValidApiName('_1er')

        expect(res).to.be.true

        ydb.disconnect()
    });

    it("log^%mindLogger: 'This is a message'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.logToConsole('This is a message')

        expect(res).to.be.undefined

        ydb.disconnect()
    });

    it("convertLevelNumber^%mindLogger: 2", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.convertLevelNumber(2)

        expect(res).to.have.string('commands')

        ydb.disconnect()
    });

    it("getFileProps^%ydbguiUtils: '/opt/yottadb'", async () => {
        const ydb = await createYdbInstance('test-existing')

        const res = await ydb.level_1.getFileProps('/opt/yottadb')

        console.log(res)
        expect(res.accessRightsOctal === 16877).to.be.true

        ydb.disconnect()
    });

    it("badEntryPoint", async () => {
        const ydb = await createYdbInstance('test-existing')

        try {
            const res = await ydb.level_1.badEntryPoint('/opt/yottadb')

        } catch (err) {
            expect(err.message).to.have.string("M code not found")
        }

        ydb.disconnect()
    });
})