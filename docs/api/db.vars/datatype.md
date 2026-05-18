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

### datatype()

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise<STRING>`

---

Returns the datatype of the selected node.

It can return the following values:

- `undefined` if the node doesn't exists or its value is not set
- `string` if the node contains a string
- `int` if the node contains an integer
- `float` if the node contains a floating point

### EXAMPLES

---

Try to get the datatype from a non-existing node.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
const res = await mind.db.globals.testGbl.datatype()

console.log(res)

mind.disconnect()

````

````js
res = 'undefined'
````

---

Get a string value from an existing node.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl.setValue(12)
const res = await mind.db.globals.testGbl.datatype()

console.log(res)

mind.disconnect()

````

````js
res = 'string'
````

---

[Back](api/namespace.db.vars.md)