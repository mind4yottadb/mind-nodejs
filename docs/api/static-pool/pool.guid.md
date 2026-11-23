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

# pool.guid

---

**Type**: property

***Async**: No

**Returns**: `<string>`

---

It returns the GUID of the current pool instance.

---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

console.log(pool.guid)

````

````js
'ff0e97b4-aa72-388f-e030-158ef7c8647f'
````

---

[Back](api/staticPool.md)