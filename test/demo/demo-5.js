const {exit} = require('node:process')
const mind4yottadb = require('../../js/index.js')

const mind = new mind4yottadb.session


const run = async () => {
    await mind.connect('127.0.0.1', 10000, "admin", "admin", {
        db: {
            globals: [
                'orders', 'users'
            ]
        },
    })

    const users = mind.db.globals.users

    await users.killTree()
    await users._("testNode").setObject({
        test1: {ciao: 'test1val'},
        test2: 'test2',
        test3: 'test3',
        test4: 'test4',
        test5: 'test5',
        test6: 'test6',
        test7: 'test7'
    })

    let node
    while (node !== '') {
        node = await users._("testNode").findNext(node || '')
        if (node === '') break

        console.log(await users._("testNode", node).getValue())
    }
    mind.disconnect()

    exit()
}

run()