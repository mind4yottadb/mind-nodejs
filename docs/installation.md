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

The `mind4yottadb` is available in the npm public registry.

From the root of your repo simply type: ``npm install mind4yottadb`` and it will be added to your package.json file.

You can now start using it right away, by simply referencing it:

````js
import mind4yottadb from 'mind4yottadb'
````

or

````js
const mind4yottadb = require('mind4yottadb')
````

and then instancing the driver as single session...

````js
const mind = new mind4yottadb

````

or multiple sessions that can execute in parallel...

````js
const mySessions = []

for (let ix = 0; ix < 16; ix++) {
    mySessions.push(new mind4yottadb)
}

````
