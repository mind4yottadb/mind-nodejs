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

### process.cwdGet()

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise<string>`

---

Returns the Current Working Directory of your session.

It can be changed using the [process.cwdSet()](process.cwdSet.md) function.

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const cwd = await mind.process.cwdGet()
console.log(cwd)

mind.disconnect()

````

returns:

````js

cwd = '/opt/mind'

````

---

[Back](api/namespace.process.md)