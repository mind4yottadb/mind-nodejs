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

describe("getStatus()", async () => {
    it("check info fields", async function () {
        const pool = new mindServer.staticPool(2)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(typeof status.GUID).to.have.string('string')
        expect(status.GUID.length).to.be.equal(36)

        expect(status.host).to.have.string('127.0.0.1')
        expect(status.port).to.be.equal(10000)
        expect(status.username).to.have.string('admin')
        expect(typeof status.options).to.have.string('object')
        expect(status.initialized).to.be.true

        pool.destroy()
    });

    it("check info fields for not initialized", async function () {
        const pool = new mindServer.staticPool(2)
        //await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(status.GUID).to.have.string('')
        expect(status.host).to.have.string('')
        expect(status.port).to.be.equal(0)
        expect(typeof status.options).to.have.string('object')
        expect(status.initialized).to.be.false
    });

    it("check size fields 1", async function () {
        const pool = new mindServer.staticPool(2)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(status.size).to.be.equal(2)
        expect(status.extensions).to.be.equal(0)
        expect(status.sessionsTotal).to.be.equal(2)
        expect(status.sessionsExtendedInUse).to.be.equal(0)
        expect(status.sessionsInUse).to.be.equal(0)

        pool.destroy()
    });

    it("check size fields 2", async function () {
        const pool = new mindServer.staticPool(5, 3)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(status.size).to.be.equal(5)
        expect(status.extensions).to.be.equal(3)
        expect(status.sessionsTotal).to.be.equal(5)
        expect(status.sessionsExtendedInUse).to.be.equal(0)
        expect(status.sessionsInUse).to.be.equal(0)

        pool.destroy()
    });

    it("check stats", async function () {
        const pool = new mindServer.staticPool(5, 3)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus()

        expect(status.stats.sessionsCreatedOk).to.be.equal(0)
        expect(status.stats.sessionsCreatedInError).to.be.equal(0)
        expect(status.stats.sessionsPeak).to.be.equal(0)
        expect(status.stats.sessionsDone).to.be.equal(0)
        expect(status.stats.extendsCreatedOk).to.be.equal(0)
        expect(status.stats.extendsCreatedInError).to.be.equal(0)
        expect(status.stats.extendsRemoved).to.be.equal(0)
        expect(status.stats.extendsPeak).to.be.equal(0)
        expect(status.stats.extendsDone).to.be.equal(0)
        expect(status.stats.noMoreSlotsHits).to.be.equal(0)
        expect(status.stats.noMoreSlotsHitsResolved).to.be.equal(0)
        expect(status.stats.timeoutExpired).to.be.equal(0)
        expect(status.stats.remoteDisconnects).to.be.equal(0)

        pool.destroy()
    });

    it("check stats with formatted numbers: verify type", async function () {
        const pool = new mindServer.staticPool(5, 3)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        const status = await pool.getStatus(true)

        expect(typeof status.stats.sessionsCreatedOk).to.be.equal('string')
        expect(typeof status.stats.sessionsCreatedInError).to.be.equal('string')
        expect(typeof status.stats.sessionsPeak).to.be.equal('string')
        expect(typeof status.stats.sessionsDone).to.be.equal('string')
        expect(typeof status.stats.extendsCreatedOk).to.be.equal('string')
        expect(typeof status.stats.extendsCreatedInError).to.be.equal('string')
        expect(typeof status.stats.extendsRemoved).to.be.equal('string')
        expect(typeof status.stats.extendsPeak).to.be.equal('string')
        expect(typeof status.stats.extendsDone).to.be.equal('string')
        expect(typeof status.stats.noMoreSlotsHits).to.be.equal('string')
        expect(typeof status.stats.noMoreSlotsHitsResolved).to.be.equal('string')
        expect(typeof status.stats.timeoutExpired).to.be.equal('string')
        expect(typeof status.stats.remoteDisconnects).to.be.equal('string')

        pool.destroy()
    });

    it("check stats with formatted numbers: verify formatting", async function () {
        const pool = new mindServer.staticPool(5, 3)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        pool.stats.sessionsCreatedOk = 123456
        pool.stats.sessionsCreatedInError = 123456
        pool.stats.sessionsPeak = 123456
        pool.stats.sessionsDone = 123456
        pool.stats.extendsCreatedOk = 123456
        pool.stats.extendsCreatedInError = 123456

        pool.stats.extendsRemoved = 123456
        pool.stats.extendsPeak = 123456
        pool.stats.extendsDone = 123456
        pool.stats.noMoreSlotsHits = 123456
        pool.stats.noMoreSlotsHitsResolved = 123456
        pool.stats.timeoutExpired = 123456
        pool.stats.remoteDisconnects = 123456

        const status = await pool.getStatus(true)

        expect(status.stats.sessionsCreatedOk).to.be.equal('123,456')
        expect(status.stats.sessionsCreatedInError).to.be.equal('123,456')
        expect(status.stats.sessionsPeak).to.be.equal('123,456')
        expect(status.stats.sessionsDone).to.be.equal('123,456')
        expect(status.stats.extendsCreatedOk).to.be.equal('123,456')
        expect(status.stats.extendsCreatedInError).to.be.equal('123,456')
        expect(status.stats.extendsRemoved).to.be.equal('123,456')
        expect(status.stats.extendsPeak).to.be.equal('123,456')
        expect(status.stats.extendsDone).to.be.equal('123,456')
        expect(status.stats.noMoreSlotsHits).to.be.equal('123,456')
        expect(status.stats.noMoreSlotsHitsResolved).to.be.equal('123,456')
        expect(status.stats.timeoutExpired).to.be.equal('123,456')
        expect(status.stats.remoteDisconnects).to.be.equal('123,456')

        pool.destroy()
    });
})

describe("resetStats()", async () => {
    it("populate, verify, reset, verify", async function () {
        const pool = new mindServer.staticPool(5, 3)
        await pool.create('127.0.0.1', 10000, 'admin', 'admin')

        pool.stats.sessionsCreatedOk = 123456
        pool.stats.sessionsCreatedInError = 123456
        pool.stats.sessionsPeak = 123456
        pool.stats.sessionsDone = 123456
        pool.stats.extendsCreatedOk = 123456
        pool.stats.extendsCreatedInError = 123456

        pool.stats.extendsRemoved = 123456
        pool.stats.extendsPeak = 123456
        pool.stats.extendsDone = 123456
        pool.stats.noMoreSlotsHits = 123456
        pool.stats.noMoreSlotsHitsResolved = 123456
        pool.stats.timeoutExpired = 123456
        pool.stats.remoteDisconnects = 123456

        let status = await pool.getStatus(true)

        expect(status.stats.sessionsCreatedOk).to.be.equal('123,456')
        expect(status.stats.sessionsCreatedInError).to.be.equal('123,456')
        expect(status.stats.sessionsPeak).to.be.equal('123,456')
        expect(status.stats.sessionsDone).to.be.equal('123,456')
        expect(status.stats.extendsCreatedOk).to.be.equal('123,456')
        expect(status.stats.extendsCreatedInError).to.be.equal('123,456')
        expect(status.stats.extendsRemoved).to.be.equal('123,456')
        expect(status.stats.extendsPeak).to.be.equal('123,456')
        expect(status.stats.extendsDone).to.be.equal('123,456')
        expect(status.stats.noMoreSlotsHits).to.be.equal('123,456')
        expect(status.stats.noMoreSlotsHitsResolved).to.be.equal('123,456')
        expect(status.stats.timeoutExpired).to.be.equal('123,456')
        expect(status.stats.remoteDisconnects).to.be.equal('123,456')

        pool.resetStats()

        status = await pool.getStatus()

        expect(status.stats.sessionsCreatedOk).to.be.equal(0)
        expect(status.stats.sessionsCreatedInError).to.be.equal(0)
        expect(status.stats.sessionsPeak).to.be.equal(0)
        expect(status.stats.sessionsDone).to.be.equal(0)
        expect(status.stats.extendsCreatedOk).to.be.equal(0)
        expect(status.stats.extendsCreatedInError).to.be.equal(0)
        expect(status.stats.extendsRemoved).to.be.equal(0)
        expect(status.stats.extendsPeak).to.be.equal(0)
        expect(status.stats.extendsDone).to.be.equal(0)
        expect(status.stats.noMoreSlotsHits).to.be.equal(0)
        expect(status.stats.noMoreSlotsHitsResolved).to.be.equal(0)
        expect(status.stats.timeoutExpired).to.be.equal(0)
        expect(status.stats.remoteDisconnects).to.be.equal(0)

        pool.destroy()
    });

})