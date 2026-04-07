const {exit} = require('node:process')
const mind4yottadb = require('../../js/index.js')

const mind = new mind4yottadb.session


const run = async () => {
    await mind.connect('127.0.0.1', 10000, "admin", "admin", {
        uApi: {appName: 'custom'}
    })

    const ehs = mind.ehs

    try {
        const ret = await ehs.secondTest("this is valid", "text")

        console.log('\n' + ret)

    } catch (err) {
        console.log(err.message)
    }

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

    console.log()
    console.log(await ehs.objTest(JSON.stringify(myObj), 'par2'))


    mind.disconnect()

    exit()
}

run()