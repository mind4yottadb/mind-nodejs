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

### toString()

Applies to:

- [Globals](../../namespace.db.globals.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: no

**Parameters**:
<br><br>
**Returns**: `nothing`

---

Converts the currently referenced glvn to a string

### EXAMPLES

---

Extract the glvn path from a variable name

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.db.globals.addName('testGbl')
const ret = mind.db.globals.testGbl._('first sub', 34, 'third').toString()

mind.disconnect()

````

````js
ret = '^testGlb("first sub",34,"third")'
````

---


[Back](api/namespace.db.globals.md)