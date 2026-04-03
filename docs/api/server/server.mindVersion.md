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

Returns the mind software version.

---

### EXAMPLES

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yotadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const mindVersion = mind.server.mindVersion
console.log(mindVersion)

mind.disconnect()

````

returns:

````js

mindVersion = '0.4.0'

````

---

[Back](api/namespace.process.md)