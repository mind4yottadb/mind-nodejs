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

            expect(parseInt(res.pSystemTime) >= 0).to.be.true
            expect(parseInt(res.pUserTime) >= 0).to.be.true
            expect(parseInt(res.tCpu) >= 0).to.be.true

        } catch (err) {
            console.log(err)
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
        const ydb = await createYdbInstance()

        const res = await ydb.server.GUID(true)
        expect(res.indexOf('-') > -1).to.be.true

        ydb.disconnect()
    });

    it("dashed = false", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.server.GUID(false)
        expect(res.indexOf('-') === -1).to.be.true

        ydb.disconnect()
    });

    it("dashed = true, braced = false", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.server.GUID(true, false)
        expect(res.indexOf('{') === -1).to.be.true

        ydb.disconnect()
    });

    it("dashed = false, braced = true", async () => {
        const ydb = await createYdbInstance()

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
})

describe("server.plist()", async () => {

    it("list and validate", async () => {
        const ydb = await createYdbInstance()

        const plist = await ydb.server.plist()

        expect(plist[0].pid === 1).to.be.true
        expect(plist[0].ppid === 0).to.be.true
        expect(plist[0].command).to.have.string('/sbin/docker-init -- sleep infinity')
        expect(plist[0].uid).to.have.string('root')

        ydb.disconnect()
    });
})

describe("server.datetime()", async () => {
    it("get datetime", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.datetime()
            expect(res.year !== undefined).to.be.true
            expect(res.timezone !== undefined).to.be.true
            expect(res.second !== undefined).to.be.true
            expect(res.month !== undefined).to.be.true
            expect(res.minute !== undefined).to.be.true
            expect(res.hour !== undefined).to.be.true
            expect(res.daylightSaving !== undefined).to.be.true
            expect(res.dayOfMonth !== undefined).to.be.true
            expect(res.dayOfWeek !== undefined).to.be.true
            expect(res.dayOfYear !== undefined).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });
})

describe("server.unixtime()", async () => {
    it("get unixtime", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.unixtime()
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });
})

describe("server.now()", async () => {
    it("get timestamp with no params", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.now()
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });


    it("get timestamp in us", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.now('us')
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("get timestamp in ms", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.now('ms')
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("get timestamp with bad param", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.now('usa')
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Resolution can be either')
        }

        ydb.disconnect()
    });
})

describe("server.horolog()", async () => {
    it("get horolog and check all fields", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.server.horolog()

        expect(res.horolog !== '').to.be.true
        expect(res.microseconds > 0).to.be.true
        expect(res.utcOffset !== undefined).to.be.true

        ydb.disconnect()
    });
})

