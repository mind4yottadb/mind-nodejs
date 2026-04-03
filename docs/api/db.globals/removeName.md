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

### removeName(name)

Applies to:

- [Globals](../../namespace.db.globals.md)

---

**Type**: method

**Async**: no

**Parameters**:

| Name   | Datatype | Optional | Description                                                       |
|--------|:--------:|:--------:|-------------------------------------------------------------------|
| `name` |  string  |    No    | The name of the global you want to remove, without the ^ prefix.. |

<br>
**Returns**: `undefined`

---

It removes the name of a global from your environment.

### EXAMPLES

---

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

mind.db.globals.addName('apiTest')
await mind.db.globals.apiTest.setValue('test')

mind.db.globals.removeName('apiTest')
await mind.db.globals.apiTest.setValue('test')


````

````js

`TypeError: Cannot read properties of undefined (reading 'setValue')`

````

---


[Back](api/namespace.db.globals.md)