import { screen } from "@testing-library/react";
import {
  Alert,
  Autocomplete,
  Dialog,
  Drawer,
  Menu,
  Paper,
  TextField,
} from "@mui/material";

import { renderWithProviders } from "../__test-utils__/helpers";

/**
 * Renders real components, unlike DiamondDSTheme.test.ts's isolated
 * override-function checks, so a cascade-order regression actually fails.
 */
describe("DiamondDSTheme elevation rendering", () => {
  it("sets tonal tint as background colour on elevation", () => {
    renderWithProviders(
      <Paper data-testid="paper" elevation={4}>
        content
      </Paper>,
    );

    const paper = screen.getByTestId("paper");
    expect(window.getComputedStyle(paper).backgroundColor).toBe(
      "var(--ds-elevation-4)",
    );
  });

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

  it("renders Dialog's Paper at elevation 16, overriding MUI's built-in 24", () => {
    renderWithProviders(
      <Dialog open>
        <div>content</div>
      </Dialog>,
    );

    const paper = document.querySelector(".MuiDialog-paper");
    expect(paper).not.toBeNull();
    expect(window.getComputedStyle(paper as Element).backgroundColor).toBe(
      "var(--ds-elevation-16)",
    );
  });

  it("keeps elevation 16 alongside a consumer's own slotProps.paper", () => {
    renderWithProviders(
      <Dialog open slotProps={{ paper: { className: "consumer-class" } }}>
        <div>content</div>
      </Dialog>,
    );

    const paper = document.querySelector(".MuiDialog-paper");
    expect(paper?.className).toContain("consumer-class");
    expect(paper?.className).toContain("MuiPaper-elevation16");
  });

  it("renders a temporary Drawer's Paper at elevation 4, below Dialog and Menu/Select/Popover", () => {
    renderWithProviders(
      <Drawer open variant="temporary">
        <div>content</div>
      </Drawer>,
    );

    const paper = document.querySelector(".MuiDrawer-paper");
    expect(paper).not.toBeNull();
    expect(window.getComputedStyle(paper as Element).backgroundColor).toBe(
      "var(--ds-elevation-4)",
    );
  });

  it("keeps a Menu opened over a Dialog at a distinct, lighter tone (8 vs 16)", () => {
    const anchorEl = document.createElement("div");
    document.body.appendChild(anchorEl);

    renderWithProviders(
      <>
        <Dialog open>
          <div>content</div>
        </Dialog>
        <Menu open anchorEl={anchorEl}>
          <div>item</div>
        </Menu>
      </>,
    );

    const dialogPaper = document.querySelector(".MuiDialog-paper");
    const menuPaper = document.querySelector(".MuiMenu-paper");
    expect(
      window.getComputedStyle(dialogPaper as Element).backgroundColor,
    ).toBe("var(--ds-elevation-16)");
    expect(window.getComputedStyle(menuPaper as Element).backgroundColor).toBe(
      "var(--ds-elevation-8)",
    );
  });
});
