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

### hasNodes()

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise<BOOLEAN>`

---

Returns the boolean `true` is the selected node has sub-nodes.

### EXAMPLES

---

Inspect a node with sub-nodes

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl._("subnode").setValue("dummy")
const res = await mind.db.globals.testGbl.hasNodes()

console.log(res)

mind.disconnect()

````

````js
res = true
````

---

Inspect a node without sub-nodes

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl._("subnode").setValue("dummy")
const res = await mind.db.globals.testGbl._("subnode").hasNodes()

console.log(res)

mind.disconnect()

````

````js
res = false
````

---

[Back](api/namespace.db.globals.md)