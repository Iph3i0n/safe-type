import {
  IsString,
  IsNumber,
  IsSymbol,
  IsBoolean,
  IsFunction,
  IsDate,
  IsLiteral,
  IsArray,
  IsDiscriminated,
  IsObject,
  IsUnion,
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
    "IsLiteral of Test or 123 p1",
    "Test",
    IsDiscriminated(IsLiteral("Test"), IsLiteral(123))
  ],
  [
    "IsLiteral of Test or 123 p2",
    123,
    IsDiscriminated(IsLiteral("Test"), IsLiteral(123))
  ],
  ["IsObject with number", { test: 123 }, IsObject({ test: IsNumber })],
  [
    "IsUnion",
    { test: 123, other: "test" },
    IsUnion(IsObject({ test: IsNumber }), IsObject({ other: IsString }))
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
