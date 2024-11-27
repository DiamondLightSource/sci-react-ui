import { visitRegex, Visit, visitToText, regexToVisit } from "./diamond";
describe("visitRegex", () => {

  const validStrings = ["ab123456-78", "xy1-99", "cd123-456", "fg456789-2"];
  validStrings.forEach((str) => {
    test(`should match valid string '${str}'`, () => {
      const result = visitRegex.test(str);
      expect(result).toBe(true);
    });
  });

  const invalidStrings = [
    { str: "a12-34", name: "missing letter" },
    { str: "abc12-34", name: "extra letter" },
    { str: "ab123-", name: "missing last number" },
    { str: "ab123", name: "missing last number and hyphen" },
    { str: "ab012-034", name: "leading zero in first number" },
    { str: "ab12-034", name: "leading zero in second number" },
    { str: "ab12-34x", name: "letter at end" },
    { str: "12ab-34", name: "numbers at start" },
    { str: "ab123456cd-78", name: "extra letters" },
    { str: "ab12_34", name: "underscore" },
    { str: "ab123456-c78", name: "letters in last part" },
    { str: "ab123456 78", name: "space in place of hyphen" },
    { str: "ab123456 -78", name: "extra space" },
    { str: "ab-12-34", name: "hyphen in the wrong place" },
    { str: "ab12-34-56", name: "extra number" },
  ];

    invalidStrings.forEach(({ str, name }) => {
      test(`should not match invalid string '${str}' (${name})`, () => {
        const result = visitRegex.test(str);
        expect(result).toBe(false);
      });
    });

  test("should get three correct groups", () => {
    const str = "ab12-34";
    const match = visitRegex.exec(str);

    if (match) {
      expect(match).not.toBeNull();
      expect(match[1]).toBe("ab"); // proposalCode
      expect(match[2]).toBe("12"); // proposalNumber
      expect(match[3]).toBe("34"); // number
    }
  });
});

describe("visitToText", () => {
  test("should convert Visit to string", () => {
    const visit: Visit = {
      proposalCode: "ab",
      proposalNumber: 12,
      number: 34,
    };
    expect(visitToText(visit)).toBe("ab12-34");
  });

  test("should return empty string for undefined visit", () => {
    expect(visitToText()).toBe("");
  });
});

describe("regexToVisit", () => {
  test("should convert RegExpExecArray to Visit object", () => {
    const parsedVisit: RegExpExecArray = [
      "ab12-34",
      "ab",
      "12",
      "34",
    ] as unknown as RegExpExecArray;
    const expectedVisit: Visit = {
      proposalCode: "ab",
      proposalNumber: 12,
      number: 34,
    };
    expect(regexToVisit(parsedVisit)).toEqual(expectedVisit);
  });

  test("should convert RegExpExpectArray with longer numbers", () => {
    const parsedVisit: RegExpExecArray = [
      "cd12345678-999",
      "cd",
      "12345678",
      "999",
    ] as unknown as RegExpExecArray;
    const expectedVisit: Visit = {
      proposalCode: "cd",
      proposalNumber: 12345678,
      number: 999,
    };
    expect(regexToVisit(parsedVisit)).toEqual(expectedVisit);
  });
});
