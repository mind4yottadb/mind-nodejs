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

### server.SIG_INT

---

**Type**: property

**Async**: no

**Parameters**:
<br><br>
**Returns**: `<number>`

---

Returns the signal number corresponding to SIG_INT.

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const SIG_INT = mind.server.SIG_INT
console.log(SIG_INT)

mind.disconnect()

````

returns:

````js

SIG_INT = 2

````

---

[Back](api/namespace.process.md)