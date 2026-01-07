import {exit} from 'node:process'
import mind from '../js/index.js'

const ydb = new mind


const res = await ydb.connect('127.0.0.1', 10000, "admin", "admin").catch(err => {
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

//console.log(await ydb.fs.readFile('/test.txt2').catch(e => console.log(e)))

//await ydb.process.cwdSet('/opt/yottadb/current')
//const cwd = await ydb.process.cwdGet()
//console.log(cwd)


const stdout = await ydb.process.exec('ls -la')
console.log(stdout)



//console.log(await ydb.fs.stat('/tmp'))
//await ydb.process.cwdSet('/opt')


//console.log(await ydb.process.cwdGet())

//console.dir(await ydb.fs.stat('/tmp/stef/a'), {width: 10})

//console.log(await ydb.fs.expandPath('$ydb_dist/plugin'))
//console.log(await ydb.fs.mkdir('/tmp/stef/'))
//await ydb.fs.renameFile('/tmp/stef/aaa.txt', '/tmp/stef/a')
//await ydb.fs.removeFile('/tmp/stef/aaa.txt')

//console.dir(ydb, {width: 5})
ydb.disconnect()
/*
ydb.connect('127.0.0.1', 10000, "admin", "admin").then(() => {
    console.log('Logged in ok')
}).catch((err) =>console.log(err))

 */

//await ydb.disconnect()