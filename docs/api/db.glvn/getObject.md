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

### getObject()

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name | Datatype | Optional | Description |
|------|----------|----------|-------------|

**Returns**:

`Promise<OBJECT>`

---

Returns an object representing the JDOM found in the selected node.

If you want to return a JSON string, use the method getJSON() instead.

<br>

### EXAMPLES

---

Create a JDOM node and retrieve the object.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl._("test").setValue(23)

const res = await mind.db.globals.testGbl.getObject()

console.log(res)

ydb.disconnect()

````

````js
res = {
    test: 23
}
````

<br>

---

Create a more complex JDOM node and retrieve the object.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
await mind.db.globals.testGbl._("prop1").setValue('this is a string')
await mind.db.globals.testGbl._("prop2").setValue(45.23)
await mind.db.globals.testGbl._("prop3", "usbprop2").setValue(45.23)

const res = await mind.db.globals.testGbl.getObject()

console.log(res)

ydb.disconnect()

````

````js
res = {
    prop1: "this is a string",
    prop2: 45.23,
    prop3: {
        usbprop2: 45.23
    },
    test: 23
}
````

<br>

---


Accessing an empty or not existing node

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')

const res = await mind.db.globals.testGbl._("IdontExists").getObject()

console.log(res)

ydb.disconnect()

````

````js
res = {}
````

---

[Back](../glvn)