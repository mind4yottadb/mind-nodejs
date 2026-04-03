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

### server.horolog()

---

**Type**: method

**Async**:  yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise <object>`

---

`horolog()` returns an object with the representation of the YottaDB function ZHOROLOG as object

The key `horolog` contains a string value specifying the number of days since "31 December, 1840," and the number of
seconds since the midnight of that date in the time zone of the process, separated by a comma (,). At midnight, the
piece of the string following the comma resets to zero (0), and the piece preceding the comma increments by one (1).

The key `microseconds` constains the number of microseconds in the current second. The accuracy of this value is subject
to the precision of the system clock.

The key `utcOffset`  is an offset in seconds from UTC, with positive values for time zones west of the prime meridian
and negative values for time zones east of the prime meridian.


---

### EXAMPLES

Get the horolog and display it.

````js
import mindServerServer from 'mind4yottadb'

const mind = new mindServer.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const res = await mind.server.horolog()
console.log(res)

mind.disconnect()

````

returns:

````js

res = {
    horolog: '67650,54276',
    microseconds: '29417',
    utcOffset: '0'
}
````

---



[Back](api/namespace.server.md)