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

### findNext(findValue)

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name        |    Datatype     | Optional | Description                                                            |
|-------------|:---------------:|:--------:|------------------------------------------------------------------------|
| `findValue` | number / string |   Yes    | The value to search for. If missing, it will equals to an empty string |

<br>
**Returns**: `Promise<NUMBER / STRING>`

---

If finds the next collating subscript to the passed parameter `findValue` or an empty string if missing.

### EXAMPLES

---

Find the next subscript when used with no parameters

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yotadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGlobal')
const gbl = mind.db.globals.testGlobal

await gbl.setObject({
    test1: 1,
    test2: 2
})
const res = await gbl.findNext()
console.log(res)

mind.disconnect()

````

````js
res = 'test1'
````

---

[Back](api/namespace.db.globals.md)