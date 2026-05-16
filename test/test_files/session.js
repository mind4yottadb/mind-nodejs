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