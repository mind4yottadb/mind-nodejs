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

### query(glvn)

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name   | Datatype | Optional | Description                                                                                |
|--------|:--------:|:--------:|--------------------------------------------------------------------------------------------|
| `glvn` |  string  |   Yes    | The $name of the value you are looking for. If empty, it will use the current path as glvn |

<br>
**Returns**: `Promise<STRING>`

---

If finds the next collating $name to the passed parameter `glvn` or the current path (if glvn is empty).

### EXAMPLES

---

Find the next $name when used with no parameters

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

mind.db.globals.addName('apiTest')
const gbl = mind.db.globals.apiTest

await gbl.killTree()
await gbl._("testNode").setObject({
    test1: {ciao: 'test1val'},
    test2: 'test2',
    test3: 'test3',
})

let res = await gbl.query()
console.log(res)

res = await gbl.query(res)

mind.disconnect()

````

````js
res = '^apiTest("testNode","test1","ciao")'
res = '^apiTest("testNode","test2")'
````

---

[Back](api/namespace.db.globals.md)