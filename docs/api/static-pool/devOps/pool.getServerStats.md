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

# pool.getServerStats()

---

**Type**: method

***Async**: Yes

**Parameters**:
<br><br>
**Returns**: `<array>`

---

This method is used to collect CPU and memory information about all processes using the pool.

It is quick to execute in the server and can be called at regular intervals to get an overview of the current server
usage.

It returns an array, where each element represents a process, as object.

The following structure is returned:

| Field name      | Datatype | Description                                                                                              |
|-----------------|:--------:|:---------------------------------------------------------------------------------------------------------|
| `pid`           |  number  | The process ID                                                                                           |
| `state`         |  string  | The current process state                                                                                |
| `cpu.utime`     |  number  | The CPU user time                                                                                        |
| `cpu.stime`     |  number  | The CPU system time                                                                                      |
| `cpu.cutime`    |  number  | The CPU children user time                                                                               |
| `cpu.cstime`    |  number  | The CPU children system time                                                                             |
| `memory.VmHWM`  |  number  | The peak physical memory (in kilobytes) a process has used since it started.                             |
| `memory.VmLck`  |  number  | The amount of locked virtual memory (in kilobytes) currently held in physical RAM by a specific process  |
| `memory.VmPeak` |  number  | The peak virtual memory size (address space) a process has used over its entire lifetime. (in kilobytes) |
| `memory.VmRss`  |  number  | How much of a process's memory is currently held in physical RAM, reported in kilobytes (kB)             |
| `memory.VmSize` |  number  | The total amount of virtual address space currently mapped and accessible to a process.                  |

> All the `stats` counters can be reset using the `resetServerStats()` method.

---

### EXAMPLES

````js
import mindClient from 'mind-client-js'

const pool = new mindClient.staticPool(20)

await pool.create('127.0.0.1', 10000, 'admin', 'admin')

const serverStats = await pool.devOps.getServerStats()

console.dir(serverStats, {depth: 10})

````

````json
  [
    {
        cpu: {
            cstime: 0,
            cutime: 0,
            stime: 5,
            utime: 2
        },
        memory: {
            VmHWM: 99936,
            VmLck: 0,
            VmPeak: 177820,
            VmRss: 99936,
            VmSize: 177820
        },
        pid: 5176,
        state: 'R'
    },
    {
        cpu: {
            cstime: 0,
            cutime: 0,
            stime: 4,
            utime: 4
        },
        memory: {
            VmHWM: 100104,
            VmLck: 0,
            VmPeak: 177820,
            VmRss: 100104,
            VmSize: 177820
        },
        pid: 5178,
        state: 'D'
    }
]
  
````