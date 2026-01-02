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

describe("namespace: fs: mkdir", async () => {
    it("Test # 30: When gld file is missing", async () => {

        const ydb = await createYdbInstance()

        console.log(await ydb.fs.rmdir('/tmp/stef/test'))

        ydb.disconnect()


    });
});

