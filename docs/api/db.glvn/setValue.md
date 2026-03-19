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

### setValue(data)

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name   | Datatype        | Optional | Description                                                           |
|--------|-----------------|----------|-----------------------------------------------------------------------|
| `data` | string / number | Yes      | The data you want to store. If missing, an empty string will be used. |

<br>
**Returns**:

`Promise`

---

Sets a node to a value.

The value can be either a string or a number.
### EXAMPLES

---

Sets a node to a string

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl.setValue('this is a string')
const res = await mind.db.globals.testGbl.getValue()

console.log(res)

ydb.disconnect()

````

````js
res = 'this is a string'
````
---

Sets a node to a number

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl.setValue(23.5647)
const res = await mind.db.globals.testGbl.getValue()

console.log(res)

ydb.disconnect()

````

````js
res = 23.5647
````
---

Sets a node to an empty string

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl.setValue()
const res = await mind.db.globals.testGbl.getValue()

console.log(res)

ydb.disconnect()

````

````js
res = ''
````
---



[Back](../glvn)