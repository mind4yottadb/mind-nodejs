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

module.exports = {
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },

    sleep: async msDelay => {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, msDelay)
        })
    },

    dumpTime: function (time) {
        return ((time.getHours() - 1) < 10 ? '0' : '') + (time.getHours() - 1) + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes() + ':' + (time.getSeconds() < 10 ? '0' : '') + time.getSeconds() + '.' + time.getMilliseconds()
    },
    params: {
        pool: {
            size: 32,
            extension: 30
        },
        singleShot: false,
        singleShotTimeout: 15,      // seconds
        mainLoopThreads: 1200,
        mainLoopDelay: 3,           // minutes
        session: {
            initDelay: 50,          // ms
            bustsSize: {
                min: 20,
                max: 80
            },
            distance: {             // is seconds
                min: 1,
                max: 8
            }
        },
        burst: {
            commandsSize: {
                min: 1,
                max: 15
            },
            separation: {           // in ms.
                min: 5,
                max: 10
            },
            commands: {
                includeDb: true,
            }
        },
        logging: false,
        dumpTotals: true,
        dumpTotalsDelay: 1,         // in minutes
    },

    getCommands: function () {
        const commands = [
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

        if (module.exports.params.burst.commands.includeDb === true) {
            const dbCommands = [
                {
                    exec: async function (mindSession) {
                        try {
                            mindSession.db.globals.addName('testglobal')
                        } catch (err) {
                        }
                        await mindSession.db.globals.testglobal.increment()
                    }
                },
                {
                    exec: async function (mindSession) {
                        try {
                            mindSession.db.globals.addName('testglobal')
                        } catch (err) {
                        }
                        await mindSession.db.globals.testglobal.decrement()
                    }
                },
                {
                    exec: async function (mindSession) {
                        try {
                            mindSession.db.globals.addName('testglobal')
                        } catch (err) {
                        }
                        await mindSession.db.globals.testglobal._('a1').increment()
                    }
                },
                {
                    exec: async function (mindSession) {
                        try {
                            mindSession.db.globals.addName('testglobal')
                        } catch (err) {
                        }
                        await mindSession.db.globals.testglobal._('a1').decrement()
                    }
                },
            ]

            commands.push(...dbCommands)
        }

        return commands
    },
}


