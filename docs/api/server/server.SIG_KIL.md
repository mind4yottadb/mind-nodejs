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

### server.SIG_KIL

---

**Type**: property

**Async**: no

**Parameters**:
<br><br>
**Returns**:

`<number>`

---

Returns the signal number corresponding to SIG_KIL.

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const SIG_INT = ydb.server.SIG_KIL
console.log(SIG_KIL)

ydb.disconnect()

````

returns:

````js

SIG_KIL = 9

````

---

[Back](../namespace.process.md)