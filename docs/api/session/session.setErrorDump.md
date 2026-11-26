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

### session.setErrorDump(value)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name    | Datatype | Optional | Description             |
|---------|:--------:|:--------:|-------------------------|
| `value` |  number  |   Yes    | the new errorDump value |

<br>
**Returns**: `Promise<>` 

---

Change the `error-dump` mode of the server logging for the current session.

The `value` parameter can be one of the following constants:

- `session.ERROR_DUMP_NONE`
- `session.ERROR_DUMP_BRIEF`
- `session.ERROR_DUMP_FULL`

<BR>

> If you want to change this setting for an entire session pool, use the method:
> `pool.devOps.setErrorDump()` instead

---

### EXAMPLES

---

This will set the ERROR_DUMP brief.

````js
import mind-client-js from 'mind-client-js'

const mind = new mind-client-js.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.session.setErrorDump(mind.session.ERROR_DUMP_BRIEF)

mind.disconnect()
````

---



[Back](api/namespace.session.md)