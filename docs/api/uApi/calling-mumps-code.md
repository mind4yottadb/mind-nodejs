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

# Calling mumps code

---

The uAPI interface allows you to call your own or legacy M code.

For this to work, the MIND server needs to load one (or many) uAPI JSON file(s) at startup, making the apps found
available to the clients.

Once the app is available in the server, you can select which one to use by specifying it in the `connect()` method, in
the `options` parameter.

When the client logs in the server, a handshake will take place and the JSON will be sent over. At this point, the
client will process the JSON file and
re-configure itself to append the new object structure and functions.

> You NEVER need to code anything in the client, even when the JSON in the server got changed. On the next `connect()`
> method the new structure will be automatically created.

For instructions about how to create the JSON file in the server, please follow [this link].

There are some considerations to make when calling MUMPS code:

- 