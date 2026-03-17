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

### server.pinfo(pid)

---

**Type**: method

**Async**:  yes, returns a Promise

**Parameters**:

| name  | data type | Optional | Description                                |
|-------|-----------|----------|--------------------------------------------|
| `pid` | number    | No       | the pid of the process you want to examine |

**Returns**:

`Promise<object>`

---

Returns information about a running process

It returns an object, with the following fields:

- `isAlive`: 1 is process exists, 0 if it doesn't
- `pSystemTime`: the system time used by the process, -1 if the process doesn't exist
- `pUserTime`: the user time used by the process, -1 if the process doesn't exist
- `cSystemTime`: the system time used by the process's children , -1 if the process doesn't exist
- `cUserTime`: the user time used by the process's children, -1 if the process doesn't exist
- `tCpu`: Total process and child CPU time used in hundredths of a second, -1 if the process doesn't exist

<br>

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const ret = await ydb.process.pInfo(66789)
console.log(ret)

ydb.disconnect()

````

returns:

````js

ret = {
    cSystemTime: 0,
    cUserTime: 0,
    isAlive: 1,
    pSystemTime: 401,
    pUserTime: 320,
    tCpu: 721
}
````

<br>


---

[Back](../namespace.server.md)