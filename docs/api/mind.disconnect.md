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

| Name | Datatype | Optional | Description |
|------|----------|----------|-------------|

<br>
**Returns**:

`Promise`

---

Terminates the TCP connection with the server, meaning you can NOT execute any command anymore.

If you were using variables in your session, everything will be lost.

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

console.dir(ydb, {depth: 5})

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

await ydb.disconnect()
````

---

[Back](../mind.md)