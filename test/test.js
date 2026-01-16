const {exit} = require('node:process')
const mind = require('../js/index.js')

const ydb = new mind


const run = async () => {
    await ydb.connect('127.0.0.1', 10000, "admin", "admin").catch(err => {
            console.log('Error is: ' + err)
            exit()
        }
    )

//console.log(ydb.server.hostName)
//ydb.server.hostName='tetetet'

//ydb.server.pid=55

//console.dir(ydb)

    ydb.on('error', err => console.log('custom error: ' + err))
    ydb.on('disconnected', err => console.log('disconnected'))

//await ydb.fs.writeFile('/test.txt2', 'this is the data I write')
//await ydb.fs.appendFile('/test.txt2', 'and then append')

    /*
    ydb.fs.readFile('test')
        .then(data => {
            console.log(data)
        })
        .catch(e => console.log(e))

     */


//await ydb.process.cwdSet('/opt/yottadb/current')
//const cwd = await ydb.process.cwdGet()
//console.log(cwd)

    console.dir(ydb.db, {depth: 20})


    ydb.db.globals.addName('t2est')

    const c = 2
    const a = 3
    const users = ydb.db.globals.t2est
    console.log(users)
    const res = await users._("test", 33, 12, "thisis a string").hasValue()
    console.log("users")
    console.log(res)

    ydb.db.vars.addName('thisisanarray')

    console.dir(ydb.db, {depth: 10})

    ydb.db.globals.removeName('t2est')

    //console.dir(ydb.db.globals, {depth: 3})


//console.log(await ydb.fs.stat('/tmp'))
//await ydb.process.cwdSet('/opt')


//console.log(await ydb.process.cwdGet())

//console.dir(await ydb.fs.stat('/tmp/stef/a'), {width: 10})

//console.log(await ydb.fs.expandPath('$ydb_dist/plugin'))
//console.log(await ydb.fs.mkdir('/tmp/stef/'))
//await ydb.fs.renameFile('/tmp/stef/aaa.txt', '/tmp/stef/a')
//await ydb.fs.removeFile('/tmp/stef/aaa.txt')

//console.dir(ydb, {width: 5})
//ydb.disconnect()
    /*
    ydb.connect('127.0.0.1', 10000, "admin", "admin").then(() => {
        console.log('Logged in ok')
    }).catch((err) =>console.log(err))

     */

//await ydb.disconnect()

}

run()