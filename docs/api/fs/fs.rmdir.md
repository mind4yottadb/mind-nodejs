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

### fs.rmdir(path)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name   | Datatype | Optional | Description                             |
|--------|:--------:|:--------:|-----------------------------------------|
| `path` |  string  |    No    | the path of the directory to be deleted |

<br>
**Returns**: `Promise<>`

---

Creates the directory specified in `path`.

If `path` is not found, it is not empty, it is not a directory or another error occurs, it will throw an error.

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.fs.rmdir('/tmp/newDirectory')

mind.disconnect()

````

---

[Back](api/namespace.fs.md)