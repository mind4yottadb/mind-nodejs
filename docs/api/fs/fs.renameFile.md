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

### fs.renameFile(oldName, newName)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name      | Datatype | Optional | Description                 |
|-----------|----------|----------|-----------------------------|
| `oldName` | string   | No       | the file you want to rename |
| `newName` | string   | No       | the new filename            |

<br>
**Returns**: `Promise<>`

---

It renames a file.

If `oldName` or `newName` files are not found or another error occurs, it will throw an error.
---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

await ydb.fs.renameFile('/tmp/testfile.txt', '/tmp/newtestfile.txt')

ydb.disconnect()

````

---

[Back](api/namespace.fs.md)