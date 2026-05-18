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
const {createYdbInstance, sleep} = require("../utils.cjs");
const utils = require("../../js/utils");

describe("glvn: validate path", async () => {
    it("with empty subscript #1", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._('', 33)

        } catch (err) {
            expect(err.message).to.have.string('String in path position: 0 is empty')
        }

        ydb.disconnect()
    });

    it("with empty subscript #2", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._(33, '')

        } catch (err) {
            expect(err.message).to.have.string('String in path position: 1 is empty')
        }

        ydb.disconnect()
    });

    it("with boolean #1", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._(true)

        } catch (err) {
            expect(err.message).to.have.string('Subpath: 0 must be a string or number')
        }

        ydb.disconnect()
    });

    it("with boolean #2", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._('str', true)

        } catch (err) {
            expect(err.message).to.have.string('Subpath: 1 must be a string or number')
        }

        ydb.disconnect()
    });

    it("with object #1", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._({a: 2})

        } catch (err) {
            expect(err.message).to.have.string('Subpath: 0 must be a string or number')
        }

        ydb.disconnect()
    });

    it("with object #2", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._('str', {a: 2})

        } catch (err) {
            expect(err.message).to.have.string('Subpath: 1 must be a string or number')
        }

        ydb.disconnect()
    });

    it("with array #1", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._(['test'])

        } catch (err) {
            expect(err.message).to.have.string('Subpath: 0 must be a string or number')
        }

        ydb.disconnect()
    });

    it("with array #2", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._('str', ['str'])

        } catch (err) {
            expect(err.message).to.have.string('Subpath: 1 must be a string or number')
        }

        ydb.disconnect()
    });

    it("with null #1", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._(null)

        } catch (err) {
            expect(err.message).to.have.string('Subpath: 0 must be a string or number')
        }

        ydb.disconnect()
    });

    it("with null #2", async () => {
        const ydb = await createYdbInstance()

        try {
            ydb.db.globals.globalTest._('str', null)

        } catch (err) {
            expect(err.message).to.have.string('Subpath: 1 must be a string or number')
        }

        ydb.disconnect()
    });

})