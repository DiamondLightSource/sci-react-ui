import { render, screen } from "@testing-library/react";

import { DataBox } from "./DataBox";

const props = {
  label: "A Label",
  data: "Data 1234",
};

describe("DataBox", () => {
  test("Should render data and label", () => {
    const { container } = render(<DataBox {...props} />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(screen.getByText(props.data)).toBeInTheDocument();
    expect(container.querySelector("dd span.empty")).not.toBeInTheDocument();
  });

  test("Should render data if zero and label", () => {
    const data = "0";
    const { container } = render(<DataBox {...props} data={data} />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(screen.getByText(data)).toBeInTheDocument();
    expect(container.querySelector("dd span.empty")).not.toBeInTheDocument();
  });

  test("Should render data if zero number and label", () => {
    const data = 0;
    const { container } = render(<DataBox {...props} data={data} />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(screen.getByText(data)).toBeInTheDocument();
    expect(container.querySelector("dd span.empty")).not.toBeInTheDocument();
  });

  test("Should render data if zero number and label", () => {
    const data = 0.0;
    const { container } = render(<DataBox {...props} data={data} />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(screen.getByText(data)).toBeInTheDocument();
    expect(container.querySelector("dd span.empty")).not.toBeInTheDocument();
  });

  test("Should render '-' with empty data", () => {
    const { container } = render(<DataBox {...props} data="" />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(container.querySelector("dd span.empty")).toBeInTheDocument();
  });

  test("Should render '-' with whitespace data", () => {
    const { container } = render(<DataBox {...props} data="   " />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(container.querySelector("dd span.empty")).toBeInTheDocument();
  });

  test("Should render '-' with undefined data", () => {
    const { container } = render(<DataBox label={props.label} />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(container.querySelector("dd span.empty")).toBeInTheDocument();
  });
});
