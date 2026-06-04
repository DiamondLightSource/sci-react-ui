import { render, screen } from "@testing-library/react";

import { DataCell } from "./DataCell";

describe("DataCell", () => {
  test("Should render data string", () => {
    const data = "Data 1234";
    const { container } = render(<DataCell data={data} />);
    expect(screen.getByText(data)).toBeInTheDocument();
    expect(container.querySelector("span.empty")).not.toBeInTheDocument();
  });

  test("Should render data with 0", () => {
    const data = "0";
    const { container } = render(<DataCell data={data} />);
    expect(screen.getByText(data)).toBeInTheDocument();
    expect(container.querySelector("span.empty")).not.toBeInTheDocument();
  });

  test("Should render data with 0 number", () => {
    const data = 0;
    const { container } = render(<DataCell data={data} />);
    expect(screen.getByText(data)).toBeInTheDocument();
    expect(container.querySelector("span.empty")).not.toBeInTheDocument();
  });

  test("Should render data with 0.0 number", () => {
    const data = 0.0;
    const { container } = render(<DataCell data={data} />);
    expect(screen.getByText(data)).toBeInTheDocument();
    expect(container.querySelector("span.empty")).not.toBeInTheDocument();
  });

  test("Should render '-' with empty data", () => {
    const { container } = render(<DataCell data="" />);
    expect(container.querySelector("span.empty")).toBeInTheDocument();
  });

  test("Should render '-' with whitespace data", () => {
    const { container } = render(<DataCell data="  " />);
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
