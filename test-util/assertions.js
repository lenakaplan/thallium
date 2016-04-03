"use strict"

/* eslint-env mocha */

var t = require("../lib/index.js").t

exports.fail = function (name) {
    var args = []

    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }

    t.throws(function () { t[name].apply(t, args) }, t.AssertionError)
}

exports.basic = function (desc, callback) {
    describe(desc, function () { return it("works", callback) })
}