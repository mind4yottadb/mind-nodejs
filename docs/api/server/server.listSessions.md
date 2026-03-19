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

### server.listSessions()

---

**Type**: method

**Async**:  yes, returns a Promise

**Parameters**:

| Name | Datatype | Optional | Description |
|------|----------|----------|-------------|

**Returns**: `Promise <object>`

---

Returns detailed information of all the sessions currently active in the server.

It returns an array of objects, where each object represent a session with the following fields:

- `description`: the description text provided by the remote driver
- `driverName`: the name of the remote driver used to connect
- `driverVersion`: the version of the remote driver used to connect
- `ipNumber`: the IP number of the remote driver
- `username`: the username that logged in the server
- `pid`: the process id of the session
- `elapsedTime`: since how log is the session active, in the format hours, minutes and seconds
---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const sessions = await ydb.process.listSessions()
console.log(sessions)

ydb.disconnect()

````

returns:

````js

sessions = [
    {
        description: 'MIND for YottaDB node.js driver',
        driverName: 'mind4yottadb.js',
        driverVersion: '0.5.0',
        elapsedTime: {hour: 0, min: 0, sec: 0},
        ipNumber: '172.18.0.1',
        pid: 13163,
        username: 'admin'
    }
]
````

---

[Back](../namespace.server.md)