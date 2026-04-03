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

### server.plist()

---

**Type**: method

**Async**:  yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise <object>`

---

Returns an array of object, where each object represent a running process and has the following keys:

`command`: The command used to launch the program

`pid`:  The processId of the process

`ppid`: The parent processId of the process

`uid`: the userId owning the process


---

### EXAMPLES

Get the process list and display it.

````js
import mindServerServer from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const res = await mind.server.plist()
console.log(res)

mind.disconnect()

````

returns:

````js

res = [
    {
        command: '/sbin/docker-init -- sleep infinity',
        pid: 1,
        ppid: 0,
        uid: 'root'
    },
    {command: 'sleep infinity', pid: 7, ppid: 1, uid: 'root'},
    {command: 'bash', pid: 8, ppid: 0, uid: 'root'},
    {
        command: '/bin/bash /opt/mind/mind',
        pid: 255,
        ppid: 8,
        uid: 'root'
    },
    {
        command: 'yottadb -run %XCMD do start^%mind("")',
        pid: 280,
        ppid: 255,
        uid: 'root'
    },
    {
        command: 'yottadb -direct start^%mindServerSession',
        pid: 296,
        ppid: 1,
        uid: 'root'
    },
    {command: 'sh -c ps -AF', pid: 297, ppid: 296, uid: 'root'},
    {command: 'ps -AF', pid: 298, ppid: 297, uid: 'root'}
]
````

---



[Back](api/namespace.server.md)