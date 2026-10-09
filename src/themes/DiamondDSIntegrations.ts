const overlay = (colour: string) => `linear-gradient(${colour}, ${colour})`;

export const DiamondDSIntegrations = {
  /* Material React Table (MRT) */

  // TODO: mrtTheme/mrtOptions() must currently be spread into every table instance by hand - or it will silently fall back to MRT's unstyled defaults.
  // Consider a wrapper component or useDiamondMaterialReactTable hook that pre-merges these so styling isn't opt-in per table.

  // selectedRowBackgroundColor must stay a literal colour, not var(...) -
  // MRT runs it through MUI's alpha(), which throws on CSS custom properties.
  mrtTheme: {
    baseBackgroundColor: "rgb(var(--ds-surface-channel))",
    draggingBorderColor: "var(--ds-primary)",
    matchHighlightColor: "rgb(var(--ds-warning-channel) / 0.30)",
    menuBackgroundColor: "var(--ds-surface)",
    pinnedRowBackgroundColor: "rgb(var(--ds-primary-channel) / 0.10)",
    selectedRowBackgroundColor: "rgb(var(--ds-primary-channel) / 0.08)",
  },

  // Skeleton rows on first load, a progress bar when refetching existing rows.
  // An empty array counts as no data yet.
  mrtLoadingState(loading: boolean, data?: readonly unknown[]) {
    const hasData = !!data?.length;
    return {
      showSkeletons: loading && !hasData,
      showProgressBars: loading && hasData,
    };
  },

  // Wraps a row/cell/checkbox props callback so it returns nothing while MRT
  // is showing skeleton rows, including via isLoading (their placeholder data
  // would otherwise be styled).
  skipWhileSkeleton<Args extends { table: { getState(): unknown } }, Result>(
    callback: (args: Args) => Result,
  ) {
    return (args: Args): Result | Record<string, never> => {
      const { showSkeletons, isLoading } = args.table.getState() as {
        showSkeletons?: boolean;
        isLoading?: boolean;
      };
      return showSkeletons || isLoading ? {} : callback(args);
    };
  },

  // Row sx that tints a row with an intent's subtle container colour (never the
  // solid one), so it follows dark mode. Spread it into a row's sx after
  // mrtOptions()' row sx, so it overrides MRT's own overlay keys.
  mrtRowIntent(
    intent: "primary" | "secondary" | "info" | "success" | "warning" | "error",
  ) {
    const token = intent === "error" ? "danger" : intent;
    return {
      "& td": { backgroundColor: `var(--ds-${token}-container)` },
      // MRT's own hover/selected overlays (td:after) would stack with the layers
      // below, so hide them on tinted rows and draw the states over the tint,
      // as the plain table does.
      "& td:after": { display: "none" },
      "&:hover td:after": { display: "none" },
      "&.Mui-selected:hover td:after": { display: "none" },
      "&.Mui-selected td": {
        backgroundImage: overlay("rgb(var(--ds-primary-channel) / 0.08)"),
      },
      "&:hover td": { backgroundImage: overlay("var(--ds-overlay-hover)") },
      "&.Mui-selected:hover td": {
        backgroundImage: overlay("rgb(var(--ds-primary-channel) / 0.12)"),
      },
    };
  },

  // fullWidth drops the border/radius for tables with no surrounding container.
  mrtOptions(options?: { fullWidth?: boolean }) {
    const headCellBackgroundColor = "var(--ds-surface-container)";
    const { fullWidth = false } = options ?? {};

    return {
      // muiTableContainerProps overrides MuiTableContainer's themed
      // border/radius per-instance; Paper's radius must still match it below
      // (Paper clips its content, so a mismatch cuts the container's corners
      // off flat).
      muiTableContainerProps: fullWidth
        ? { sx: { border: "none", borderRadius: 0 } }
        : undefined,
      // Recentres the auto-generated selection checkbox; its header cell
      // otherwise gets vertical-align: top with 0 bottom padding.
      displayColumnDefOptions: {
        "mrt-row-select": {
          muiTableHeadCellProps: {
            sx: {
              backgroundColor: headCellBackgroundColor,
              paddingTop: "8px",
              paddingBottom: "8px",
              verticalAlign: "middle",
            },
          },
        },
      },
      muiTableBodyRowProps: {
        hover: true,
        // Matches the plain MUI Table's action.hover / selected+hover
        // (selectedOpacity 0.08 + hoverOpacity 0.04) instead of MRT's own
        // hover derivation.
        sx: {
          "&:hover td:after": {
            backgroundColor: "var(--ds-overlay-hover)",
            content: '""',
            height: "100%",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: -1,
          },
          "&.Mui-selected:hover td:after": {
            backgroundColor: "rgb(var(--ds-primary-channel) / 0.12)",
            content: '""',
            height: "100%",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: -1,
          },
        },
      },
      muiTableHeadCellProps: {
        sx: {
          backgroundColor: headCellBackgroundColor,
        },
      },
      // MRT hardcodes a non-token inset shadow on the bottom toolbar.
      muiBottomToolbarProps: {
        sx: {
          boxShadow: "none",
        },
      },
      muiTablePaperProps: {
        elevation: 0,
        sx: {
          boxShadow: "none",
          // sx's borderRadius multiplies unitless numbers by theme.shape's
          // 4px base, so this must stay a literal to match the 8px above.
          borderRadius: fullWidth ? 0 : "8px",
        },
      },
    };
  },

  // Future:
  // reactFlow(theme) { ... },
  // agGrid(theme) { ... },
};
