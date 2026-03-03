<!--
#################################################################
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

### setPiece(data, pieceChar, start, end)

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| name        | data type | Optional | Description                                                      |
|-------------|-----------|----------|------------------------------------------------------------------|
| `data`      | number    | No       | The data you want to store                                       |
| `pieceChar` | number    | Yes      | The character to be used to split the string. The default is `^` |
| `start`     | number    | Yes      | The starting piece number to be returned. The default is 1.      |
| `end`       | number    | Yes      | The ending piece number to be returned. The default is 1.        |

**Returns**:

`Promise<STRING/NUMBER>`

---

It will fill the piece from `start` to `end` with the supplied `data`, using the `pieceChar`.

If `pieceChar` is missing, the character `^` will be used.

It `start` is missing, piece number 1 will be used.

If you supply a range (using both `start` and `end` characters), the supplied string will need to include the pieceChar.

If you supply a `start` number greater than an existing piece, the gap will be filled with as many `pieceChar`s as
needed.

<br>

### EXAMPLES

---

get the first piece

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
await mind.db.globals.testGlobal.setValue('aaa^bbb^ccc')
const res = await mind.db.globals.testGlobal.getPiece()
console.log(res)

ydb.disconnect()

````

````js
res = 'aaa'
````

<br>

---

get the second piece

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
await mind.db.globals.testGlobal.setValue('aaa^bbb^ccc')
const res = await mind.db.globals.testGlobal.getPiece('^', 2)
console.log(res)

ydb.disconnect()

````

````js
res = 'bbb'
````

<br>

---

get the second, third and fourth pieces

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
await mind.db.globals.testGlobal.setValue('aaa^bbb^ccc^ddd^eee^fff')
const res = await mind.db.globals.testGlobal.getPiece('^', 2, 4)
console.log(res)

ydb.disconnect()

````

````js
res = 'bbb^ccc^ddd'
````

<br>

---

get a single number

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
await mind.db.globals.testGlobal.setValue('1^2^3^4^5')
const res = await mind.db.globals.testGlobal.getPiece('^', 3)
console.log(res)

ydb.disconnect()

````

````js
res = 3
````

<br>

---


[Back](../glvn)