<!--
###############################################################
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

# pool.destroy()

---

**Type**: method

***Async**: No

**Parameters**:

<br><br>
**Returns**: '<undefined>`

---

The `destroy` method will disconnect all the currently open sessions (fixed and extensions) from the server to terminate
the server process in the MIND server.

This method should be used **ONLY** if no client sessions are in use.

To terminate the pool while client sessions are in use, use the `rundown()` method instead. It will use the devOps
process to send signals to the processes, in order to wait for commands to be executed before to terminate the process.

---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

pool.destroy()

````

---

[Back](api/staticPool.md)