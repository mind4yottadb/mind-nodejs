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

### session.log(logString)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name        | Datatype | Optional | Description                                                     |
|-------------|:--------:|:--------:|-----------------------------------------------------------------|
| `logString` |  string  |   Yes    | the string to be logged. If omitted, it will be an empty string |

<br>
**Returns**: `Promise<>` 

---

Dumps the provided string to the MIND server log.

It will ALWAYS be logged, also when the logging-level is set to none.

### EXAMPLES

---

Reads statistics, reset them and read them again

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

await mind.session.log('This is a string')

mind.disconnect()
````

---



[Back](api/namespace.session.md)