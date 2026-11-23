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

# pool.changeSize (newSize)

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

It changes the size of the pool.

If the new value is GREATER than the current value, it will simply create the sessions.

If the new value is SMALLER than the current value, you will need to wait until eventual active session is released (by
using the `done()` method).
If some session si active, it will throw an exception, allowing you to build a retry circuitry.

---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

try {
    await pool.changeSize(10)
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

await pool.changeSize(50)
````

---

[Back](api/staticPool.md)