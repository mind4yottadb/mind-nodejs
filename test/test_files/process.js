/*
#################################################################
#                                                               #
# Copyright (c) 2022-2025 YottaDB LLC and/or its subsidiaries.  #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
#################################################################
*/

const {expect} = require("chai");
const {createYdbInstance} = require("../utils.cjs");

describe("process.spawn()", async () => {
    it("when filename is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.process.spawn('apt-get install redis', '/tmp2/stef/testlog')
            console.log(res)

        } catch (err) {
            expect(err.message).to.have.string('the filename has not been provided')
        }

        ydb.disconnect()
    });

})