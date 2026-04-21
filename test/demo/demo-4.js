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
    })

    let res = await users.query()
    console.log(res)

    res = await users.query(res)
    console.log(res)


    mind.disconnect()

    exit()
}

run()