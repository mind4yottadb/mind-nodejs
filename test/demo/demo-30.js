const {exit} = require('node:process')
const mind4yottadb = require('../../js/index.js')

const mind = new mind4yottadb.session


const run = async () => {
    await mind.connect('127.0.0.1', 10000, "admin", "admin", {
        uApi: {appName: 'test-existing'},
        db: {
            globals: [
                'orders', 'users'
            ]
        },
    })

    console.dir(mind.vitals, {depth: 3})

    const vitals = mind.vitals

    const ret = await vitals.isValidApiName("this is not valid")
    console.log(ret)


    mind.disconnect()

    exit()
}

run()