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

describe("Pool: creation / destroy", async () => {
    describe("Pool creation: size", async () => {
        it("with no param at all", async () => {
            try {
                const pool = new mindServer.staticPool()

            } catch (err) {
                expect(err.message).to.have.string('Missing pool size')
            }
        });

        it("with string as pool size", async () => {
            try {
                const pool = new mindServer.staticPool('test')

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with boolean as pool size", async () => {
            try {
                const pool = new mindServer.staticPool(false)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with null as pool size", async () => {
            try {
                const pool = new mindServer.staticPool(null)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with object as pool size", async () => {
            try {
                const pool = new mindServer.staticPool({test: 12})

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with number < 2", async () => {
            try {
                const pool = new mindServer.staticPool(1)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be at least 2')
            }
        });

        it("with number < 2", async () => {
            try {
                const pool = new mindServer.staticPool(-23)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be at least 2')
            }
        });
    })

    describe("Pool creation: extend", async () => {
        it("with string as extend size", async () => {
            try {
                const pool = new mindServer.staticPool(64, 'test')

            } catch (err) {
                expect(err.message).to.have.string('Pool extension must be a number')
            }
        });

        it("with number < 1", async () => {
            try {
                const pool = new mindServer.staticPool(64, -2)

            } catch (err) {
                expect(err.message).to.have.string('Pool extension must be at least 1')
            }
        });
    })

    describe("Pool creation: create()", async () => {
        it("invalid, missing parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create()

            } catch (err) {
                expect(err.message).to.have.string('host must be a string')
            }
        })

        it("invalid, missing parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost')

            } catch (err) {
                expect(err.message).to.have.string('port must be a number')
            }
        })

        it("invalid, missing parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost', 100)

            } catch (err) {
                expect(err.message).to.have.string('username must be a string')
            }
        })

        it("invalid, missing password parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost', 100, "user")

            } catch (err) {
                expect(err.message).to.have.string('password must be a string')
            }
        })

        it("invalid, missing password parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost', 100, "user", "pass", "options")

            } catch (err) {
                expect(err.message).to.have.string('options must be an object')
            }
        })


        it("invalid, with no extension", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('127.0.0.1', 10000, 'admin', 'admin2', {})

            } catch (err) {
                expect(err.message).to.have.string('LOGIN FAILED Invalid credentials')
            }
        })

        it("valid, with no extension", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            pool.destroy()
        });

        it("valid, with extension", async () => {
            const pool = new mindServer.staticPool(8, 4)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(8);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            pool.destroy()
        });
    })

    describe("Pool creation: destroy()", async () => {
        it("invalid, with no extension", async () => {
            const pool = new mindServer.staticPool(8, 4)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(8);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);

            pool.destroy()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtended).to.equal(0);
        })
    })
})

