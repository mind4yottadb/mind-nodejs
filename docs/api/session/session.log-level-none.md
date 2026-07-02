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

### session.LOG_LEVEL_NONE

---

**Type**: property / readonly

**Async**: no

**Parameters**:
<br><br>
**Returns**: `<number>`

---

### EXAMPLES

---

Dump the value

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

const ret = await mind.connect('127.0.0.1', 10000, 'admin', 'admin')
console.log(ret)

await mind.session.LOG_LEVEL_NONE

mind.disconnect()
````

returns:

````js
0
````

---

[Back](api/namespace.session.md)