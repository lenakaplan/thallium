"use strict"

/**
 * Main entry point, for those wanting to use this framework without the core
 * assertions.
 */
var Thallium = require("./lib/api/thallium")

require("./migrate/common").deprecate(
    "`thallium/core` is deprecated. Use `thallium` + `thallium/assert` instead.", // eslint-disable-line max-len
    function () {}
)()

module.exports = new Thallium()
