const {exit} = require('node:process')
const mindServer = require('../js/index.js')

const mind = new mindServer


const run = async () => {
    await mind.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        connectTimeout: 5000,
        uApi: {appName: 'test-existing'},
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

    mind.db.globals.addName('apiTest')
    const res = await mind.level_1.isNumber(undefined)
    console.log(res)

    exit()


}

run()