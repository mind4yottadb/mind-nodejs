const {exit} = require('node:process')
const mind4yottadb = require('../js/index.js')

const mind = new mind4yottadb


const run = async () => {
    await mind.connect('127.0.0.1', 10000, "admin", "admin", {
        useTls: true,
        tlsRejectSelfSigned: false,
        uApi: {appName: 'test-existing'}
    })

    //mind.on('socketError', err => console.log('custom error: ' + err))
    //mind.on('disconnect', err => console.log('disconnected'))

    console.dir(mind, {depth: 13})


    const myObj = {
        test1: 'a string',
        myData: {
            testarray: [
                'aaaa',
                'bbb',
                'ccc'
            ]
        }
    }

    await mind.db.globals.addName('stef')
    const ret = await mind.db.globals.stef._("IdontExists").getJSON()
    console.log(ret)

    try {
        //const res = await mind.bhas.bhasTest(myObj, 'the')
        //console.log(res)
        mind.level_1.logToConsole("Hi Bhaskar")
    } catch (err) {
        console.log(err.message)
    }

    /*

     */
    mind.disconnect()

    exit()
}

run()