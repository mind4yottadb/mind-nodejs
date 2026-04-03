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

### process.syslogMessage(message)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| Name      | Datatype | Optional | Description                                 |
|-----------|:--------:|:--------:|---------------------------------------------|
| `message` |  string  |    No    | the message you want to store in the syslog |

<br>
**Returns**: `Promise<>`

---

Sends a message to the syslog.


---

### EXAMPLES

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

mind.process.syslogMessage('Hi, I want to say something')

mind.disconnect()

````

---

[Back](api/namespace.process.md)