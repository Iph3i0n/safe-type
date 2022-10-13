export type IsType<T> = T extends (arg: unknown) => arg is infer T ? T : never;
export type Checker<T> = (arg: unknown, strict?: boolean) => arg is T;

type CheckerObject = { [key: string]: Checker<unknown> };
type ObjectChecker<T extends CheckerObject> = (
  arg: unknown,
  strict?: boolean
) => arg is { [TKey in keyof T]: IsType<T[TKey]> };

type Checkerify<T extends unknown[]> = { [TKey in keyof T]: Checker<T[TKey]> };

export function IsString(arg: unknown): arg is string {
  return typeof arg === "string";
}

export function IsNumber(arg: unknown): arg is number {
  return typeof arg === "number";
}

export function IsBigInt(arg: unknown): arg is bigint {
  return typeof arg === "bigint";
}

export function IsSymbol(arg: unknown): arg is symbol {
  return typeof arg === "symbol";
}

export function IsBoolean(arg: unknown): arg is boolean {
  return typeof arg === "boolean";
}

export function IsFunction(arg: unknown): arg is Function {
  return typeof arg === "function";
}

export function IsDate(arg: unknown): arg is Date {
  return arg instanceof Date;
}

export function IsLiteral<T extends string | number | boolean>(
  value: T
): (arg: unknown) => arg is T {
  return (arg): arg is T => arg === value;
}

export function IsArray<T>(checker: Checker<T>): Checker<T[]> {
  return (arg): arg is T[] => {
    if (!Array.isArray(arg)) {
      return false;
    }

    return !arg.find((a, i) => {
      const result = checker(a, true);
      if (!result) {
        return true;
      }

      return false;
    });
  };
}

export function IsTuple<T extends unknown[]>(...checkers: Checkerify<T>) {
  return (arg: unknown): arg is T => {
    if (!Array.isArray(arg)) return false;
    if (arg.length !== checkers.length) return false;
    return checkers.find((v, i) => !v(arg[i])) == null;
  };
}

export function IsUnion<T extends unknown[]>(
  ...checkers: { [K in keyof T]: Checker<T[K]> }
) {
  return (arg: unknown, strict: boolean = true): arg is T[number] =>
    checkers.filter((c) => c(arg, strict)).length > 0;
}

export function IsOneOf<T extends Array<string | number | boolean>>(
  ...options: T
) {
  return (arg: unknown, strict = true): arg is T[number] => {
    for (const item of options) if (IsLiteral(item)(arg)) return true;

    return false;
  };
}

type UnionToIntersection<T extends unknown[]> = T extends [infer F, ...infer R]
  ? F & UnionToIntersection<R>
  : unknown;

export function IsIntersection<T extends unknown[]>(
  ...checkers: { [K in keyof T]: Checker<T[K]> }
) {
  return (arg: unknown): arg is UnionToIntersection<T> => {
    for (const checker of checkers) if (!checker(arg, false)) return false;
    return true;
  };
}

export function IsObject<T extends CheckerObject>(
  checker: T
): ObjectChecker<T> {
  return ((arg: unknown, strict: boolean = true) => {
    if (!arg || typeof arg !== "object") return false;

    for (const key in checker) {
      if (!IsKeyOf(arg, key)) {
        return false;
      }

      if (!checker[key](arg[key], true)) {
        return false;
      }
    }

    if (strict) {
      for (const key in arg) {
        if (!IsKeyOf(arg, key)) {
          continue;
        }

        if (!checker[key]) {
          return false;
        }
      }
    }

    return true;
  }) as ObjectChecker<T>;
}

export function IsRecord<TKey extends string | symbol, T>(
  keys: Checker<TKey>,
  checker: Checker<T>
): Checker<Record<TKey, T>> {
  return (arg: unknown, strict: boolean = true): arg is Record<TKey, T> => {
    if (!arg || typeof arg !== "object") return false;
    let any_match = false;

    const is_match = (key: string) =>
      keys(key) && IsKeyOf(arg, key) && checker(arg[key]);

    for (const key in arg ?? {})
      if (strict && !is_match(key)) return false;
      else if (!strict && is_match(key)) any_match = true;

    return strict || any_match;
  };
}

export function IsDictionary<T>(c: Checker<T>): Checker<{ [key: string]: T }> {
  return IsRecord(IsString, c);
}

export function Optional<T>(c: Checker<T>): Checker<T | null | undefined> {
  return (arg: unknown): arg is T | null | undefined => {
    return typeof arg === "undefined" || arg === null || c(arg, true);
  };
}

export function IsEmpty(arg: unknown): arg is null | undefined {
  return arg === null || arg === undefined;
}

export function DoNotCare(arg: unknown): arg is unknown {
  return true;
}

export function Assert<T>(
  checker: Checker<T>,
  subject: unknown,
  message?: string
): asserts subject is T {
  if (!checker(subject)) {
    throw new Error(
      message ? message : "Invalid type of " + JSON.stringify(subject)
    );
  }
}

type TupleResult<T extends unknown[]> = {
  [K in keyof T]: (item: T[K]) => unknown;
};

export function PatternMatch<T extends unknown[]>(...checkers: Checkerify<T>) {
  return <TResult extends TupleResult<T>>(...handlers: TResult) => {
    if (handlers.length !== checkers.length)
      throw new Error("Handlers and chekers must have the same length");

    return (item: T[number]): ReturnType<TResult[number]> => {
      for (let i = 0; i < handlers.length; i++) {
        const checker = checkers[i];
        const handler = handlers[i];
        if (checker(item)) {
          return handler(item) as any;
        }
      }

      throw new Error("No matching pattern for " + JSON.stringify(item));
    };
  };
}

export function IsKeyOf<T extends object>(
  checker: T,
  subject: string | number | symbol
): subject is keyof T {
  return subject in checker && checker.hasOwnProperty(subject);
}
