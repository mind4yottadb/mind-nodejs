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

### server.mindVersion

---

**Type**: property / readonly

**Async**: no

**Parameters**:
<br><br>
**Returns**: '<string>`

---

Returns the YottaDB software version.

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const mindVersion = mind.server.mindVersion
console.log(mindVersion)

mind.disconnect()

````

returns:

````js

mindVersion = 'r2.02'

````

---

[Back](api/namespace.process.md)