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

### server.stats()

---

**Type**: method

**Async**:  yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise <object>`

---

Returns global statistic information about the currently running sessions.

> note: for statistics related to the current session only, use the function `process.stats()`.

In order for this function to return statistics, the server needs to have the `--statistics` option turned on, in either
`grand` or `details` mode.

If the server statistics are off, an error will be thrown.

If the server statistics are set to `grand`, it will return only the grand totals:

- `total_received`: the total number of commands received
- `total_ok`: the number of commands that succeeded
- `total_nok`: the number of commands that failed
- `total_invalid_cmd`: the number of invalid commands received

If the server statistics are set to `details`, it will return only the grand totals:
The same fields returned by the `grand` option, but grouped by commands and grand_totals
---

### EXAMPLES

When stats are off

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

try {
    const stats = await mind.process.stats()
    console.log(stats)

} catch (err) {
    console.log(err.message)
}

mind.disconnect()

````

returns:

````js

err = 'No stats enabled on server'
````
---

When stats are set to `grand`

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const stats = await mind.server.stats()
console.log(stats)

mind.disconnect()

````

returns:

````js

stats = {
    grand_total: {
        total_invalid_cmd: 0,
        total_nok: 0,
        total_ok: 4,
        total_received: 4
    }
}
````
---

When stats are set to `details`

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const stats = await mind.server.stats()
console.log(stats)

mind.disconnect()

````

returns:

````js

stats = {
    'glvn.getJSON': {
        total_invalid_cmd: 0,
        total_nok: 0,
        total_ok: 2,
        total_received: 2
    },
    'glvn.setJSON': {
        total_invalid_cmd: 0,
        total_nok: 0,
        total_ok: 1,
        total_received: 1
    },
    grand_total: {
        total_invalid_cmd: 0,
        total_nok: 0,
        total_ok: 4,
        total_received: 4
    },
    server: {
        total_invalid_cmd: 0,
        total_nok: 0,
        total_ok: 0,
        total_received: 0
    },
    'server.login': {
        total_invalid_cmd: 0,
        total_nok: 0,
        total_ok: 1,
        total_received: 1
    },
    'server.stats': {
        total_invalid_cmd: 0,
        total_nok: 0,
        total_ok: 0,
        total_received: 1
    }
}
````
---


[Back](api/namespace.process.md)