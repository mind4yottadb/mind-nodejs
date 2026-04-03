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

### server.unixtime()

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: ` Promise<><int>`

---

`unixtime` (UNIX time or universal time) returns the number of microseconds since January 1, 1970 00:00:00 UTC, which
provides a time stamp for directly comparing different timezones. `unixtime` accuracy is subject to the precision of the
system clock

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const unixTime = mind.server.unixtime()
console.log(unixTime)

mind.disconnect()

````

returns:

````js

unixTime = 1767806071551168

````

---

[Back](api/namespace.process.md)