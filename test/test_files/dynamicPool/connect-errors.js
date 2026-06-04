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
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin'
            })

            await pool.verifyConnection()


        } catch (err) {
            expect(err.message).to.have.string('bad')
        }
    });

    it("with bad credentials", async () => {
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin2'
            })

            await pool.verifyConnection()


        } catch (err) {
            expect(err.message).to.have.string('LOGIN_FAILED,Invalid credentials')
        }
    });

    it("with bad credentials", async () => {
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin2",
                password: 'admin'
            })

            await pool.verifyConnection()


        } catch (err) {
            expect(err.message).to.have.string('LOGIN_FAILED,Invalid credentials')
        }
    });

    it("with bad host", async function () {
        this.timeout(50000)
        try {
            const pool = new mindServer.dynamicPool({
                host: 'www.microsoft.com',
                port: 10000,
                username: "admin2",
                password: 'admin',
                options: {
                    connectTimeout: 2000
                }
            })

            await pool.verifyConnection()

        } catch (err) {
            expect(err.message).to.have.string('TIMEOUT_OCCURRED,timeout while trying')
        }
    });

    it("with bad app name", async () => {
        try {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 10000,
                username: "admin",
                password: 'admin',
                options: {
                    uApi: {appName: 'unit-test-not-existing'}

                }
            })

            await pool.verifyConnection()


        } catch (err) {
            expect(err.message).to.have.string('APP_NOT_FOUND,app: unit-test-not')
        }
    });

})