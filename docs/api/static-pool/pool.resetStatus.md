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

# pool.resetStatus()

---

**Type**: method

***Async**: No

**Parameters**:

<br><br>
**Returns**: '<undefined>`

---

It resets all the `stats` counters, returned by the `getStatus()` method.

The following fields are reset:

| Field name                      | Datatype | Description                                                                                             |
|---------------------------------|:--------:|:--------------------------------------------------------------------------------------------------------|
| `stats.sessionsCreatedOk`       |  number  | The number of static sessions successfully created                                                      |
| `stats.sessionsCreatedInError`  |  number  | The number of static sessions that errored                                                              |
| `stats.sessionsPeak`            |  number  | The maximum number of static sessions that were used at the same time                                   |
| `stats.sessionsDone`            |  number  | The number of static sessions that executed a done() method                                             |
| `stats.extendsCreatedOk`        |  number  | The number of extended sessions successfully created                                                    |
| `stats.extendsCreatedInError`   |  number  | The number of extended sessions that errored                                                            |
| `stats.extendsRemoved`          |  number  | The number of extended sessions currently being used                                                    |
| `stats.extendsPeak`             |  number  | The maximum number of extended sessions that were used at the same time                                 |
| `stats.extendssDone`            |  number  | The number of extended sessions that executed a done() method                                           |
| `stats.noMoreSlotsHits`         |  number  | The number of getSessions() method calls that couldn't be allocated                                     |
| `stats.noMoreSlotsHitsResolved` |  number  | The number of getSessions() method calls that couldn't be allocated, but could be successfully resolved |
| `stats.timeoutExpired`          |  number  | The number of getSessions() method calls that couldn't be allocated and they timed out                  |
| `stats.remoteDisconnects`       |  number  | The number of sessions that got terminated due to a client disconnect                                   |

---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

const stats = await pool.getStatus()

console.dir(stats, {depth: 10})

pool.resetStatus()

console.dir(stats, {depth: 10})

````

````json
{
    GUID: 'f975b127-be69-9eb9-1dd0-0fbcb4847b97',
    host: '127.0.0.1',
    port: 10000,
    username: 'admin',
    options: {},
    initialized: true,
    size: 35,
    extensions: 500,
    poolOptions: { extensions: { retry: [Object] } },
    sessionsTotal: 35,
    sessionsExtendedInUse: 0,
    sessionsInUse: 7,
    stats: {
        sessionsCreatedOk: 119020,
        sessionsCreatedInError: 0,
        sessionsPeak: 35,
        sessionsDone: 119013,
        extendsCreatedOk: 15,
        extendsCreatedInError: 0,
        extendsRemoved: 15,
        extendsPeak: 1,
        extendsDone: 15,
        noMoreSlotsHits: 0,
        noMoreSlotsHitsResolved: 0,
        timeoutExpired: 0,
        remoteDisconnects: 0
    }
}

{
    GUID: 'f975b127-be69-9eb9-1dd0-0fbcb4847b97',
    host: '127.0.0.1',
    port: 10000,
    username: 'admin',
    options: {},
    initialized: true,
    size: 35,
    extensions: 500,
    poolOptions: { extensions: { retry: [Object] } },
    sessionsTotal: 35,
    sessionsExtendedInUse: 0,
    sessionsInUse: 7,
    stats: {
        sessionsCreatedOk: 0,
        sessionsCreatedInError: 0,
        sessionsPeak: 0,
        sessionsDone: 0,
        extendsCreatedOk: 0,
        extendsCreatedInError: 0,
        extendsRemoved: 0,
        extendsPeak: 0,
        extendsDone: 0,
        noMoreSlotsHits: 0,
        noMoreSlotsHitsResolved: 0,
        timeoutExpired: 0,
        remoteDisconnects: 0
    }
}

````

---

[Back](api/staticPool.md)