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

### readValue()

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
**Returns**: `Promise<STRING || NUMBER>`

---

Returns the value found in the selected node.

If the node doesn't exist or doesn't have a value, it will throw an error.
If you want to avoid getting errors and get an empty string, when the path to the node is invalid or the node doesn't
have a value, use the method
getValue() instead.

If the value is a number, then a number datatype is used, otherwise it will return a string.
### EXAMPLES

---

Try to read a value from a non-existing node.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
const res = await mind.db.globals.testGbl.getValue()

try {
    const res2 = await mind.db.globals.testGbl._("subnode33").readValue()
    console.log(res2)

} catch (err) {
    console.error(err.message)
}


console.log(res)

ydb.disconnect()

````

````js
console.error.output = '^testGbl("subnode33"): path not found'
````
---

Try to read a value from an existing node.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl._("subnode1").setValue("dummy")
const res = await mind.db.globals.testGbl._("subnode1").getValue()

console.log(res)

ydb.disconnect()

````

````js
res = 'dummy'
````
---

[Back](../glvn)