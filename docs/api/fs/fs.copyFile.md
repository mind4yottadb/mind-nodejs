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

### fs.copyfile(source, destination)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name          | Datatype | Optional | Description              |
|---------------|:--------:|:--------:|--------------------------|
| `source`      |  string  |    No    | the source filename      |
| `destination` |  string  |    No    | the destination filename |

<br>
**Returns**: `Promise<>`

---

If `source` or `destination` files are not found or another error occurs, it will throw an error.

---

### EXAMPLES

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.fs.copyfile('/tmp/testfile.txt', '/tmp/copyOfFile.txt')

mind.disconnect()

````

---

[Back](api/namespace.fs.md)