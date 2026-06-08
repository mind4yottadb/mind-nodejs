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

describe("Pool static: not created error", async () => {
    it("destroy()", async () => {
        const pool = new mindServer.staticPool(3)

        try {
            pool.destroy()

            expect(1 === 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
        }
    })

    it("getSession()", async () => {
        const pool = new mindServer.staticPool(3)

        try {
            const session = await pool.getSession()

            expect(1 === 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
        }
    })

    it("_getDevOpsSession()", async () => {
        const pool = new mindServer.staticPool(3)

        try {
            const session = await pool.devOps._getDevOpsSession()

            expect(1 === 2).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
        }
    })
})