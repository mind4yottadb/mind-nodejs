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

### merge(glvn)

Applies to:

- [Globals](../../namespace.db.vars.md)
- [Vars](../../namespace.db.vars.md)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name   | Datatype | Optional | Description                                                     |
|--------|:--------:|:--------:|-----------------------------------------------------------------|
| `glvn` |  string  |    No    | The node you want to merge, expressed as string representation. |

<br>
**Returns**: `Promise<>`

---

It merges the node pointed by the `glvn` parameter to the source specified in the path.

The parameter`glvn` can be either a global or a var. The value can be obtained using the function `toString()` (see
example below).

### EXAMPLES

---

Merges a var branch to another var and display the result

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin') // load an app with var1 and var2 declared as global vars.

await ydb.db.vars.var2.setObject({test: 1, test2: 'this is a test'})

await ydb.db.vars.var1._('subs').merge(ydb.db.vars.var2.toString())

const ret = await ydb.db.vars.var1._('subs').getJSON()

mind.disconnect()

````

````js
res = '{"test":1,"test2":"this is a test"}'
````

---

Merges a global branch to a var and display the result

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin') // load an app with var1 and var2 declared as global vars.

ydb.db.globals.addName('mergeTest')
await ydb.db.globals.mergeTest.setObject({test: 1, test2: 'this is a test'})

await ydb.db.vars.var1.merge(ydb.db.globals.mergeTest.toString())

const ret = await ydb.db.vars.var1.getJSON()

mind.disconnect()

````

````js
res = '{"test":1,"test2":"this is a test"}'
````

---

[Back](api/namespace.db.vars.md)