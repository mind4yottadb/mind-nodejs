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

### timeSinceConnect()

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise<>`

---

Returns a floating-point number with the number of seconds (with the microsecond resolution) since the session got
connected.

### EXAMPLES

---

Connect, waits for two seconds and then reads the elapsed time.

````js
import mindServer4yottadb from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
};

await delay(2000)

const time = await mind.session.timeSinceConnect()
console.log(time)


mind.disconnect()

````

````js
res = 2.014392
````

---


[Back](api/namespace.db.session.md)