/*
#################################################################
#                                                               #
# Copyright (c) 2022-2025 YottaDB LLC and/or its subsidiaries.  #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
#################################################################
*/

const {expect} = require("chai");
const {createYdbInstance} = require("../utils.cjs");

describe("server.kill()", async () => {
    it("get process info for the current process", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.kill(999999999, ydb.server.SIG_INT)
            expect(1 > 2).to.be.true


        } catch (err) {
            expect(err.message).to.have.string('returned error:')
        }

        ydb.disconnect()
    });
})

describe("server.pinfo()", async () => {
    it("get process info for the current process", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.pinfo(0)

            expect(parseInt(res.cSystemTime) === 0).to.be.true
            expect(parseInt(res.cUserTime) === 0).to.be.true
            expect(parseInt(res.isAlive) === 1).to.be.true

            expect(parseInt(res.pSystemTime) === 0).to.be.true
            expect(parseInt(res.pUserTime) === 0).to.be.true
            expect(parseInt(res.tCpu) === 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("get process info for process 1", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.pinfo(1)

            expect(parseInt(res.cSystemTime) === 0).to.be.true
            expect(parseInt(res.cUserTime) === 0).to.be.true
            expect(parseInt(res.isAlive) === 1).to.be.true

            expect(parseInt(res.pSystemTime) > 0).to.be.true
            expect(parseInt(res.pUserTime) > 0).to.be.true
            expect(parseInt(res.tCpu) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("get process info for not existing process", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.pinfo(1233)

            expect(parseInt(res.cSystemTime) === -1).to.be.true
            expect(parseInt(res.cUserTime) === -1).to.be.true
            expect(parseInt(res.isAlive) === 0).to.be.true

            expect(parseInt(res.pSystemTime) === -1).to.be.true
            expect(parseInt(res.pUserTime) === -1).to.be.true
            expect(parseInt(res.tCpu) === -1).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });
})