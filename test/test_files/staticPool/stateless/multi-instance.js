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
const {createYdbInstance} = require("../../../utils.cjs");
const mindServer = require("../../../../js");

describe("Pool creation: multi instance", async () => {
    it("with two pools", async () => {
        const pool = new mindServer.staticPool('stateless', 3)
        const pool2 = new mindServer.staticPool('stateless', 2, 1)

        try {
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            await pool2.create('127.0.0.1', 10000, 'admin', 'admin', {})

            pool.destroy()
            pool2.destroy()

        } catch (err) {
            expect(err.message).to.have.string('should not happen')
        }
    });

    it("with three pools", async () => {
        const pool = new mindServer.staticPool('stateless', 3)
        const pool2 = new mindServer.staticPool('stateless', 2, 1)
        const pool3 = new mindServer.staticPool('stateless', 2, 1)

        try {
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            await pool2.create('127.0.0.1', 10000, 'admin', 'admin', {})
            await pool3.create('127.0.0.1', 10000, 'admin', 'admin', {})

            pool.destroy()
            pool2.destroy()
            pool3.destroy()

        } catch (err) {
            expect(err.message).to.have.string('should not happen')
        }
    });
})