const {exit} = require("node:process")
const mind = require("../js")


module.exports = {
    createYdbInstance: async (appName = '') => {
        const ydb = new mind.session

        const host = '127.0.0.1'
        //const host = '/opt/yottadb/current/plugin/etc/mind/mind4yottadb'

        await ydb.connect(host, 10000, "admin", "admin", {
            protocol: 'tcp',
            useTls: false,
            tlsRejectSelfSigned: false,
            connectTimeout: 10000,
            uApi: {
                appName: appName
            },
            db: {
                globals: [
                    'globalTest', 'globalTestEmptyRoot', 'temp'
                ]
            }
        }).catch(err => {
            if (appName) {
                throw new Error(err)
            } else {
                console.log('Error is: ' + err)
                exit()
            }
            }
        )

        return ydb
    },

    sleep: async msDelay => {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, msDelay)
        })
    }
}
