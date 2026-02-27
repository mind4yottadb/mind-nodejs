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

### decrement(decrementBy)

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| name          | data type | Optional | Description                                               |
|---------------|-----------|----------|-----------------------------------------------------------|
| `decrementBy` | number    | Yes      | The amount to  decreas the specified node. Defaults to 1. |

**Returns**:

`Promise<NUMBER>`

---

It decrements the selected node. The node can be the root or a subscripted node.

> Subscripted nodes can be selected using the _(sub1, sub2, ...) syntax

If the global or node don't exist or contain a string, whether empty or not, it will consider it a 0.

<br>

---

### EXAMPLES

Decrement a non existing node

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
const res = await mind.db.globals.testGlobal.decrement()
console.log(res)

ydb.disconnect()

````

````js
res = 2
````

<br>

---

Here we decrement the previous value by 4

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
const res = await mind.db.globals.testGlobal.decrement(4)
console.log(res)

ydb.disconnect()

````

````js
res = 6
````

<br>

---


Here we use subscripts to decrement an existing value

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')

await mind.db.globals.testGlobal._("sub1", "sub2").setValue(4)
const res = await mind.db.globals.testGlobal._("sub1", "sub2").decrement(8)

console.log(res)

ydb.disconnect()

````

````js
res = -4
````

---


[Back](../glvn)