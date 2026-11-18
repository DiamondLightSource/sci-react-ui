import { LucideStar } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { DataTag, DataTagGrid } from "./DataTag";

describe("DataTag Component", () => {
  it("renders the label and value correctly when strings provided", () => {
    const value = "Test Value";
    render(<DataTag label="Test Label" value={value} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("renders the label and value correctly when number provided", () => {
    const value = 2;
    render(<DataTag label="Test number Label" value={value} />);
    expect(screen.getByText("Test number Label")).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("renders '?' if value is undefined or empty and 'hideOnNullish' is set to false", () => {
    render(
      <DataTag label="Test number Label" value={undefined} hideIf="never" />,
    );
    const dataElement = screen.getByRole("data");

    expect(screen.getByText("?")).toBeInTheDocument();
    expect(dataElement).toHaveAttribute(
      "aria-details",
      "data-tag-textDisabled",
    );
  });

  it("renders an icon if provided", () => {
    render(<DataTag label="Icon Test" value="Test" icon={LucideStar} />);
    expect(screen.getByLabelText("datatag-icon")).toBeInTheDocument();
  });

  it("applies the default aria-details if no indicatorFn is provided", () => {
    render(<DataTag label="Default Color Test" value="Test" />);
    const dataElement = screen.getByRole("data");
    expect(dataElement).toHaveAttribute("aria-details", "data-tag");
  });

  describe("String matching", () => {
    it("applies the correct aria-details for matched string values", () => {
      render(
        <DataTag
          label="String Test"
          value="hello"
          setColourCallback={(value) =>
            value === "hello" ? "success" : "error"
          }
        />,
      );
      const dataElement = screen.getByRole("data");
      expect(dataElement).toHaveAttribute("aria-details", "data-tag-success");
    });

    it("applies the correct aria-details for non-matched string values", () => {
      render(
        <DataTag
          label="String Test"
          value="hi"
          setColourCallback={(value: string) =>
            value === "hello" ? "success" : "error"
          }
        />,
      );
      const dataElement = screen.getByRole("data");
      expect(dataElement).toHaveAttribute("aria-details", "data-tag-error");
    });
  });

  describe("Number matching", () => {
    it("applies the correct aria-details for numeric value success", () => {
      render(
        <DataTag
          label="Number Test"
          value={5}
          setColourCallback={(value) => (value > 0 ? "success" : "error")}
        />,
      );
      const dataElement = screen.getByRole("data");
      expect(dataElement).toHaveAttribute("aria-details", "data-tag-success");
    });

    it("applies the correct aria-details for numeric value error", () => {
      render(
        <DataTag
          label="Number Test"
          value={5}
          setColourCallback={(value) => (value > 10 ? "success" : "error")}
        />,
      );
      const dataElement = screen.getByRole("data");
      expect(dataElement).toHaveAttribute("aria-details", "data-tag-error");
    });

    it("renders an optional provided suffix when using number", () => {
      const value = 2;
      render(<DataTag label="Test" value={value} suffix="s" />);

      expect(screen.getByText("Test")).toBeInTheDocument();
      expect(screen.getByText(`${value}s`)).toBeInTheDocument();
    });

    it("renders numbers converted to fixed decimal places when provided", () => {
      const value = 0.12345678;
      const valueToFixed = value.toFixed(2);

      render(<DataTag label="Test" value={value} toFixed={2} />);

      expect(screen.getByText("Test")).toBeInTheDocument();
      expect(screen.getByText(valueToFixed)).toBeInTheDocument();
    });

    it("should hide data field if value is null or undefined", () => {
      render(
        <DataTag
          label="Test"
          value={undefined}
          toFixed={2}
          hideIf="nullOrUndefined"
        />,
      );

      expect(screen.getByText("Test")).not.toBeVisible();
    });

    it("should hide data field if value is falsy", () => {
      render(<DataTag label="Test" value={0} toFixed={2} hideIf="falsy" />);

      expect(screen.getByText("Test")).not.toBeVisible();
    });
  });

  describe("DataTagGrid Component", () => {
    it("renders a collection of DataTags correctly", () => {
      render(
        <DataTagGrid>
          <DataTag label={"Sensor 1"} value={20} />
          <DataTag label={"Sensor 2"} value={"connected"} />
          <DataTag label={"Sensor 3"} value={156.2356} suffix={"°"} />
          <DataTag label={"Sensor 4"} value={"Active"} />
        </DataTagGrid>,
      );

      const collection = screen.getByRole("grid");

      expect(collection).toBeInTheDocument();
      expect(screen.getAllByRole("data").length).toEqual(4);

      expect(screen.getByText("Sensor 1")).toBeInTheDocument();
      expect(screen.getByText(/156.2356°/)).toBeInTheDocument();
    });
  });
});
