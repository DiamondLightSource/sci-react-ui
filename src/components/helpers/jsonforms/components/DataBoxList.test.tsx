import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DataBoxList } from "./DataBoxList";

describe("Data Box List - ", () => {
  it("Should render a list of DataBox items inside a dl tag", () => {
    const items = [
      { label: "Name", data: "Alice" },
      { label: "Age", data: "30" },
    ];

    const { container } = render(<DataBoxList items={items} />);

    expect(container.querySelector("dl")).toBeInTheDocument();

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();

    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});
