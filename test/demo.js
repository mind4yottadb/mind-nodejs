const {exit} = require('node:process')
const mind4yottadb = require('../js/index.js')

const mind = new mind4yottadb.session


const run = async () => {
    await mind.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        uApi: {appName: 'hooks-and-code'}
    })

    mind.db.globals.addName('mergeTest')
    mind.db.globals.addName('mergeTest2')
    await mind.db.globals.mergeTest2.setObject({test: 1, test2: 'this is a test'})
    await mind.db.globals.mergeTest.merge(mind.db.globals.mergeTest2)

    console.log(await mind.db.globals.mergeTest.getObject())

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