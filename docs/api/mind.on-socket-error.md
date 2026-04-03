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

### socketError

---

**Type**: event

**Async**: no

**Parameters**:

| Name  | Datatype     | Optional | Description                      |
|-------|--------------|----------|----------------------------------|
| `err` | Error object | Yes      | The error returned by the socket |

<br>
**Returns**:

`Nothing`

---

Register your function to be triggered by an internal socket error.

> This event does NOT get triggered by errors returned by commands calls.


---

### EXAMPLES

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yotadb.session

console.dir(mind, {depth: 5})

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

mind.on('socketError', err => {
    // your code here
})
````

---

[Back](api/mind.md)