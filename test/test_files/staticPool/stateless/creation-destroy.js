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
const {createYdbInstance} = require("../../../utils.cjs");
const mindServer = require("../../../../js");

describe("Pool creation: size", async () => {
    it("with no type at all", async () => {
        try {
            const pool = new mindServer.staticPool()

        } catch (err) {
            expect(err.message).to.have.string('Type must be a string')
        }
    });

    it("with bad type", async () => {
        try {
            const pool = new mindServer.staticPool(true)

        } catch (err) {
            expect(err.message).to.have.string('Type must be a string')
        }
    });

    it("with bad type", async () => {
        try {
            const pool = new mindServer.staticPool([])

        } catch (err) {
            expect(err.message).to.have.string('Type must be a string')
        }
    });

    it("with bad type", async () => {
        try {
            const pool = new mindServer.staticPool({})

        } catch (err) {
            expect(err.message).to.have.string('Type must be a string')
        }
    });

    it("with bad type", async () => {
        try {
            const pool = new mindServer.staticPool(23)

        } catch (err) {
            expect(err.message).to.have.string('Type must be a string')
        }
    });

    it("with bad type", async () => {
        try {
            const pool = new mindServer.staticPool('test')

        } catch (err) {
            expect(err.message).to.have.string('Type must be either')
        }
    });

    it("with no param at all", async () => {
        try {
            const pool = new mindServer.staticPool('stateless')

        } catch (err) {
            expect(err.message).to.have.string('Missing pool size')
        }
    });

    it("with string as pool size", async () => {
        try {
            const pool = new mindServer.staticPool('stateless', 'test')

        } catch (err) {
            expect(err.message).to.have.string('Pool size must be a number')
        }
    });

    it("with boolean as pool size", async () => {
        try {
            const pool = new mindServer.staticPool('stateless', false)

        } catch (err) {
            expect(err.message).to.have.string('Pool size must be a number')
        }
    });

    it("with null as pool size", async () => {
        try {
            const pool = new mindServer.staticPool('stateless', null)

        } catch (err) {
            expect(err.message).to.have.string('Pool size must be a number')
        }
    });

    it("with object as pool size", async () => {
        try {
            const pool = new mindServer.staticPool('stateless', {test: 12})

        } catch (err) {
            expect(err.message).to.have.string('Pool size must be a number')
        }
    });

    it("with number < 2", async () => {
        try {
            const pool = new mindServer.staticPool('stateless', 1)

        } catch (err) {
            expect(err.message).to.have.string('Pool size must be at least 2')
        }
    });

    it("with number < 2", async () => {
        try {
            const pool = new mindServer.staticPool('stateless', -23)

        } catch (err) {
            expect(err.message).to.have.string('Pool size must be at least 2')
        }
    });
})

describe("Pool creation: extend", async () => {
    it("with string as extend size", async () => {
        try {
            const pool = new mindServer.staticPool('stateless', 64, 'test')

        } catch (err) {
            expect(err.message).to.have.string('Pool extension must be a number')
        }
    });

    it("with number < 1", async () => {
        try {
            const pool = new mindServer.staticPool('stateless', 64, -2)

        } catch (err) {
            expect(err.message).to.have.string('Pool size must be at least 2')
        }
    });
})

describe("Pool creation: create()", async () => {
    it("invalid, missing parameters", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.create()

        } catch (err) {
            expect(err.message).to.have.string('host must be a string')
        }
    })

    it("invalid, missing parameters", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.create('myHost')

        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }
    })

    it("invalid, missing parameters", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.create('myHost', 100)

        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }
    })

    it("invalid, missing password parameters", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.create('myHost', 100, "user")

        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }
    })

    it("invalid, missing password parameters", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.create('myHost', 100, "user", "pass", "options")

        } catch (err) {
            expect(err.message).to.have.string('options must be an object')
        }
    })


    it("invalid, with no extension", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.create('127.0.0.1', 10000, 'admin', 'admin2', {})

        } catch (err) {
            expect(err.message).to.have.string('LOGIN FAILED Invalid credentials')
        }
    })

    it("valid, with no extension", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
        const status = pool.getStatus()

        expect(status.sessionsTotal).to.equal(3);
        expect(status.sessionsInUse).to.equal(0);
        expect(status.sessionsExtended).to.equal(0);

        pool.destroy()
    });

    it("valid, with extension", async () => {
        const pool = new mindServer.staticPool('stateless', 8, 4)

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
        const pool = new mindServer.staticPool('stateless', 8, 4)

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

describe("Pool creation: using stateful methods", async () => {
    it("calling createSession", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.createSession()

        } catch (err) {
            expect(err.message).to.have.string('This function is not available is stateless mode')
        }
    })

    it("calling getSessionByGUID", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.getSessionByGUID()

        } catch (err) {
            expect(err.message).to.have.string('This function is not available is stateless mode')
        }
    })

    it("calling terminateSession", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.terminateSession()

        } catch (err) {
            expect(err.message).to.have.string('This function is not available is stateless mode')
        }
    })
})