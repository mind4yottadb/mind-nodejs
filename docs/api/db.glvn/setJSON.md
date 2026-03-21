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

### setJSON(json)

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name   | Datatype | Optional | Description                                      |
|--------|:--------:|:--------:|--------------------------------------------------|
| `json` |  string  |    No    | The string containing the JSON you want to store |

<br>
**Returns**: `Promise<>`

---

It will convert the supplied json string into JDOM and store it at the current location### EXAMPLES

---

Create a JDOM node by supplying a JSON string

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl.setJSON('{"field1":22}')

const res = await mind.db.globals.testGbl._('field1').getValue()

console.log(res)

mind.disconnect()

````

````js
res = 22
````
---


[Back](api/namespace.db.globals.md)