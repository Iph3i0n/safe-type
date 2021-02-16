# Safe Type

This used to be a NPM module but I am attempting to switch to [Deno](https://deno.land/) entirely so am dropping support for Node. The old package will remain available and will not be taken down.

## Usage

```TypeScript
import { Assert, IsObject, IsString, IsType, Checker } from "https://deno.land/x/safe_type@2.2.2/mod.ts";

function Thing(argument: unknown) {
  Assert(argument, IsString);
  // We now know this is a string and inference will tell us as much
}

function ThingWithoutException(argument: unknown) {
  if (!IsString(argument)) {
    console.log("The argument is not a string");
    return;
  }

  // Do something cool
}

// If we want a usable type from a runtime checker then we use IsType
type String = IsType<typeof IsString>;

// If we want to accept a runtime checker as an argument then we have this
function DoSomething<T>(argument: unknown, checker: Checker<T>) {
  Assert(argument, checker);
}

DoSomething({ test: "value" }, IsObject({ test: IsString }))
```

It is as simple as that!

Inference is fully operational, no casting will be required.

## Checkers

Find below a list of all available checkers:

- IsString
- IsNumber
- IsBigInt
- IsSymbol
- IsBoolean
- IsFunction
- IsDate
- IsLiteral
  - A function that takes a value and will return a checker for that value as a type.
- IsArray
  - A function that takes a checker and returns an checker for an array of the type of the provided checker.
- IsTuple
  - A function that takes any number of arguments that are checkers and returns a checker for a tuple of provided checkers.
- IsUnion
  - A function that takes any number of arguments that are checkers and returns a checker for any one of the provided checkers.
- IsIntersection
  - A function that takes any number of arguments that are checkers and returns a checker for all of the provided checkers.
- IsObject
  - A function that takes an object where each key is a checker and returns a checker for an object of the type provided.
- IsDictionary
  - A function that takes a checker and returns a checker for a dictionary with a key of string and value of the checker.
- Optional
  - A function that takes a checker and returns a checker for that type and null or undefined.
- DoNotCare
  - Always returns true and infers unknown. Useful in the IsObject checker.
- Assert
  - Not strictly a checker but takes a checker and a value and throws if the checker is not the value. Supports inference.