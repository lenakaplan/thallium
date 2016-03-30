'use strict'

/**
 * The assertion error implementation for this framework. The first half is an
 * initial attempt to use an ES6 Error subclass, but it will throw if it's not
 * properly supported or if CSP is enabled (an unlikely scenario for testing).
 *
 * The second half, the fallback, is very heavily adapted from assertion-error,
 * but with the arguments changed and simplified to my use case.
 *
 * Both versions are roughly equivalent, other than that the first one carries
 * the ES6 constraints on methods, etc.
 */
try
    export AssertionError = (new Function '''
        "use strict"
        class AssertionError extends Error {
            constructor(message, expected, actual) {
                super(message)

                this.expected = expected
                this.actual = actual
            }

            get name() {
                return "AssertionError"
            }

            toJSON(includeStack) {
                return {
                    name: this.name,
                    message: this.message,
                    expected: this.expected,
                    actual: this.actual,
                    stack: includeStack ? this.stack : undefined,
                }
            }
        }

        // Test that native subclasses are actually *supported*. Some engines
        // with incomplete ES6 support will fail here.
        new AssertionError("test", true, false)

        return AssertionError
    ''')!
catch
    export class AssertionError extends Error
        (@message, @expected, @actual) ->
            | typeof Error.captureStackTrace == 'function' =>
                Error.captureStackTrace @, AssertionError
            | otherwise =>
                e = new Error @message
                e.name = @name
                @stack = e.stack

        name: 'AssertionError'

        toJSON: (includeStack) ->
            name: @name,
            message: @message,
            expected: @expected,
            actual: @actual,
            stack: if includeStack then @stack else void