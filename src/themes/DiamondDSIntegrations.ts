export const DiamondDSIntegrations = {
  /* Material React Table (MRT) */
  mrt() {
    return {
      baseBackgroundColor: "rgb(var(--ds-surface-channel))",
      draggingBorderColor: "var(--ds-primary)",
      // matchHighlightColor: "rgb(var(--ds-warning-mainChannel) / 0.30)",
      menuBackgroundColor: "var(--ds-surface)",
      pinnedRowBackgroundColor: "rgb(var(--ds-primary-mainChannel) / 0.10)",
      selectedRowBackgroundColor: "rgb(var(--ds-primary-mainChannel) / 0.20)",
    };
  },

  mrtOptions() {
    return {
      muiTableHeadCellProps: {
        sx: {
          backgroundColor: "var(--ds-surface-container)",
        },
      },
      muiTablePaperProps: {
        elevation: 0,
        sx: {
          boxShadow: "none",
          borderRadius: 1,
          border: "1px solid var(--ds-border-subtle)",
        },
      },
    };
  },

  // Future:
  // reactFlow(theme) { ... },
  // agGrid(theme) { ... },
};
