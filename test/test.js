const {exit} = require('node:process')
const mindServer = require('../js/index.js')

const mind = new mindServer.session
const mind2 = new mindServer.session
const mind3 = new mindServer.session
const mind4 = new mindServer.session
const mind5 = new mindServer.session
const mind6 = new mindServer.session
const mind7 = new mindServer.session


const run = async () => {

    await mind.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        connectTimeout: 10000,
        uApi: {appName: 'ehs'},
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

    await mind2.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        connectTimeout: 10000,
        uApi: {appName: 'ehs'},
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
    await mind3.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        connectTimeout: 10000,
        uApi: {appName: 'ehs'},
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

    await mind4.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        connectTimeout: 10000,
        uApi: {appName: 'ehs'},
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
    await mind5.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        connectTimeout: 10000,
        uApi: {appName: 'ehs'},
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

    await mind6.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        connectTimeout: 10000,
        uApi: {appName: 'ehs'},
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

    await mind7.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        connectTimeout: 10000,
        uApi: {appName: 'ehs'},
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

    const before = new Date()
    let ret
    for (let i = 0; i < 270; i++) {
        ret = await mind.EHS.login()
        const ret2 = await mind2.session.timeSinceConnect()
        const ret3 = await mind3.session.timeSinceConnect()
        const ret4 = await mind3.session.timeSinceConnect()
        const ret5 = await mind3.session.timeSinceConnect()
        const ret6 = await mind3.session.timeSinceConnect()
        const ret7 = await mind3.session.timeSinceConnect()
    }
    const after = new Date()
    console.log(after - before)
    console.log(ret)


    //console.log(mind)

    //return

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