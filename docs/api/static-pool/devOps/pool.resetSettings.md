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

# pool.devOps.resetSettings ()

---

**Type**: method

***Async**: Yes

**Parameters**:
<br><br>
**Returns**: `<undefined>`

---

The devOps.resetSettings() method resets all the server process options to their initial value.

> THIS AFFECTS ALL THE PROCESSES IN THE POOL


---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

// This will set the performance counters to DETAILS
await pool.devOps.resetSettings()

````

---

[Back](api/staticPool.md)