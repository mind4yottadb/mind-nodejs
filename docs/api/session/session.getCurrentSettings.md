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

### session.getCurrentSettings()

---

**Type**: method

**Async**:  yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise<object>`

---

Returns the server's session settings.

---

### EXAMPLES

When stats are off

````js
import mind4yottadb from 'mind4yottadb'

const mind = new mind4yottadb.session

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

try {
    const sessions = await mind.session.getCurrentSettings()
    console.log(sessions)

} catch (err) {
    console.log(err)
}

mind.disconnect()

````

returns:

````js

err = {
    dumpRequest: 0,
    dumpResponse: 0,
    errorDump: 1,
    idleTimeout: 30,
    logFile: '',
    logLevel: 1,
    sigusr2: 1,
    stats: 0,
    userApiDir: '$ydb_dist/plugin/etc/mind/uApi/'
}
````

---

[Back](api/namespace.session.md)