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

    burst = async function () {
        const commandsList = []

        for (let ix = 0; ix < this.commandsSize; ix++) {
            commandsList.push({
                command: this.commands[utils.getRandom(this.commands.length)]
            })
        }

        for (const command of commandsList) {
            const mindSession = await pool.pool.getSession()

            await command.command.exec(mindSession)

            await mindSession.done()
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
    }
]

module.exports = Burst