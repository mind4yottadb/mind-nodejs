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

### connect(host, port, username, password, options)

---

**Type**: method

**Async**: yes, returns a Promise

**Parameters**:

| name       | data type | Optional | Description                                        |
|------------|-----------|----------|----------------------------------------------------|
| `host`     | string    | No       | the host of the MIND server                        |
| `port`     | number    | No       | the TCP port of the MIND server                    |
| `username` | string    | No       | the user nameof a known account in the MIND server |
| `password` | string    | No       | the password of a known account in the MIND server |
| `options`  | object    | Yes      | an object containing several optional options      |

**Returns**:

`Promise`

---

It connects to the MIND server, creates a session and reads server's info to self-configure itself.

This is the very first method to execute in order to get MIND to work.

### The `option` parameter:

````js
const options = {
    app: {
        vars: [],
        globals: []
    },
    connectTimeout: 0
}

````

The `app.vars` is an array of strings, where each string represent a variable name to use in your code.

The `app.globals` is an array of strings, where each string represents a global you want to use in your code.

> Global name do NOT need to be prefixed by the `^` character. So, a global named `^customers` must be entered as
`customers`.

<br>

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

console.dir(ydb, {depth: 5})

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

console.dir(ydb, {depth: 5})


````

The code above will return when connection and negotiation are complete so that you can start executing commands.

By comparing the first and second object dump (console.dir) you can see that the object gets fully populated.

Example with error handler:

````js
import mind from 'mind4yottadb'

const ydb = new mind

try {
    await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')
} catch (err) {

}

// or

ydb.connect('127.0.0.1', 10000, 'admin', 'admin')
    .then(() => {

    })
    .catch((err) => {

    })

````

Example with option parameters:

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin', {
    connectTimeout: 12000,
    app: {
        globals: [
            'customers',
            'orders',
            'orderLines', +
                'suppliers'
        ]
    }
})

````