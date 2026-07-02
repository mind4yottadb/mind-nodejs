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

describe("Pool static: allocate / deallocate", async () => {
    describe("getSession with no timeout, within ranges", async () => {
        it("get 1 session, check extra method", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);

            const session = await pool.getSession()

            expect(typeof session.done === "function").to.be.true

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(1);
            expect(status.sessionsExtendedInUse).to.equal(0);

            pool.destroy()
        })
    })
})
