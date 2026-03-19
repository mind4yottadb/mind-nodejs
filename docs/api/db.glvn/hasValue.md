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

### hasValue()

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
**Returns**:

`Promise<BOOLEAN>`

---

Returns the boolean `true` is the selected node has a value.
### EXAMPLES

---

Inspect a node with value

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl._("subnode").setValue("dummy")
const res = await mind.db.globals._("subnode").testGbl.hasValue()

console.log(res)

ydb.disconnect()

````

````js
res = true
````
---

Inspect a node without value

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
const res = await mind.db.globals.testGbl._("new-subnode").hasValue()

console.log(res)

ydb.disconnect()

````

````js
res = false
````
---

[Back](../glvn)