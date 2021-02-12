export declare type IsType<T> = T extends (arg: any) => arg is infer T ? T : never;
export declare type Checker<T> = (arg: any, strict?: boolean) => arg is T;
declare type CheckerObject = {
    [key: string]: Checker<any>;
};
declare type ObjectChecker<T extends CheckerObject> = (arg: any, strict?: boolean) => arg is {
    [TKey in keyof T]: IsType<T[TKey]>;
};
export declare function IsString(arg: any): arg is string;
export declare function IsNumber(arg: any): arg is number;
export declare function IsBigInt(arg: any): arg is bigint;
export declare function IsSymbol(arg: any): arg is symbol;
export declare function IsBoolean(arg: any): arg is boolean;
export declare function IsFunction(arg: any): arg is Function;
export declare function IsDate(arg: any): arg is Date;
export declare function IsLiteral<T extends string | number | boolean>(value: T): (arg: any) => arg is T;
export declare function IsArray<T>(checker: Checker<T>): Checker<T[]>;
export declare function IsTuple<T extends any[]>(...checkers: {
    [K in keyof T]: Checker<T[K]>;
}): (arg: any) => arg is T;
export declare function IsUnion<T extends any[]>(...checkers: {
    [K in keyof T]: Checker<T[K]>;
}): (arg: any) => arg is T[number];
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare function IsIntersection<T extends any[]>(...checkers: {
    [K in keyof T]: Checker<T[K]>;
}): (arg: any) => arg is UnionToIntersection<T[number]>;
export declare function IsObject<T extends CheckerObject>(checker: T): ObjectChecker<T>;
export declare function IsDictionary<T>(c: Checker<T>): Checker<{
    [key: string]: T;
}>;
export declare function Optional<T>(c: Checker<T>): Checker<T | null | undefined>;
export declare function DoNotCare(arg: any): arg is unknown;
export declare function Assert<T>(checker: Checker<T>, subject: any, message?: string): asserts subject is T;
export {};
