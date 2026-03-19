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

### loggedIn

---

**Type**: property / readonly

**Async**: no

**Parameters**:
<br>
**Returns**:

`<bool>`

---

Returns true if you are logged in the MIND server.

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

let isLoggedIn = ydb.loggedIn
console.log(isLoggedIn)

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

isLoggedIn = ydb.loggedIn
console.log(isLoggedIn)

ydb.disconnect()
````

---

[Back](../mind.md)