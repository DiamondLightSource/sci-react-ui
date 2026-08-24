import { describe, expect, it } from "vitest";
import { DiamondDSIntegrations } from "./DiamondDSIntegrations";

const isLiteralColor = (value: unknown): boolean =>
  typeof value === "string" && !value.trim().startsWith("var(");

describe("DiamondDSIntegrations.mrtTheme", () => {
  it("keeps selectedRowBackgroundColor a literal colour - MRT passes it through alpha() when a row is both selected and hovered, which throws on var(...) strings", () => {
    expect(
      isLiteralColor(DiamondDSIntegrations.mrtTheme.selectedRowBackgroundColor),
    ).toBe(true);
  });
});

describe("DiamondDSIntegrations.mrtOptions", () => {
  it("applies a border and radius by default", () => {
    const options = DiamondDSIntegrations.mrtOptions();

    expect(options.muiTablePaperProps.sx.borderRadius).toBe("8px");
    expect(options.muiTableContainerProps).toBeUndefined();
  });

  it("drops the border and radius when fullWidth is set", () => {
    const options = DiamondDSIntegrations.mrtOptions({ fullWidth: true });

    expect(options.muiTablePaperProps.sx.borderRadius).toBe(0);
    expect(options.muiTableContainerProps).toEqual({
      sx: { border: "none", borderRadius: 0 },
    });
  });

  it("keeps the selection column's header background in sync with the table-level header background", () => {
    const options = DiamondDSIntegrations.mrtOptions();

    const tableLevelBg = options.muiTableHeadCellProps.sx.backgroundColor;
    const selectColumnBg =
      options.displayColumnDefOptions["mrt-row-select"].muiTableHeadCellProps.sx
        .backgroundColor;

    expect(selectColumnBg).toBe(tableLevelBg);
  });

  it("matches the plain MUI Table's hover and selected+hover tokens", () => {
    const { sx } = DiamondDSIntegrations.mrtOptions().muiTableBodyRowProps;

    expect(sx["&:hover td:after"].backgroundColor).toBe(
      "var(--ds-overlay-hover)",
    );
    expect(sx["&.Mui-selected:hover td:after"].backgroundColor).toBe(
      "rgb(var(--ds-primary-channel) / 0.12)",
    );
  });
});
