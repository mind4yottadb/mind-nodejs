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

### fs.readFile(source,destination)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name       | Datatype | Optional | Description                                   |
|------------|----------|----------|-----------------------------------------------|
| `filename` | string   | No       | the absolute or relative path of the filename |

<br>
**Returns**:

`Promise <string>`

---

Reads and returns the entire file pointed by `filename`.

If `filename` is not found or another error occurs, it will throw an error.

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const data = ydb.fs.readFile('/tmp/testfile.txt')
console.log(data)

ydb.disconnect()

````

---

[Back](api/namespace.fs.md)