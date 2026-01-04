/*
#################################################################
#                                                               #
# Copyright (c) 2022-2025 YottaDB LLC and/or its subsidiaries.  #
# All rights reserved.                                          #
#                                                               #
#   This source code contains the intellectual property         #
#   of its copyright holder(s), and is made available           #
#   under a license.  If you do not know the terms of           #
#   the license, please stop and do not read further.           #
#                                                               #
#################################################################
*/

const {expect} = require("chai");
const {createYdbInstance} = require("../utils.cjs");

describe("fs.readFile()", async () => {
    it("when filename is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.readFile()

        } catch (err) {
            expect(err.message).to.have.string('the filename has not been provided')
        }

        ydb.disconnect()
    });

    it("when filename doesn't exists", async () => {
        const ydb = await createYdbInstance()
        const filename = '/mind/testing'

        try {
            const res = await ydb.fs.readFile(filename)

        } catch (err) {
            expect(err.message).to.have.string('error opening: ' + '/mind/testing')
        }

        ydb.disconnect()
    });

    it("when filename exists", async () => {
        const ydb = await createYdbInstance()
        const filename = '$ydb_dist/plugin/etc/mind/mind.config'

        try {
            const res = await ydb.fs.readFile(filename)

            expect(res === '').to.be.false

        } catch (err) {
            expect(false).to.be.true
        }

        ydb.disconnect()
    });
});

describe("fs.writeFile()", async () => {
    it("when filename is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            await ydb.fs.writeFile()

        } catch (err) {
            expect(err.message).to.have.string('the filename has not been provided')
        }

        ydb.disconnect()
    });

    it("when filename doesn't exists", async () => {
        const ydb = await createYdbInstance()
        const filename = '/mind/testing'

        try {
            await ydb.fs.writeFile(filename)

        } catch (err) {
            expect(err.message).to.have.string('error opening: ' + '/mind/testing')
        }

        ydb.disconnect()
    });

    it("when filename exists, write and read back", async () => {
        const ydb = await createYdbInstance()
        const filename = '$ydb_dist/plugin/etc/mind/testfile.test'
        const dataToWrite = 'Testing the writeFile() method'

        try {
            await ydb.fs.writeFile(filename, dataToWrite)

            const res = await ydb.fs.readFile(filename)

            expect(res).to.have.string(dataToWrite)

        } catch (err) {
            expect(false).to.be.true
        }

        ydb.disconnect()
    });
});

describe("fs.appendFile()", async () => {
    it("when filename is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            await ydb.fs.appendFile()

        } catch (err) {
            expect(err.message).to.have.string('the filename has not been provided')
        }

        ydb.disconnect()
    });

    it("when filename doesn't exists", async () => {
        const ydb = await createYdbInstance()
        const filename = '/mind/appendFile'

        try {
            await ydb.fs.appendFile(filename)

        } catch (err) {
            expect(err.message).to.have.string('error opening: ' + '/mind/appendFile')
        }

        ydb.disconnect()
    });

    it("when filename exists, write and read back", async () => {
        const ydb = await createYdbInstance()
        const filename = '$ydb_dist/plugin/etc/mind/testfile.test'
        const dataToAppend = 'appending data'

        try {
            await ydb.fs.appendFile(filename, dataToAppend)
            await ydb.fs.appendFile(filename, dataToAppend)

            const res = await ydb.fs.readFile(filename)

            expect(res).to.have.string(dataToAppend + '\n' + dataToAppend)

        } catch (err) {
            console.log(err)
            expect(false).to.be.true
        }

        ydb.disconnect()
    });
});

describe("fs.readdir()", async () => {
    it("when path is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            await ydb.fs.readdir()

        } catch (err) {
            expect(err.message).to.have.string('the path has not been provided')
        }

        ydb.disconnect()
    });

    it("when path doesn't exists", async () => {
        const ydb = await createYdbInstance()
        const path = '/etc/mindrules'

        try {
            await ydb.fs.readdir(path)

        } catch (err) {
            expect(err.message).to.have.string('the path does not exists')
        }

        ydb.disconnect()
    });

    it("when path exists, mask is *", async () => {
        const ydb = await createYdbInstance()
        const path = '$ydb_dist/plugin/etc/'
        const mask = '*'

        try {
            const res = await ydb.fs.readdir(path, mask)

            expect(res[0]).to.have.string('mind')
            expect(res[1]).to.have.string('ydbgui')
            expect(res.length === 2).to.be.true

        } catch (err) {
            console.log(err)
            expect(false).to.be.true
        }

        ydb.disconnect()
    });

    it("when path exists, mask is *.*", async () => {
        const ydb = await createYdbInstance()
        const path = '$ydb_dist/plugin/etc/mind'
        const mask = '*.*'

        try {
            const res = await ydb.fs.readdir(path, mask)

            expect(res.length === 4).to.be.true

        } catch (err) {
            console.log(err)
            expect(false).to.be.true
        }

        ydb.disconnect()
    });

    it("when path exists, mask is *.*", async () => {
        const ydb = await createYdbInstance()
        const path = '$ydb_dist/plugin/etc/mind'
        const mask = '*.json'

        try {
            const res = await ydb.fs.readdir(path, mask)

            expect(res.length === 2).to.be.true

        } catch (err) {
            console.log(err)
            expect(false).to.be.true
        }

        ydb.disconnect()
    });
});

describe("fs.readtree()", async () => {
    it("when path is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.readtree()

        } catch (err) {
            expect(err.message).to.have.string('the path has not been provided')
        }

        ydb.disconnect()
    });

    it("when path doesn't exists", async () => {
        const ydb = await createYdbInstance()
        const path = '/etc/mindrules'

        try {
            const res = await ydb.fs.readtree(path)

        } catch (err) {
            expect(err.message).to.have.string('the path does not exists')
        }

        ydb.disconnect()
    })

    it("when path is root", async () => {
        const ydb = await createYdbInstance()
        const path = '/'

        try {
            const res = await ydb.fs.readtree(path)

        } catch (err) {
            expect(err.message).to.have.string('the path can not be root')
        }

        ydb.disconnect()
    })

    it("when path is not valid", async () => {
        const ydb = await createYdbInstance()
        const path = '/opt/mind/notexist'

        try {
            const res = await ydb.fs.readtree(path)

        } catch (err) {
            expect(err.message).to.have.string('the path does not exists')
        }

        ydb.disconnect()
    })

    it("when path is valid and mask is empty", async () => {
        const ydb = await createYdbInstance()
        const path = '/opt/mind/'

        try {
            const res = await ydb.fs.readtree(path)
            expect(Array.isArray(res)).to.be.true
            expect(res.length > 10).to.be.true

        } catch (err) {
            throw err
        }

        ydb.disconnect()
    })

    it("when path is valid and mask is *", async () => {
        const ydb = await createYdbInstance()
        const path = '/opt/mind/'
        const mask = "*"

        try {
            const res = await ydb.fs.readtree(path, mask)
            expect(Array.isArray(res)).to.be.true
            expect(res.length > 10).to.be.true

        } catch (err) {
            throw err
        }

        ydb.disconnect()
    })

    it("when path is valid and mask is *.*", async () => {
        const ydb = await createYdbInstance()
        const path = '/opt/mind/'
        const mask = "*.*"

        try {
            const res = await ydb.fs.readtree(path, mask)
            expect(Array.isArray(res)).to.be.true
            expect(res.length > 50).to.be.true

        } catch (err) {
            throw err
        }

        ydb.disconnect()
    })

    it("when path is valid and mask is *.m", async () => {
        const ydb = await createYdbInstance()
        const path = '/opt/mind/'
        const mask = "*.m"

        try {
            const res = await ydb.fs.readtree(path, mask)
            expect(Array.isArray(res)).to.be.true
            expect(res.length > 20).to.be.true

        } catch (err) {
            throw err
        }

        ydb.disconnect()
    })
})

describe("fs.removeFile()", async () => {
    it("when path is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.removeFile()

        } catch (err) {
            expect(err.message).to.have.string('the filename has not been provided')
        }

        ydb.disconnect()
    });

    it("when path doesn't exists", async () => {
        const ydb = await createYdbInstance()
        const path = '/etc/mindrules'

        try {
            const res = await ydb.fs.removeFile(path)

        } catch (err) {
            expect(err.message).to.have.string('error opening: ' + path)
        }

        ydb.disconnect()
    })

    it("create a file, delete it and verify", async () => {
        const ydb = await createYdbInstance()
        const path = '/tmp/fileToBeDeleted'

        try {
            let res = await ydb.fs.writeFile('/tmp/fileToBeDeleted', 'file data')

            res = await ydb.fs.expandPath(path)
            expect(res === '').to.be.false

            res = await ydb.fs.removeFile(path)

            res = await ydb.fs.expandPath(path)
            expect(res === '').to.be.true

        } catch (err) {
            expect(err.message).to.have.string('path could not be resolved')
        }

        ydb.disconnect()
    })

})

describe("fs.renameFile()", async () => {
    it("when destination filename is not provided", async () => {

        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.renameFile('/test')

        } catch (err) {
            expect(err.message).to.have.string('the destination filename has not been provided')
        }

        ydb.disconnect()
    });

    it("when source filename is not provided", async () => {
        const ydb = await createYdbInstance()
        const destination = '/etc/mindrules2'

        try {
            const res = await ydb.fs.renameFile('', destination)

        } catch (err) {
            expect(err.message).to.have.string('the filename has not been provided')
        }

        ydb.disconnect()
    })

    it("when source filename does not exists", async () => {
        const ydb = await createYdbInstance()
        const source = '/etc/idontexists'
        const destination = '/etc/mindrules2'

        try {
            const res = await ydb.fs.renameFile(source, destination)

        } catch (err) {
            expect(err.message).to.have.string('error opening: ' + source)
        }

        ydb.disconnect()
    })

    it("create a file, delete it and verify", async () => {
        const ydb = await createYdbInstance()
        const source = '/etc/mindrules'
        const destination = '/etc/mindrules2'

        try {
            let res = await ydb.fs.writeFile(source, 'file data')

            res = await ydb.fs.expandPath(source)
            expect(res === '').to.be.false

            res = await ydb.fs.renameFile(source, destination)

            res = await ydb.fs.expandPath(source)
            expect(res === '').to.be.true

            res = await ydb.fs.expandPath(destination)
            expect(res === '').to.be.false

        } catch (err) {
            expect(err.message).to.have.string('path could not be resolved')
        }

        ydb.disconnect()
    })

})




describe("fs.copyfile()", async () => {
    it("when source filename is not provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.copyfile()

        } catch (err) {
            expect(err.message).to.have.string('the source filename has not been provided')

        }
        ydb.disconnect()
    })

    it("when source filename does not exists", async () => {
        const ydb = await createYdbInstance()
        const path = '/opt/idontexist'

        try {
            const res = await ydb.fs.copyfile(path)

        } catch (err) {
            expect(err.message).to.have.string('the source filename does not exists or it is not accessible')

        }
        ydb.disconnect()

    });

    it("when source filename is a directory", async () => {
        const ydb = await createYdbInstance()
        const path = '/opt/mind'

        try {
            const res = await ydb.fs.copyfile(path)

        } catch (err) {
            expect(err.message).to.have.string('the source filename can not be a directory')

        }
        ydb.disconnect()

    });

    it("when destination filename is not provided", async () => {
        const ydb = await createYdbInstance()
        const path = '/tmp/stef/a'

        try {
            const res = await ydb.fs.copyfile(path)

        } catch (err) {
            expect(err.message).to.have.string('the destination filename has not been provided')

        }
        ydb.disconnect()

    });

    it("when destination filename path is not valid", async () => {
        const ydb = await createYdbInstance()
        const path = '/tmp/stef/a'
        const destination = '/tmp/stefxxx/a'

        try {
            const res = await ydb.fs.copyfile(path, destination)

        } catch (err) {
            expect(err.message).to.have.string('the path of the destination is not valid')

        }
        ydb.disconnect()

    });

    it("when destination filename is a directory", async () => {
        const ydb = await createYdbInstance()
        const path = '/tmp/stef/a'
        const destination = '/tmp/stef'

        try {
            const res = await ydb.fs.copyfile(path, destination)

        } catch (err) {
            expect(err.message).to.have.string('the destination filename can not be a directory')

        }
        ydb.disconnect()

    });

    it("when source and destination are ok, copy and verify", async () => {
        const ydb = await createYdbInstance()
        const path = '/tmp/stef/a'
        const destination = '/tmp/stef/anew'

        try {
            await ydb.fs.copyfile(path, destination)

            const res = await ydb.fs.expandPath(destination)
            expect(res === '').to.be.false

        } catch (err) {
            expect(err.message).to.have.string('the destination filename can not be a directory')

        }
        ydb.disconnect()

    });
})

describe("fs.stat()", async () => {
    it("when path is not provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.stat()

        } catch (err) {
            expect(err.message).to.have.string('the filename has not been provided')

        }
        ydb.disconnect()
    })

    it("when path is not provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.stat('testnotexists')

        } catch (err) {
            expect(err.message).to.have.string('the filename does not exists or it is not accessible')

        }
        ydb.disconnect()
    })

    it("when a valid path is provided", async () => {
        const ydb = await createYdbInstance()

        const res = await ydb.fs.stat('/opt/mind')
        expect(Object.keys(res).length).to.equal(16)

        ydb.disconnect()
    })

})


describe("fs.rmdir()", async () => {
    it("when path is not provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.rmdir()

        } catch (err) {
            expect(err.message).to.have.string('the path can not be empty')

        }
        ydb.disconnect()
    })

    it("when path is not provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.rmdir('testnotexists')

        } catch (err) {
            expect(err.message).to.have.string('the path does not exists')

        }
        ydb.disconnect()
    })

    it("when path is not empty", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.rmdir('/tmp/stef')

        } catch (err) {
            expect(err.message).to.have.string('the directory is not empty')

        }
        ydb.disconnect()
    })

    it("when path is empty", async () => {
        const ydb = await createYdbInstance()

        try {
            await ydb.fs.mkdir('/tmp/stef/testrmdir')
            const res = await ydb.fs.rmdir('/tmp/stef/testrmdir')

        } catch (err) {
            expect(err.message).to.have.string('shouldn\'t happen')

        }
        ydb.disconnect()
    })
})

describe("fs.mkdir()", async () => {
    it("when path is not provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.mkdir()

        } catch (err) {
            expect(err.message).to.have.string('the path has not been provided')

        }
        ydb.disconnect()
    })

    it("when path is not provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.mkdir('testnotexists')

        } catch (err) {
            expect(err.message).to.have.string('the path is not valid')

        }
        ydb.disconnect()
    })

    it("when path already exists", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.mkdir('/tmp/stef')

        } catch (err) {
            expect(err.message).to.have.string('the path already exists')

        }
        ydb.disconnect()
    })

    it("when path does not exists", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.rmdir('/tmp/stef/testmkdir')

        } catch (err) {
        }

        try {
            const res = await ydb.fs.mkdir('/tmp/stef/testmkdir')

        } catch (err) {
            expect(err.message).to.have.string('shouldn\'t exist')

        }
        ydb.disconnect()
    })


})

describe("fs.expandPath()", async () => {
    it("when path is not provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.expandPath()

        } catch (err) {
            expect(err.message).to.have.string('the path can not be empty')

        }
        ydb.disconnect()
    })

    it("when path is not provided", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.expandPath('testnotexists')

        } catch (err) {
            expect(err.message).to.have.string('path could not be resolved')

        }
        ydb.disconnect()
    })

    it("when path is ok", async () => {
        const ydb = await createYdbInstance()

        try {
            const res = await ydb.fs.expandPath('$ydb_dist')
            expect(res).to.have.string('/opt/yottadb/current')

        } catch (err) {
            expect(err.message).to.have.string('shouldn\'t happen')

        }
        ydb.disconnect()
    })

})