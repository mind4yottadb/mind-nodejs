<!--
###############################################################
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

# pool.changeExtension (newSize)

---

**Type**: method

***Async**: Yes

**Parameters**:

| Name      | Datatype | Optional | Description                                    |
|-----------|:--------:|:--------:|------------------------------------------------|
| `newSize` |  number  |    No    | the new number of static processes in the pool |

<br>
**Returns**: `<undefined>`

---

It changes the size of the pool extension.

Since it is dynamic, you won't have to wait for sessions to be terminated.

---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20, 50)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

try {
    await pool.changeExtension(10)
}
chatch(err)
{
    // your handler here
}

````

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(300, 250)

await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

await pool.changeExtension(500)
````

---

[Back](api/staticPool.md)