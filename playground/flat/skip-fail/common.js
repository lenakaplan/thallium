"use strict"

/* eslint-disable max-len */

var t = require("../../..")
var fail = require("../../../assert").fail

t.testSkip("cli common isObjectLike() passes for objects and functions")
t.testSkip("cli common isObjectLike() fails for other things")
t.testSkip("cli common resolveDefault() gets CJS default functions")
t.testSkip("cli common resolveDefault() gets CJS default functions with `default` property")
t.testSkip("cli common resolveDefault() gets CJS default arrays with `default` property")
t.testSkip("cli common resolveDefault() gets CJS default objects")
t.testSkip("cli common resolveDefault() gets CJS default primitives")
t.testSkip("cli common resolveDefault() gets ES6 default functions")
t.testSkip("cli common resolveDefault() gets ES6 default objects")
t.testSkip("cli common resolveDefault() gets ES6 default arrays")
t.test("cli common resolveDefault() gets ES6 default objects with `default` property", fail)
t.test("cli common resolveDefault() gets ES6 default functions with `default` property", fail)
t.test("cli common resolveDefault() gets ES6 default arrays with `default` property", fail)
t.testSkip("cli common resolveDefault() gets ES6 default primitives")
t.testSkip("cli common normalizeGlob() current directory normalizes a file")
t.testSkip("cli common normalizeGlob() current directory normalizes a glob")
t.testSkip("cli common normalizeGlob() current directory retains trailing slashes")
t.testSkip("cli common normalizeGlob() current directory retains negative")
t.testSkip("cli common normalizeGlob() current directory retains negative + trailing slashes")
t.testSkip("cli common normalizeGlob() absolute directory normalizes a file")
t.testSkip("cli common normalizeGlob() absolute directory normalizes a glob")
t.testSkip("cli common normalizeGlob() absolute directory retains trailing slashes")
t.testSkip("cli common normalizeGlob() absolute directory retains negative")
t.testSkip("cli common normalizeGlob() absolute directory retains negative + trailing slashes")
t.testSkip("cli common normalizeGlob() relative directory normalizes a file")
t.testSkip("cli common normalizeGlob() relative directory normalizes a glob")
t.testSkip("cli common normalizeGlob() relative directory retains trailing slashes")
t.testSkip("cli common normalizeGlob() relative directory retains negative")
t.testSkip("cli common normalizeGlob() relative directory retains negative + trailing slashes")
t.testSkip("cli common normalizeGlob() edge cases normalizes `.` with a cwd of `.`")
t.testSkip("cli common normalizeGlob() edge cases normalizes `..` with a cwd of `.`")
t.testSkip("cli common normalizeGlob() edge cases normalizes `.` with a cwd of `..`")
t.test("cli common normalizeGlob() edge cases normalizes directories with a cwd of `..`", fail)
t.testSkip("cli common normalizeGlob() edge cases removes excess `.`")
t.testSkip("cli common normalizeGlob() edge cases removes excess `..`")
t.testSkip("cli common normalizeGlob() edge cases removes excess combined junk")
t.testSkip("cli common globParent() strips glob magic to return parent path")
t.testSkip("cli common globParent() returns parent dirname from non-glob paths")
t.testSkip("cli common globParent() gets a base name")
t.testSkip("cli common globParent() gets a base name from a nested glob")
t.testSkip("cli common globParent() gets a base name from a flat file")
t.testSkip("cli common globParent() gets a base name from character class pattern")
t.testSkip("cli common globParent() gets a base name from brace , expansion")
t.testSkip("cli common globParent() gets a base name from brace .. expansion")
t.test("cli common globParent() gets a base name from extglob", fail)
t.test("cli common globParent() gets a base name from a complex brace glob", fail)
