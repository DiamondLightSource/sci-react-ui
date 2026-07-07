import { describe, expect, it } from "vitest";
import { DiamondDSTheme, createDiamondTheme } from "./DiamondDSTheme";

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const tokensCss = readFileSync(
  resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../styles/diamondDS/DiamondDSTokens.css",
  ),
  "utf8",
);

const getVarNames = (value: unknown): string[] => {
  if (typeof value !== "string") return [];
  return [...value.matchAll(/var\((--[^),\s]+)/g)].map((match) => match[1]);
};

const collectCssVars = (value: unknown): string[] => {
  if (!value || typeof value !== "object") return [];

  return Object.values(value).flatMap((entry) => {
    if (typeof entry === "string") {
      return getVarNames(entry);
    }

    if (typeof entry === "function") {
      return [];
    }

    return collectCssVars(entry);
  });
};

const getCssModeSection = (mode: "light" | "dark"): string => {
  const selector = `:root[data-mode="${mode}"]`;
  const startIndex = tokensCss.indexOf(selector);

  if (startIndex === -1) {
    throw new Error(`Missing ${selector} token section`);
  }

  if (mode === "dark") {
    return tokensCss.slice(startIndex);
  }

  const nextSelector = ':root[data-mode="dark"]';
  const endIndex = tokensCss.indexOf(
    nextSelector,
    startIndex + selector.length,
  );

  if (endIndex === -1) {
    return tokensCss.slice(startIndex);
  }

  return tokensCss.slice(startIndex, endIndex);
};

const getCssVariableValue = (
  css: string,
  variableName: `--ds-${string}`,
): string | undefined => {
  const declarationStart = css.indexOf(`${variableName}:`);

  if (declarationStart === -1) {
    return undefined;
  }

  const valueStart = declarationStart + variableName.length + 1;
  const valueEnd = css.indexOf(";", valueStart);

  if (valueEnd === -1) {
    return undefined;
  }

  return css.slice(valueStart, valueEnd).trim();
};

const hexToRgbChannel = (hex: string): string => {
  const normalized = hex.replace("#", "");

  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);

  return `${red} ${green} ${blue}`;
};

const expectTokenChannel = (
  css: string,
  tokenName: `--ds-${string}`,
  channelName: `--ds-${string}`,
): void => {
  const tokenValue = getCssVariableValue(css, tokenName);
  const channelValue = getCssVariableValue(css, channelName);

  expect(tokenValue).toBeDefined();
  expect(channelValue).toBeDefined();
  expect(channelValue).toBe(hexToRgbChannel(tokenValue as string));
};

const getStyleOverride = <
  TArgs extends Record<string, unknown>,
  TResult extends Record<string, unknown>,
>(
  override: unknown,
  args: TArgs,
): TResult => {
  if (typeof override === "function") {
    return override(args) as TResult;
  }

  return override as TResult;
};

const getColourSchemePalette = (mode: "light" | "dark") => {
  const scheme = DiamondDSTheme.colorSchemes[mode];
  if (!scheme?.palette) {
    throw new Error(`Missing ${mode} colour scheme palette`);
  }
  return scheme.palette;
};

const getReferencedDiamondVars = (): Set<string> =>
  new Set(
    collectCssVars(DiamondDSTheme).filter((variable) =>
      variable.startsWith("--ds-"),
    ),
  );

const getDefinedDiamondVars = (): Set<string> =>
  new Set(
    [...tokensCss.matchAll(/(--ds-[a-zA-Z0-9-]+)\s*:/g)].map(
      (match) => match[1],
    ),
  );

const expectTokenFallback = (
  actual: unknown,
  tokenName: `--ds-${string}`,
): void => {
  expect(getVarNames(actual)).toContain(tokenName);
};

describe("DiamondDSTheme", () => {
  it("returns the same theme from the backwards-compatible factory", () => {
    expect(createDiamondTheme()).toBe(DiamondDSTheme);
    expect(createDiamondTheme("light")).toBe(DiamondDSTheme);
    expect(createDiamondTheme("dark")).toBe(DiamondDSTheme);
  });

  it("uses the DiamondDS data-mode colour scheme selector", () => {
    expect(DiamondDSTheme.colorSchemeSelector).toBe('[data-mode="%s"]');
  });

  it("configures expected component overrides", () => {
    expect(DiamondDSTheme.components).toEqual(
      expect.objectContaining({
        MuiButtonBase: expect.any(Object),
        MuiButton: expect.any(Object),
        MuiIconButton: expect.any(Object),
        MuiToggleButton: expect.any(Object),
        MuiChip: expect.any(Object),
        MuiInputBase: expect.any(Object),
        MuiOutlinedInput: expect.any(Object),
        MuiInputLabel: expect.any(Object),
        MuiAvatar: expect.any(Object),
        MuiTabs: expect.any(Object),
        MuiTab: expect.any(Object),
        MuiAlert: expect.any(Object),
        MuiLinearProgress: expect.any(Object),
        MuiCircularProgress: expect.any(Object),
        MuiSkeleton: expect.any(Object),
        MuiSnackbar: expect.any(Object),
        MuiSnackbarContent: expect.any(Object),
        MuiCheckbox: expect.any(Object),
        MuiRadio: expect.any(Object),
        MuiTableCell: expect.any(Object),
        MuiTableContainer: expect.any(Object),
      }),
    );
  });

  it("configures the DiamondDS font stack", () => {
    expect(DiamondDSTheme.typography.fontFamily).toBe(
      [
        '"Inter Variable"',
        "Inter",
        "system-ui",
        "-apple-system",
        '"Segoe UI"',
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
    );
  });

  it("configures DiamondDS logos", () => {
    expect(DiamondDSTheme.logos?.normal).toEqual(
      expect.objectContaining({
        alt: "Diamond Light Source Logo",
        width: "100",
      }),
    );

    expect(DiamondDSTheme.logos?.short).toEqual(
      expect.objectContaining({
        alt: "Diamond Light Source Logo",
        width: "35",
      }),
    );
  });

  it("maps light semantic palette roles to DiamondDS CSS variables", () => {
    const lightPalette = getColourSchemePalette("light");
    const darkPalette = getColourSchemePalette("dark");

    expect(lightPalette.mode).toBe("light");

    expect(lightPalette.background.default).toBe(
      "rgb(var(--ds-background-channel))",
    );
    expect(lightPalette.background.paper).toBe(
      "rgb(var(--ds-surface-channel))",
    );

    expect(lightPalette.divider).toBe("var(--ds-border-subtle)");
    expect(lightPalette.dividerChannel).toBe("var(--ds-border-subtle-channel)");

    expect(lightPalette.border.subtle).toBe("var(--ds-border-subtle)");
    expect(lightPalette.border.emphasis).toBe("var(--ds-border-emphasis)");
    expect(lightPalette.border.strong).toBe("var(--ds-border-strong)");

    expect(lightPalette.surface.subtle).toBe("var(--ds-surface-container)");
    expect(lightPalette.surface.strong).toBe(
      "var(--ds-surface-container-high)",
    );

    expect(lightPalette.primary.container).toBe("var(--ds-primary-container)");
    expect(lightPalette.primary.solid).toBe("var(--ds-primary-solid)");
    expect(lightPalette.primary.onSolid).toBe("var(--ds-on-primary-solid)");

    expect(lightPalette.error.container).toBe("var(--ds-danger-container)");
    expect(lightPalette.error.solid).toBe("var(--ds-danger-solid)");
    expect(lightPalette.error.onSolid).toBe("var(--ds-on-danger-solid)");

    expect(lightPalette.brand?.fixed).toBe("var(--ds-brand-fixed)");
    expect(lightPalette.brand?.fixedDim).toBe("var(--ds-brand-fixed-dim)");
    expect(lightPalette.brand?.onFixed).toBe("var(--ds-on-brand-fixed)");

    expect(lightPalette.brand?.fixed).toBe(darkPalette.brand?.fixed);

    expect(lightPalette.brand?.fixedDim).toBe(darkPalette.brand?.fixedDim);

    expect(lightPalette.brand?.onFixed).toBe(darkPalette.brand?.onFixed);
  });

  it("maps dark semantic palette roles to DiamondDS CSS variables", () => {
    const darkPalette = getColourSchemePalette("dark");

    expect(darkPalette.mode).toBe("dark");

    expect(darkPalette.background.default).toBe(
      "rgb(var(--ds-background-channel))",
    );
    expect(darkPalette.background.paper).toBe("rgb(var(--ds-surface-channel))");

    expect(darkPalette.divider).toBe("var(--ds-border-subtle)");
    expect(darkPalette.dividerChannel).toBe("var(--ds-border-subtle-channel)");

    expect(darkPalette.border.subtle).toBe("var(--ds-border-subtle)");
    expect(darkPalette.border.emphasis).toBe("var(--ds-border-emphasis)");
    expect(darkPalette.border.strong).toBe("var(--ds-border-strong)");

    expect(darkPalette.surface.subtle).toBe("var(--ds-surface-container)");
    expect(darkPalette.surface.strong).toBe("var(--ds-surface-container-high)");

    expect(darkPalette.primary.container).toBe("var(--ds-primary-container)");
    expect(darkPalette.primary.solid).toBe("var(--ds-primary-solid)");
    expect(darkPalette.primary.onSolid).toBe("var(--ds-on-primary-solid)");

    expect(darkPalette.error.container).toBe("var(--ds-danger-container)");
    expect(darkPalette.error.solid).toBe("var(--ds-danger-solid)");
    expect(darkPalette.error.onSolid).toBe("var(--ds-on-danger-solid)");
  });

  it("maps all supported intent palettes to DiamondDS tokens", () => {
    const palette = getColourSchemePalette("light");

    expect(palette.primary.container).toBe("var(--ds-primary-container)");
    expect(palette.primary.solid).toBe("var(--ds-primary-solid)");

    expect(palette.secondary.container).toBe("var(--ds-secondary-container)");
    expect(palette.secondary.solid).toBe("var(--ds-secondary-solid)");

    expect(palette.warning.container).toBe("var(--ds-warning-container)");
    expect(palette.warning.solid).toBe("var(--ds-warning-solid)");

    expect(palette.success.container).toBe("var(--ds-success-container)");
    expect(palette.success.solid).toBe("var(--ds-success-solid)");

    expect(palette.info.container).toBe("var(--ds-info-container)");
    expect(palette.info.solid).toBe("var(--ds-info-solid)");

    // MUI error maps to DiamondDS danger tokens.
    expect(palette.error.container).toBe("var(--ds-danger-container)");
    expect(palette.error.solid).toBe("var(--ds-danger-solid)");
  });

  it("restricts elevated surface levels to the supported range", () => {
    const lightPalette = getColourSchemePalette("light");
    const surface = lightPalette.surface;

    expect(surface.elevated(-1)).toBe("var(--ds-elevation-0)");
    expect(surface.elevated(0)).toBe("var(--ds-elevation-0)");
    expect(surface.elevated(12)).toBe("var(--ds-elevation-12)");
    expect(surface.elevated(99)).toBe("var(--ds-elevation-24)");
  });
});

describe("DiamondDS component overrides", () => {
  it("configures button base ripple and focus defaults", () => {
    expect(DiamondDSTheme.components?.MuiButtonBase?.defaultProps).toEqual(
      expect.objectContaining({
        disableRipple: false,
        disableTouchRipple: false,
        focusRipple: false,
      }),
    );
  });

  it("configures button focus ripple defaults", () => {
    expect(DiamondDSTheme.components?.MuiButton?.defaultProps).toEqual(
      expect.objectContaining({
        disableFocusRipple: true,
      }),
    );
  });

  it("uses contained button solid roles and disabled token roles", () => {
    const root = DiamondDSTheme.components?.MuiButton?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        variant: "contained",
        color: "primary",
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(styles.backgroundColor, "--ds-primary-solid");
    expectTokenFallback(styles.color, "--ds-on-primary-solid");

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        backgroundColor: "var(--ds-surface-disabled)",
        color: "var(--ds-on-surface-disabled)",
        boxShadow: "none",
      }),
    );
  });

  it("uses outlined button container, foreground and border roles", () => {
    const root = DiamondDSTheme.components?.MuiButton?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        variant: "outlined",
        color: "secondary",
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(styles.color, "--ds-on-secondary-container");
    expectTokenFallback(styles.backgroundColor, "--ds-secondary-container");
    expectTokenFallback(styles.border, "--ds-secondary-accent");

    const hoverStyles = styles["&:hover"] as Record<string, unknown>;

    expectTokenFallback(
      hoverStyles.backgroundColor,
      "--ds-secondary-container",
    );

    expectTokenFallback(hoverStyles.borderColor, "--ds-secondary");

    const activeStyles = styles["&:active"] as Record<string, unknown>;

    expectTokenFallback(
      activeStyles.backgroundColor,
      "--ds-secondary-container",
    );

    expectTokenFallback(activeStyles.borderColor, "--ds-secondary-emphasis");

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        borderColor: "var(--ds-border-subtle)",
        color: "var(--ds-on-surface-disabled)",
      }),
    );
  });

  it("uses text button main and container roles", () => {
    const root = DiamondDSTheme.components?.MuiButton?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        variant: "text",
        color: "info",
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(styles.color, "--ds-info");

    const hoverStyles = styles["&:hover"] as Record<string, unknown>;

    expectTokenFallback(hoverStyles.backgroundColor, "--ds-info-container");

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface-disabled)",
      }),
    );
  });

  it("keeps inherit buttons neutral", () => {
    const root = DiamondDSTheme.components?.MuiButton?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        variant: "contained",
        color: "inherit",
      },
      theme: DiamondDSTheme,
    });

    expect(styles).not.toHaveProperty("backgroundColor");
    expect(styles).not.toHaveProperty("color");
    expect(styles).toHaveProperty("&.Mui-focusVisible");
  });

  it("keeps default icon buttons neutral", () => {
    const root = DiamondDSTheme.components?.MuiIconButton?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "default",
      },
      theme: DiamondDSTheme,
    });

    expect(styles).not.toHaveProperty("color");

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface-disabled)",
        backgroundColor: "transparent",
        boxShadow: "none",
      }),
    );

    expect(styles).toHaveProperty("&.Mui-focusVisible");
  });

  it("uses intent roles for coloured icon buttons", () => {
    const root = DiamondDSTheme.components?.MuiIconButton?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "error",
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(styles.color, "--ds-danger");

    const hoverStyles = styles["&:hover"] as Record<string, unknown>;

    expectTokenFallback(hoverStyles.backgroundColor, "--ds-danger-container");

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface-disabled)",
        backgroundColor: "transparent",
        boxShadow: "none",
      }),
    );
  });

  it("uses semantic roles for toggle button borders and selected state", () => {
    const root =
      DiamondDSTheme.components?.MuiToggleButton?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      theme: DiamondDSTheme,
    });

    expect(styles.textTransform).toBe("none");
    expect(styles.border).toBe("1px solid var(--ds-border-emphasis)");

    expect(styles["&:hover"]).toEqual(
      expect.objectContaining({
        borderColor: "var(--ds-border-strong)",
      }),
    );

    expect(styles["&.Mui-selected"]).toEqual(
      expect.objectContaining({
        backgroundColor: "var(--ds-primary-container)",
        color: "var(--ds-on-primary-container)",
        borderColor: "var(--ds-primary-accent)",
      }),
    );

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface-disabled)",
        borderColor: "var(--ds-border-subtle)",
      }),
    );
  });

  it("uses neutral roles for default chips", () => {
    const root = DiamondDSTheme.components?.MuiChip?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "default",
        clickable: false,
      },
      theme: DiamondDSTheme,
    });

    expect(styles.color).toBe("var(--ds-on-surface)");
    expect(styles.backgroundColor).toBe("var(--ds-surface-container-high)");
    expect(styles.borderColor).toBe("var(--ds-border-emphasis)");
  });

  it("adds interactive states for clickable default chips", () => {
    const root = DiamondDSTheme.components?.MuiChip?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "default",
        clickable: true,
      },
      theme: DiamondDSTheme,
    });

    expect(styles).toHaveProperty("&.Mui-focusVisible");
    expect(styles["&:hover"]).toEqual(
      expect.objectContaining({
        backgroundColor: "var(--ds-surface-container-high)",
      }),
    );
  });

  it("uses outlined intent roles for outlined chips", () => {
    const root = DiamondDSTheme.components?.MuiChip?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "warning",
        variant: "outlined",
        clickable: true,
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(styles.color, "--ds-on-warning-container");
    expectTokenFallback(styles.borderColor, "--ds-warning-accent");
    expectTokenFallback(styles.backgroundColor, "--ds-warning-container");
    expect(styles).toHaveProperty("&.Mui-focusVisible");
  });

  it("uses solid roles for filled intent chips", () => {
    const root = DiamondDSTheme.components?.MuiChip?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "success",
        variant: "filled",
        clickable: true,
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(styles.color, "--ds-on-success-solid");
    expectTokenFallback(styles.backgroundColor, "--ds-success-solid");
    expect(styles).toHaveProperty("&.Mui-focusVisible");
  });

  it("maps input placeholder states to semantic text roles", () => {
    const input =
      DiamondDSTheme.components?.MuiInputBase?.styleOverrides?.input;

    const styles = getStyleOverride(input, {
      theme: DiamondDSTheme,
    });

    expect(styles["&::placeholder"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-placeholder)",
        opacity: 1,
      }),
    );

    expect(styles["&:focus::placeholder"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-placeholder-focus)",
      }),
    );
  });

  it("keeps input error and disabled placeholder states dominant", () => {
    const root = DiamondDSTheme.components?.MuiInputBase?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      theme: DiamondDSTheme,
    });

    expect(
      styles[
        "&.Mui-error input::placeholder, &.Mui-error input::-webkit-input-placeholder, &.Mui-error input::-moz-placeholder"
      ],
    ).toEqual(
      expect.objectContaining({
        color: "var(--ds-danger-accent)",
        opacity: 1,
      }),
    );

    expect(
      styles[
        "&.Mui-disabled input::placeholder, &.Mui-disabled input::-webkit-input-placeholder, &.Mui-disabled input::-moz-placeholder"
      ],
    ).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface-disabled)",
        opacity: 1,
      }),
    );
  });

  it("uses outlined input border roles for default, hover, focus, error and disabled states", () => {
    const root =
      DiamondDSTheme.components?.MuiOutlinedInput?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "primary",
      },
      theme: DiamondDSTheme,
    });

    expect(styles["& .MuiOutlinedInput-notchedOutline"]).toEqual(
      expect.objectContaining({
        borderColor: "var(--ds-border-emphasis)",
      }),
    );

    expect(
      styles[
        "&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline"
      ],
    ).toEqual(
      expect.objectContaining({
        borderColor: "var(--ds-border-strong)",
      }),
    );

    const focusedStyles = styles[
      "&.Mui-focused:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline"
    ] as Record<string, unknown>;

    expectTokenFallback(focusedStyles.borderColor, "--ds-primary-accent");

    expect(focusedStyles.borderWidth).toBe(2);

    const errorStyles = styles[
      "&.Mui-error .MuiOutlinedInput-notchedOutline"
    ] as Record<string, unknown>;

    expectTokenFallback(errorStyles.borderColor, "--ds-danger-accent");

    expect(styles["&.Mui-disabled .MuiOutlinedInput-notchedOutline"]).toEqual(
      expect.objectContaining({
        borderColor: "var(--ds-border-subtle)",
      }),
    );

    expect(
      styles["&:has(input[readonly]) .MuiOutlinedInput-notchedOutline"],
    ).toEqual(
      expect.objectContaining({
        borderColor: "var(--ds-border-subtle)",
      }),
    );
  });

  it("maps input label states to semantic colours", () => {
    const root = DiamondDSTheme.components?.MuiInputLabel?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      theme: DiamondDSTheme,
    });

    expect(styles["&:not(.MuiInputLabel-shrink)"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface-variant)",
      }),
    );

    expect(styles["&.Mui-focused"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-primary)",
      }),
    );

    expect(styles["&.Mui-focused.MuiFormLabel-colorError"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-danger)",
      }),
    );

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface-disabled)",
      }),
    );
  });

  it("uses semantic surface and foreground roles for avatars", () => {
    const root = DiamondDSTheme.components?.MuiAvatar?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      theme: DiamondDSTheme,
    });

    const fallbackStyles = styles["&:has(.MuiAvatar-fallback)"] as Record<
      string,
      unknown
    >;

    expect(fallbackStyles.backgroundColor).toBe(
      "var(--ds-surface-container-high)",
    );
    expect(fallbackStyles.color).toBe("var(--ds-on-surface)");
  });

  it("uses semantic roles for tabs", () => {
    const tabsRoot = DiamondDSTheme.components?.MuiTabs?.styleOverrides?.root;
    const tabRoot = DiamondDSTheme.components?.MuiTab?.styleOverrides?.root;

    expect(tabsRoot).toEqual(
      expect.objectContaining({
        minHeight: 44,
      }),
    );

    const styles = getStyleOverride(tabRoot, {
      ownerState: {},
      theme: DiamondDSTheme,
    });

    expect(styles.textTransform).toBe("none");
    expect(styles.color).toBe("var(--ds-on-surface-variant)");

    expect(styles["&:hover"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface)",
      }),
    );

    expect(styles["&.Mui-selected"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-primary)",
        fontWeight: 600,
      }),
    );

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface-disabled)",
      }),
    );
  });

  it("maps filled alerts to solid status roles", () => {
    const root = DiamondDSTheme.components?.MuiAlert?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        severity: "warning",
        variant: "filled",
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(styles.backgroundColor, "--ds-warning-solid");
    expectTokenFallback(styles.color, "--ds-on-warning-solid");
  });

  it("maps outlined alerts to container status roles", () => {
    const root = DiamondDSTheme.components?.MuiAlert?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        severity: "error",
        variant: "outlined",
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(styles.backgroundColor, "--ds-danger-container");
    expectTokenFallback(styles.color, "--ds-on-danger-container");
    expectTokenFallback(styles.border, "--ds-danger-accent");
  });

  it("maps standard alerts to container roles with neutral border", () => {
    const root = DiamondDSTheme.components?.MuiAlert?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        severity: "info",
        variant: "standard",
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(styles.backgroundColor, "--ds-info-container");
    expectTokenFallback(styles.color, "--ds-on-info-container");
    expect(styles.border).toBe("1px solid var(--ds-border-subtle)");
  });

  it("uses progress main roles rather than solid roles", () => {
    const linearBar =
      DiamondDSTheme.components?.MuiLinearProgress?.styleOverrides?.bar;

    const circularRoot =
      DiamondDSTheme.components?.MuiCircularProgress?.styleOverrides?.root;

    const linearStyles = getStyleOverride(linearBar, {
      ownerState: {
        color: "success",
      },
      theme: DiamondDSTheme,
    });

    const circularStyles = getStyleOverride(circularRoot, {
      ownerState: {
        color: "warning",
      },
      theme: DiamondDSTheme,
    });

    expectTokenFallback(linearStyles.backgroundColor, "--ds-success");
    expectTokenFallback(circularStyles.color, "--ds-warning");
  });

  it("uses semantic loading surface roles for skeletons", () => {
    const root = DiamondDSTheme.components?.MuiSkeleton?.styleOverrides?.root;
    const wave = DiamondDSTheme.components?.MuiSkeleton?.styleOverrides?.wave;

    expect(root).toEqual(
      expect.objectContaining({
        backgroundColor: "var(--ds-surface-container-high)",
      }),
    );

    expect(wave).toEqual(
      expect.objectContaining({
        backgroundColor: "var(--ds-surface-container-high)",
        position: "relative",
        overflow: "hidden",
      }),
    );

    expect((wave as Record<string, unknown>)["&::after"]).toEqual(
      expect.objectContaining({
        backgroundImage:
          "linear-gradient(90deg, transparent, var(--ds-overlay-hover), transparent)",
      }),
    );
  });

  it("constrains snackbar content width", () => {
    const root = DiamondDSTheme.components?.MuiSnackbar?.styleOverrides?.root;

    expect(root).toEqual(
      expect.objectContaining({
        "& .MuiSnackbarContent-root, & .MuiAlert-root": expect.objectContaining(
          {
            minWidth: 320,
            maxWidth: 560,
          },
        ),
      }),
    );
  });

  it("uses semantic surface, foreground and border roles for snackbar content", () => {
    const root =
      DiamondDSTheme.components?.MuiSnackbarContent?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      theme: DiamondDSTheme,
    });

    expect(styles.backgroundColor).toBe("var(--ds-surface-container)");
    expect(styles.color).toBe("var(--ds-on-surface)");
    expect(styles.border).toBe("1px solid var(--ds-border-subtle)");
    expect(styles.borderRadius).toBe(8);
  });

  it("uses default and checked roles for checkboxes", () => {
    const root = DiamondDSTheme.components?.MuiCheckbox?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "primary",
      },
      theme: DiamondDSTheme,
    });

    expect(styles.color).toBe("var(--ds-on-surface-variant)");
    expect(styles.borderRadius).toBe(8);

    const checkedStyles = styles["&.Mui-checked"] as Record<string, unknown>;

    expectTokenFallback(checkedStyles.color, "--ds-primary");

    const indeterminateStyles = styles["&.MuiCheckbox-indeterminate"] as Record<
      string,
      unknown
    >;

    expectTokenFallback(indeterminateStyles.color, "--ds-primary");

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-action-disabled)",
      }),
    );
  });

  it("disables ripple for checkbox and radio controls", () => {
    expect(DiamondDSTheme.components?.MuiCheckbox?.defaultProps).toEqual(
      expect.objectContaining({
        disableRipple: true,
      }),
    );

    expect(DiamondDSTheme.components?.MuiRadio?.defaultProps).toEqual(
      expect.objectContaining({
        disableRipple: true,
      }),
    );
  });

  it("keeps default checked checkboxes neutral", () => {
    const root = DiamondDSTheme.components?.MuiCheckbox?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "default",
      },
      theme: DiamondDSTheme,
    });

    expect(styles["&.Mui-checked"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface)",
      }),
    );
  });

  it("uses default and checked roles for radios", () => {
    const root = DiamondDSTheme.components?.MuiRadio?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "secondary",
      },
      theme: DiamondDSTheme,
    });

    expect(styles.color).toBe("var(--ds-on-surface-variant)");
    expect(styles.borderRadius).toBe("50%");

    const checkedStyles = styles["&.Mui-checked"] as Record<string, unknown>;

    expectTokenFallback(checkedStyles.color, "--ds-secondary");

    expect(styles["&.Mui-disabled"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-action-disabled)",
      }),
    );
  });

  it("keeps default checked radios neutral", () => {
    const root = DiamondDSTheme.components?.MuiRadio?.styleOverrides?.root;

    const styles = getStyleOverride(root, {
      ownerState: {
        color: "default",
      },
      theme: DiamondDSTheme,
    });

    expect(styles["&.Mui-checked"]).toEqual(
      expect.objectContaining({
        color: "var(--ds-on-surface)",
      }),
    );
  });

  it("uses semantic roles for table surfaces and borders", () => {
    const tableCellHead =
      DiamondDSTheme.components?.MuiTableCell?.styleOverrides?.head;
    const tableCellStickyHeader =
      DiamondDSTheme.components?.MuiTableCell?.styleOverrides?.stickyHeader;
    const tableContainerRoot =
      DiamondDSTheme.components?.MuiTableContainer?.styleOverrides?.root;

    expect(tableCellHead).toEqual(
      expect.objectContaining({
        backgroundColor: "var(--ds-surface-container)",
      }),
    );

    expect(tableCellStickyHeader).toEqual(
      expect.objectContaining({
        backgroundColor: "var(--ds-surface-container)",
        borderBottom: "1px solid var(--ds-border-emphasis)",
      }),
    );

    expect(tableContainerRoot).toEqual(
      expect.objectContaining({
        backgroundColor: "var(--ds-surface)",
        boxShadow: "none",
      }),
    );
  });
});

describe("DiamondDS tokens", () => {
  it("defines every DiamondDS CSS variable referenced by the theme", () => {
    const referencedVars = getReferencedDiamondVars();
    const definedVars = getDefinedDiamondVars();

    const missingVars = [...referencedVars].filter(
      (variable) => !definedVars.has(variable),
    );

    expect(missingVars).toEqual([]);
  });

  it("does not reference the removed generic border token", () => {
    const referencedVars = getReferencedDiamondVars();

    expect(referencedVars).not.toContain("--ds-border");
  });

  it("defines required border variables", () => {
    expect(tokensCss).toContain("--ds-border-subtle:");
    expect(tokensCss).toContain("--ds-border-emphasis:");
    expect(tokensCss).toContain("--ds-border-strong:");
  });

  it("defines required border variables in both light and dark token sections", () => {
    const borderSubtleMatches = tokensCss.match(/--ds-border-subtle:/g) ?? [];
    const borderEmphasisMatches =
      tokensCss.match(/--ds-border-emphasis:/g) ?? [];
    const borderStrongMatches = tokensCss.match(/--ds-border-strong:/g) ?? [];

    expect(borderSubtleMatches).toHaveLength(2);
    expect(borderEmphasisMatches).toHaveLength(2);
    expect(borderStrongMatches).toHaveLength(2);
  });

  it("defines light and dark data-mode token sections", () => {
    expect(tokensCss).toContain(':root[data-mode="light"]');
    expect(tokensCss).toContain(':root[data-mode="dark"]');
  });

  it("defines required neutral surface variables", () => {
    expect(tokensCss).toContain("--ds-background-channel:");
    expect(tokensCss).toContain("--ds-surface-channel:");
    expect(tokensCss).toContain("--ds-surface-container:");
    expect(tokensCss).toContain("--ds-surface-container-high:");
    expect(tokensCss).toContain("--ds-surface-disabled:");
  });

  it("defines required foreground and disabled variables", () => {
    expect(tokensCss).toContain("--ds-on-surface:");
    expect(tokensCss).toContain("--ds-on-surface-variant:");
    expect(tokensCss).toContain("--ds-on-surface-subtle:");
    expect(tokensCss).toContain("--ds-on-surface-muted:");
    expect(tokensCss).toContain("--ds-on-surface-disabled:");
    expect(tokensCss).toContain("--ds-action-disabled:");
    expect(tokensCss).toContain("--ds-on-solid:");
  });

  it("defines required interaction overlay variables", () => {
    expect(tokensCss).toContain("--ds-overlay-hover:");
    expect(tokensCss).toContain("--ds-overlay-hover-solid:");
    expect(tokensCss).toContain("--ds-overlay-selected:");
    expect(tokensCss).toContain("--ds-overlay-selected-channel:");
    expect(tokensCss).toContain("--ds-overlay-focus:");
  });

  it("defines required focus ring variables", () => {
    expect(tokensCss).toContain("--ds-focus-ring:");
    expect(tokensCss).toContain("--ds-focus-ring-width:");
    expect(tokensCss).toContain("--ds-focus-ring-offset:");
  });
  it("keeps hex colour channels in sync with their source tokens", () => {
    const channelPairs: Array<{
      source: `--ds-${string}`;
      channel: `--ds-${string}`;
    }> = [
      { source: "--ds-background", channel: "--ds-background-channel" },
      { source: "--ds-surface", channel: "--ds-surface-channel" },
      { source: "--ds-on-surface", channel: "--ds-on-surface-channel" },
      {
        source: "--ds-on-surface-variant",
        channel: "--ds-on-surface-variant-channel",
      },
      {
        source: "--ds-border-subtle",
        channel: "--ds-border-subtle-channel",
      },

      { source: "--ds-on-primary", channel: "--ds-on-primary-channel" },
      { source: "--ds-primary", channel: "--ds-primary-channel" },
      { source: "--ds-primary-accent", channel: "--ds-primary-accent-channel" },
      {
        source: "--ds-primary-emphasis",
        channel: "--ds-primary-emphasis-channel",
      },

      { source: "--ds-on-secondary", channel: "--ds-on-secondary-channel" },
      { source: "--ds-secondary", channel: "--ds-secondary-channel" },
      {
        source: "--ds-secondary-accent",
        channel: "--ds-secondary-accent-channel",
      },
      {
        source: "--ds-secondary-emphasis",
        channel: "--ds-secondary-emphasis-channel",
      },

      { source: "--ds-on-tertiary", channel: "--ds-on-tertiary-channel" },
      { source: "--ds-tertiary", channel: "--ds-tertiary-channel" },
      {
        source: "--ds-tertiary-accent",
        channel: "--ds-tertiary-accent-channel",
      },
      {
        source: "--ds-tertiary-emphasis",
        channel: "--ds-tertiary-emphasis-channel",
      },

      { source: "--ds-on-brand", channel: "--ds-on-brand-channel" },
      { source: "--ds-brand", channel: "--ds-brand-channel" },
      { source: "--ds-brand-accent", channel: "--ds-brand-accent-channel" },
      { source: "--ds-brand-emphasis", channel: "--ds-brand-emphasis-channel" },

      { source: "--ds-on-danger", channel: "--ds-on-danger-channel" },
      { source: "--ds-danger", channel: "--ds-danger-channel" },
      { source: "--ds-danger-accent", channel: "--ds-danger-accent-channel" },
      {
        source: "--ds-danger-emphasis",
        channel: "--ds-danger-emphasis-channel",
      },

      { source: "--ds-on-warning", channel: "--ds-on-warning-channel" },
      { source: "--ds-warning", channel: "--ds-warning-channel" },
      { source: "--ds-warning-accent", channel: "--ds-warning-accent-channel" },
      {
        source: "--ds-warning-emphasis",
        channel: "--ds-warning-emphasis-channel",
      },

      { source: "--ds-on-success", channel: "--ds-on-success-channel" },
      { source: "--ds-success", channel: "--ds-success-channel" },
      { source: "--ds-success-accent", channel: "--ds-success-accent-channel" },
      {
        source: "--ds-success-emphasis",
        channel: "--ds-success-emphasis-channel",
      },

      { source: "--ds-on-info", channel: "--ds-on-info-channel" },
      { source: "--ds-info", channel: "--ds-info-channel" },
      { source: "--ds-info-accent", channel: "--ds-info-accent-channel" },
      { source: "--ds-info-emphasis", channel: "--ds-info-emphasis-channel" },

      { source: "--ds-on-highlight", channel: "--ds-on-highlight-channel" },
      { source: "--ds-highlight", channel: "--ds-highlight-channel" },
      {
        source: "--ds-highlight-accent",
        channel: "--ds-highlight-accent-channel",
      },
      {
        source: "--ds-highlight-emphasis",
        channel: "--ds-highlight-emphasis-channel",
      },
    ];

    for (const mode of ["light", "dark"] as const) {
      const modeSection = getCssModeSection(mode);

      for (const pair of channelPairs) {
        expectTokenChannel(modeSection, pair.source, pair.channel);
      }
    }
  });
});
