import { render, screen, waitFor } from "@testing-library/react";
import { it, expect } from "vitest";
import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import { useEffect } from "react";

import { DiamondDSTheme } from "./DiamondDSTheme";

export function TestComponent({ set }: { set: "dark" | "light" }) {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    setMode(set);
  }, [set, setMode]);

  return <div data-testid="mode">{mode}</div>;
}

it("switches to dark mode", async () => {
  render(
    <ThemeProvider theme={DiamondDSTheme} defaultMode="light">
      <TestComponent set="dark" />
    </ThemeProvider>,
  );

  await waitFor(() => {
    expect(screen.getByTestId("mode").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-mode")).toBe("dark");
  });
});

it("switches to light mode", async () => {
  render(
    <ThemeProvider theme={DiamondDSTheme} defaultMode="dark">
      <TestComponent set="light" />
    </ThemeProvider>,
  );

  await waitFor(() => {
    expect(screen.getByTestId("mode").textContent).toBe("light");
    expect(document.documentElement.getAttribute("data-mode")).toBe("light");
  });
});
