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

# Static-pool constructor (size, extension, poolOptions)

---

**Type**: constructor

**Parameters**:

| Name          | Datatype | Optional | Description               |
|---------------|:--------:|:--------:|---------------------------|
| `size`        |  number  |    No    | the size of the pool      |
| `extension`   |  number  |   Yes    | the size of the extension |
| `poolOptions` |  object  |   Yes    | pool options              |

<br>
**Returns**: `Instance<>`

---

Instance a new static pool.

`size` must be greater than 2.

`extension` can be 0 or greater. It is optional, but required if `poolOptions` is used. In this case, if no extension is
required, simply pass 0 (zero).

The extensions are processes created at request time to execute the call and then die when the pool is fully allocated.

`poolOptions` is an optional object to pass additional parameters to the pool.

Currently supported parameters in the `poolOptions`:

| Path                           | Datatype | Default value | Description                                                              |
|:-------------------------------|:---------|---------------|--------------------------------------------------------------------------|
| `extensions.retry.count`       | Number   | 30            | The number of retries                                                    |
| `extensions.retry.delay`       | Number   | 10            | The delay between the retries in ms.                                     |
| `extensions.retry.delayRndMin` | Number   | 10            | The minimum value (in ms.) of the random offset to be added to the delay |
| `extensions.retry.delayRndMax` | Number   | 20            | The minimum value (in ms.) of the random offset to be added to the delay |

> The delay between the retries adds a random number of ms. (using the min and max) to reduce the risk of collision when
> running at high speed



---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

// This creates a pool using 20 processes
const pool = new mindClient.staticPool(20)

````

````js
import mindClient from 'mind-client-js'

// This creates a pool using 300 processes and 250 extensions
const pool = new mindClient.staticPool(300, 250)

````

````js
import mindClient from 'mind-client-js'

// This creates a pool using 300 processes, 250 extensions and modifyes the extensions retry delay
const pool = new mindClient.staticPool(300, 250, {
    extensions: {
        retry: {
            delay: 5
        }
    }
})

````

---

[Back](api/staticPool.md)