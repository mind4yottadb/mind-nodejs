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
    const orders = mind.db.globals.orders
    console.log('^users global')
    console.log(users)

    console.log('\n^orders global')
    console.log(orders)

    await users.setValue('this is a test')
    console.log(await users.getValue())

    await orders.setObject({
        newProp: {
            objProp: 23
        },
        myprop: [
            {
                entry: 12,
                code: 'MYCODE'
            },
            {
                entry: 13,
                code: 'MYCODENEW'
            }
        ]
    })
    console.log(await orders.getObject())

    await orders.killTree()
    console.log('AFTER KILL')
    console.log(await orders.getObject())


    mind.disconnect()

    exit()
}

run()