export type IsType<T> = T extends (arg: any) => arg is infer T ? T : never;
export type Checker<T> = (arg: any, strict?: boolean) => arg is T;

type CheckerObject = { [key: string]: Checker<any> };
type ObjectChecker<T extends CheckerObject> = (
  arg: any,
  strict?: boolean
) => arg is { [TKey in keyof T]: IsType<T[TKey]> };

export function IsString(arg: any): arg is string {
  return typeof arg === "string";
}

export function IsNumber(arg: any): arg is number {
  return typeof arg === "number";
}

export function IsBigInt(arg: any): arg is bigint {
  return typeof arg === "bigint";
}

export function IsSymbol(arg: any): arg is symbol {
  return typeof arg === "symbol";
}

export function IsBoolean(arg: any): arg is boolean {
  return typeof arg === "boolean";
}

export function IsFunction(arg: any): arg is Function {
  return typeof arg === "function";
}

export function IsDate(arg: any): arg is Date {
  return arg instanceof Date;
}

export function IsLiteral<T extends string | number | boolean>(
  value: T
): (arg: any) => arg is T {
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

export function IsTuple<T extends any[]>(
  ...checkers: { [K in keyof T]: Checker<T[K]> }
) {
  return (arg: any): arg is T => {
    return checkers.find((v, i) => !v(arg[i])) == null;
  };
}

export function IsUnion<T extends any[]>(
  ...checkers: { [K in keyof T]: Checker<T[K]> }
) {
  return (arg: any): arg is T[number] =>
    checkers.filter((c) => c(arg, true)).length > 0;
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export function IsIntersection<T extends any[]>(
  ...checkers: { [K in keyof T]: Checker<T[K]> }
) {
  return (arg: any): arg is UnionToIntersection<T[number]> =>
    checkers.filter((c) => c(arg, false)).length === checkers.length;
}

export function IsObject<T extends CheckerObject>(
  checker: T
): ObjectChecker<T> {
  return ((arg: any, strict: boolean = true) => {
    for (const key in checker) {
      if (!checker.hasOwnProperty(key)) {
        continue;
      }

      if (!checker[key](arg[key], true)) {
        return false;
      }
    }

    if (strict) {
      for (const key in arg) {
        if (!arg.hasOwnProperty(key)) {
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

export function IsDictionary<T>(c: Checker<T>): Checker<{ [key: string]: T }> {
  return (arg: any, strict: boolean = true): arg is { [key: string]: T } => {
    if (strict) {
      return (
        Object.keys(arg).find((k) => {
          if (!arg.hasOwnProperty(k)) {
            return false;
          }

          if (!IsString(k)) {
            return false;
          }

          return arg[k] == null || !c(arg[k], true);
        }) == null
      );
    }

    return (
      Object.keys(arg).find((k) => {
        if (!arg.hasOwnProperty(k)) {
          return false;
        }

        if (!IsString(k)) {
          return false;
        }

        return arg[k] != null && c(arg[k], true);
      }) != null
    );
  };
}

export function Optional<T>(c: Checker<T>): Checker<T | null | undefined> {
  return (arg: any): arg is T | null | undefined => {
    return typeof arg === "undefined" || arg === null || c(arg, true);
  };
}

export function DoNotCare(arg: any): arg is unknown {
  return true;
}

export function Assert<T>(
  checker: Checker<T>,
  subject: any,
  message?: string
): asserts subject is T {
  if (!checker(subject)) {
    throw new Error(
      message ? message : "Invalid type of " + JSON.stringify(subject)
    );
  }
}
