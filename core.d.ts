/* tslint:disable */

export interface Callback<T> {
    (err?: Error): T;
}

export interface Location {
    name: string;
    index: number;
}

export type ReportType =
    "start" |
    "enter" |
    "leave" |
    "pass" |
    "fail" |
    "skip" |
    "end" |
    "error" |
    "extra";

export type Report =
    StartReport |
    EnterReport |
    LeaveReport |
    PassReport |
    FailReport |
    SkipReport |
    EndReport |
    ExtraReport<any>;

interface TestReport<T extends ReportType, U> {
    type(): T;
    path: Location[];
    value: U;
    duration: number;
    slow: number;

    start(): this is StartReport;
    enter(): this is EnterReport;
    leave(): this is LeaveReport;
    pass(): this is PassReport;
    fail(): this is FailReport;
    skip(): this is SkipReport;
    end(): this is EndReport;
    error(): this is ErrorReport;
    extra(): this is ExtraReport<any>;
}

export interface ExtraCall<T> {
    count: number;
    value: T;
    stack: string;
}

export interface StartReport extends TestReport<"start", void> {}
export interface EnterReport extends TestReport<"enter", void> {}
export interface LeaveReport extends TestReport<"leave", void> {}
export interface PassReport extends TestReport<"pass", void> {}
export interface FailReport extends TestReport<"fail", any> {}
export interface SkipReport extends TestReport<"skip", void> {}
export interface EndReport extends TestReport<"end", void> {}
export interface ExtraReport<T> extends TestReport<"extra", ExtraCall<T>> {
    extra(): this is ExtraReport<T>;
}

export interface Plugin<T extends Test> {
    (t: T): any;
}

export interface Reporter {
    (item: Report, done: Callback<void>): any;

    // Whether this needs to block everything else. Useful if you need to
    // have sole async access to a resource, and there's no lock available.
    block?: boolean;
}

export interface DefineImpl {
    (...args: any[]): AssertionResult;
}

export interface WrapImpl {
    (f: (...args: any[]) => any, ...args: any[]): any;
}

export interface AddImpl<T extends Test> {
    (test: T, ...args: any[]): any;
}

export interface AssertionResult {
    [key: string]: any;

    // These are required.
    test: boolean;
    message: string;

    // These are optional, but will be added to the assertion error if the
    // `test` returns false.
    actual?: any;
    expected?: any;
}

export class AssertionError<T, U> extends Error {
    name: "AssertionError";
    message: string;
    expected: T;
    found: U;

    constructor(message: string, expected: T, actual: U);
}

export interface IteratorResult<T> {
    done: boolean;
    value: T;
}

export interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    throw?(err?: any): IteratorResult<T>;
}

export interface ObjectMap<T> {
    [name: string]: T;
}

export interface AsyncDone<T> {
    (test: T, done: Callback<void>): any;
}

export interface AsyncReturn<T> {
    (test: T): PromiseLike<any> | Iterator<any>;
}

export type AsyncCallback<T> = AsyncDone<T> | AsyncReturn<T>

export interface Reflect<T extends Test> {
    /**
     * A reference to the test's state, purely for internal use.
     *
     * @internal
     */
    _: Object;

    /**
     * A reference to the AssertionError constructor.
     */
    AssertionError: typeof AssertionError;

    /**
     * Create a new Thallium instance
     */
    base(): Test;

    /**
     * Define an assertion.
     */
    define(name: string, impl: DefineImpl): void;

    /**
     * Define one or more assertions.
     */
    define(methods: ObjectMap<DefineImpl>): void;

    /**
     * Wrap an existing method to patch it. When the wrapped method is called,
     * the wrapper is called with the old function bound to the instance,
     * followed by its normal arguments.
     */
    wrap(name: string, impl: WrapImpl): void;

    /**
     * Wrap one or more existing methods to patch them. When the wrapped method
     * is called, the wrapper is called with the old function bound to the
     * instance, followed by its normal arguments.
     */
    wrap(methods: ObjectMap<WrapImpl>): void;

    /**
     * Define a new method. The method is called with `this` as both the
     * instance and the first argument, and then the normal arguments
     * afterwards. `checkInit` is automatically called before any of your work
     * is done.
     */
    add(name: string, impl: AddImpl<T>): void;

    /**
     * Define one or more new methods. The method is called with `this` as both
     * the instance and the first argument, and then the normal arguments
     * afterwards. `checkInit` is automatically called before any of your work
     * is done.
     */
    add(methods: ObjectMap<AddImpl<T>>): void;

    /**
     * Is this test runnable (i.e. running isn't a no-op).
     */
    runnable(): boolean;

    /**
     * Is this test specifically skipped (created with `t.testSkip()` or
     * `t.asyncSkip()`).
     */
    skipped(): boolean;

    /**
     * Is this test the root, i.e. top level?
     */
    root(): boolean;

    /**
     * Is this an inline test?
     */
    inline(): boolean;

    /**
     * Is this an async test?
     */
    async(): boolean;

    /**
     * Get the parent test.
     */
    parent(): T;

    /**
     * Get the methods associated with this instance.
     */
    methods(): T;

    /**
     * Get the own, not necessarily active, timeout. 0 means inherit the
     * parent's, and `Infinity` means it's disabled.
     */
    timeout(): number;

    /**
     * Get the active timeout in milliseconds, not necessarily own, or the
     * framework default of 2000, if none was set.
     */
    activeTimeout(): number;

    /**
     * Assert that this test is currently being initialized (and is thus safe to
     * modify). This should *always* be used for anything dependent on test
     * state. If you use `define`, `wrap` or `add`, this is already done for
     * you.
     */
    checkInit(): void;

    /**
     * Get a list of all own reporters. If none were added, an empty list is
     * returned.
     */
    reporters(): Reporter[];

    /**
     * Get a list of all active reporters, either on this instance or on the
     * closest parent.
     */
    activeReporters(): Reporter[];

    /**
     * Run `func` when assertions are run, only if the test isn't skipped. This
     * is immediately for block and async tests, but deferred for inline tests.
     * It's useful if you need these guarantees.
     */
    do(func: () => any): void;

    /**
     * Create a `start` report. Mostly useful for testing reporters. Note that
     * the `value`, `duration`, and `slow` arguments are ignored.
     */
    report(type: "start", path: Location[], valueIgnored?: any, durationIgnored?: number, slowIgnored?: number): StartReport;

    /**
     * Create a `enter` report. Mostly useful for testing reporters. Note that
     * the `value` argument is ignored.
     */
    report(type: "enter", path: Location[], valueIgnored?: any, duration?: number, slow?: number): EnterReport;

    /**
     * Create a `leave` report. Mostly useful for testing reporters. Note that
     * the `value`, `duration`, and `slow` arguments are ignored.
     */
    report(type: "leave", path: Location[], valueIgnored?: any, durationIgnored?: number, slowIgnored?: number): LeaveReport;

    /**
     * Create a `pass` report. Mostly useful for testing reporters. Note that
     * the `value` argument is ignored.
     */
    report(type: "pass", path: Location[], valueIgnored?: any, duration?: number, slow?: number): PassReport;

    /**
     * Create a `fail` report. Mostly useful for testing reporters.
     */
    report(type: "fail", path: Location[], value?: any, duration?: number, slow?: number): FailReport;

    /**
     * Create a `skip` report. Mostly useful for testing reporters. Note that
     * the `value`, `duration`, and `slow` arguments are ignored.
     */
    report(type: "skip", path: Location[], valueIgnored?: any, durationIgnored?: number, slowIgnored?: number): SkipReport;

    /**
     * Create a `end` report. Mostly useful for testing reporters. Note that the
     * `value`, `duration`, and `slow` arguments are ignored.
     */
    report(type: "end", path: Location[], valueIgnored?: any, durationIgnored?: number, slowIgnored?: number): EndReport;

    /**
     * Create a `extra` report. Mostly useful for testing reporters. Note that
     * the `duration` and `slow` arguments are ignored, but unlike any other
     * call, the `value` argument is required.
     */
    report<T>(type: "extra", path: Location[], value: ExtraCall<T>, durationIgnored?: number, slowIgnored?: number): ExtraReport<T>;

    /**
     * Create a report. Mostly useful for testing reporters.
     */
    report(type: ReportType, path: Location[], value: any, duration?: number, slow?: number): Report;

    /**
     * Create a location data object. Mostly useful for testing reporters.
     */
    loc(name: string, index: number): Location;

    /**
     * Create an extra call data object. Mostly useful for testing reporters.
     */
    extra<T>(count: number, value: T, stack: string): ExtraCall<T>;
}

export interface Test {
    /**
     * A reference to the test's state, purely for internal use.
     *
     * @internal
     */
    _: Object;

    /**
     * Contains several internal methods that are not as useful for most users,
     * but give plenty of access to details for plugin/reporter/etc. developers,
     * in case they need it.
     */
    reflect(): Reflect<this>;

    /**
     * Whitelist specific tests, using array-based selectors where each entry
     * is either a string or regular expression.
     *
     * Returns the current instance for chaining.
     */
    only(...selectors: Array<string | RegExp>[]): this;

    /**
     * Use a number of plugins. Note that this does nothing for skipped/filtered
     * tests for memory reasons.
     *
     * Returns the current instance for chaining.
     */
    use(...plugins: Plugin<this>[]): this;

    /**
     * Add a number of reporters. Note that this does add reporters to skipped
     * tests, because they're still runnable.
     *
     * Returns the current instance for chaining.
     */
    reporter(...reporters: Reporter[]): this;

    /**
     * Define an assertion.
     *
     * Returns the current instance for chaining.
     */
    define(name: string, impl: DefineImpl): this;

    /**
     * Define one or more assertions.
     *
     * Returns the current instance for chaining.
     */
    define(methods: ObjectMap<DefineImpl>): this;

    /**
     * This sets the timeout in milliseconds, rounding negatives to 0, and
     * returns the current instance for chaining. Setting the timeout to 0 means
     * to inherit the parent timeout, and setting it to `Infinity` disables it.
     */
    timeout(timeout: number): this;

    /**
     * Run the tests (or the test's tests if it's not a base instance). Pass a
     * `callback` to be called with a possible error, and this returns a promise
     * otherwise.
     */
    run(callback: Callback<any>): PromiseLike<void>;

    /**
     * Add an inline test.
     */
    test(name: string): this;

    /**
     * Add a skipped inline test.
     */
    testSkip(name: string): this;

    /**
     * Add a block test.
     */
    test(name: string, run: (test: this) => any): this;

    /**
     * Add a skipped block test.
     */
    testSkip(name: string, run: (test: this) => any): this;

    /**
     * Add a block async test.
     */
    async(name: string, run: AsyncCallback<this>): this;

    /**
     * Add a skipped block async test.
     */
    asyncSkip(name: string, run: AsyncCallback<this>): this;
}

declare const t: Test;
export default t;
