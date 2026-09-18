import { screen } from "@testing-library/react";
import { Alert, Autocomplete, Paper, TextField } from "@mui/material";

import { renderWithProviders } from "../__test-utils__/helpers";

/**
 * Renders real components, unlike DiamondDSTheme.test.ts's isolated
 * override-function checks, so a cascade-order regression actually fails.
 */
describe("DiamondDSTheme elevation rendering", () => {
  it("lets a consumer sx background win over the tonal elevation tint", () => {
    renderWithProviders(
      <Paper
        data-testid="paper"
        elevation={4}
        sx={{ bgcolor: "rgb(255, 0, 0)" }}
      >
        content
      </Paper>,
    );

    const paper = screen.getByTestId("paper");
    expect(window.getComputedStyle(paper).backgroundColor).toBe(
      "rgb(255, 0, 0)",
    );
  });

  it("keeps Alert's own severity background at elevation 0", () => {
    renderWithProviders(<Alert severity="error">alert</Alert>);

    const alert = screen.getByRole("alert");
    expect(window.getComputedStyle(alert).backgroundColor).toBe(
      "var(--ds-danger-container)",
    );
  });

  it("lets Autocomplete's own elevation-8 listbox background win over MuiPaper's elevation-1 default", () => {
    renderWithProviders(
      <Autocomplete
        open
        disablePortal
        options={["Alpha", "Beta"]}
        renderInput={(params) => <TextField {...params} label="options" />}
      />,
    );

    const listbox = document.querySelector(".MuiAutocomplete-paper");
    expect(listbox).not.toBeNull();
    expect(window.getComputedStyle(listbox as Element).backgroundColor).toBe(
      "var(--ds-elevation-8)",
    );
  });
});
