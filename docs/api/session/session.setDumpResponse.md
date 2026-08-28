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

### session.setDumpResponse(value)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name    | Datatype | Optional | Description                |
|---------|:--------:|:--------:|----------------------------|
| `value` |  number  |   Yes    | the new dumpResponse value |

<br>
**Returns**: `Promise<>` 

---

Change the `dump-response` mode of the server logging for the current session.

The `value` parameter can be one of the following constants:

- `session.DUMP_RESPONSE_ON`
- `session.DUMP_RESPONSE_OFF`

<BR>

> If you want to change this setting for an entire session pool, use the method:
> `pool.devOps.setDumpResponse()` instead

---

### EXAMPLES

---

This will turn the DUMP_RESPONSE on.

````js
import mind-client-js from 'mind-client-js'

const mind = new mind-client-js.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.session.setDumpResponse(mind.session.DUMP_RESPONSE_ON)

mind.disconnect()
````

---



[Back](api/namespace.session.md)