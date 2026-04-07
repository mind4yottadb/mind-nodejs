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

    console.log()
    console.log(mind.banking.branch)
    console.log(mind.banking.BIC_code)

    try {
        await mind.banking.cash.dailyBook.checkBalance()

    } catch (e) {
        console.log('\nError returned: ' + e.message)
    }

    mind.disconnect()

    exit()
}

run()