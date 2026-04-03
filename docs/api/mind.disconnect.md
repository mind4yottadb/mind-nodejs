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

### disconnect()

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise<>`

---

Terminates the TCP connection with the server, meaning you can NOT execute any command anymore.

If you were using variables in your session, everything will be lost.

---

### EXAMPLES

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

console.dir(mind, {depth: 5})

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.disconnect()
````

---

[Back](api/mind.md)