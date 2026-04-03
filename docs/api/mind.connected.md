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

### connected

---

**Type**: property / readonly

**Async**: no

**Parameters**:
<br><br>
**Returns**:

`<bool>`

---

Returns true if you are connected to the MIND server.

---

### EXAMPLES

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

let isConnected = mind.connected
console.log(isConnected)

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

isConnected = mind.connected
console.log(isConnected)

mind.disconnect()

````

---

[Back](api/mind.md)