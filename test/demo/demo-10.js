const {exit} = require('node:process')
const mind4yottadb = require('../../js/index.js')

const mind = new mind4yottadb.session


const run = async () => {
    await mind.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: false,
        tlsRejectSelfSigned: false,
        uApi: {appName: 'demo-banking'},
    })

    console.dir(mind, {depth: 3})

    console.log(mind.banking.branch)
    console.log(mind.banking.BIC_code)

    mind.disconnect()

    exit()
}

run()