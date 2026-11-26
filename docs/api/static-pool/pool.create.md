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

# pool.create (host, port, username, password, options)

---

**Type**: method

***Async**: Yes

**Parameters**:

| Name       | Datatype | Optional | Description                                        |
|------------|:--------:|:--------:|----------------------------------------------------|
| `host`     |  string  |    No    | the host of the MIND server OR the UDS filename    |
| `port`     |  number  |    No    | the TCP port of the MIND server                    |
| `username` |  string  |    No    | the user nameof a known account in the MIND server |
| `password` |  string  |    No    | the password of a known account in the MIND server |
| `options`  |  object  |   Yes    | an object containing several optional options      |

<br>
**Returns**: `<undefined>`

---

The `create` method will initialize the pool, by creating the processes in the MIND server and exposing their session
inside the pool object.

The connection parameters are exactly the same as used in the mind.connect() method.


---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

````

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(300, 250)

await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

````

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(300, 250, {
    extensions: {
        retry: {
            delay: 5
        }
    }
})

await pool.create('127.0.0.1', 10000, 'admin', 'admin', {
    useTls: true
})

````

---

[Back](api/staticPool.md)