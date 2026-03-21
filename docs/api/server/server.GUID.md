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

### server.GUID(dashed, braced)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name     | Datatype | Optional | Description                                                                                           |
|----------|:--------:|:--------:|-------------------------------------------------------------------------------------------------------|
| `dashed` | boolean  |   Yes    | if `true`, it will insert separation dashes in the returned value  . Default is `true`                |
| `braced` | boolean  |   Yes    | if `true`, it will surround the returned value (dashed or not dashed) with braces. Default is `false` |

<br>
**Returns**: `Promise <string>` 

---

Returns the 128-bit MurmurHash3 of the current unixtime of the server, as lower-case 32 hexadecimal digits.

It defaults to group it into five sections separated by hyphens: 8-4-4-4-12.

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const GUID = await ydb.server.GUID()
console.log(GUID)

ydb.disconnect()

````

Returns:

````js
GUID = '5b4b97b1-0daa-2d31-bb0e-984998917f05'

````

---

````js
import mindServer from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const GUID = await ydb.server.GUID(false)
console.log(GUID)

ydb.disconnect()

````

Returns:

````js
GUID = '5b4b97b10daa2d31bb0e984998917f05'

````
---

````js
import mindServer from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const GUID = await ydb.server.GUID(true, true)
console.log(GUID)

ydb.disconnect()

````

Returns:

````js
GUID = '{5b4b97b1-0daa-2d31-bb0e-984998917f05}'

````

---



[Back](api/namespace.process.md)