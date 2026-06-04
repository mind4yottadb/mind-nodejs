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

### addName(name)

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: no

**Parameters**:

| Name   | Datatype | Optional | Description                                                 |
|--------|:--------:|:--------:|-------------------------------------------------------------|
| `name` |  string  |    No    | The name of the var you want to add, without the ^ prefix.. |

<br>
**Returns**: `undefined`

---

It adds the name of a var to your environment.

### EXAMPLES

---

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

mind.db.vars.addName('apiTest')
await mind.db.vars.apiTest.setValue('test')

const ret = await mind.db.vars.apiTest.getValue()
console.log(ret)

mind.disconnect()

````

````js
ret = 'test'

````

---


[Back](api/namespace.db.globals.md)