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

### process.cwdSet(path)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name   | Datatype | Optional | Description             |
|--------|:--------:|:--------:|-------------------------|
| `path` |  string  |    No    | the new path of the cwd |

<br>
**Returns**: `Promise<>`

---

Sets the Current Working Directory of your session.

It can be read using the [process.cwdGet()](process.cwdGet.md) function.

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

await ydb.process.cwdSet('/opt/yottadb/current')
const cwd = await ydb.process.cwdGet()
console.log(cwd)

ydb.disconnect()

````

returns:

````js

cwd = '/opt/yottadb/current'

````

---

[Back](api/namespace.process.md)