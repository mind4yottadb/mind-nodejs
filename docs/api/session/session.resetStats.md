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

### session.resetStats()

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise<>`

---

Resets the statistics for the current session only.

If statistics are not enabled, it will throw an error.

### EXAMPLES

---

Reads statistics, reset them and read them again

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

// create some stats
await mind.fs.readDir('/opt')
await mind.fs.readDir('/opt')
await mind.fs.readDir('/opt')

// read them
let stats = await mind.session.stats()
console.log(stats)

// reset them
await mind.session.resetStats()

//and read them again
stats = await mind.session.stats()
console.log(stats)

mind.disconnect()

````

````js
res = {
    grand_total: {
        total_invalid_cmd: 0,
        total_nok: 0,
        total_ok: 4,
        total_received: 4
    }
}
{
    grand_total: {
        total_invalid_cmd: 0,
            total_nok
    :
        0,
            total_ok
    :
        1,
            total_received
    :
        1
    }
}
````

---

When statistics are not enabled on the server

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

try {
    await mind.process.stats()

} catch (err) {
    console.log(err.message)
}

mind.disconnect()

````

````js
res = 'No stats enabled on server'
````

---



[Back](api/namespace.db.session.md)