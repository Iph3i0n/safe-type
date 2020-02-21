import {
  IsString,
  IsNumber,
  IsSymbol,
  IsBoolean,
  IsFunction,
  IsDate,
  IsLiteral,
  IsArray,
  IsUnion,
  IsObject,
  IsIntersection,
  IsDictionary,
  Optional,
  DoNotCare
} from ".";

// For now, we cannot test bigint as jest does not support it
it.each([
  ["IsString", "test string" as any, IsString as any],
  ["IsNumber", 123, IsNumber],
  ["IsSymbol", Symbol(123), IsSymbol],
  ["IsBoolean", false, IsBoolean],
  ["IsFunction", () => {}, IsFunction],
  ["IsDate", new Date(2000, 1, 1), IsDate],
  ["IsLiteral", "Literal", IsLiteral("Literal")],
  ["IsArray of numbers", [1, 2, 3, 4], IsArray(IsNumber)],
  ["IsArray of strings", ["1", "2"], IsArray(IsString)],
  [
    "IsUnion of Test or 123 p1",
    "Test",
    IsUnion(IsLiteral("Test"), IsLiteral(123))
  ],
  [
    "IsUnion of Test or 123 p2",
    123,
    IsUnion(IsLiteral("Test"), IsLiteral(123))
  ],
  ["IsObject with number", { test: 123 }, IsObject({ test: IsNumber })],
  [
    "IsIntersection",
    { test: 123, other: "test" },
    IsIntersection(IsObject({ test: IsNumber }), IsObject({ other: IsString }))
  ],
  [
    "IsIntersection with dictionary",
    { test: 123, other: "test" },
    IsIntersection(IsDictionary(IsNumber), IsObject({ other: IsString }))
  ],
  [
    "IsIntersection with dictionary of objects and null other item",
    { test: { id: 1 }, other: null },
    IsIntersection(
      IsDictionary(IsObject({ id: IsNumber })),
      IsObject({ other: Optional(IsString) })
    )
  ],
  [
    "IsDictionary of numbers",
    { test: 123, other: 321 },
    IsDictionary(IsNumber)
  ],
  ["Optional", undefined, Optional(IsNumber)],
  ["DotNotCare on string", "test", DoNotCare],
  ["DoNotCare on date", Date.UTC(2000, 1, 1), DoNotCare]
])(
  "Correctly assignes to true for %s",
  (name: string, data: any, checker: any) => {
    expect(checker(data)).toBe(true);
  }
);

it.each([
  ["IsString", 123 as any, IsString as any],
  ["IsNumber", "test string", IsNumber],
  ["IsSymbol", 123, IsSymbol],
  ["IsBoolean", 123, IsBoolean],
  ["IsFunction", 123, IsFunction],
  ["IsDate", 123, IsDate],
  ["IsLiteral", "No Literal", IsLiteral("Literal")],
  ["IsArray of numbers", ["1", "2"], IsArray(IsNumber)],
  ["IsArray of strings", [1, 2, 3, 4], IsArray(IsString)],
  [
    "IsUnion of Test or 123 p1",
    "Not a test",
    IsUnion(IsLiteral("Test"), IsLiteral(123))
  ],
  [
    "IsUnion of Test or 123 p2",
    321,
    IsUnion(IsLiteral("Test"), IsLiteral(123))
  ],
  [
    "IsObject with number",
    { test: "test string" },
    IsObject({ test: IsNumber })
  ],
  [
    "IsIntersection",
    { test: "test string", other: 123 },
    IsIntersection(IsObject({ test: IsNumber }), IsObject({ other: IsString }))
  ],
  [
    "IsIntersection with dictionary",
    { other: "test" },
    IsIntersection(IsDictionary(IsNumber), IsObject({ other: IsString }))
  ],
  [
    "IsDictionary of numbers",
    { test: "123", other: 321 },
    IsDictionary(IsNumber)
  ],
  ["Optional", false, Optional(IsNumber)]
])(
  "Correctly assignes to false for %s",
  (name: string, data: any, checker: any) => {
    expect(checker(data)).toBe(false);
  }
);
