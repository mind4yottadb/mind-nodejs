const {exit} = require('node:process')
const mind4yottadb = require('../../js/index.js')

const mind = new mind4yottadb.session


const run = async () => {
    await mind.connect('127.0.0.1', 10000, "admin", "admin")

    console.log('Reading a directory tree with mask')
    const myDir = await mind.fs.readTree('/opt', '*.so')
    console.log(myDir)

    console.log('\n\n\n')
    console.log('Getting file stat')

    const stat = await mind.fs.stat('/opt/yottadb')
    console.log(stat)

    console.log('\n\nprocess memory usage')
    const memory = await mind.process.memUsage()
    console.log(memory)

    mind.disconnect()

    exit()
}

run()