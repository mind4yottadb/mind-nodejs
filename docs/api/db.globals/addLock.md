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

### addLock(timeout)

Applies to:

- [Globals](../../namespace.db.globals.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name      | Datatype | Optional | Description                                                   |
|-----------|:--------:|:--------:|---------------------------------------------------------------|
| `timoeut` |  float   |   Yes    | The optional timeout in seconds to wait for the lock acquire. |

<br>
**Returns**: `Promise<>`

---

It adds a lock to the selected global / node.

If a `timeout` is specified and it expires, an error will be thrown.

### EXAMPLES

---

Applies two locks and display them.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yotadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.globalTest._("test", 23).addLock()
await mind.db.globals.globalTest._("extra lock", 78).addLock()

const locks = await mind.process.showLocks()
console.log(locks)

mind.disconnect()

````

````js
locks = {
    '^globalTest("extra lock",78)': 1,
    '^globalTest("test",23)': 1
}

````

---


[Back](api/namespace.db.globals.md)