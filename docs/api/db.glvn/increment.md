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

### increment(incrementBy)

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name          | Datatype | Optional | Description                                                |
|---------------|:--------:|:--------:|------------------------------------------------------------|
| `incrementBy` |  number  |   Yes    | The amount to  increase the specified node. Defaults to 1. |

<br>
**Returns**: `Promise<NUMBER>`

---

It increments the selected node. The node can be the root or a subscripted node.

> Subscripted nodes can be selected using the _(sub1, sub2, ...) syntax

If the global or node don't exist or contain a string, whether empty or not, it will consider it a 0.

If the parameter `incrementBy` is omitted, it will increase by one.

If the parameter `incrementBy` is a floating point number, then the addition will be executing using floating point
notation.

### EXAMPLES

---

Increment a non existing node

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
const res = await mind.db.globals.testGlobal.increment()
console.log(res)

mind.disconnect()

````

````js
res = 1
````
---

Here we increment the previous value by 4

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
const res = await mind.db.globals.testGlobal.increment(4)
console.log(res)

mind.disconnect()

````

````js
res = 5
````
---


Here we use subscripts to increment an existing value

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.testGlobal._("sub1", "sub2").setValue(4)
const res = await mind.db.globals.testGlobal._("sub1", "sub2").increment(8)

console.log(res)

mind.disconnect()

````

````js
res = 12
````

---

Here we use subscripts to increment an existing value using a floating point

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.testGlobal._("sub1", "sub2").setValue(-4)
const res = await mind.db.globals.testGlobal._("sub1", "sub2").decrement(0.25)

console.log(res)

mind.disconnect()

````

````js
res = -3.75
````

---


[Back](api/namespace.db.globals.md)