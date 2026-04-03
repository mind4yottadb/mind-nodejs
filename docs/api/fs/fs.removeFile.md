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

### fs.removeFile(filename)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name       | Datatype | Optional | Description                                   |
|------------|:--------:|:--------:|-----------------------------------------------|
| `filename` |  string  |    No    | the absolute or relative path of the filename |

<br>
**Returns**: `Promise<>`

---

Deletes the file pointed by `filename`.

If `filename` is not found or another error occurs, it will throw an error.

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

mind.fs.removeFile('/tmp/testfile.txt')

mind.disconnect()

````

---

[Back](api/namespace.fs.md)

