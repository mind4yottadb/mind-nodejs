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

| Name       | Datatype | Optional | Description                                        |
|------------|:--------:|:--------:|----------------------------------------------------|
| `host`     |  string  |    No    | the host of the MIND server                        |
| `port`     |  number  |    No    | the TCP port of the MIND server                    |
| `username` |  string  |    No    | the user nameof a known account in the MIND server |
| `password` |  string  |    No    | the password of a known account in the MIND server |
| `options`  |  object  |   Yes    | an object containing several optional options      |

<br>
**Returns**: ` Promise<>`

---

It connects to the MIND server, creates a session and reads server's info to self-configure itself.

This is the very first method to execute in order to get MIND to work.

Once connection is established, a MUMPS process is created in the MIND server that will execute you code in a protected
environment.

This process will stay alive, waiting for your commands, until you disconnect from the server using the `disconnect()`
method.

Once login is successful, this component will receive server and process information from the MIND server and populate
itself according.

> Note: both connection and login errors will be thrown and can be caught using the `catch{}` structure, regardless if
> you are using `await` or `then` in your async call.

### The `option` parameter:

````js
const options = {
    useTls: true,
    tlsRejectSelfSigned: false,
    connectTimeout: 10000,
    uApi: {appName: 'myApp'},
    db: {
        globals: []
    },
    connectTimeout: 0
}

````

When `useTls` is true, TLS will be used. If missing or false, TLS will NOT be used.

When `tlsRejectSelfSigned` is false, self-signed certificates will be accepted. If missing or set to true, self-signed
certificates will be rejected.

The `connectTimeout` overrides the default connect timeout of 5000 ms, or 5 seconds). The unit is in milliseconds.

The `db.globals` is an array of strings, where each string represents a global you want to use in your code.

> Global name do NOT need to be prefixed by the `^` character. So, a global named `^customers` must be entered as
`customers`.

The `uApi.appName` is the (optional) app name. For this to work, the app name must be loaded in the server. If it is not
found, an error will be thrown.
If an appName is specified, and it is found, eventual shared variables will be automatically loaded.


---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

console.dir(mind, {depth: 5})

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

console.dir(mind, {depth: 5})
````

The code above will return when connection and negotiation are complete so that you can start executing commands.

By comparing the first and second object dump (console.dir) you can see that the object gets fully populated.

Example with error handler:

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

try {
    await mind.connect('127.0.0.1', 10000, 'admin', 'admin')
} catch (err) {

}

// or

mind.connect('127.0.0.1', 10000, 'admin', 'admin')
    .then(() => {

    })
    .catch((err) => {

    })
````

Example with option parameters:

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin', {
    useTls: true,
    tlsRejectSelfSigned: false,
    db: {
        globals: [
            'customers',
            'orders',
            'orderLines', 
            'suppliers'
        ]
    }
})
````

---

[Back](api/mind.md)