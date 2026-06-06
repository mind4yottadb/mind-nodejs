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

### session.setLogLevel(value)

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

Change the `log-level` mode of the server logging for the current session.

The `value` parameter can be one of the following constants:

- `session.LOG_LEVEL_NONE`
- `session.LOG_LEVEL_SESSIONS`
- `session.LOG_LEVEL_COMMANDS`
- `session.LOG_LEVEL_TIMINGS`

<BR>

> If you want to change this setting for an entire session pool, use the method:
> `pool.devOps.setLogLevel()` instead

---

### EXAMPLES

---

This will set the LOG_LEVEL to record only sessions-related log dumps.

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.session.setLogLevel(mind.session.LOG_LEVEL_SESSIONS)

mind.disconnect()
````

---



[Back](api/namespace.session.md)