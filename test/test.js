const {exit} = require('node:process')
const mind = require('../js/index.js')

const ydb = new mind


const run = async () => {
    await ydb.connect('127.0.0.1', 10000, "admin", "admin", {
        app: {
            vars: [
                'test1', 'test2qwerty', 'stef'
            ],
            globals: [
                'globalTest', 'myglobal2', 'stef'
            ]
        }
    }).catch(err => {
        console.log(err.message)
            exit()
        }
    )

//console.log(ydb.server.hostName)
//ydb.server.hostName='tetetet'

//ydb.server.pid=55

//console.dir(ydb)

    ydb.on('error', err => console.log('custom error: ' + err))
    ydb.on('disconnect', err => console.log('disconnected'))

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

    //console.dir(ydb.db, {depth: 20})

    const json = {
        test1: 'a string',
        myData: {
            testarray: [
                'aaaa',
                'bbb',
                'ccc'
            ]
        }
    }

    await ydb.db.globals.stef.setObject(json)

    console.log(await ydb.db.globals.stef.getJSON())
    console.log(await ydb.db.globals.stef.getObject())

    exit()


    ydb.db.globals.addName('_stef')
    //console.log(ydb.db.globals)

    const c = 2
    const a = 3
    const stef = ydb.db.globals._stef
    //console.log(users)
    await stef._().setValue('testnopath')
    const res = await stef._().getValue()
    console.log(res)

    //console.log('---' + await stef.getPiece('^', 4, 4))
    await stef._(1, 2, 3, 4, 5, 6).setPiece('thepiecestring', ",", 2)
    //await stef._(1,2,3,4,5,6).setValue('thenewstring')
    const x = await stef._(1, 2, 3, 4, 5, 6).getValue()
    console.log(x)
    //console.log(await stef.killValue())

    console.log('executed')

    ydb.db.vars.addName('thisisanarray')

    //console.dir(ydb.db, {depth: 10})

    ydb.db.globals.removeName('_stef')

    //console.dir(ydb.db, {depth: 3})


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

    await ydb.disconnect()

}

run()