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

### getPiece(pieceChar, start, end)

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name        | Datatype | Optional | Description                                                      |
|-------------|:--------:|:--------:|------------------------------------------------------------------|
| `pieceChar` |  number  |   Yes    | The character to be used to split the string. The default is `^` |
| `start`     |  number  |   Yes    | The starting piece number to be returned. The default is 1.      |
| `end`       |  number  |   Yes    | The ending piece number to be returned. The default is 1.        |

<br>
**Returns**: `Promise<STRING || NUMBER>`

---

It returns the string piece(s) separated by the `pieceChar` in the range between `start` and `end`.

If the range supplied by `start` and `end` falls outside the string, an empty string will be returned.

The `pieceChar` can be any ascii character (including non-printable chars). The default value is `^`.

If you return a single piece and it is a number, a number datatype will be used, otherwise it will be a string datatype.

### EXAMPLES

---

get the first piece

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
await mind.db.globals.testGlobal.setValue('aaa^bbb^ccc')
const res = await mind.db.globals.testGlobal.getPiece()
console.log(res)

mind.disconnect()

````

````js
res = 'aaa'
````
---

get the second piece

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
await mind.db.globals.testGlobal.setValue('aaa^bbb^ccc')
const res = await mind.db.globals.testGlobal.getPiece('^', 2)
console.log(res)

mind.disconnect()

````

````js
res = 'bbb'
````
---

get the second, third and fourth pieces

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
await mind.db.globals.testGlobal.setValue('aaa^bbb^ccc^ddd^eee^fff')
const res = await mind.db.globals.testGlobal.getPiece('^', 2, 4)
console.log(res)

mind.disconnect()

````

````js
res = 'bbb^ccc^ddd'
````
---

get a single number

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
await mind.db.globals.testGlobal.setValue('1^2^3^4^5')
const res = await mind.db.globals.testGlobal.getPiece('^', 3)
console.log(res)

mind.disconnect()

````

````js
res = 3
````
---


[Back](api/namespace.db.globals.md)