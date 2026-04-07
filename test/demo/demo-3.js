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

    await users._('VA1', 12, 34).setValue(12)
    await users._('VA2', 12, 34).setValue(12)

    console.log(await users._('VA1', 12, 34).getValue())
    console.log(await users._('VA1', 12, 34).increment(1.4))

    console.log(await users.findNext())
    console.log(await users.findNext())

    mind.disconnect()

    exit()
}

run()