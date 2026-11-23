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

# pool.STATS_NONE

---

**Type**: property

**Async**: no

**Parameters**:
<br><br>
**Returns**: `<number>`

---

Returns the value corresponding to STATS_NONE.

STATS_NONE = 0

---

### EXAMPLES

````js
import mind from 'mind-client-js'

const pool = new mind.staticPool(2)
await pool.create('127.0.0.1', 10000, 'admin', 'admin')

await pool.devOps.setStatsl(pool.devOps.STATS_NONE)

````

---

[Back](api/namespace.staticPool.md)