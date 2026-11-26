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

### session.setStats(value)

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

Change the `stats-mode` of the server logging for the current session.

The `value` parameter can be one of the following constants:

- `session.STATS_NONE`
- `session.STATS_GRANMD_TOTALS`
- `session.STDATS_DETAILS`

<BR>

> If you want to change this setting for an entire session pool, use the method:
> `pool.devOps.setStats()` instead

---

### EXAMPLES

---

This will set the STATS to record data grouped by command.

````js
import mind-client-js from 'mind-client-js'

const mind = new mind-client-js.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.session.setStats(mind.session.STATS_DETAILS)

mind.disconnect()
````

---



[Back](api/namespace.session.md)