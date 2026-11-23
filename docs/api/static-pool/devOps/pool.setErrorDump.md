<!--
###############################################################
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

# pool.devOps.setErrorDump (value)

---

**Type**: method

***Async**: Yes

**Parameters**:

| Name    | Datatype | Optional | Description                                                                                 |
|---------|:--------:|:--------:|---------------------------------------------------------------------------------------------|
| `value` |  number  |    No    | One of the following constants:<br/>ERROR_DUMP_OFF<br/>ERROR_DUMP_BRIEF<br/>ERROR_DUMP_FULL |

<br>
**Returns**: `<undefined>`

---

The devOps.setErrorDump() method modifies the dump of the M internal errors in the logging.

> THIS AFFECTS ALL THE PROCESSES IN THE POOL


---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

// This will set the error dump to full
await pool.devOps.setErrorDump(pool.devOps.ERROR_DUMP_FULL)

````

---

[Back](api/staticPool.md)