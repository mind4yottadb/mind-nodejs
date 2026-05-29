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

            session = await pool.createNewSession()
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

            session = await pool.createNewSession()
            const guid = session.session.GUID
            const session2 = await pool.getSessionByGUID(guid)

            session.disconnect()


        } catch (err) {
            session.disconnect()

            expect(err.message).to.have.string('bad')
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

            session = await pool.createNewSession()
            const guid = session.session.GUID + '12'
            const session2 = await pool.getSessionByGUID(guid)

            session.disconnect()


        } catch (err) {
            session.disconnect()

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

            session = await pool.createNewSession()
            const guid = session.session.GUID
            const session2 = await pool.getSessionByGUID(guid)
            const session3 = await pool.getSessionByGUID(guid)

            session.disconnect()


        } catch (err) {
            session.disconnect()

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

            session = await pool.createNewSession()
            const guid = session.session.GUID
            const session2 = await pool.getSessionByGUID(guid)
            session2.done()

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

            session = await pool.createNewSession()

            const session2 = await pool.createNewSession()

            session.disconnect()


        } catch (err) {
            session.disconnect()

            expect(err.message).to.have.string('POOL_NO_MORE_SLOTS')
        }
    });
})