import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../__test-utils__/helpers";
import { DataGroup } from "./DataGroup";
import { DataObjectProps } from "./types";

describe("DataGroup", () => {
  it("renders multiple data objects", () => {
    const title1 = "Status 1";
    const value1 = "OK";
    const title2 = "Status 2";
    const value2 = "Idle";
    const items: DataObjectProps[] = [
      {
        title: title1,
        value: { value: value1 },
      },
      {
        title: title2,
        value: { value: value2 },
      },
    ];
    renderWithProviders(<DataGroup items={items} />);
    [title1, value1, title2, value2].forEach((element) => {
      expect(screen.getByText(element)).toBeVisible();
    });
  });

  it("separates items with dividers", () => {
    const numberOfItems = 5;
    const obj = { title: "", value: { value: "" } };
    const items = Array(numberOfItems).fill(obj);
    renderWithProviders(<DataGroup items={items} />);

    // number of separators = items - 1
    const dividors = screen.getAllByRole("separator");
    expect(dividors.length).toBe(numberOfItems - 1);
  });

  it("renders all types of data item", () => {
    const standard: DataObjectProps = {
      title: "standard",
      value: { value: "Good" },
      subvalue: { value: "3", suffix: "min" },
    };
    const stacked: DataObjectProps = {
      title: "stacked",
      value1: { label: "Happy", value: "Yes" },
      value2: { label: "Sad", value: "No" },
    };
    const pair: DataObjectProps = {
      title: "pair",
      value1: { value: "A" },
      value2: { value: "B" },
      subvalue: { value: "C" },
    };

    renderWithProviders(<DataGroup items={[standard, stacked, pair]} />);

    // standard
    ["standard", "Good", "3", "min"].forEach((element) =>
      expect(screen.getByText(element)).toBeVisible(),
    );

    // stacked
    ["stacked", "Happy:", "Yes", "Sad:", "No"].forEach((element) =>
      expect(screen.getByText(element)).toBeVisible(),
    );

    // pair
    ["pair", "A", "B", "C"].forEach((element) =>
      expect(screen.getByText(element)).toBeVisible(),
    );
  });
});
