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
const mind = require("../../js");
const {exit} = require("node:process");

describe("namespace: fs: mkdir", async () => {
    it("Test # 30: When gld file is missing", async () => {
        const ydb = new mind

        await ydb.connect('127.0.0.1', 10000, "admin", "admin").catch(err => {
                console.log('Error is: ' + err)
                exit()
            }
        )

        console.log(await ydb.fs.mkdir('/tmp/stef/newdir2.j;'))

        ydb.disconnect()


    });
});

