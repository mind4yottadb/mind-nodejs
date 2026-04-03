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

### process.clearLocksGroup()

---

**Type**: method

**Async**: no

**Parameters**:
<br><br>
**Returns**: `Promise <>`

---

Clears a previously created lockGroup using the method process.groupLocks().

---

### EXAMPLES

Here we create a lockGroup, we add locks, we clear it and then we try to commit it.

The commit() call returns an error.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yotadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

mind.process.groupLocks()
await mind.db.globals.globalTest._("test", 23).addLock()
await mind.db.globals.globalTest._("extra lock", 78).addLock()
mind.process.clearLocksGroup()

try {
    await mind.process.commitLocks()
} catch (err) {
    console.log(err.message)
}

mind.disconnect()

````

returns:

````js

locks = 'No lock group started, execute groupLocks() first'

````

---

[Back](api/namespace.process.md)