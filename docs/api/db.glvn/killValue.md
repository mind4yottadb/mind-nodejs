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

### killValue()

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise<>`

---

Un-reference the selected value, leaving the subnodes intact.

> This command is NOT setting a value to an empty string, but un-reference the value.

### EXAMPLES

---

Kills a a single node value

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl._("subnode1").setValue("dummy")
await mind.db.globals.testGbl._("subnode1", "subnode2").setValue("dummy")
await mind.db.globals.testGbl._("subnode2").setValue("dummy")
await mind.db.globals.testGbl._('subnode1').killValue()

try {
    const res1 = await mind.db.globals.testGbl._("subnode1", "subnode2").readValue()
    console.log(res1)

    const res2 = await mind.db.globals.testGbl._("subnode1").readValue()
    console.log(res2)

} catch (err) {
    console.error(err.message)
}


mind.disconnect()

````

````js
res1 = 'dummy'
console.error.output = '^testGbl("subnode1"): path not found'
````
---


[Back](api/namespace.db.globals.md)