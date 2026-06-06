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

### session.setIdleTimeout(timeout)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name      | Datatype | Optional | Description               |
|-----------|:--------:|:--------:|---------------------------|
| `timeout` |  number  |   Yes    | the new idleTimeout value |

<br>
**Returns**: `Promise<>` 

---

Changes the idleTimeout parameter in the server's process.

> The `timeout` value is in MINUTES


---

### EXAMPLES

This will set the idleTimeout to 60 minutes

---


````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.session.setIdleTimoeut(60)

mind.disconnect()
````

---



[Back](api/namespace.session.md)