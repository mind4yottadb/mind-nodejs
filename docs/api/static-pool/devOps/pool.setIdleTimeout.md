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

# pool.devOps.setIdleTimeout (timeout)

---

**Type**: method

***Async**: Yes

**Parameters**:

| Name    | Datatype | Optional | Description                                         |
|---------|:--------:|:--------:|-----------------------------------------------------|
| `value` |  number  |    No    | The new idleTimeout in minutes (0 means no timoeut) |

<br>
**Returns**: `<undefined>`

---

The devOps.setIdleTimeout() method modifies the idle timeout of a process.

> THIS AFFECTS ALL THE PROCESSES IN THE POOL


---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

// This will set the idleTimeout to 30 minutes
await pool.devOps.setIdleTimeout(30)

````

---

[Back](api/staticPool.md)