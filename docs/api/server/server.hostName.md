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


### server.hostName

---

**Type**: property / readonly

**Async**: no

**Parameters**:

| Name | Datatype | Optional | Description |
|------|----------|----------|-------------|

<br>
**Returns**:

<string>`

---

Returns the server host name.

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const hostName = ydb.server.hostName
console.log(hostName)

ydb.disconnect()

````

returns:

````js

hostName = '26678cd11bd7'

````

---

[Back](../namespace.process.md)