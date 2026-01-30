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

describe("process.memUsage()", async () => {
    it("get memUsage", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.memUsage()

            expect(parseInt(res.allocatedStorage) > 0).to.be.true
            expect(parseInt(res.realStorage) > 0).to.be.true
            expect(parseInt(res.usedStorage) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });
})

describe("process.datetime()", async () => {
    it("get datetime", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.datetime()
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

describe("process.unixtime()", async () => {
    it("get unixtime", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.unixtime()
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });
})

describe("process.now()", async () => {
    it("get timestamp with no params", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.now()
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("get timestamp in us", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.now('us')
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("get timestamp in ms", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.now('ms')
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("get timestamp with bad param", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.now('usa')
            expect(parseInt(res) > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('Resolution can be either')
        }

        ydb.disconnect()
    });
})

describe("process.exec()", async () => {
    it("when command is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.exec('')

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("when command is not a string", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.exec({test: 2})

        } catch (err) {
            expect(err.message).to.have.string('Parameter command must be a string')
        }

        ydb.disconnect()
    });

    it("when shell is not a string", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.exec('thisisastring', {test: 2})

        } catch (err) {
            expect(err.message).to.have.string('Parameter shell must be a string')
        }

        ydb.disconnect()
    });

    it("when command is bad", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.exec('lsa -la')

        } catch (err) {
            expect(err.message).to.have.string('the command returned error:')
        }

        ydb.disconnect()
    });

    it("when command is ok", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.exec('ls -la')
            expect(res.length > 50).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command returned error:')
        }

        ydb.disconnect()
    });

    it("when command is ok, shell is ok", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.exec('ls -la', '/bin/bash')
            expect(res.length > 50).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command returned error:')
        }

        ydb.disconnect()
    });

    it("when command is ok, shell is bad", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.exec('ls -la', '/bash')
            expect(res.length > 50).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command returned error:')
        }

        ydb.disconnect()
    });
})

describe("process.spawn()", async () => {
    it("when command is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.spawn('')

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("when command is not a string", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.spawn({test: 2})

        } catch (err) {
            expect(err.message).to.have.string('Parameter command must be a string')
        }

        ydb.disconnect()
    });

    it("when logFile is not a string", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.spawn('thisisastring', {test: 2})

        } catch (err) {
            expect(err.message).to.have.string('Parameter logFile must be a string')
        }

        ydb.disconnect()
    });


    it("when command is valid", async () => {

        const ydb = await createYdbInstance()

        try {
            const pid = await ydb.process.spawn('sleep 5')
            expect(pid > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("when command is valid and out file is provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const pid = await ydb.process.spawn('ls; sleep 5', '/tmp/test.spawn')
            expect(pid > 0).to.be.true

            try {
                const out = await ydb.fs.readFile('/tmp/test.spawn')
                expect(typeof out === 'number')

            } catch (err) {
                expect(err.message).to.have.string('should not happen')
            }

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });
})

describe("globals.showLocks()", async function () {
    this.timeout(20000)

    it("set locks and display them ", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.addLock()
        const res = await ydb.process.showLocks()

        expect(res['^temp'] === '1').to.be.true

        ydb.disconnect()
    });
})

describe("globals.deleteAllLocks()", async function () {
    this.timeout(20000)

    it("add multiple locks and then delete them ", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.addLock()
        await ydb.db.globals.globalTest.addLock()

        const res = await ydb.process.showLocks()
        expect(Object.keys(res).length === 2).to.be.true

        await ydb.process.removeAllLocks()

        const res2 = await ydb.process.showLocks()
        expect(Object.keys(res2).length === 0).to.be.true

        ydb.disconnect()
    });
})

describe("globals.groupLocks()", async function () {
    this.timeout(20000)

    it("add multiple locks and commit them ", async () => {
        const ydb = await createYdbInstance()

        await ydb.process.groupLocks()

        await ydb.db.globals.temp.addLock()
        await ydb.db.globals.globalTest.addLock()

        await ydb.process.commitLocks()

        const res = await ydb.process.showLocks()
        expect(Object.keys(res).length === 2).to.be.true

        ydb.disconnect()
    });
})

describe("globals.clearLocksGroup()", async function () {
    this.timeout(20000)

    it("add multiple locks, clear, add one and show them, it should list only one ", async () => {
        const ydb = await createYdbInstance()

        await ydb.process.groupLocks()

        await ydb.db.globals.temp.addLock()
        await ydb.db.globals.globalTest.addLock()

        await ydb.process.clearLocksGroup()
        await ydb.process.groupLocks()

        await ydb.db.globals.globalTest.addLock()

        await ydb.process.commitLocks()

        const res = await ydb.process.showLocks()
        expect(Object.keys(res).length === 1).to.be.true

        ydb.disconnect()
    });
})

describe("globals.commitLocks()", async function () {
    this.timeout(20000)

    it("when locks group is not started ", async () => {
        const ydb = await createYdbInstance()

        await ydb.db.globals.temp.addLock()
        await ydb.db.globals.globalTest.addLock()

        try {
            await ydb.process.commitLocks()

        } catch (err) {
            expect(err.message).to.have.string('No lock group started, execute groupLocks() first')
        }

        ydb.disconnect()
    });

    it("when locks group is empty ", async () => {
        const ydb = await createYdbInstance()

        await ydb.process.groupLocks()

        try {
            await ydb.process.commitLocks()

        } catch (err) {
            expect(err.message).to.have.string('No locks defined')
        }

        ydb.disconnect()
    });

    it("create two locks and commit them without timeout ", async () => {
        const ydb = await createYdbInstance()

        await ydb.process.groupLocks()

        await ydb.db.globals.temp.addLock()
        await ydb.db.globals.globalTest.addLock()

        try {
            await ydb.process.commitLocks()

            expect(1 === 1).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('No locks defined')
        }

        ydb.disconnect()
    });

    it("lock with timeout, lock within timeout ", async function () {
        const ydb = await createYdbInstance()
        const ydb2 = await createYdbInstance()

        await ydb2.db.globals.temp.addLock()

        setTimeout(async () => {
            ydb2.disconnect()

        }, 2000)

        await ydb.process.groupLocks()

        await ydb.db.globals.temp.addLock()
        await ydb.db.globals.globalTest.addLock()

        await ydb.process.commitLocks(4)

        ydb.disconnect()
    });

    it("lock with timeout, let timeout expire ", async function () {
        const ydb = await createYdbInstance()
        const ydb2 = await createYdbInstance()

        await ydb2.db.globals.temp.addLock()

        setTimeout(async () => {
            ydb2.disconnect()

        }, 2000)

        await ydb.process.groupLocks()

        await ydb.db.globals.temp.addLock()
        await ydb.db.globals.globalTest.addLock()

        try {
            await ydb.process.commitLocks(1)

        } catch (err) {
            expect(err.message).to.have.string('timeout elapsed')
        }

        ydb.disconnect()
    });
})

describe("process.horolog()", async () => {
    it("get memUsage", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.process.horolog()

        expect(res.horolog !== '').to.be.true
        expect(res.microseconds > 0).to.be.true
        expect(res.utcOffset !== undefined).to.be.true

        ydb.disconnect()
    });
})

