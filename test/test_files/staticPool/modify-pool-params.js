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

describe("Pool static: changeSize()", async () => {
    it("pool not initialized", async () => {
        const pool = new mindServer.staticPool(3)

        try {
            await pool.changeSize('this is a string')

        } catch (err) {
            expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
        }

    })

    it("bad datatype for newSize: string", async () => {
        const pool = new mindServer.staticPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeSize('this is a string')

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        pool.destroy()
    })

    it("bad datatype for newSize: boolean", async () => {
        const pool = new mindServer.staticPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeSize(false)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        pool.destroy()
    })

    it("bad datatype for newSize: object", async () => {
        const pool = new mindServer.staticPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeSize({aa: 'this is a string'})

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        pool.destroy()
    })

    it("bad datatype for newSize: array", async () => {
        const pool = new mindServer.staticPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeSize([1, 2, 3, 45])

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        pool.destroy()
    })

    it("newSize < 2", async () => {
        const pool = new mindServer.staticPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeSize(1)

        } catch (err) {
            expect(err.message).to.have.string('POOL_SIZE_NOT_MIN_TWO')
        }

        pool.destroy()
    })

    it("newSize === size", async () => {
        const pool = new mindServer.staticPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeSize(3)

        } catch (err) {
            expect(err.message).to.have.string('POOL_NEWSIZE_SAME_AS_SIZE')
        }

        pool.destroy()
    })

    it("INCREASE: newSize === 6", async () => {
        const pool = new mindServer.staticPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        await pool.changeSize(6)
        const status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(6)

        // verify that the new sessions have the done() functions
        for (let ix = 0; ix < 6; ix++) {
            const session = await pool.getSession()

            expect(typeof session.done).to.have.string('function')
        }

        pool.destroy()
    })

    it("DECREASE: newSize === 6, pool clear", async () => {
        const pool = new mindServer.staticPool(5)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        await pool.changeSize(2)
        const status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(2)

        pool.destroy()
    })

    it("DECREASE: newSize === 6, pool busy", async () => {
        const pool = new mindServer.staticPool(5)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        const session1 = await pool.getSession()
        const session2 = await pool.getSession()
        const session3 = await pool.getSession()
        const session4 = await pool.getSession()

        try {
            await pool.changeSize(2)

        } catch (err) {
            expect(err.message).to.have.string('POOL_TOO_MANY_SESSIONS_IN_USE')
        }


        pool.destroy()
    })
})

describe("Pool static: changeExtension()", async () => {
    it("pool not initialized", async () => {
        const pool = new mindServer.staticPool(3, 2)

        try {
            await pool.changeExtension('this is a string')

        } catch (err) {
            expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
        }

    })

    it("bad datatype for newSize: string", async () => {
        const pool = new mindServer.staticPool(3, 2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeExtension('this is a string')

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        pool.destroy()
    })

    it("bad datatype for newSize: boolean", async () => {
        const pool = new mindServer.staticPool(3, 2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeExtension(false)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        pool.destroy()
    })

    it("bad datatype for newSize: object", async () => {
        const pool = new mindServer.staticPool(3, 2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeExtension({aa: 'this is a string'})

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        pool.destroy()
    })

    it("bad datatype for newSize: array", async () => {
        const pool = new mindServer.staticPool(3, 2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeExtension([1, 2, 3, 45])

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_NUMBER')
        }

        pool.destroy()
    })

    it("newSize < 0", async () => {
        const pool = new mindServer.staticPool(3, 2)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeExtension(-5)

        } catch (err) {
            expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER')
        }

        pool.destroy()
    })

    it("newSize === size", async () => {
        const pool = new mindServer.staticPool(3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

        try {
            await pool.changeExtension(3)

        } catch (err) {
            expect(err.message).to.have.string('POOL_NEWSIZE_SAME_AS_SIZE')
        }

        pool.destroy()
    })
})