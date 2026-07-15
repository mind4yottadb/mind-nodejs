/*###############################################################
#                                                               #
# Copyright (c) 2026 DnaSoft BV and/or its subsidiaries.        #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
###############################################################*/

const utils = require('./utils')
const pool = require('./pool')

class Burst {
    commands = utils.getCommands()

    run = async function () {
        const commandsList = []

        for (let ix = 0; ix < utils.getRandom(utils.params.burst.commandsSize.min, utils.params.burst.commandsSize.max + 1); ix++) {
            commandsList.push({
                command: this.commands[utils.getRandom(0, this.commands.length - 1)]
            })
        }

        if (utils.params.logging === true) console.log('-Burst run: ' + commandsList.length)

        for (const command of commandsList) {

            if (utils.params.logging === true) console.log('Executing...')

            const mindSession = await pool.pool.getSession()

            await command.command.exec(mindSession)
            await mindSession.done()

            const delay = utils.getRandom(utils.params.burst.separation.min, utils.params.burst.separation.max)
            if (utils.params.logging === true) {
                console.log('Delay: ' + delay)
            }

            await utils.sleep(delay)
        }
    }
}

const Commands = [
    {
        exec: async function (mindSession) {
            await mindSession.process.cwdGet()
        }
    },
    {
        exec: async function (mindSession) {
            await mindSession.process.memUsage()
        }
    },
    {
        exec: async function (mindSession) {
            await mindSession.process.getEnvVars()
        }
    },
    {
        exec: async function (mindSession) {
            await mindSession.server.GUID()
        }
    },
    {
        exec: async function (mindSession) {
            await mindSession.server.stats()
        }
    },
    {
        exec: async function (mindSession) {
            await mindSession.session.getCurrentSettings()
        }
    },
    {
        exec: async function (mindSession) {
            await mindSession.fs.isDir('/opt')
        }
    },
    {
        exec: async function (mindSession) {
            await mindSession.fs.isFile('/docker-main-startup.sh')
        }
    }
]

module.exports = Burst