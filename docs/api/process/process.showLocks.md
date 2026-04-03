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

### process.showLocks()

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise <object>`

---

Returns an object with all the locks in effect and their level FOR THIS PROCESS ONLY.

---

### EXAMPLES

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yotadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.globalTest._("test", 23).addLock()
await mind.db.globals.globalTest._("extra lock", 78).addLock()
let locks = await mind.process.showLocks()
console.log(locks)

mind.disconnect()

````

returns:

````js

locks = {
    '^globalTest("extra lock",78)': 1,
    '^globalTest("test",23)': 1
}

````

---

[Back](api/namespace.process.md)