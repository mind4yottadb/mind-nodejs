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

| name | data type | Optional | Description |
|------|-----------|----------|-------------|

**Returns**:

`<string>`

---

Returns the mind software version.


<br>

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const mindVersion = ydb.server.mindVersion
console.log(mindVersion)

ydb.disconnect()

````

returns:

````js

mindVersion = '0.4.0'

````

<br>


---

[Back](../namespace.process.md)