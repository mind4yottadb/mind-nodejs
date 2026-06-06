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
const {createYdbInstance, sleep} = require("../utils.cjs");

describe("session.stats()", async () => {
    /* COMMENTED OUT because of server startup switches...
    it("get stats when no stats are enabled", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.session.stats()
            console.log(res)


        } catch (err) {
            expect(err.message).to.have.string('No stats enabled on server')
        }

        ydb.disconnect()
    });

    it("get stats when grand stats are enabled", async () => {
        const ydb = await createYdbInstance('--statistics=grand')

        try {
            const res = await ydb.session.stats()
            console.log(res)


        } catch (err) {
            console.log(err)
            expect(err.message).to.have.string('No stats enabled on server')
        }

        ydb.disconnect()
    });

    it("get stats when details stats are enabled", async () => {
        const ydb = await createYdbInstance('--statistics=grand')

        try {
            const res = await ydb.session.stats()
            console.log(res)


        } catch (err) {
            console.log(err)
            expect(err.message).to.have.string('No stats enabled on server')
        }

        ydb.disconnect()
    });
     */
})

describe("session.timeSinceConnect()", async () => {
    it("wait 3 seconds and then check the returned value", async function () {
        this.timeout(10000)
        const ydb = await createYdbInstance()

        await sleep(3000)
        const res = await ydb.session.timeSinceConnect()
        expect(res > 1).to.be.true

        ydb.disconnect()
    });
})

describe("session.GUID", async () => {
    it("expect GUID to be 32 chars long", async function () {
        this.timeout(10000)
        const ydb = await createYdbInstance()

        const res = await ydb.session.GUID
        expect(res.length === 36).to.be.true

        ydb.disconnect()
    });
})

describe("session.serverPid", async () => {
    it("expect serverPid to be > 0", async function () {
        this.timeout(10000)
        const ydb = await createYdbInstance()

        const res = await ydb.session.serverPid
        expect(res > 0).to.be.true

        ydb.disconnect()
    });
})

describe("session.log()", async () => {
    it("pass an object as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.log({a: 2})

        } catch (err) {
            expect(err.message).to.have.string('logString parameter must be a string')
        }

        ydb.disconnect()
    });

    it("pass an array as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.log([{a: 2}])

        } catch (err) {
            expect(err.message).to.have.string('logString parameter must be a string')
        }

        ydb.disconnect()
    });

    it("pass a boolean as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.log(false)

        } catch (err) {
            expect(err.message).to.have.string('logString parameter must be a string')
        }

        ydb.disconnect()
    });

    it("pass null as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.log(null)

        } catch (err) {
            expect(err.message).to.have.string('logString parameter must be a string')
        }

        ydb.disconnect()
    });

    it("pass empty string", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.log()

        } catch (err) {
            expect(err.message).to.have.string('logString parameter must be a string')
        }

        ydb.disconnect()
    });

    it("pass string", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.log('test')

        } catch (err) {
            expect(err.message).to.have.string('logString parameter must be a string')
        }

        ydb.disconnect()
    });
})

describe("session.getCurrentSettings()", async () => {
    it("get current settings from session", async function () {
        this.timeout(10000)
        const ydb = await createYdbInstance()

        const res = await ydb.session.getCurrentSettings()
        expect(typeof res === 'object')
        expect(typeof res.dumpRequest === 'number')
        expect(typeof res.dumpResponse === 'number')
        expect(typeof res.errorDump === 'number')
        expect(typeof res.idleTimeout === 'number')
        expect(typeof res.logLevel === 'number')
        expect(typeof res.stats === 'number')
        expect(typeof res.logFile === 'string')
        expect(typeof res.userApiDir === 'string')

        ydb.disconnect()
    });
})

describe("session.setIdleTimeout()", async () => {
    it("with no parameters", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout()

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with string as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout('test')

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with boolean as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(true)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with null as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(null)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with object as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout({test: 12})

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with array as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout([1, 2, 3, 4])

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with number < 0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(-2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with number 0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(0)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.idleTimeout).to.equal(0)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with number >0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(5)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.idleTimeout).to.equal(5)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });
})

describe("session.setErrorDump()", async () => {
    it("with no parameters", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump()

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with string as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump('test')

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with boolean as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump(true)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with null as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump(null)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with object as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump({test: 12})

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with array as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump([1, 2, 3, 4])

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with number < 0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump(-2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with number >2", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump(2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump(ydb.session.ERROR_DUMP_NONE)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.errorDump).to.equal(0)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump(ydb.session.ERROR_DUMP_BRIEF)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.errorDump).to.equal(1)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setErrorDump(ydb.session.ERROR_DUMP_FULL)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.errorDump).to.equal(2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });
})

describe("session.setIdleTimeout()", async () => {
    it("with no parameters", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout()

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with string as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout('test')

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with boolean as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(true)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with null as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(null)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with object as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout({test: 12})

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with array as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout([1, 2, 3, 4])

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with number < 0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(-2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with number 0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(0)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.idleTimeout).to.equal(0)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with number >0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setIdleTimeout(5)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.idleTimeout).to.equal(5)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });
})

describe("session.setStats()", async () => {
    it("with no parameters", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats()

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with string as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats('test')

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with boolean as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats(true)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with null as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats(null)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with object as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats({test: 12})

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with array as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats([1, 2, 3, 4])

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with number < 0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats(-2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_BETWEEN_ZERO_AND_ONE')
        }

        ydb.disconnect()
    });

    it("with number >2", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats(3)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_BETWEEN_ZERO_AND_ONE')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats(ydb.session.STATS_NONE)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.stats).to.equal(0)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats(ydb.session.STATS_GRAND_TOTALS)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.stats).to.equal(1)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setStats(ydb.session.STATS_DETAILS)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.stats).to.equal(2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        ydb.disconnect()
    });
})

describe("session.setDumpRequest()", async () => {
    it("with no parameters", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest()

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with string as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest('test')

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with boolean as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest(true)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with null as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest(null)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with object as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest({test: 12})

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with array as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest([1, 2, 3, 4])

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with number < 0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest(-2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_ONE')
        }

        ydb.disconnect()
    });

    it("with number >2", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest(2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_ONE')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest(ydb.session.DUMP_REQUEST_OFF)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.dumpRequest).to.equal(0)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_ONE')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpRequest(ydb.session.DUMP_REQUEST_ON)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.dumpRequest).to.equal(1)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_ONE')
        }

        ydb.disconnect()
    });
})

describe("session.setDumpResponse()", async () => {
    it("with no parameters", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse()

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with string as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse('test')

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with boolean as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse(true)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with null as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse(null)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with object as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse({test: 12})

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with array as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse([1, 2, 3, 4])

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with number < 0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse(-2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_ONE')
        }

        ydb.disconnect()
    });

    it("with number >2", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse(2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_ONE')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse(ydb.session.DUMP_RESPONSE_OFF)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.dumpResponse).to.equal(0)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_ONE')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setDumpResponse(ydb.session.DUMP_RESPONSE_ON)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.dumpResponse).to.equal(1)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_ONE')
        }

        ydb.disconnect()
    });
})

describe("session.setLogLevel()", async () => {
    it("with no parameters", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel()

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with string as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel('test')

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with boolean as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel(true)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with null as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel(null)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with object as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel({test: 12})

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with array as parameter", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel([1, 2, 3, 4])

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        ydb.disconnect()
    });

    it("with number < 0", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel(-2)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_BETWEEN_ZERO_AND_THREE')
        }

        ydb.disconnect()
    });

    it("with number >2", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel(4)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_BETWEEN_ZERO_AND_THREE')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel(ydb.session.LOG_LEVEL_NONE)

            const ret = await ydb.session.getCurrentSettings()
            expect(ret.dumpResponse).to.equal(0)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_ONE')
        }

        ydb.disconnect()
    });

    it("with correct value using constant", async function () {
        const ydb = await createYdbInstance()

        try {
            await ydb.session.setLogLevel(ydb.session.LOG_LEVEL_SESSIONS)

            const ret = await ydb.session.getCurrentSettings()
            console.log(ret)
            expect(ret.logLevel).to.equal(1)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_BETWEEN_ZERO_AND_THREE')
        }

        ydb.disconnect()
    });
})