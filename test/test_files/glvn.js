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

describe("glvn.hasValue()", async () => {
    it("", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.db.globals.testGlobal.hasValue()
            console.log(res)


        } catch (err) {
            console.log(err)
            expect(err.message).to.have.string('Parameter pid must be a number')
        }

        ydb.disconnect()
    });


})