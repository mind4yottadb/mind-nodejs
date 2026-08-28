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

### session.setDumpRequst(value)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name    | Datatype | Optional | Description               |
|---------|:--------:|:--------:|---------------------------|
| `value` |  number  |   Yes    | the new dumpRequest value |

<br>
**Returns**: `Promise<>` 

---

Change the `dump-request` mode of the server logging for the current session.

The `value` parameter can be one of the following constants:

- `session.DUMP_REQUEST_ON`
- `session.DUMP_REQUEST_OFF`

<BR>

> If you want to change this setting for an entire session pool, use the method:
> `pool.devOps.setDumpRequest()` instead

---

### EXAMPLES

---

This will turn the DUMP_REQUEST on.

````js
import mind-client-js from 'mind-client-js'

const mind = new mind-client-js.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.session.setDumpRequest(mind.session.DUMP_REQUEST_ON)

mind.disconnect()
````

---



[Back](api/namespace.session.md)