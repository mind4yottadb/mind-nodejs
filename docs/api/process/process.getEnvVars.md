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

### process.getEnvVars()

---

**Type**: method

**Async**:  yes, returns a Promise

**Parameters**:
<br><br>
**Returns**: `Promise<object>`

---

Returns an object describing all the env vars found for the current process.
The env var name is the property name and its value is the value of the env var.

---

### EXAMPLES

````js
import mindServer from 'mind4yottadb'

const mind = new mindServer

await mind.connect('127.0.0.1', 10000, 'admin', 'admin')

const envVars = mind.process.getEnvVars()
console.log(envVars)

mind.disconnect()

````

returns:

````js

envVars = {
    mind_j0: '13',
    mind_gbldir: '/data/r2.02_x86_64/g/yottadb.gld',
    gtm_log: '/tmp/yottadb/r2.02_x86_64',
    NVM_INC: '/usr/local/nvm/versions/node/v22.19.0/include/node',
    gtm_lvnullsubs: '2',
    mind_dist: '/opt/yottadb/current',
    HOSTNAME: 'ade1b4c8f7be',
    gtm_dist: '/opt/yottadb/current',
    gtm_retention: '42',
    mind_sav_8_mind_xc_libcurl: '/opt/yottadb/current/plugin/libcurl.xc',
    mind_sav_8_mind_routines: '/opt/mind/o*(/opt/mind/m /opt/mind/test/m) /opt/yottadb/current/libyottadbutil.so',
    EDITOR: '/usr/bin/nano',
    GTM_XC_libcurl: '/opt/yottadb/current/plugin/libcurl.xc',
    ...
}

````

---

[Back](api/namespace.process.md)