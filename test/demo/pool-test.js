const {exit} = require('node:process')
const mindServer = require('../../js/index.js')


start = async () => {
    const pool = new mindServer.sessionsPool(3, 1)

    console.dir(pool, {depth: 1})

    await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

    console.log('created')

    let session = await pool.getSession()
    let session33 = await pool.getSession()
    let session44 = await pool.getSession()
    let session55 = await pool.getSession()

    setTimeout(() => {
        console.log('releasing session')
        session.done()
        session = {}

    }, 2000)

    console.dir(pool.sessions, {depth: 1})

    console.log('acquiring session2')
    let session2 = await pool.getSession()
    console.log('session2 acquired')
    session2.done()
    /*
    session2={}
    let session3 = await pool.getSession()
    session3.done()
    let session4 = await pool.getSession()

     */

    console.dir(pool.getStatus(), {depth: 1})


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