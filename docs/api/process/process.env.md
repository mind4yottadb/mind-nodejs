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

---

### process.env

---

**Type**: object / readonly

**Async**: no

**Parameters**:

| name | data type | Optional | Description |
|------|-----------|----------|-------------|

**Returns**:

`<object>`

---

Returns an object listing all the environment variables (as properties) and their value (as property values).


<br>

---

### EXAMPLES

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const ydb_dist = ydb.process.env.ydb_dist
console.log(ydb_dist)

ydb.disconnect()

````

returns:

````js

res = '/opt/yottadb/current'

````

<br>


To enumerate all the nevironment variables:

````js
import mind from 'mind4yottadb'

const ydb = new mind

await ydb.connect('127.0.0.1', 10000, 'admin', 'admin')

const envVars = ydb.process.env
console.log(envVars)

ydb.disconnect()

````

returns:

````js

res = {
    ydb_j0: 13,
    ydb_gbldir: '/data/r2.02_x86_64/g/yottadb.gld',
    gtm_log: '/tmp/yottadb/r2.02_x86_64',
    ydb_sav_170_ydb_routines: '/opt/mind/o*(/opt/mind/m /opt/mind/test/m) /opt/yottadb/current/libyottadbutil.so',
    NVM_INC: '/usr/local/nvm/versions/node/v22.19.0/include/node',
    gtm_lvnullsubs: 2,
    ydb_dist: '/opt/yottadb/current',
    HOSTNAME: 26678,
    gtm_dist: '/opt/yottadb/current',
    gtm_retention: 42,
    NODE_EXTRA_CA_CERTS: '/root/.local/share/mkcert/rootCA.pem',
    ydb_sav_170_PATH: '/usr/local/nvm/versions/node/v22.19.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
    EDITOR: '/usr/bin/nano',
    GTM_XC_libcurl: '/opt/yottadb/current/plugin/libcurl.xc',
    PWD: '/opt/mind',
    ydb_sav_170_gtmdir: '/data',
    ydb_log: '/tmp/yottadb/r2.02_x86_64',
    gtmroutines: '/opt/mind/o*(/opt/mind/m /opt/mind/test/m) /opt/yottadb/current/plugin/o/_ydbgui.so /opt/yottadb/current/plugin/o/_ydbmwebserver.so /opt/yottadb/current/plugin/o/_ydbposix.so /opt/yottadb/current/libyottadbutil.so',
}
````

<br>

---

[Back](../namespace.fs.md)