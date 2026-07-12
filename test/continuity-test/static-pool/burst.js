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
    commandsSize = 5            // 1-5
    commandSeparation = 5       // 1-5 ms.
    commands = Commands

    constructor(commandsSize, commandSeparation) {
        if (!commandsSize || !commandSeparation) {
            throw new Error('Burst: no commandsSize or commandSeparation provided')
        }

        this.commandsSize = commandsSize
        this.commandSeparation = commandSeparation
    }

    run = async function () {
        const commandsList = []

        for (let ix = 0; ix < this.commandsSize; ix++) {
            const index = utils.getRandom(0, this.commands.length - 1)
            console.log(index)

            commandsList.push({
                command: this.commands[index]
            })
        }

        for (const command of commandsList) {
            const mindSession = await pool.pool.getSession()

            console.log('Executing...')

            await command.command.exec(mindSession)
            await mindSession.done()

            const delay = utils.getRandom(1, this.commandSeparation)

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
    }
]

module.exports = Burst