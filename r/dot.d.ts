/* tslint:disable */

import {ReporterConsumer} from "../index.d";

export interface DotOptions {
    write?(string: string): void | PromiseLike<void>;
    reset?(): void | PromiseLike<void>;
    color?: boolean;
}

export function dot(options?: DotOptions): ReporterConsumer;
