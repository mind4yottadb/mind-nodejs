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

### killTree()

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name | Datatype | Optional | Description |
|------|----------|----------|-------------|

<br>
**Returns**: `Promise<>`

---

Un-reference the selected node and its usb-nodes.

> This command is NOT setting a value to an empty string, but un-reference the nodes.
### EXAMPLES

---

Kills a node

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl._("subnode1").setValue("dummy")
await mind.db.globals.testGbl._("subnode1", "subnode2").setValue("dummy")
await mind.db.globals.testGbl._("subnode2").setValue("dummy")
await mind.db.globals.testGbl.killTree()

try {
    const res = await mind.db.globals.testGbl._("subnode1").readValue()
    console.log(res)

} catch (err) {
    console.error(err.message)
}
ydb.disconnect()

````

````js
console.error.output = '^testGbl("subnode1"): path not found'
````
---


[Back](../glvn)