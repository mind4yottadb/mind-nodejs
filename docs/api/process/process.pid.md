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

### process.pid

---

**Type**: property / readonly

**Async**: no

**Parameters**:
<br><br>
**Returns**:

`<int>`

---

Returns the pid of your session.

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const pid = ydb.process.pid
console.log(pid)

ydb.disconnect()

````

returns:

````js

pid = 20840

````

---

[Back](../namespace.process.md)