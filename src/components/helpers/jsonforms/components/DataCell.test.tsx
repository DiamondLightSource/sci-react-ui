import { render, screen } from "@testing-library/react";

import { DataCell } from "./DataCell";

const props = {
  data: "Data 1234",
};

describe("DataCell", () => {
  test("Should render data and label", () => {
    const { container } = render(<DataCell {...props} />);
    expect(screen.getByText(props.data)).toBeInTheDocument();
    expect(container.querySelector("span.empty")).not.toBeInTheDocument();
  });

  test("Should render '-' with empty data", () => {
    const { container } = render(<DataCell data="" />);
    expect(container.querySelector("span.empty")).toBeInTheDocument();
  });

  test("Should render '-' with null data", () => {
    const { container } = render(<DataCell data={null} />);
    expect(container.querySelector("span.empty")).toBeInTheDocument();
  });

  test("Should render '-' with undefined data", () => {
    const { container } = render(<DataCell />);
    expect(container.querySelector("span.empty")).toBeInTheDocument();
  });
});
