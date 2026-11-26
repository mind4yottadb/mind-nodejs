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

# pool.getSession (timeout)

---

**Type**: method

***Async**: Yes

**Parameters**:

| Name      | Datatype | Optional | Description                                                              |
|-----------|:--------:|:--------:|--------------------------------------------------------------------------|
| `timeout` |  number  |   Yes    | the optional number of milliseconds to wait before to reject the promise |

<br>
**Returns**: `<object>`

---

The `getSession()`method will allocate a pool session for you to use. While you are using it, nobody else can use it
again, until you execute the `done()`method against it.

It will first try to get a fixed session. If not available, and if extensions are enabled, it will create an extension,
unless you reached the maximum number of extensions allowed.

If a session can not be created and no `timeout` parameter is passed OR `timoeut`has the value of 0, it will wait until
a session is available.

The `timeouot` parameter is optional, defaults to 0, and it is expressed in ms.

If the `timeout`is set, it will wait that a session gets free until the timeout expires. It will then reject the promise
and return an error.

> IMPORTANT: once you are done with the session, you MUST release it back to the pool by issuing the method `done()`.
> Failing to do so, it will quickly allocate all of your pool's processes and never release them.



---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

const session = pool.getSession()

// your code here


session.done()



````

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(300, 250)

await pool.create('127.0.0.1', 10000, 'admin', 'admin', {})

try {
    const session = pool.getSession(100)

} catch (err) {
    console.log(err)
}

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