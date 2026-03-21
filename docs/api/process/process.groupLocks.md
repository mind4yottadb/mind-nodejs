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

### process.groupLocks()

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise <>`

---

Enable the group locks feature, meaning all the [global.addLock()](addLock.md) methods will not be
executed, but accumulated in a local buffer.

By executing the [process.commitLocks()](api/process/process.commitLocks.md) all the locks present in the local buffer
will be executed AT THE SAME TIME.

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

mind.process.groupLocks()
await mind.db.globals.globalTest._("test", 23).addLock()
await mind.db.globals.globalTest._("extra lock", 78).addLock()
let locks = await mind.process.showLocks()
console.log(locks)

await mind.process.commitLocks()
locks = await mind.process.showLocks()
console.log(locks)

mind.disconnect()

````

returns:

````js

locks = {}

locks = {
    '^globalTest("extra lock",78)': 1,
    '^globalTest("test",23)': 1
}

````

---

[Back](api/namespace.process.md)