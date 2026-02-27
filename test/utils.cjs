const {exit} = require("node:process")
const mind = require("../js")


module.exports = {
    createYdbInstance: async (appName = '') => {
        const ydb = new mind

        await ydb.connect('127.0.0.1', 10000, "admin", "admin", {
            useTls: true,
            tlsRejectSelfSigned: false,
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