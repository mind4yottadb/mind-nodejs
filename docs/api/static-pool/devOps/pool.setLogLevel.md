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

# pool.devOps.setLogLevel (logLevel)

---

**Type**: method

***Async**: Yes

**Parameters**:

| Name    | Datatype | Optional | Description                                                                                                            |
|---------|:--------:|:--------:|------------------------------------------------------------------------------------------------------------------------|
| `value` |  number  |    No    | One of the following constants:<br/>LOG_LEVEL_NONE<br/>LOG_LEVEL_SESSIONS<br/>LOG_LEVEL_COMMANDS<br/>LOG_LEVEL_TIMINGS |

<br>
**Returns**: `<undefined>`

---

The devOps.setLogLevel() method modifies the logging categories

> THIS AFFECTS ALL THE PROCESSES IN THE POOL


---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

// This will set the loglevel to SESSIONS
await pool.devOps.setLogLevel(pool.devOps.LOG_LEVEL_SESSIONS)

````

---

[Back](api/staticPool.md)