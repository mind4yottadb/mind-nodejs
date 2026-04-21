const {exit} = require('node:process')
const mindServer = require('../js/index.js')

const mind = new mindServer.session


const run = async () => {

    await mind.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        connectTimeout: 10000,
        uApi: {appName: ''},
        db: {
            globals: [
                'globalTest', 'myglobal2', 'stef'
            ]
        },
    }).catch(err => {
        console.log(err.message)
            exit()
        }
    )

    console.log(mind)

    return

    exit()


    mind.db.globals.addName('apiTest')
    const gbl = mind.db.globals.apiTest

    await mind.process.cwdGet()

    await gbl.killTree()
    await gbl._("testNode").setObject({
        test1: {ciao: 'test1val'},
        test2: 'test2',
        test3: 'test3',
    })

    let res = await gbl.query()
    console.log(res)

    res = await gbl.query(res)
    console.log(res)

    exit()

    let node
    while (node !== '') {
        node = await gbl._("testNode").findPrev(node || '')
        if (node === '') break

        console.log(await gbl._("testNode", node).getValue())

    }

    exit()


}

run()