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

### disconnect

---

**Type**: event

**Async**: no

**Parameters**:
<br><br>
**Returns**:

`Nothing`

---

Register your function to be triggered by a socket disconnection (i.e. the server session crashes or stops due to MIND
server shutdown).


---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

console.dir(ydb, {depth: 5})

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

ydb.on('disconnect', () => {
    // your code here
})

console.dir(ydb, {depth: 5})
````

---

[Back](../mind.md)