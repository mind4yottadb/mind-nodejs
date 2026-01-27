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
const {createYdbInstance} = require("../utils.cjs");

describe("server.kill()", async () => {
    it("when pid is not a number", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.server.kill({})
            expect(1 > 2).to.be.true


        } catch (err) {
            expect(err.message).to.have.string('Parameter pid must be a number')
        }

        ydb.disconnect()
    });
})