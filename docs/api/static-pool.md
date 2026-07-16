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

# Static pool

---

This class gives you full access to the static pool.

---

### Methods:

- [create()](api/stdatic-pool/pool.create.md)
- [destroy()](api/stdatic-pool/pool.destroy.md)
- [rundown()](api/stdatic-pool/pool.rundown.md)
- [getSession()](api/stdatic-pool/pool.getSession.md)
- [getStatus()](api/stdatic-pool/pool.getStatus.md)
- [changeSize()](api/stdatic-pool/pool.changeSize.md)
- [changeExtension()](api/stdatic-pool/pool.changeExtension.md)
- devOps
    - [_getDevOpsSession()](api/stdatic-pool/devOps/pool._getDevOpsSession.md)
    - [getPoolStats()](api/stdatic-pool/devOps/pool.getPoolStats.md)
    - [setLogLevel()](api/stdatic-pool/devOps/pool.setLogLevel.md)
    - [setDumpRequest()](api/stdatic-pool/devOps/pool.setDumpRequest.md)
    - [setDumpResponse()](api/stdatic-pool/devOps/pool.setDumpResponse.md)
    - [setStats()](api/stdatic-pool/devOps/pool.setStats.md)
    - [setErrorDump()](api/stdatic-pool/devOps/pool.setErrorDump.md)
    - [setIdleTimeout()](api/stdatic-pool/devOps/pool.setIdleTimeout.md)
    - [resetSettings()](api/stdatic-pool/devOps/pool.resetSettings.md)

### Properties:

- [guid](api/static-pool/pool.guid.md)
- [ERROR_DUMP_NONE](api/static-pool/pool.ERROR_DUMP_NONE.md)
- [ERROR_DUMP_BRIEF](api/static-pool/pool.ERROR_DUMP_BRIEF.md)
- [ERROR_DUMP_FULL](api/static-pool/pool.ERROR_DUMP_FULL.md)
- [STATS_NONE](api/static-pool/pool.STATS_NONE.md)
- [STATS_GRAND_TOTALS](api/static-pool/pool.STATS_GRAND_TOTALS.md)
- [STATS_DETAILS](api/static-pool/pool.STATS_DETAILS.md)
- [DUMP_REQUEST_OFF](api/static-pool/pool.DUMP_REQUEST_OFF.md)
- [DUMP_REQUEST_ON](api/static-pool/pool.DUMP_REQUEST_ON.md)
- [DUMP_RESPONSE_OFF](api/static-pool/pool.DUMP_RESPONSE_OFF.md)
- [DUMP_RESPONSE_ON](api/static-pool/pool.DUMP_RESPONSE_ON.md)
- [LOG_LEVEL_NONE](api/static-pool/pool.LOG_LEVEL_NONE.md)
- [LOG_LEVEL_SESSIONS](api/static-pool/pool.LOG_LEVEL_SESSIONS.md)
- [LOG_LEVEL_COMMANDS](api/static-pool/pool.LOG_LEVEL_COMMANDS.md)
- [LOG_LEVEL_TIMINGS](api/static-pool/pool.LOG_LEVEL_TIMINGS.md)

---

### Events:

- [.on('noMoreSlotsHits')](api/static-pool/pool.noMoreSlotsHits.md)
- [.on('noMoreSlotsHitsResolved')](api/static-pool/pool.noMoreSlotsHitsResolved.md)
