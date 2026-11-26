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

# Installation

---

The `mind-client-js` is available in the npm public registry.

From the root of your repo simply type: ``npm install mind-client-js`` and it will be added to your package.json file.

You can now start using it right away, by simply referencing it:

````js
import mind-client-js from 'mind-client-js'
````

or

````js
const mind-client-js = require('mind-client-js')
````

and then instancing the driver as single session...

````js
const mind = new mind-client-js

````

or multiple sessions that can execute in parallel...

````js
const mySessions = []

for (let ix = 0; ix < 16; ix++) {
    mySessions.push(new mind-client-js)
}

````
