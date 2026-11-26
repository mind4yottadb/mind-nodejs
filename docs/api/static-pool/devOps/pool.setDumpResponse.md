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

# pool.devOps.setDumpResponse (value)

---

**Type**: method

***Async**: Yes

**Parameters**:

| Name    | Datatype | Optional | Description                                                                |
|---------|:--------:|:--------:|----------------------------------------------------------------------------|
| `value` |  number  |    No    | One of the following constants:<br/>DUMP_RESPONSE_OFF<br/>DUMP_RESPONSE_ON |

<br>
**Returns**: `<undefined>`

---

The devOps.setDumpResponse() method toggles the dump of the response in the logging.

> THIS AFFECTS ALL THE PROCESSES IN THE POOL


---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

// This will switch off the response dump
await pool.devOps.setDumpResponse(pool.devOps.DUMP_RESPONSE_OFF)

````

---

[Back](api/staticPool.md)