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

# data <STRING> = fs.readFile(filename)

Type: function

Async: yes, returns a Promise

Parameters:

- `filename` as string

Returns:

`<Promise> data<string>`

---

Reads and returns the entire file pointed by `filename`.

If `filename` is not found or another error occurs, it will throw an error.

<br>

Example:

````js
import mind from 'mind4yottadb'

const ydb = new mind

const res = await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const data = ydb.fs.readFile('/tmp/testfile.txt')
console.log(data)

````

<br>

Using error handling:
````js
import mind from 'mind4yottadb'

const ydb = new mind

const res = await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

try {
    const data = await ydb.fs.readFile('/tmp/IdontExist')
    console.log(data)

} catch (err) {
    console.log(err)
}

// or

const data = await ydb.fs.readFile('/tmp/IdontExist').catch((err) => console.log(err))

console.log(err)

````

[Back](../namespace.fs.md)