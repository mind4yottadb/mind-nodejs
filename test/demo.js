const {exit} = require('node:process')
const mind4yottadb = require('../js/index.js')

const mind = new mind4yottadb.session


const run = async () => {
    await mind.connect('127.0.0.1', 10001, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        uApi: {appName: 'remote-vista'}
    })

    const pool = new mind4yottadb.staticPool(2)

    await pool.create('127.0.0.1', 10001, 'admin', 'admin', {
        useTls: false,
        tlsRejectSelfSigned: false,
        uApi: {appName: 'remote-vista'}
    })

    const s1 = await pool.getSession()
    const s2 = await pool.getSession()

    console.dir(s1, {depth: 2})

    const ret = await s1.EHS.login("CAS123", "CAS123..", "HMP UI CONTEXT")

    console.dir(ret, {depth: 20})

    const ret3 = await s2.EHS.executeRpc(ret[3].guid, "XUS DIVISION GET", {})
    console.dir(ret3)

    const ret2 = await s2.EHS.executeRpc(ret[3].guid, "ORWPT LIST ALL",
        [
            {
                type: "SINGLE VALUE",
                value: "CC"
            },
            {
                type: "SINGLE VALUE",
                value: 1
            }
        ]
    )

    console.dir(ret2, {depth: 20})


    //await mind.db.globals.mergeTest2.setObject({test: 1, test2: 'this is a test'})
    //await mind.db.globals.mergeTest.merge(mind.db.globals.mergeTest2)

    exit()

    return

    await mind.soTest.triggerError()

    //mind.db.globals.addName("test")
    //const gbl = mind.db.globals.test

    //const dir = await mind.fs.readTree('$ydb_dist','*.so')
    //console.log(dir)

    try {
        const res = await mind.bhas.bhasTest(myObj, "this is a string", 'test1')
        const myval = await mind.db.vars.test1._('newval').getValue()
        console.log(myval)

    } catch (err) {
        console.log(err.message)
    }

    /*
    await gbl.setObject(myObj)
    const ret = await gbl.getObject()
    console.log(ret)


    /*
    try {
        const res = await mind.bhas.secondTest('sssss','this is a string')
        console.log(res)
    } catch (err) {
        console.log(err.message)
    }

     */
    //console.dir(mind, {depth: 10})

    mind.disconnect()

    exit()
}

run()