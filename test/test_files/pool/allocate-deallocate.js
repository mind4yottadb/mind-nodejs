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
const {createYdbInstance, sleep} = require("../../utils.cjs");
const mindServer = require("../../../js");

describe("getSession with no timeout, within ranges", async () => {

    it("get 1 session, check extra method", async () => {
        const pool = new mindServer.sessionsPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        let status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        const session = await pool.getSession()

        expect(typeof session.done === "function").to.be.true

        status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(1);
        expect(status.sessionsExtended).to.equal(0);

        pool.destroy()
    })

    it("get 1 extended session, check extra method", async () => {
        const pool = new mindServer.sessionsPool(3, 1)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        let status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        const session = await pool.getSession()
        const session2 = await pool.getSession()
        const session3 = await pool.getSession()
        const session4 = await pool.getSession()

        expect(typeof session4.done === "function").to.be.true

        status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(4);
        expect(status.sessionsInUse).to.equal(4);
        expect(status.sessionsExtended).to.equal(1);

        pool.destroy()
    })

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

    it("get 4 sessions, 3 regular and 1 extended, check count", async () => {
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

describe("getSession without timeout, outside range", async () => {
    it("get 3 session, done() one after one second", async () => {
        const pool = new mindServer.sessionsPool(2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        let status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(2);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        const session = await pool.getSession()
        const session2 = await pool.getSession()

        setTimeout(async () => {
            session.done()

        }, 1000)

        const session3 = await pool.getSession()

        status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(2);
        expect(status.sessionsInUse).to.equal(2);
        expect(status.sessionsExtended).to.equal(0);

        pool.destroy()
    })

    it("get 4 session, done() one after one second, extend", async () => {
        const pool = new mindServer.sessionsPool(2, 1)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        let status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(2);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        const session = await pool.getSession()
        const session2 = await pool.getSession()
        const session3 = await pool.getSession()

        setTimeout(async () => {
            session.done()

        }, 1000)

        const session4 = await pool.getSession()

        status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(3);
        expect(status.sessionsExtended).to.equal(1);

        session4.done()

        pool.destroy()
    })

    it("get 4 session, done() one after one second, extend, then done() all", async () => {
        const pool = new mindServer.sessionsPool(2, 1)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        let status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(2);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        const session = await pool.getSession()
        const session2 = await pool.getSession()
        const session3 = await pool.getSession()

        setTimeout(async () => {
            session.done()

        }, 1000)

        const session4 = await pool.getSession()

        session2.done()
        session3.done()
        session4.done()

        status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(2);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        pool.destroy()
    })
})