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

# pool.noMoreSlotsHitsResolved

---

**Type**: event

**Async**: no

**Parameters**:
<br><br>
**Returns**:

`Nothing`

---

Register your function to be triggered when the `getSession()` method couldn't allocate a session, but eventually
succeeded.

---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

pool.on('noMoreSlotsHitsResolved', () => {
    // your code here

})

````

---

[Back](api/namespace.staticPool.md)