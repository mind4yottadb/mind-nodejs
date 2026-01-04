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
    it("when command is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            //const res = await ydb.process.spawn('apt-get install redis', '/tmp2/stef/testlog')
            const res = await ydb.process.spawn('')

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("when command is valid", async () => {

        const ydb = await createYdbInstance()

        try {
            //const res = await ydb.process.spawn('apt-get install redis', '/tmp2/stef/testlog')
            const pid = await ydb.process.spawn('sleep 5')
            expect(pid > 0).to.be.true

        } catch (err) {
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });

    it("when command is valid and out file is provided", async () => {
        const ydb = await createYdbInstance()

        try {
            //const res = await ydb.process.spawn('apt-get install redis', '/tmp2/stef/testlog')
            const pid = await ydb.process.spawn('ls; sleep 5', '/tmp/test.spawn')
            expect(pid > 0).to.be.true

            try {
                const out = await ydb.fs.readFile('/tmp/test.spawn')
                expect(typeof out === 'number')

            } catch (err) {
                expect(err.message).to.have.string('should not happen')
            }

        } catch (err) {
            console.log(err)
            expect(err.message).to.have.string('the command has not been provided')
        }

        ydb.disconnect()
    });
})