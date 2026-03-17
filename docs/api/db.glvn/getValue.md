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

### getValue()

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| name | data type | Optional | Description |
|------|-----------|----------|-------------|

**Returns**:

`Promise<STRING/NUMBER>`

---

Returns the value found in the selected node.

If the node doesn't exist or doesn't have a value, it will return an empty string.
If you want to get an error if the path to the node is invalid or the node doesn't have a value, use the method
readValue() instead.

If the value is a number, then a number datatype is used, otherwise it will return a string.

<br>

### EXAMPLES

---

Try to get a value from a non-existing node.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
const res = await mind.db.globals.testGbl.getValue()

console.log(res)

ydb.disconnect()

````

````js
res = ''
````

<br>

---

Try to get a value from a non-existing node.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
const res = await mind.db.globals.testGbl._("subscript").getValue()

console.log(res)

ydb.disconnect()

````

````js
res = ''
````

<br>

---

Get a string value from an existing node.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl.setValue(12)
const res = await mind.db.globals.testGbl._("subscript").getValue()

console.log(res)

ydb.disconnect()

````

````js
res = 12
````

<br>

---

Get a string value from an existing node.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl._("subscript").setValue('testString')
const res = await mind.db.globals.testGbl._("subscript").getValue()

console.log(res)

ydb.disconnect()

````

````js
res = 'testString'
````

<br>

---

[Back](../glvn)