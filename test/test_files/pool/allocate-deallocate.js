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
const {createYdbInstance} = require("../../utils.cjs");
const mindServer = require("../../../js");

describe("getSession", async () => {
    it("get 1 session, check count", async () => {
        const pool = new mindServer.sessionsPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        let status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        const session = await pool.getSession()

        status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(1);
        expect(status.sessionsExtended).to.equal(0);

        pool.destroy()
    })

    it("get 2 sessions, check count", async () => {
        const pool = new mindServer.sessionsPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        let status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        const session1 = await pool.getSession()
        const session2 = await pool.getSession()

        status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(2);
        expect(status.sessionsExtended).to.equal(0);

        pool.destroy()
    })

    it("get 3 sessions, check count", async () => {
        const pool = new mindServer.sessionsPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        let status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        const session1 = await pool.getSession()
        const session2 = await pool.getSession()
        const session3 = await pool.getSession()

        status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(3);
        expect(status.sessionsExtended).to.equal(0);

        pool.destroy()
    })

    it("get 4 sessions, check count", async () => {
        const pool = new mindServer.sessionsPool(3, 1)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        let status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        const session1 = await pool.getSession()
        const session2 = await pool.getSession()
        const session3 = await pool.getSession()
        const session4 = await pool.getSession()

        status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(4);
        expect(status.sessionsInUse).to.equal(4);
        expect(status.sessionsExtended).to.equal(1);

        await pool.destroy()
    })

})