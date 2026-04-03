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

### server.platform

---

**Type**: property / readonly

**Async**: no

**Parameters**:
<br><br>
**Returns**: '<string>`

---

Returns the operating system running on the mind server.

---

### EXAMPLES

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yotadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const platform = mind.server.platform
console.log(platform)

mind.disconnect()

````

returns:

````js

platform = 'Linux'

````

---

[Back](api/namespace.process.md)