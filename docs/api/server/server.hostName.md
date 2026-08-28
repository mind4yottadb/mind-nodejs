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
<br><br>
**Returns**: '<string>`

---

Returns the server host name.

---

### EXAMPLES

````js
import mind-client-js from 'mind-client-js'

const mind = new mind-client-js.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const hostName = mind.server.hostName
console.log(hostName)

mind.disconnect()

````

returns:

````js

hostName = '26678cd11bd7'

````

---

[Back](api/namespace.process.md)