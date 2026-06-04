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

const {exit} = require('process')
const {expect} = require("chai");
const {createYdbInstance, sleep} = require("../../utils.cjs");
const mindServer = require("../../../js");

describe("Pool dynamic: connect-errors", async () => {
    it("all good, should connect and authorize", async () => {
        let session
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin'
            })

            const [session2, guid] = await pool.createNewSession()

            session = session2

            session.disconnect()


        } catch (err) {
            session.disconnect()

            expect(err.message).to.have.string('bad')
        }
    });

    it("try to get an existing session by GUID", async () => {
        let session
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin'
            })

            const [session1, guid] = await pool.createNewSession()

            const session2 = await pool.getSessionByGUID(guid)

            session = session1

            session.disconnect()
            session2.disconnect()


        } catch (err) {
            if (session) session.disconnect()

            expect(err.message).to.have.string('POOL_SESSION_IN_USE')
        }

    });

    it("try to get a non-existing session by GUID", async () => {
        let session
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin'
            })

            const [session1, guid] = await pool.createNewSession()

            const session2 = await pool.getSessionByGUID(guid + 'aaa')

            session = session1

            session.disconnect()
            session2.disconnect()


        } catch (err) {
            if (session) session.disconnect()

            expect(err.message).to.have.string('guid does not exist')
        }

    });

    it("try to get a busy session by GUID", async () => {
        let session
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin'
            })

            const [session1, guid] = await pool.createNewSession()
            session = session1
            const session2 = await pool.getSessionByGUID(guid)
            const session3 = await pool.getSessionByGUID(guid)

            session.disconnect()


        } catch (err) {
            if (session) session.disconnect()
            if (typeof session1 !== 'undefined') session2.disconnect()
            if (typeof session2 !== 'undefined') session2.disconnect()
            if (typeof session3 !== 'undefined') session2.disconnect()

            expect(err.message).to.have.string('session in use')
        }

    });

    it("try to get a released session by GUID", async () => {
        let session
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin'
            })

            const [session1, guid] = await pool.createNewSession()
            session = session1
            session.done()

            const session3 = await pool.getSessionByGUID(guid)

            session.disconnect()


        } catch (err) {
            session.disconnect()

            expect(err.message).to.have.string('should not occur')
        }

    });

    it("try to get a session out of a full pool", async () => {
        let session
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin',
            }, 1)

            const [session1, guid] = await pool.createNewSession()
            session = session1

            const [session2, guid2] = await pool.createNewSession()

            session.disconnect()


        } catch (err) {
            session.disconnect()

            expect(err.message).to.have.string('POOL_NO_MORE_SLOTS')
        }
    });

    it("try to get a released session by GUID and check the vars", async () => {
        let session
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin',
                options: {
                    uApi: {appName: "test-vars"},
                }
            })

            const [session1, guid] = await pool.createNewSession()
            session = session1

            // set the var testVar1
            await session.db.vars.testVar1.setValue(1234)

            session.done()

            const session3 = await pool.getSessionByGUID(guid)

            const foundInVar = await session3.db.vars.testVar1.getValue()

            expect(foundInVar).to.equal(1234)

            session.disconnect()

        } catch (err) {
            session.disconnect()

            expect(err.message).to.have.string('should not occur')
        }
    });
})


