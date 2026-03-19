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

### server.now(resolution)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name         | Datatype | Optional | Description                                                     |
|--------------|----------|----------|-----------------------------------------------------------------|
| `resolution` | string   | Yes      | the resolution of the number returned, defaults to milliseconds |

<br>
**Returns**: ` Promise<>`<int>`

---

Returns the `unixtime` with the default resolution of milliseconds.

The `resolution` parameter can be either `ms` (for milliseconds) or `us` (for microseconds).
To get the unix time in seconds, use the `unixtime()` function.

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const now = ydb.server.now()
console.log(now)

ydb.disconnect()

````

returns:

````js

now = 1769615736015

````
````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const now = ydb.process.now('us')
console.log(now)

ydb.disconnect()

````

returns:

````js

now = 1769615790021047

````
---

[Back](../namespace.server.md)