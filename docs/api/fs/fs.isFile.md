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

### fs.isFile(path)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name   | Datatype | Optional | Description               |
|--------|----------|----------|---------------------------|
| `path` | string   | No       | the path you wish to test |

**Returns**:

`Promise<BOOLEAN>`

---

Returns `true` if the supplied path is a file, `false` if it is a directory.
If the path doesn't exist it will throw an error.

<br>

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const res = await ydb.fs.isFile('$ydb_dist/mupip')
console.log(res)

ydb.disconnect()

````

returns:

````js
ret = true
````

---

[Back](api/namespace.fs.md)