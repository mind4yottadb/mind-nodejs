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

### session.GUID

---

**Type**: property / readonly

**Async**: no

**Parameters**:
<br><br>
**Returns**: `<string>`

---

Returns a unique GUID for the session.

---

### EXAMPLES

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const GUID = mind.session.GUID
console.log(GUID)

mind.disconnect()

````

returns:

````js

GUID = 'f0c79dbdf87119a5062ec800b409f966'

````

---

[Back](api/namespace.session.md)