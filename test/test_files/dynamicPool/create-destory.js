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

const {exit} = require('process')
const {expect} = require("chai");
const {createYdbInstance, sleep} = require("../../utils.cjs");
const mindServer = require("../../../js");

describe("Pool dynamic: creation / destroy", async () => {
    describe("params object", async () => {
        it("with no param at all", async () => {
            try {
                const pool = new mindServer.dynamicPool()

            } catch (err) {
                expect(err.message).to.have.string('params is empty')
            }
        });

        it("with array as params", async () => {
            try {
                const pool = new mindServer.dynamicPool([])

            } catch (err) {
                expect(err.message).to.have.string('params is not an object')
            }
        });

        it("with string as params", async () => {
            try {
                const pool = new mindServer.dynamicPool('test')

            } catch (err) {
                expect(err.message).to.have.string('params is not an object')
            }
        });

        it("with number as params", async () => {
            try {
                const pool = new mindServer.dynamicPool(12)

            } catch (err) {
                expect(err.message).to.have.string('params is not an object')
            }
        });

        it("with boolean as params", async () => {
            try {
                const pool = new mindServer.dynamicPool(true)

            } catch (err) {
                expect(err.message).to.have.string('params is not an object')
            }
        });

        it("with null as params", async () => {
            try {
                const pool = new mindServer.dynamicPool(null)

            } catch (err) {
                expect(err.message).to.have.string('params is not an object')
            }
        });
    })

    describe("params object: host", async () => {
        it("with missing host", async () => {
            try {
                const pool = new mindServer.dynamicPool({test: 12})

            } catch (err) {
                expect(err.message).to.have.string('Missing params.host')
            }
        });

        it("with number as host", async () => {
            try {
                const pool = new mindServer.dynamicPool({host: 12})

            } catch (err) {
                expect(err.message).to.have.string('params.host must be a string')
            }
        });

        it("with boolean as params.host", async () => {
            try {
                const pool = new mindServer.dynamicPool({host: true})

            } catch (err) {
                expect(err.message).to.have.string('params.host must be a string')
            }
        });

        it("with null as params.host", async () => {
            try {
                const pool = new mindServer.dynamicPool({host: null})

            } catch (err) {
                expect(err.message).to.have.string('params.host must be a string')
            }
        });

        it("with object as params.host", async () => {
            try {
                const pool = new mindServer.dynamicPool({host: {subField: 1}})

            } catch (err) {
                expect(err.message).to.have.string('params.host must be a string')
            }
        });

        it("with empty string as params.host", async () => {
            try {
                const pool = new mindServer.dynamicPool({host: ''})

            } catch (err) {
                expect(err.message).to.have.string('params.host can not be an empty string')
            }
        });

        it("with valid string as params.host", async () => {
            try {
                const pool = new mindServer.dynamicPool({host: 'localhost'})

            } catch (err) {
                expect(err.message).to.have.string('Missing params.port')
            }
        });
    })

    describe("params object: port", async () => {
        it("with missing port", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost'
                })

            } catch (err) {
                expect(err.message).to.have.string('Missing params.port')
            }
        });

        it("with string as port", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: '8545'
                })

            } catch (err) {
                expect(err.message).to.have.string('params.port must be a number')
            }
        });

        it("with boolean as params.port", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: true
                })

            } catch (err) {
                expect(err.message).to.have.string('params.port must be a number')
            }
        });

        it("with null as params.port", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: null
                })

            } catch (err) {
                expect(err.message).to.have.string('params.port must be a number')
            }
        });

        it("with object as params.port", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: {test: 34}
                })

            } catch (err) {
                expect(err.message).to.have.string('params.port must be a number')
            }
        });

        it("with 0 as params.port", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 0
                })

            } catch (err) {
                expect(err.message).to.have.string('Missing params.username')
            }
        });

        it("with valid number as params.port", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 8545
                })

            } catch (err) {
                expect(err.message).to.have.string('Missing params.username')
            }
        });
    })

    describe("params object: username", async () => {
        it("with missing params.username", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                })

            } catch (err) {
                expect(err.message).to.have.string('Missing params.username')
            }
        });

        it("with number as params.username", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: 12
                })

            } catch (err) {
                expect(err.message).to.have.string('params.username must be a string')
            }
        });

        it("with boolean as params.username", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: true
                })

            } catch (err) {
                expect(err.message).to.have.string('params.username must be a string')
            }
        });

        it("with null as params.username", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: null
                })

            } catch (err) {
                expect(err.message).to.have.string('params.username must be a string')
            }
        });

        it("with object as params.username", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: {subField: 1}
                })

            } catch (err) {
                expect(err.message).to.have.string('params.username must be a string')
            }
        });

        it("with empty string as params.username", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: ''
                })

            } catch (err) {
                expect(err.message).to.have.string('params.username can not be an empty string')
            }
        });

        it("with valid string as params.username", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: 'welcome01'
                })

            } catch (err) {
                expect(err.message).to.have.string('Missing params.password')
            }
        });
    })

    describe("params object: password", async () => {
        it("with missing params.password", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test"
                })

            } catch (err) {
                expect(err.message).to.have.string('Missing params.password')
            }
        });

        it("with number as params.password", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 12
                })

            } catch (err) {
                expect(err.message).to.have.string('params.password must be a string')
            }
        });

        it("with boolean as params.password", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: true
                })

            } catch (err) {
                expect(err.message).to.have.string('params.password must be a string')
            }
        });

        it("with null as params.password", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: null
                })

            } catch (err) {
                expect(err.message).to.have.string('params.password must be a string')
            }
        });

        it("with object as params.password", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: {file: 34}
                })

            } catch (err) {
                expect(err.message).to.have.string('params.password must be a string')
            }
        });

        it("with empty string as params.password", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: ''
                })

            } catch (err) {
                expect(err.message).to.have.string('params.password can not be an empty string')
            }
        });

        it("with valid string as params.password", async () => {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 500,
                username: "test",
                password: 'welcome01'
            })
        });
    })

    describe("params object: options", async () => {
        it("with missing params.options", async () => {
            const pool = new mindServer.dynamicPool({
                host: 'localhost',
                port: 500,
                username: "test",
                password: 'welcome01'
            })
        });

        it("with string as params.options", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                    options: 'test'
                })
            } catch (err) {
                expect(err.message).to.have.string('params.options must be an object')
            }
        });

        it("with number as params.options", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                    options: 12
                })
            } catch (err) {
                expect(err.message).to.have.string('params.options must be an object')
            }
        });

        it("with boolean as params.options", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                    options: true
                })
            } catch (err) {
                expect(err.message).to.have.string('params.options must be an object')
            }
        });

        it("with null as params.options", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                    options: null
                })
            } catch (err) {
                expect(err.message).to.have.string('params.options must be an object')
            }
        });

        it("with array as params.options", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                    options: [1, 2, 3]
                })
            } catch (err) {
                expect(err.message).to.have.string('params.options must be an object')
            }
        });
    })

    describe("params object", async () => {
        it("with string as maximumSize", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                }, 'string test')

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER,Pool maximum size must be a number')
            }
        })

        it("with boolean as maximumSize", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                }, false)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER,Pool maximum size must be a number')
            }
        })

        it("with null as maximumSize", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                }, null)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER,Pool maximum size must be a number')
            }
        })

        it("with object as maximumSize", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                }, {})

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_NUMBER,Pool maximum size must be a number')
            }
        })

        it("with no maximumSize", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                })
            } catch (err) {
                expect(err.message).to.have.string('params.options must be an object')
            }
        })

        it("with negative maximumSize", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                }, -1)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_ZERO_OR_GREATER,Pool maximum size must be equal or greater than 0')
            }
        })

        it("with 0 as maximumSize", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                }, 0)

            } catch (err) {
                expect(err.message).to.have.string('should not happen')
            }
        })

        it("with positive maximumSize", async () => {
            try {
                const pool = new mindServer.dynamicPool({
                    host: 'localhost',
                    port: 500,
                    username: "test",
                    password: 'welcome01',
                }, 10)

            } catch (err) {
                expect(err.message).to.have.string('should not happen')
            }
        })
    })
})
