/*###############################################################
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

module.exports = {
    NOT_LOGGED_IN: 100,

    LOG_STR_NOT_A_STRING: 200,

    NAME_ALREADY_REGISTERED: 300,
    NAME_NOT_FOUND: 301,
    NAME_EMPTY_OR_NOT_STRING: 302,

    HOST_MUST_BE_STRING: 350,
    PORT_MUST_BE_NUMBER: 351,
    USERNAME_MUST_BE_STRING: 352,
    PASSWORD_MUST_BE_STRING: 353,
    TIMEOUT_MUST_BE_NUMBER: 354,
    TIMEOUT_NOT_POSITIVE_NUMBER: 355,

    METHOD_BAD_ARGS_NUMBER: 400,
    METHOD_PARAM_NOT_NUMBER: 401,
    METHOD_PARAM_NOT_STRING: 402,
    METHOD_PARAM_NOT_VAR_NAME: 403,

    FILENAME_NOT_PROVIDED: 450,
    FILENAME_NOT_STRING: 451


}