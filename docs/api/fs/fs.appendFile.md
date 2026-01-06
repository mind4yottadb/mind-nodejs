<!--
###############################################################
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
-->

# fs.appendFile(filename, data)

Type: method

Async: yes, returns a Promise

Parameters:

- `filename` as string
- `data` as string

Returns:

`<Promise>`

---

Appends the string in `data` to the file specified in `filename`.

If `filename` is not found or another error occurs, it will throw an error.

<br>

Example:

````js
import mind from 'mind4yottadb'

const ydb = new mind

const res = await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const data = ydb.fs.appendFile('/tmp/testfile.txt', 'add another line\n')

````

<br>

Using error handling:

````js
import mind from 'mind4yottadb'

const ydb = new mind

const res = await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

try {
    const data = await ydb.fs.readFile('/tmp/IdontExist', 'add another line\n')
    console.log(data)

} catch (err) {
    console.log(err)
}

// or

const data = await ydb.fs.readFile('/tmp/IdontExist', 'add another line\n').catch((err) => console.log(err))

````

[Back](../namespace.fs.md)