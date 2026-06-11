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
const {createYdbInstance, sleep} = require("../../utils.cjs");
const mindServer = require("../../../js");

describe("Pool static: devOps", async () => {
    describe("setLogLevel()", async () => {
        it("with LOG_LEVEL_TIMINGS", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setLogLevel(pool.devOps.LOG_LEVEL_TIMINGS)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.logLevel).to.be.equal(pool.devOps.LOG_LEVEL_TIMINGS)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with LOG_LEVEL_NONE", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setLogLevel(pool.devOps.LOG_LEVEL_NONE)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.logLevel).to.be.equal(pool.devOps.LOG_LEVEL_NONE)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with LOG_LEVEL_COMMANDS", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setLogLevel(pool.devOps.LOG_LEVEL_COMMANDS)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.logLevel).to.be.equal(pool.devOps.LOG_LEVEL_COMMANDS)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });
    })

    describe("setDumpRequest()", async () => {
        it("with DUMP_REQUEST_ON", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setDumpRequest(pool.devOps.DUMP_REQUEST_ON)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.dumpRequest).to.be.equal(pool.devOps.DUMP_REQUEST_ON)

            } catch (err) {
                console.log(err)
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with DUMP_REQUEST_OFF", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setDumpRequest(pool.devOps.DUMP_REQUEST_OFF)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.dumpRequest).to.be.equal(pool.devOps.DUMP_REQUEST_OFF)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });
    })

    describe("setDumpResponse()", async () => {
        it("with DUMP_RESPONSE_ON", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setDumpResponse(pool.devOps.DUMP_RESPONSE_ON)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.dumpResponse).to.be.equal(pool.devOps.DUMP_RESPONSE_ON)

            } catch (err) {
                console.log(err)
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with DUMP_RESPONSE_OFF", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setDumpResponse(pool.devOps.DUMP_RESPONSE_OFF)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.dumpResponse).to.be.equal(pool.devOps.DUMP_RESPONSE_OFF)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });
    })

    describe("setStats()", async () => {
        it("with STATS_GRAND_TOTALS", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setStats(pool.devOps.STATS_GRAND_TOTALS)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.stats).to.be.equal(pool.devOps.STATS_GRAND_TOTALS)

            } catch (err) {
                console.log(err)
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with STATS_DETAILS", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setStats(pool.devOps.STATS_DETAILS)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.stats).to.be.equal(pool.devOps.STATS_DETAILS)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with STATS_NONE", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setStats(pool.devOps.STATS_NONE)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.stats).to.be.equal(pool.devOps.STATS_NONE)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });
    })

    describe("setErrorDump()", async () => {
        it("with ERROR_DUMP_NONE", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setErrorDump(pool.devOps.ERROR_DUMP_NONE)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.errorDump).to.be.equal(pool.devOps.ERROR_DUMP_NONE)

            } catch (err) {
                console.log(err)
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with ERROR_DUMP_BRIEF", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setErrorDump(pool.devOps.ERROR_DUMP_BRIEF)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.errorDump).to.be.equal(pool.devOps.ERROR_DUMP_BRIEF)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with ERROR_DUMP_FULL", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setErrorDump(pool.devOps.ERROR_DUMP_FULL)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.errorDump).to.be.equal(pool.devOps.ERROR_DUMP_FULL)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });
    })

    describe("setIdleTimeout()", async () => {
        it("with 0 (unlimited)", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setIdleTimeout(0)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.idleTimeout).to.be.equal(0)

            } catch (err) {
                console.log(err)
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with 20 minutes", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setIdleTimeout(20)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.idleTimeout).to.be.equal(20)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });

        it("with 60 minutes", async function () {
            const pool = new mindServer.staticPool(2)
            await pool.create('127.0.0.1', 10000, 'admin', 'admin')

            try {
                await pool.devOps.setIdleTimeout(60)
                const settings = await pool.sessions[0].session.session.getCurrentSettings()
                expect(settings.idleTimeout).to.be.equal(60)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER')
            }

            pool.destroy()
        });
    })
})