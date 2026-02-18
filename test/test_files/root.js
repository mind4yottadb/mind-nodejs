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

const mind = require("../../js")

const {expect} = require("chai");
const {createYdbInstance} = require("../utils.cjs");

describe("connect()", async () => {
    it("without any parameters", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect()


        } catch (err) {
            expect(err.message).to.have.string('host must be a string')
        }

        ydb.disconnect()
    });

    it("add host as number", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect(123)


        } catch (err) {
            expect(err.message).to.have.string('host must be a string')
        }

        ydb.disconnect()
    });

    it("add host as array", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect([])


        } catch (err) {
            expect(err.message).to.have.string('host must be a string')
        }

        ydb.disconnect()
    });

    it("add host as object", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect({})


        } catch (err) {
            expect(err.message).to.have.string('host must be a string')
        }

        ydb.disconnect()
    });

    it("add host as string", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1')


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as string", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', '234')


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as array", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', [])


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as object", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', {})


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as boolean", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', false)


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as number", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000)


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as array", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, [])


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as number", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 12)


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as object", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, {})


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as boolean", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, false)


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as string", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin')


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });

    it("add username as array", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin', [])


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });

    it("add username as number", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin', 12)


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });

    it("add username as object", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin', {})


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });

    it("add username as boolean", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin', false)


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });


    it("add options as string", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', 'option')


        } catch (err) {
            expect(err.message).to.have.string('options must be an object')
        }

        ydb.disconnect()
    });

    it("add options as array", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', [])


        } catch (err) {
            expect(err.message).to.have.string('options cannot be an array')
        }

        ydb.disconnect()
    });

    it("add options as number", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', 12)


        } catch (err) {
            expect(err.message).to.have.string('options must be an object')
        }

        ydb.disconnect()
    });

    it("add options as object", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {})
            expect(1 === 1).to.be.true

        } catch (err) {
            console.log(err)
            expect(err.message).to.have.string('options must be an object')
        }

        ydb.disconnect()
    });

    it("add options as boolean", async () => {

        let ydb

        try {
            ydb = new mind

            await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', false)


        } catch (err) {
            expect(err.message).to.have.string('options must be an object')
        }

        ydb.disconnect()
    });
})

describe("structure after connect()", async () => {
    it("without any parameters", async () => {
        const ydb = await createYdbInstance()

        expect(ydb.connected).to.be.true
        expect(ydb.loggedIn).to.be.true
        expect(ydb.requiresMind !== undefined).to.be.true
        expect(typeof ydb.server === 'object').to.be.true
        expect(typeof ydb.process === 'object').to.be.true
        expect(typeof ydb.fs === 'object').to.be.true
        expect(typeof ydb.RESP3 === 'object').to.be.true
        expect(typeof ydb.db === 'object').to.be.true
        expect(typeof ydb.db.vars === 'object').to.be.true
        expect(typeof ydb.db.globals === 'object').to.be.true
        expect(typeof ydb.dbms === 'object').to.be.true

        ydb.disconnect()
    })
})

