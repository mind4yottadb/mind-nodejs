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

describe("server.kill()", async () => {
    it("when pid is not a number", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.kill({})
            expect(1 > 2).to.be.true


        } catch (err) {
            expect(err.message).to.have.string('Parameter pid must be a number')
        }

        ydb.disconnect()
    });

    it("when sigNumber is not a number", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.kill(123, {})
            expect(1 > 2).to.be.true


        } catch (err) {
            expect(err.message).to.have.string('Parameter sigNumber must be a number')
        }

        ydb.disconnect()
    });

    it("kills a non existing process", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.kill(9999999, ydb.server.SIG_INT)
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

    /*
    it("get process info for process 1", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.pinfo(1)

            expect(parseInt(res.cSystemTime) === 0).to.be.false
            expect(parseInt(res.cUserTime) === 0).to.be.false
            expect(parseInt(res.isAlive) === 0).to.be.false

            expect(parseInt(res.pSystemTime) > 0).to.be.true
            expect(parseInt(res.pUserTime) > 0).to.be.true
            expect(parseInt(res.tCpu) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

     */

    it("get process info for not existing process", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.pinfo(999999999)

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

describe("server.GUID()", async () => {
    it("with params other than boolean", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.GUID({})
            expect(1 > 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Parameter must be a boolean')
        }

        ydb.disconnect()
    });

    it("with params other than boolean", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.GUID('')
            expect(1 > 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Parameter must be a boolean')
        }

        ydb.disconnect()
    });

    it("with params other than boolean", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.GUID(9)
            expect(1 > 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Parameter must be a boolean')
        }

        ydb.disconnect()
    });

    it("with params other than boolean", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.GUID([])
            expect(1 > 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Parameter must be a boolean')
        }

        ydb.disconnect()
    });

    it("with params other than boolean", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.GUID(false, {})
            expect(1 > 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Parameter must be a boolean')
        }

        ydb.disconnect()
    });

    it("with params other than boolean", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.GUID(false, '')
            expect(1 > 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Parameter must be a boolean')
        }

        ydb.disconnect()
    });

    it("with params other than boolean", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.GUID(false, 9)
            expect(1 > 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Parameter must be a boolean')
        }

        ydb.disconnect()
    });

    it("with params other than boolean", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.GUID(false, [])
            expect(1 > 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Parameter must be a boolean')
        }

        ydb.disconnect()
    });

    it("without params", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.server.GUID()
        expect(res.indexOf('-') > -1).to.be.true

        ydb.disconnect()
    });

    it("dashed = true", async () => {
        const ydb = await createYdbInstance(true)

        const res = await ydb.server.GUID()
        expect(res.indexOf('-') > -1).to.be.true

        ydb.disconnect()
    });

    it("dashed = false", async () => {
        const ydb = await createYdbInstance(false)

        const res = await ydb.server.GUID(false)
        expect(res.indexOf('-') === -1).to.be.true

        ydb.disconnect()
    });

    it("dashed = true, braced = false", async () => {
        const ydb = await createYdbInstance(true, false)

        const res = await ydb.server.GUID()
        expect(res.indexOf('{') === -1).to.be.true

        ydb.disconnect()
    });

    it("dashed = false, braced = true", async () => {
        const ydb = await createYdbInstance(false)

        const res = await ydb.server.GUID(false, true)
        expect(res.charAt(0) === '{').to.be.true
        expect(res.charAt(res.length - 1) === '}').to.be.true

        ydb.disconnect()
    });
})

describe("server.listSessions()", async () => {

    it("list only yourself", async () => {
        const ydb = await createYdbInstance()

        const sessions = await ydb.server.listSessions()
        const oldSessionCount = sessions.length

        const ydb2 = await createYdbInstance()
        const res = await ydb.server.listSessions()
        expect(res.length === oldSessionCount + 1).to.be.true

        ydb.disconnect()
        ydb2.disconnect()

    });

    it("list yourself and another session", async () => {
        const ydb = await createYdbInstance()

        const sessions = await ydb.server.listSessions()
        const oldSessionCount = sessions.length

        const ydb2 = await createYdbInstance()
        const ydb3 = await createYdbInstance()

        const res = await ydb.server.listSessions()
        expect(res.length === oldSessionCount + 2).to.be.true

        ydb.disconnect()
        ydb2.disconnect()
        ydb3.disconnect()
    });

})