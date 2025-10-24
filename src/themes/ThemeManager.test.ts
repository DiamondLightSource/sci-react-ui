import { BaseThemeOptions } from "./BaseTheme";
import { mergeThemeOptions } from "./ThemeManager";

describe("Theme Manager merge", () => {
  it("should merge", () => {
    const a = { a: 1, b: 2 };
    const b = { x: 1, y: 2 };
    const new_a = mergeThemeOptions(a, b);

    expect(new_a).toStrictEqual({ a: 1, b: 2, x: 1, y: 2 });
  });

  it("should deep merge", () => {
    const a = { a: 1, b: 2, c: { d: 1, e: 2 } };
    const b = { x: 1, y: { z: 3 } };
    const merged = mergeThemeOptions(a, b);

    expect(merged).toStrictEqual({
      a: 1,
      b: 2,
      c: { d: 1, e: 2 },
      x: 1,
      y: { z: 3 },
    });
  });

  it("should use a value over b", () => {
    const a = { a: 100, b: 2 };
    const b = { a: 1, c: 3 };
    const merged = mergeThemeOptions(a, b);

    expect(merged).toStrictEqual({ a: 100, b: 2, c: 3 });
  });

  it("should take the base theme and make a new one", () => {
    const fontSize = 4422;
    const a = { typography: { fontSize: fontSize } };
    const b = BaseThemeOptions;

    const merged = mergeThemeOptions(a, b);

    expect(BaseThemeOptions.typography.fontSize).not.toStrictEqual(fontSize);
    expect(merged.typography.fontSize).toStrictEqual(fontSize);
  });

  it("should effectively clone to an empty object", () => {
    const a = { a: 100, b: 2 };
    const cloned = mergeThemeOptions({}, a);

    expect(cloned).toStrictEqual(a);
  });
});
