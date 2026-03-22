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

### RESP3.build._false()

---

**Type**: method

**Async**: No

**Parameters**:
<br>><br>
**Returns**: `string`

---

Returns a string with the RESP3 representation of the boolean `false`


---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

mind.process.syslogMessage('Hi, I want to say something')

mind.disconnect()

````

---

[Back](api/namespace.RESP3.md)