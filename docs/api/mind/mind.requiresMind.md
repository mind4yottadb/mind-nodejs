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

### requiresMind

---

**Type**: property / readonly

**Async**: no

**Parameters**:

| name | data type | Optional | Description |
|------|-----------|----------|-------------|

**Returns**:

`<string>`

---

Returns the minimum version number of the MIND server needed to run this package.


<br>

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

let requiresMind = ydb.requiresMind
console.log(requiresMind)

````

---

[Back](../mind.md)