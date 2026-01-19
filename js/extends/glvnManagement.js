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

const Glvn = require('./glvn')
const Global = require('./global')
const utils = require('../utils')

class GlvnManagement {
    $ = function (glvnName) {

    }

    addName = function (name) {
        // validate name
        utils.validateGlvnName(name)

        // check existance
        const names = Object.keys(this)
        if (names.find(lName => lName === name)) {
            throw new Error('Name already registered')
        }

        // create new entry
        this[name] = this._type === 'vars' ? new Glvn : new Global

        Object.defineProperties(this[name], {
            _type: {
                value: this._type,
                enumerable: false,
                configurable: false
            },
            objRoot: {
                value: this.objRoot,
                enumerable: false,
                configurable: false
            },
            _glvnName: {
                value: name,
                enumerable: false,
                configurable: false
            },

        })

        this[name]._init(this[name])

        // append reader and writer
        utils.appendToObject(this[name], this)
    }

    removeName = function (name) {
        // validate name
        utils.validateGlvnName(name)

        // check existance
        const names = Object.keys(this)
        if (names.find(lName => lName === name)) {
            delete this[name]

        } else {
            throw new Error('Name not found')
        }
    }
}

module.exports = GlvnManagement
