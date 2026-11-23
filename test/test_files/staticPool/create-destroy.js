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

describe("Pool static: creation / destroy", async () => {
    describe("Pool creation: size", async () => {
        it("with no param at all", async () => {
            try {
                const pool = new mindServer.staticPool()

            } catch (err) {
                expect(err.message).to.have.string('Missing pool size')
            }
        });

        it("with string as pool size", async () => {
            try {
                const pool = new mindServer.staticPool('test')

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with boolean as pool size", async () => {
            try {
                const pool = new mindServer.staticPool(false)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with null as pool size", async () => {
            try {
                const pool = new mindServer.staticPool(null)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with object as pool size", async () => {
            try {
                const pool = new mindServer.staticPool({test: 12})

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be a number')
            }
        });

        it("with number < 2", async () => {
            try {
                const pool = new mindServer.staticPool(1)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be at least 2')
            }
        });

        it("with number < 2", async () => {
            try {
                const pool = new mindServer.staticPool(-23)

            } catch (err) {
                expect(err.message).to.have.string('Pool size must be at least 2')
            }
        });
    })

    describe("Pool creation: extend", async () => {
        it("with string as extend size", async () => {
            try {
                const pool = new mindServer.staticPool(64, 'test')

            } catch (err) {
                expect(err.message).to.have.string('Pool extension must be a number')
            }
        });

        it("with number < 1", async () => {
            try {
                const pool = new mindServer.staticPool(64, -2)

            } catch (err) {
                expect(err.message).to.have.string('Pool extension can not be negative')
            }
        });
    })

    describe("Pool creation: options", async () => {
        it("options as string", async () => {
            try {
                const pool = new mindServer.staticPool(4, 2, 'options')

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_OBJECT,pool options must')
            }
        });

        it("options as number", async () => {
            try {
                const pool = new mindServer.staticPool(4, 2, 12)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_OBJECT,pool options must')
            }
        });

        it("options as boolean", async () => {
            try {
                const pool = new mindServer.staticPool(4, 2, false)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_OBJECT,pool options must')
            }
        });

        it("options as null", async () => {
            try {
                const pool = new mindServer.staticPool(4, 2, null)

            } catch (err) {
                expect(err.message).to.have.string('PARAM_NOT_OBJECT,pool options must')
            }
        });

        it("options as object", async () => {
            const pool = new mindServer.staticPool(4, 2, {})
        });

        describe("Pool creation: options.extensions", async () => {
            it("options.extensions as string", async () => {
                const options = {extensions: 'test'}

                try {
                    const pool = new mindServer.staticPool(4, 2, options)

                } catch (err) {
                    expect(err.message).to.have.string('PARAM_NOT_OBJECT,extensions must be')
                }
            });

            it("options.extensions as number", async () => {
                const options = {extensions: 22}

                try {
                    const pool = new mindServer.staticPool(4, 2, options)

                } catch (err) {
                    expect(err.message).to.have.string('PARAM_NOT_OBJECT,extensions must be')
                }
            });

            it("options.extensions as boolean", async () => {
                const options = {extensions: false}

                try {
                    const pool = new mindServer.staticPool(4, 2, options)

                } catch (err) {
                    expect(err.message).to.have.string('PARAM_NOT_OBJECT,extensions must be')
                }
            });

            it("options.extensions as null", async () => {
                const options = {extensions: null}

                try {
                    const pool = new mindServer.staticPool(4, 2, options)

                } catch (err) {
                    expect(err.message).to.have.string('PARAM_NOT_OBJECT,extensions must be')
                }
            });

            it("options.extensions as object", async () => {
                const options = {extensions: {}}

                const pool = new mindServer.staticPool(4, 2, options)
            });

            describe("extensions: retry", async () => {
                it("options.extensions.retry as string", async () => {
                    const options = {
                        extensions: {
                            retry: 'test'
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_OBJECT,extensions.retry')
                    }
                });

                it("options.extensions.retry as number", async () => {
                    const options = {
                        extensions: {
                            retry: 0
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_OBJECT,extensions.retry')
                    }
                });

                it("options.extensions.retry as boolean", async () => {
                    const options = {
                        extensions: {
                            retry: true
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_OBJECT,extensions.retry')
                    }
                });

                it("options.extensions.retry as null", async () => {
                    const options = {
                        extensions: {
                            retry: null
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_OBJECT,extensions.retry')
                    }
                });

                it("options.extensions.retry as object", async () => {
                    const options = {
                        extensions: {
                            retry: {}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.count as string", async () => {
                    const options = {
                        extensions: {
                            retry: {count: 'test'}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.count must be')
                    }
                });

                it("options.extensions.retry.count as boolean", async () => {
                    const options = {
                        extensions: {
                            retry: {count: true}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.count must be')
                    }
                });

                it("options.extensions.retry.count as null", async () => {
                    const options = {
                        extensions: {
                            retry: {count: null}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.count must be')
                    }
                });

                it("options.extensions.retry.count as object", async () => {
                    const options = {
                        extensions: {
                            retry: {count: {}}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.count must be')
                    }
                });

                it("options.extensions.retry.count as number, invalid value", async () => {
                    const options = {
                        extensions: {
                            retry: {count: -1}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_BAD_VALUE,retry.count must be')
                    }
                });

                it("options.extensions.retry.count as number, invalid value", async () => {
                    const options = {
                        extensions: {
                            retry: {count: 101}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_BAD_VALUE,retry.count must be')
                    }
                });

                it("options.extensions.retry.count as number, valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {count: 0}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.count as number, valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {count: 10}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.count as number, valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {count: 100}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.delay as string", async () => {
                    const options = {
                        extensions: {
                            retry: {delay: 'test'}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delay must be')
                    }
                });

                it("options.extensions.retry.delay as boolean", async () => {
                    const options = {
                        extensions: {
                            retry: {delay: true}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delay must be')
                    }
                });

                it("options.extensions.retry.delay as null", async () => {
                    const options = {
                        extensions: {
                            retry: {delay: null}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delay must be')
                    }
                });

                it("options.extensions.retry.delay as object", async () => {
                    const options = {
                        extensions: {
                            retry: {delay: {}}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delay must be')
                    }
                });

                it("options.extensions.retry.delay invalid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delay: 9}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_BAD_VALUE,retry.delay must be')
                    }
                });

                it("options.extensions.retry.delay invalid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delay: 1001}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_BAD_VALUE,retry.delay must be')
                    }
                });

                it("options.extensions.retry.delay valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delay: 10}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.delay valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delay: 100}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.delay valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delay: 1000}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.delayRndMin as string", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMin: 'test'}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.count must be')
                    }
                });

                it("options.extensions.retry.delayRndMin as boolean", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMin: true}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delayRndMin must be')
                    }
                });

                it("options.extensions.retry.delayRndMin as null", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMin: null}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delayRndMin must be')
                    }
                });

                it("options.extensions.retry.delayRndMin as object", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMin: {}}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delayRndMin must be')
                    }
                });

                it("options.extensions.retry.delayRndMin invalid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMin: 0}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_BAD_VALUE,retry.delayRndMin must be')
                    }
                });

                it("options.extensions.retry.delayRndMin invalid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMin: 101}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_BAD_VALUE,retry.delayRndMin be')
                    }
                });

                it("options.extensions.retry.delayRndMin valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMin: 1}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.delayRndMin valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMin: 10}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.delayRndMin valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMin: 100}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.delayRndMax as string", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMax: 'test'}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delayRndMax must be')
                    }
                });

                it("options.extensions.retry.delayRndMax as boolean", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMax: true}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delayRndMax must be')
                    }
                });

                it("options.extensions.retry.delayRndMax as null", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMax: null}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delayRndMax must be')
                    }
                });

                it("options.extensions.retry.delayRndMax as object", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMax: {}}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_NOT_NUMBER,retry.delayRndMax must be')
                    }
                });

                it("options.extensions.retry.delayRndMax invalid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMax: 0}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_BAD_VALUE,retry.delayRndMax must be')
                    }
                });

                it("options.extensions.retry.delayRndMax invalid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMax: 501}
                        }
                    }

                    try {
                        const pool = new mindServer.staticPool(4, 2, options)

                    } catch (err) {
                        expect(err.message).to.have.string('PARAM_BAD_VALUE,retry.delayRndMax must be')
                    }
                });

                it("options.extensions.retry.delayRndMax valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMax: 1}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.delayRndMax valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMax: 100}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });

                it("options.extensions.retry.delayRndMax valid value", async () => {
                    const options = {
                        extensions: {
                            retry: {delayRndMax: 500}
                        }
                    }

                    const pool = new mindServer.staticPool(4, 2, options)
                });


            })
        })
    })







    describe("Pool creation: create()", async () => {
        it("invalid, missing parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create()

            } catch (err) {
                expect(err.message).to.have.string('host must be a string')
            }
        })

        it("invalid, missing parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost')

            } catch (err) {
                expect(err.message).to.have.string('port must be a number')
            }
        })

        it("invalid, missing parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost', 100)

            } catch (err) {
                expect(err.message).to.have.string('username must be a string')
            }
        })

        it("invalid, missing password parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost', 100, "user")

            } catch (err) {
                expect(err.message).to.have.string('password must be a string')
            }
        })

        it("invalid, missing password parameters", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('myHost', 100, "user", "pass", "options")

            } catch (err) {
                expect(err.message).to.have.string('options must be an object')
            }
        })


        it("invalid, with no extension", async () => {
            const pool = new mindServer.staticPool(3)

            try {
                await pool.create('127.0.0.1', 10000, 'admin', 'admin2', {})

            } catch (err) {
                expect(err.message).to.have.string('LOGIN_FAILED,Invalid credentials')
            }
        })

        it("valid, with no extension", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);

            pool.destroy()
        });

        it("valid, with extension", async () => {
            const pool = new mindServer.staticPool(8, 4)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            const status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(8);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);

            pool.destroy()
        });

        it("validate devOps session", async () => {
            const pool = new mindServer.staticPool(8, 4)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

            expect(pool.devOps.session.server !== undefined).to.be.true
            expect(typeof pool.devOps.session.done === 'function').to.be.true

            pool.destroy()
        });
    })

    describe("Pool creation: destroy()", async () => {
        it("with not initialized pool", async () => {
            const pool = new mindServer.staticPool(8, 4)

            try {
                pool.destroy()
            } catch (err) {
                expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
            }
        })

        it("valid", async () => {
            const pool = new mindServer.staticPool(8, 4)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(8);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);

            pool.destroy()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })
    })

    describe("Pool creation: rundown()", async function () {
        this.timeout(30000)
        it("with not initialized pool", async () => {
            const pool = new mindServer.staticPool(8, 4)

            try {
                pool.rundown()
            } catch (err) {
                expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
            }
        })

        it("valid (3) with nothing executing", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);

            await pool.rundown()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("valid (24) with nothing executing", async () => {
            const pool = new mindServer.staticPool(24)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(24);

            await pool.rundown()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("valid (3) with timed locks executing", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);

            const session1 = await pool.getSession()
            const session2 = await pool.getSession()

            session1.db.globals.addName('test')
            session2.db.globals.addName('test')

            await session1.db.globals.test.addLock()

            setTimeout(async () => {
                await pool.rundown()

            }, 1000)

            await session2.db.globals.test.addLock(3)

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("with not initialized pool", async () => {
            const pool = new mindServer.staticPool(8, 4)

            try {
                pool.rundown()
            } catch (err) {
                expect(err.message).to.have.string('POOL_NOT_INITIALIZED')
            }
        })

        it("valid (3,3) with nothing executing", async () => {
            const pool = new mindServer.staticPool(3, 3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3);

            await pool.rundown()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("valid (24,3) with nothing executing", async () => {
            const pool = new mindServer.staticPool(24)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(24, 3);

            await pool.rundown()

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })

        it("valid (3,3) with timed locks executing", async () => {
            const pool = new mindServer.staticPool(3)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})
            let status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(3, 3);

            const session1 = await pool.getSession()
            const session2 = await pool.getSession()

            session1.db.globals.addName('test')
            session2.db.globals.addName('test')

            await session1.db.globals.test.addLock()

            setTimeout(async () => {
                await pool.rundown()

            }, 1000)

            await session2.db.globals.test.addLock(3)

            status = pool.getStatus()

            expect(status.sessionsTotal).to.equal(0);
            expect(status.sessionsInUse).to.equal(0);
            expect(status.sessionsExtendedInUse).to.equal(0);
        })
    })

    describe("Enumerable pool structure ", async function () {
        this.timeout(30000)

        it("before init", async () => {
            const pool = new mindServer.staticPool(2, 2)
            const struct = JSON.parse(JSON.stringify(pool))

            expect(typeof struct.stats === 'undefined').to.be.true
            expect(typeof struct.devOps.session === 'undefined').to.be.true
            expect(typeof struct.devOps.sessionInUse === 'undefined').to.be.true

            pool.rundown()
        })

        it("after init", async () => {
            const pool = new mindServer.staticPool(2, 2)

            await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

            const struct = JSON.parse(JSON.stringify(pool))

            expect(typeof struct.stats === 'undefined').to.be.true
            expect(typeof struct.devOps.session === 'undefined').to.be.true
            expect(typeof struct.devOps.sessionInUse === 'undefined').to.be.true

            pool.rundown()
        })
    })
})

