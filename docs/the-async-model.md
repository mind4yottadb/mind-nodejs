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

# The async model

---

All the calls involving socket communication with the server are executed in async mode and return a Promise.

You can execute these calls by wither using the `await` syntax or the `.then` syntax.

<BR>
---

When using the `await` syntax, you simply prefix the call with `await`, regardless if it is returning a value or not.

````js
const myVal = await mind.fs.readDir('/opt')
````

````js
await mind.process.cwdSet('/opt')
````

The code will hang until the Promise is received, to then continue on the next instruction.

Errors are caught by wrapping the function with the `try` `catch()` statements.

````js
try {
    const myVal = await mind.fs.readDir('/opt')
} catch (err) {
    console.log(err.message)
}
````

<BR>

---

When using the `.then` syntax, you append the code you want to execute when done in the `.then` section.

````js
mind.fs.readDir('/opt').then(myDir => {
    console.log(myDir)
})
````

Optionally, you can chain also a `.catch()` to capture eventual errors.

````js
mind.fs.readDir('/opt')
    .then(myDir => {
        console.log(myDir)
    })
    .catch(err => {
        console.log(err)
    })
````