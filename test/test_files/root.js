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

const mind = require("../../js")

const os = require('node:os')
const child_process = require('node:child_process')
const fs = require('node:fs')
const fsPromises = require('node:fs/promises')
const process = require('node:process')

const {expect} = require("chai");
const {createYdbInstance} = require("../utils.cjs");
const {exit} = require("node:process");

describe("connect()", async () => {
    it("without any parameters", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect()


        } catch (err) {
            expect(err.message).to.have.string('host must be a string')
        }

        ydb.disconnect()
    });

    it("add host as number", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect(123)


        } catch (err) {
            expect(err.message).to.have.string('host must be a string')
        }

        ydb.disconnect()
    });

    it("add host as array", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect([])


        } catch (err) {
            expect(err.message).to.have.string('host must be a string')
        }

        ydb.disconnect()
    });

    it("add host as object", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect({})


        } catch (err) {
            expect(err.message).to.have.string('host must be a string')
        }

        ydb.disconnect()
    });

    it("add host as string", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1')


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as string", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', '234')


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as array", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', [])


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as object", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', {})


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as boolean", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', false)


        } catch (err) {
            expect(err.message).to.have.string('port must be a number')
        }

        ydb.disconnect()
    });

    it("add port as number", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000)


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as array", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000, [])


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as number", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000, 12)


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as object", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000, {})


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as boolean", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000, false)


        } catch (err) {
            expect(err.message).to.have.string('username must be a string')
        }

        ydb.disconnect()
    });

    it("add username as string", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000, 'admin')


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });

    it("add username as array", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000, 'admin', [])


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });

    it("add username as number", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000, 'admin', 12)


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });

    it("add username as object", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000, 'admin', {})


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });

    it("add username as boolean", async () => {
        let ydb

        try {
            ydb = new mind.session

            await ydb.connect('127.0.0.1', 10000, 'admin', false)


        } catch (err) {
            expect(err.message).to.have.string('password must be a string')
        }

        ydb.disconnect()
    });


    describe("options", async () => {
        it("add options as string", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', 'option')


            } catch (err) {
                expect(err.message).to.have.string('options must be an object')
            }

            ydb.disconnect()
        });

        it("add options as array", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', [])


            } catch (err) {
                expect(err.message).to.have.string('options cannot be an array')
            }

            ydb.disconnect()
        });

        it("add options as number", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', 12)


            } catch (err) {
                expect(err.message).to.have.string('options must be an object')
            }

            ydb.disconnect()
        });

        it("add options as boolean", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', false)


            } catch (err) {
                expect(err.message).to.have.string('options must be an object')
            }

            ydb.disconnect()
        });

        it("connectTimeout as string", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    connectTimeout: 'this is a string'
                })


            } catch (err) {
                expect(err.message).to.have.string('options.connectTimeout must be a number')
            }

            ydb.disconnect()
        });

        it("connectTimeout as object", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    connectTimeout: {}
                })


            } catch (err) {
                expect(err.message).to.have.string('options.connectTimeout must be a number')
            }

            ydb.disconnect()
        });

        it("connectTimeout as boolean", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    connectTimeout: true
                })


            } catch (err) {
                expect(err.message).to.have.string('options.connectTimeout must be a number')
            }

            ydb.disconnect()
        });

        it("protocol as number", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    protocol: 23
                })


            } catch (err) {
                expect(err.message).to.have.string('options.protocol must be a string')
            }

            ydb.disconnect()
        });

        it("protocol as object", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    protocol: {}
                })


            } catch (err) {
                expect(err.message).to.have.string('options.protocol must be a string')
            }

            ydb.disconnect()
        });

        it("protocol as boolean", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    protocol: true
                })


            } catch (err) {
                expect(err.message).to.have.string('options.protocol must be a string')
            }

            ydb.disconnect()
        });

        it("protocol as bad string", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    protocol: 'tcpip'
                })


            } catch (err) {
                expect(err.message).to.have.string('options.protocol must be either tcp or uds')
            }

            ydb.disconnect()
        });

        it("useTls as number", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    useTls: 23
                })


            } catch (err) {
                expect(err.message).to.have.string('options.useTls must be a boolean')
            }

            ydb.disconnect()
        });

        it("useTls as object", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    useTls: {}
                })


            } catch (err) {
                expect(err.message).to.have.string('options.useTls must be a boolean')
            }

            ydb.disconnect()
        });

        it("useTls as string", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    useTls: 'string'
                })


            } catch (err) {
                expect(err.message).to.have.string('options.useTls must be a boolean')
            }

            ydb.disconnect()
        });

        it("tlsRejectSelfSigned as number", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    tlsRejectSelfSigned: 23
                })


            } catch (err) {
                expect(err.message).to.have.string('options.tlsRejectSelfSigned must be a boolean')
            }

            ydb.disconnect()
        });

        it("tlsRejectSelfSigned as object", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    tlsRejectSelfSigned: {}
                })


            } catch (err) {
                expect(err.message).to.have.string('options.tlsRejectSelfSigned must be a boolean')
            }

            ydb.disconnect()
        });

        it("tlsRejectSelfSigned as string", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    tlsRejectSelfSigned: 'string'
                })


            } catch (err) {
                expect(err.message).to.have.string('options.tlsRejectSelfSigned must be a boolean')
            }

            ydb.disconnect()
        });

        it("db as number", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    db: 23
                })


            } catch (err) {
                expect(err.message).to.have.string('options.db must be an object')
            }

            ydb.disconnect()
        });

        it("db as boolean", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    db: true
                })


            } catch (err) {
                expect(err.message).to.have.string('options.db must be an object')
            }

            ydb.disconnect()
        });

        it("db as string", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    db: 'string'
                })


            } catch (err) {
                expect(err.message).to.have.string('options.db must be an object')
            }

            ydb.disconnect()
        });

        it("db.globals as object", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    db: {
                        globals: {}
                    }
                })

            } catch (err) {
                expect(err.message).to.have.string('options.db.globals must be an array')
            }

            ydb.disconnect()
        });

        it("db.globals as string", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    db: {
                        globals: 'string'
                    }
                })

            } catch (err) {
                expect(err.message).to.have.string('options.db.globals must be an array')
            }

            ydb.disconnect()
        });

        it("db.globals as number", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    db: {
                        globals: 23
                    }
                })

            } catch (err) {
                expect(err.message).to.have.string('options.db.globals must be an array')
            }

            ydb.disconnect()
        });

        it("db.globals array entries as number", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    db: {
                        globals: [
                            23, 12, 'string', 33
                        ]
                    }
                })

            } catch (err) {
                expect(err.message).to.have.string('Entries in options.app.globals must be a string')
            }

            ydb.disconnect()
        });

        it("db.globals array entries as boolean", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    db: {
                        globals: [
                            23, 12, true, 33
                        ]
                    }
                })

            } catch (err) {
                expect(err.message).to.have.string('Entries in options.app.globals must be a string')
            }

            ydb.disconnect()
        });

        it("db.globals array entries as objects", async () => {
            let ydb

            try {
                ydb = new mind.session

                await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
                    db: {
                        globals: [
                            23, 12, {
                                name: ' Joe'
                            }, 33
                        ]
                    }
                })

            } catch (err) {
                expect(err.message).to.have.string('Entries in options.app.globals must be a string')
            }

            ydb.disconnect()
        });
    })
})

describe("structure after connect()", async () => {
    it("without any parameters", async () => {
        const ydb = await createYdbInstance()

        expect(ydb.connected).to.be.true
        expect(ydb.loggedIn).to.be.true
        expect(ydb.requiresMind !== undefined).to.be.true
        expect(typeof ydb.server === 'object').to.be.true
        expect(typeof ydb.process === 'object').to.be.true
        expect(typeof ydb.fs === 'object').to.be.true
        expect(typeof ydb.RESP3 === 'object').to.be.true
        expect(typeof ydb.db === 'object').to.be.true
        expect(typeof ydb.db.vars === 'object').to.be.true
        expect(typeof ydb.db.globals === 'object').to.be.true
        expect(typeof ydb.dbms === 'object').to.be.true
        expect(typeof ydb._staticPool === 'object').to.be.true


        ydb.disconnect()
    })

    it("verify hidden objects in root", async () => {
        const ydb = await createYdbInstance()

        const newYdb = JSON.parse(JSON.stringify(ydb))

        expect(newYdb.connected).to.be.true
        expect(newYdb.loggedIn).to.be.true
        expect(newYdb.requiresMind !== undefined).to.be.true
        expect(typeof newYdb.server === 'object').to.be.true
        expect(typeof newYdb.process === 'object').to.be.true
        expect(typeof newYdb.fs === 'object').to.be.true
        expect(typeof newYdb.RESP3 === 'undefined').to.be.true
        expect(typeof newYdb.db === 'object').to.be.true
        expect(typeof newYdb.db.vars === 'object').to.be.true
        expect(typeof newYdb.db.globals === 'object').to.be.true
        expect(typeof newYdb.dbms === 'object').to.be.true
        expect(typeof newYdb._staticPool).to.have.string('undefined')

        ydb.disconnect()
    })

    it("verify hidden objects in fs", async () => {
        const ydb = await createYdbInstance()

        expect(typeof ydb.fs.objRoot).to.have.string('object')
        expect(typeof ydb.fs.writer).to.have.string('function')
        expect(typeof ydb.fs.reader).to.have.string('function')

        const newInstance = JSON.parse(JSON.stringify(ydb.fs))

        expect(typeof newInstance.objRoot).to.have.string('undefined')
        expect(typeof newInstance.writer).to.have.string('undefined')
        expect(typeof newInstance.reader).to.have.string('undefined')

        ydb.disconnect()
    })

    it("verify hidden objects in process", async () => {
        const ydb = await createYdbInstance()

        expect(typeof ydb.process.objRoot).to.have.string('object')
        expect(typeof ydb.process.writer).to.have.string('function')
        expect(typeof ydb.process.reader).to.have.string('function')

        const newInstance = JSON.parse(JSON.stringify(ydb.process))

        expect(typeof newInstance.objRoot).to.have.string('undefined')
        expect(typeof newInstance.writer).to.have.string('undefined')
        expect(typeof newInstance.reader).to.have.string('undefined')

        ydb.disconnect()
    })

    it("verify hidden objects in server", async () => {
        const ydb = await createYdbInstance()

        expect(typeof ydb.server.objRoot).to.have.string('object')
        expect(typeof ydb.server.writer).to.have.string('function')
        expect(typeof ydb.server.reader).to.have.string('function')

        const newInstance = JSON.parse(JSON.stringify(ydb.server))

        expect(typeof newInstance.objRoot).to.have.string('undefined')
        expect(typeof newInstance.writer).to.have.string('undefined')
        expect(typeof newInstance.reader).to.have.string('undefined')

        ydb.disconnect()
    })

    it("verify hidden objects in session", async () => {
        const ydb = await createYdbInstance()

        expect(typeof ydb.session.objRoot).to.have.string('object')
        expect(typeof ydb.session.writer).to.have.string('function')
        expect(typeof ydb.session.reader).to.have.string('function')

        const newInstance = JSON.parse(JSON.stringify(ydb.session))

        expect(typeof newInstance.objRoot).to.have.string('undefined')
        expect(typeof newInstance.writer).to.have.string('undefined')
        expect(typeof newInstance.reader).to.have.string('undefined')

        ydb.disconnect()
    })

    it("verify hidden objects in db", async () => {
        const ydb = await createYdbInstance()

        expect(typeof ydb.db.objRoot).to.have.string('object')
        expect(typeof ydb.db.writer).to.have.string('function')
        expect(typeof ydb.db.reader).to.have.string('function')

        const newInstance = JSON.parse(JSON.stringify(ydb.db))

        expect(typeof newInstance.objRoot).to.have.string('undefined')
        expect(typeof newInstance.writer).to.have.string('undefined')
        expect(typeof newInstance.reader).to.have.string('undefined')

        ydb.disconnect()
    })

    it("verify hidden objects in db.vars", async () => {
        const ydb = await createYdbInstance()

        expect(typeof ydb.db.vars.objRoot).to.have.string('object')
        expect(typeof ydb.db.vars.writer).to.have.string('function')
        expect(typeof ydb.db.vars.reader).to.have.string('function')

        const newInstance = JSON.parse(JSON.stringify(ydb.db.vars))

        expect(typeof newInstance.objRoot).to.have.string('undefined')
        expect(typeof newInstance.writer).to.have.string('undefined')
        expect(typeof newInstance.reader).to.have.string('undefined')

        ydb.disconnect()
    })

    it("verify hidden objects in db.globals", async () => {
        const ydb = await createYdbInstance()

        expect(typeof ydb.db.globals.objRoot).to.have.string('object')
        expect(typeof ydb.db.globals.writer).to.have.string('function')
        expect(typeof ydb.db.globals.reader).to.have.string('function')

        const newInstance = JSON.parse(JSON.stringify(ydb.db.globals))

        expect(typeof newInstance.objRoot).to.have.string('undefined')
        expect(typeof newInstance.writer).to.have.string('undefined')
        expect(typeof newInstance.reader).to.have.string('undefined')

        ydb.disconnect()
    })

    it("verify hidden objects in _staticPool", async () => {
        const ydb = await createYdbInstance()

        expect(typeof ydb._staticPool.objRoot).to.have.string('object')
        expect(typeof ydb._staticPool.writer).to.have.string('function')
        expect(typeof ydb._staticPool.reader).to.have.string('function')

        const newInstance = JSON.parse(JSON.stringify(ydb._staticPool))

        expect(typeof newInstance.objRoot).to.have.string('undefined')
        expect(typeof newInstance.writer).to.have.string('undefined')
        expect(typeof newInstance.reader).to.have.string('undefined')

        ydb.disconnect()
    })


})

/*
describe("TLS", async () => {
    it("error out when self-signed is used", async () => {
        const ydb = new mind.session
        try {
            await ydb.connect('127.0.0.1', 10000, "admin", "admin", {
                    useTls: true,
                    tlsRejectSelfSigned: true
                }
            )
        } catch (err) {
            expect(err.message).to.have.string('self-signed certificate in certificate chain')
        }
    })
})

 */

describe("version number increased", async () => {
    it("compare package.json to main branch", async () => {
        const tmpDir = os.tmpdir()
        console.log('Temp dir is: ' + tmpDir)

        // **************************
        // REMOTE FIRST
        // **************************

        // remove the eventual previous version
        await fsPromises.rm(tmpDir + '/mind-nodejs', {recursive: true, force: true})

        // fetch the repo at main
        child_process.execSync('cd ' + tmpDir + ' && git clone --single-branch -b main https://github.com/mind4yottadb/mind-nodejs.git')

        // and read the package
        const packageFile = JSON.parse(fs.readFileSync(tmpDir + '/mind-nodejs/package.json').toString())

        // **************************
        // NOW LOCAL
        // **************************

        // now read the local version
        const cwd = process.cwd()

        // and read the package
        const localPackageFile = JSON.parse(fs.readFileSync(cwd + '/package.json').toString())
        console.log(localPackageFile.version + ' >>> ' + packageFile.version)

        // COMPARE
        expect(localPackageFile.version > packageFile.version).to.be.true

        // remove the eventual previous version
        fsPromises.rm(tmpDir + '/mind-nodejs', {recursive: true, force: true})
    })
})
