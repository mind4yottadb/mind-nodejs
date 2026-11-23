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

# pool.devOps._getDevOpsSession(timeout)

---

**Type**: method (private)

***Async**: No

**Parameters**:

| Name      | Datatype | Optional | Description                                                              |
|-----------|:--------:|:--------:|--------------------------------------------------------------------------|
| `timeout` |  number  |   Yes    | the optional number of milliseconds to wait before to throw an exception |

<br>
**Returns**: `<object>`

---

The `_getDevOpSession()`method will try to reserve the devOp process used for pool maintenance.

The `timeouot` parameter is optional, defaults to 0, and it is expressed in ms.

If the `timeout`is set, it will wait for the devOps session to get free until the timeout expires. It will then throw an
exception.

> THIS IS FOR INTERNAL USE ONLY, YOU SHOULD NEVER CALL THIS AT ANY TIME


---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

const session = await pool._getDevOpsSession()
await session._staticPool._changeServerSetting('errorDump', value)

````

---

[Back](api/staticPool.md)