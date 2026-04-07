const {exit} = require('node:process')
const mindServer = require('../../js/index.js')


start = async () => {
    const pool = new mindServer.sessionsPool(3, 1)

    await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

    console.log('Pool created')

    let session = await pool.getSession()
    let session33 = await pool.getSession()
    let session44 = await pool.getSession()
    let session55 = await pool.getSession()

    console.dir(pool.sessions, {depth: 1})
    console.log()

    setTimeout(() => {
        console.log('releasing session')
        session.done()
        session = {}

    }, 3000)

    console.log('\nacquiring session2: waiting for a slot to be free')
    let session2 = await pool.getSession()
    console.log('session2 acquired')

    console.dir(pool.sessions, {depth: 1})

    console.log('\nterminating session55: extension should be gone')
    session55.done()

    console.dir(pool.sessions, {depth: 1})

    await pool.destroy()
    console.log('destroyed')


    exit()
}

const sleep = async msDelay => {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, msDelay)
    })
}


start()