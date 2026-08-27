import { DataCard } from "./DataCard";
import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { DiamondDSTheme } from "@diamondlightsource/sci-react-ui";
import type { DataColour } from "./palette";
import { type LucideIcon } from "lucide-react";
import { render, RenderResult, screen } from "@testing-library/react";

const renderWithTheme = (children: ReactNode): RenderResult => {
  return render(
    <ThemeProvider theme={DiamondDSTheme}>{children}</ThemeProvider>,
  );
};

describe("DataCard", () => {
  const otherProps = { title: "", colour: "none" as DataColour };
  it("always renders title", () => {
    const title = "Status";
    renderWithTheme(
      <DataCard colour="none" title={title} value={{ value: "4" }} />,
    );
    expect(screen.getByText(title)).toBeVisible();
  });
  describe("with single value", () => {
    const otherProps = { title: "", colour: "none" as DataColour };
    it("shows the value", () => {
      const text = "Ready";
      renderWithTheme(<DataCard value={{ value: text }} {...otherProps} />);
      const value = screen.getByText(text);
      expect(value).toBeInTheDocument();
    });

    it("renders label (with colon) if supplied", () => {
      const label = "Energy";
      const value = "481";
      renderWithTheme(<DataCard value={{ label, value }} {...otherProps} />);

      expect(screen.getByText(label + ":")).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    });

    it("renders suffix if supplied", () => {
      const label = "Energy";
      const value = "481";
      const suffix = "eV";
      renderWithTheme(
        <DataCard value={{ label, value, suffix }} {...otherProps} />,
      );

      expect(screen.getByText(suffix)).toBeInTheDocument();
    });

    it("renders subvalue if supplied", () => {
      const value = "Beam down";
      const sub = {
        label: "Current",
        value: "0",
        suffix: "mA",
      };
      renderWithTheme(
        <DataCard value={{ value }} subvalue={sub} {...otherProps} />,
      );
      expect(screen.getByText(sub.label + ":")).toBeVisible();
      expect(screen.getByText(sub.value)).toBeVisible();
      expect(screen.getByText(sub.suffix)).toBeVisible();
    });

    it("renders an optional icon", () => {
      const Icon: LucideIcon = vi.fn((props) => (
        <svg data-testid="myicon" {...props} />
      )) as unknown as LucideIcon;
      renderWithTheme(
        <DataCard value={{ value: "" }} icon={Icon} {...otherProps} />,
      );
      expect(screen.getByTestId("myicon")).toBeVisible();
    });
  });

  describe("with two values", () => {
    const value1 = {
      label: "Puck",
      value: "4",
    };

    const value2 = {
      label: "Pin",
      value: "6",
    };

    const subvalue = {
      label: "Name",
      value: "AlOX 06",
    };

    it("renders both values stacked by default", () => {
      renderWithTheme(
        <DataCard value1={value1} value2={value2} {...otherProps} />,
      );
      expect(screen.getByText(value1.value)).toBeVisible();
      expect(screen.getByText(value2.value)).toBeVisible();

      // items are not combined:
      expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    });

    it("can combine both values into one line", () => {
      renderWithTheme(
        <DataCard
          value1={value1}
          value2={value2}
          stacked={false}
          {...otherProps}
        />,
      );
      expect(screen.getByText(value1.value)).toBeVisible();
      expect(screen.getByText(value2.value)).toBeVisible();

      // items are combined:
      expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("can render a subvalue, combining both values into one line", () => {
      renderWithTheme(
        <DataCard
          value1={value1}
          value2={value2}
          subvalue={subvalue}
          {...otherProps}
        />,
      );
      // values combined with a separator:
      expect(screen.getByRole("separator")).toBeVisible();

      // subvalue:
      expect(screen.getByText(subvalue.label + ":")).toBeVisible();
      expect(screen.getByText(subvalue.value)).toBeVisible();
    });

    it("ignores stacked=true if subvalue is passed", () => {
      // because combining values is the only way to show subvalue too
      renderWithTheme(
        <DataCard
          value1={value1}
          value2={value2}
          subvalue={subvalue}
          stacked={false} // ignored because subvalue given
          {...otherProps}
        />,
      );

      expect(screen.getByRole("separator")).toBeVisible();
    });
  });
});
