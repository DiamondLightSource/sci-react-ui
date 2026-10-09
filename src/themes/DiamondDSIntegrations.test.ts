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

describe("DiamondDSIntegrations.mrtLoadingState", () => {
  it("shows skeletons without data and a progress bar with data", () => {
    const { mrtLoadingState } = DiamondDSIntegrations;

    expect(mrtLoadingState(true, undefined)).toEqual({
      showSkeletons: true,
      showProgressBars: false,
    });
    expect(mrtLoadingState(true, [])).toEqual({
      showSkeletons: true,
      showProgressBars: false,
    });
    expect(mrtLoadingState(true, [1])).toEqual({
      showSkeletons: false,
      showProgressBars: true,
    });
    expect(mrtLoadingState(false, [])).toEqual({
      showSkeletons: false,
      showProgressBars: false,
    });
  });
});

describe("DiamondDSIntegrations.skipWhileSkeleton", () => {
  it("returns no props while skeletons show", () => {
    const wrapped = DiamondDSIntegrations.skipWhileSkeleton(() => ({ a: 1 }));
    const table = (showSkeletons: boolean) => ({
      getState: () => ({ showSkeletons }),
    });

    expect(wrapped({ table: table(true) })).toEqual({});
    expect(wrapped({ table: table(false) })).toEqual({ a: 1 });
    expect(
      wrapped({ table: { getState: () => ({ isLoading: true }) } }),
    ).toEqual({});
  });
});

describe("DiamondDSIntegrations.mrtRowIntent", () => {
  it("tints rows with the intent's container token, mapping error to danger", () => {
    const { mrtRowIntent } = DiamondDSIntegrations;

    expect(mrtRowIntent("warning")["& td"].backgroundColor).toBe(
      "var(--ds-warning-container)",
    );
    expect(
      mrtRowIntent("warning")["&.Mui-selected td"].backgroundImage,
    ).toContain("--ds-primary-channel");
    const merged = {
      ...DiamondDSIntegrations.mrtOptions().muiTableBodyRowProps.sx,
      ...mrtRowIntent("warning"),
    };
    expect(merged["&:hover td:after"]).toEqual({ display: "none" });
    expect(mrtRowIntent("error")["& td"].backgroundColor).toBe(
      "var(--ds-danger-container)",
    );
  });
});
