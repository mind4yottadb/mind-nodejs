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

describe("Pool creation: connect errors", async () => {
    it("with wrong credentials", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.create('127.0.0.1', 10000, 'admin2', 'admin', {})

            console.log('did it')

        } catch (err) {
            expect(err.message).to.have.string('LOGIN FAILED Invalid credentials')
        }
    });

    it("with wrong credentials", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.create('127.0.0.1', 10000, 'admin', 'admin2', {})

            console.log('did it')

        } catch (err) {
            expect(err.message).to.have.string('LOGIN FAILED Invalid credentials')
        }
    });

    it("with wrong app name", async () => {
        const pool = new mindServer.staticPool('stateless', 3)

        try {
            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {
                uApi: {
                    appName: 'donotexist'
                },

            })

            console.log('did it')

        } catch (err) {
            expect(err.message).to.have.string('app: donotexist not found')
        }
    });
})