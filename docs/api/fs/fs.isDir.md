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

### fs.isDir(path)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name   | Datatype | Optional | Description               |
|--------|:--------:|:--------:|---------------------------|
| `path` |  string  |    No    | the path you wish to test |

<br>
**Returns**: `Promise<BOOLEAN>`

---

Returns `true` if the supplied path is a directory, `false` if it is a file.
If the path doesn't exist it will throw an error.


---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const res = await mind.fs.isDir('/tmp')
console.log(res)

mind.disconnect()

````

returns:

````js
ret = true
````

---

[Back](api/namespace.fs.md)