const {exit} = require("node:process")
const mind = require("../js")


module.exports = {
    createYdbInstance: async () => {
        const ydb = new mind

        await ydb.connect('127.0.0.1', 10000, "admin", "admin", {
            app: {
                vars: [
                    'varTest', 'varTestEmpty',
                ],
                globals: [
                    'globalTest', 'globalTestEmptyRoot'
                ]
            }
        }).catch(err => {
                console.log('Error is: ' + err)
                exit()
            }
        )

        return ydb
    }
}