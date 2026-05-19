/**
 * DiamondDS MUI theme
 *
 * This theme keeps DiamondDS colour and component behaviour inside MUI.
 * This may be a temporary solution while we build out the design system and component library.
 *
 * DiamondDS colour mode
 * ---------------------
 * The active colour scheme is exposed through:
 *
 * - html[data-mode="light"]
 * - html[data-mode="dark"]
 *
 * Design convention
 * -----------------
 * DiamondDS keeps the native MUI palette API intact:
 *
 * - `light` is a lighter variant of `main`, used as an accent, highlight or focus colour
 * - `main` is the default colour for the intent, mainly for text and icons
 * - `dark` is a deeper variant of `main`, as an emphasis or hover colour when `main` is too light
 * - `contrastText` is readable text/icon colour on `main`
 *
 * DiamondDS adds Material-style semantic roles alongside the native MUI fields:
 *
 * - `container` / `onContainer` for tonal surfaces, subtle fills and status backgrounds
 * - `solid` / `onSolid` for stable filled controls where the colour should not
 *   shift between light and dark mode as much as `main` does
 *
 * We intentionally avoid extra palette scale fields. When components need
 * stronger emphasis, focus treatment or selected states, they should use the
 * semantic role that best matches the UI behaviour rather than inventing
 * additional colour steps.
 *
 * Practical guidance
 * ------------------
 * - Use MUI fields when working with standard MUI APIs.
 * - Use `container` / `onContainer` for tonal Button, Alert, Chip and selection surfaces.
 * - Use `solid` / `onSolid` for filled controls that need stable, high-emphasis colour.
 * - Disabled and error states should always win over hover, focus and selected states.
 * - Brand is an identity colour, not a status or action intent.
 */

// Enables `theme.vars` typings for MUI CSS variable themes.
import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme } from "@mui/material/styles";
import type { CSSObject, Theme } from "@mui/material/styles";

/**
 * Component prop types are used to type `ownerState` inside MUI style overrides.
 */
import type { AlertProps } from "@mui/material/Alert";
import type { ButtonProps } from "@mui/material/Button";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { ChipProps } from "@mui/material/Chip";
import type { CircularProgressProps } from "@mui/material/CircularProgress";
import type { LinearProgressProps } from "@mui/material/LinearProgress";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import type { RadioProps } from "@mui/material/Radio";
import type { TabProps } from "@mui/material/Tab";

import { mergeThemeOptions } from "./ThemeManager";

import logoImageLight from "../public/diamond/logo-light.svg";
import logoImageDark from "../public/diamond/logo-dark.svg";
import logoShort from "../public/diamond/logo-short.svg";

type OverrideArgs<OwnerState = unknown> = {
  ownerState: OwnerState;
  theme: Theme;
};

type ThemeOnlyArgs = {
  theme: Theme;
};

const intentColours = [
  "primary",
  "secondary",
  "error",
  "warning",
  "info",
  "success",
] as const;

type IntentColour = (typeof intentColours)[number];

/**
 * Shared structure for DiamondDS intent colours.
 *
 * Native MUI fields stay natural. DiamondDS semantic roles are additive.
 */
type ExtendedPaletteColor = {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
  mainChannel: string;
  lightChannel: string;
  darkChannel: string;
  contrastTextChannel: string;
  container: string;
  onContainer: string;
  solid: string;
  onSolid: string;
};

type BrandPaletteColor = ExtendedPaletteColor & {
  /** Fixed brand roles stay stable across light and dark mode. */
  fixed: string;
  fixedDim: string;
  onFixed: string;
};

type BrandPaletteOptions = Partial<BrandPaletteColor>;
type IntentPaletteRecord = Record<IntentColour, ExtendedPaletteColor>;

type ThemeWithIntentPalette = Theme & {
  vars?: {
    palette?: Partial<Record<IntentColour, Partial<ExtendedPaletteColor>>>;
  };
  palette: Theme["palette"] & IntentPaletteRecord;
};

/**
 * Returns the active runtime palette.
 *
 * In MUI colour-scheme mode, runtime switching is resolved through
 * `theme.vars.palette`. Falling back to `theme.palette` keeps the theme safe
 * in non-CSS-variable environments and tests.
 */
const getPalette = (theme: Theme) =>
  (theme.vars?.palette ?? theme.palette) as ThemeWithIntentPalette["palette"];

declare module "@mui/material/styles" {
  interface PaletteColor {
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
    contrastTextChannel?: string;
    container?: string;
    onContainer?: string;
    solid?: string;
    onSolid?: string;
  }

  interface SimplePaletteColorOptions {
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
    contrastTextChannel?: string;
    container?: string;
    onContainer?: string;
    solid?: string;
    onSolid?: string;
  }

  interface TypeText {
    placeholder?: string;
    placeholderFocus?: string;
    onSolid?: string;
    primaryChannel?: string;
    secondaryChannel?: string;
  }

  interface TypeTextOptions {
    primary?: string;
    secondary?: string;
    disabled?: string;
    placeholder?: string;
    placeholderFocus?: string;
    onSolid?: string;
    primaryChannel?: string;
    secondaryChannel?: string;
  }

  interface TypeAction {
    /** Stronger overlay for solid/filled controls. */
    hoverSolid?: string;
  }

  interface TypeActionOptions {
    /** Stronger overlay for solid/filled controls. */
    hoverSolid?: string;
  }

  interface Palette {
    /** Brand is identity/accent colour, not an intent colour. */
    brand?: BrandPaletteColor;

    border: {
      subtle: string;
      base: string;
      emphasis: string;
    };

    surface: {
      subtle: string;
      strong: string;
      disabled: string;
    };
  }

  interface PaletteOptions {
    brand?: BrandPaletteOptions;

    border?: {
      subtle?: string;
      base?: string;
      emphasis?: string;
    };

    surface?: {
      subtle?: string;
      strong?: string;
      disabled?: string;
    };
  }
}

export type DSMode = "light" | "dark";

const isIntentColour = (colour: unknown): colour is IntentColour =>
  typeof colour === "string" && intentColours.includes(colour as IntentColour);

const getIntentPalette = (
  theme: Theme,
  colour: IntentColour,
): ExtendedPaletteColor => {
  const { vars, palette } = theme as ThemeWithIntentPalette;

  const paletteColour = palette[colour];
  const varsColour = vars?.palette?.[colour];

  if (paletteColour) {
    return {
      ...paletteColour,
      ...varsColour,
    };
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[DiamondDS] getIntentPalette: colour "${colour}" not found. Falling back to primary.`,
    );
  }

  return {
    ...palette.primary,
    ...vars?.palette?.primary,
  };
};

const getIntentFromColourProp = (
  colour: unknown,
  fallback: IntentColour = "primary",
): IntentColour => (isIntentColour(colour) ? colour : fallback);

/**
 * DiamondDS uses one focus treatment across intents.
 *
 * Focus communicates keyboard/navigation state, not status. It therefore uses
 * the primary light value as a calm, consistent focus colour rather than
 * changing the ring colour for every status intent.
 */
const getFocusOutline = (theme: Theme, outlineOffset = "2px"): CSSObject => {
  const palette = getPalette(theme);

  return {
    "&.Mui-focusVisible": {
      outline: "2px solid",
      outlineColor: palette.primary.light,
      outlineOffset,
    },
  };
};

/**
 * Creates an overlay without changing the base colour.
 *
 * This keeps hover/active/selected states predictable across intent colours and
 * avoids manually calculating new colour values for every component state.
 */
const getOverlayInset = (token: string) => `inset 0 0 0 9999px ${token}`;

const getInteractiveSurfaceStateStyles = (
  theme: Theme,
  backgroundColor: string,
  overlay?: string,
): CSSObject => {
  const palette = getPalette(theme);

  return {
    "&:hover": {
      backgroundColor,
      boxShadow: getOverlayInset(overlay ?? palette.action.hover),
    },

    "&:active": {
      backgroundColor,
      boxShadow: getOverlayInset(palette.action.selected),
    },
  };
};

const getDisabledControlStyles = (
  theme: Theme,
  backgroundColor = "transparent",
): CSSObject => {
  const palette = getPalette(theme);

  return {
    opacity: 1,
    backgroundColor,
    color: palette.text.disabled,
    boxShadow: "none",
  } satisfies CSSObject;
};

/**
 * Light mode palette
 *
 * The palette is deliberately organised by purpose:
 * - neutral application roles
 * - interaction roles
 * - semantic intent colours
 * - brand identity
 */
const lightPalette = {
  mode: "light",

  common: {
    black: "#000000",
    white: "#ffffff",
  },

  background: {
    default: "#f6f6f9",
    paper: "#ffffff",
  },

  surface: {
    subtle: "#eef1f5",
    strong: "#e6e9f0",
    disabled: "rgba(0, 0, 0, 0.08)",
  },

  text: {
    primary: "#1a1c23",
    secondary: "#505563",
    disabled: "rgba(0, 0, 0, 0.36)",
    onSolid: "#ffffff",
    placeholder: "#8a90a0",
    placeholderFocus: "#505563",
    primaryChannel: "26 28 35",
    secondaryChannel: "80 85 99",
  },

  divider: "#dde1e8",

  border: {
    subtle: "#dde1e8",
    base: "#bcc2cd",
    emphasis: "#a5acb8",
  },

  action: {
    hover: "rgba(0, 0, 0, 0.08)",
    hoverSolid: "rgba(0, 0, 0, 0.16)",
    selected: "rgba(0, 0, 0, 0.25)",
    focus: "rgba(0, 0, 0, 0.1)",
    disabled: "rgba(0, 0, 0, 0.3)",
    disabledBackground: "rgba(0, 0, 0, 0.08)",
    hoverOpacity: 0.08,
    selectedOpacity: 0.25,
    disabledOpacity: 0.38,
    focusOpacity: 0.1,
  },

  /**
   * Palette role conventions
   * -------------------------
   *
   * light - Accent and focus colour.
   *
   * main - Default text/icon/action colour for the intent.
   *
   * dark - Stronger emphasis colour used when `main` is too light.
   *
   * contrastText - Text/icon colour displayed on `main`.
   *
   * container - Subtle semantic surface for hover, selected and low-emphasis states.
   *
   * onContainer - Text/icon colour displayed on container surfaces.
   *
   * solid - Stable filled-control colour with reduced light/dark mode shifting.
   *
   * onSolid - Text/icon colour displayed on solid surfaces.
   *
   * *Channel values - RGB channels used for overlays, alpha composition and focus styles.
   *
   */

  primary: {
    light: "#6a86e4",
    main: "#2a4db8",
    dark: "#1f3d96",
    contrastText: "#ffffff",

    container: "#e5ebff",
    onContainer: "#1a2f6b",

    solid: "#3f63c9",
    onSolid: "#ffffff",

    mainChannel: "42 77 184",
    lightChannel: "106 134 228",
    darkChannel: "31 61 150",
    contrastTextChannel: "255 255 255",
  },

  secondary: {
    light: "#27adb7",
    main: "#007b84",
    dark: "#005f67",
    contrastText: "#ffffff",

    container: "#ddf3f5",
    onContainer: "#00474d",

    solid: "#0a858e",
    onSolid: "#ffffff",

    mainChannel: "0 123 132",
    lightChannel: "39 173 183",
    darkChannel: "0 95 103",
    contrastTextChannel: "255 255 255",
  },

  success: {
    light: "#2fb344",
    main: "#187a2f",
    dark: "#146125",
    contrastText: "#ffffff",

    container: "#e3f4e7",
    onContainer: "#124d22",

    solid: "#1b8834",
    onSolid: "#ffffff",

    mainChannel: "24 122 47",
    lightChannel: "47 154 73",
    darkChannel: "20 97 37",
    contrastTextChannel: "255 255 255",
  },

  warning: {
    light: "#e98a15",
    main: "#c96a04",
    dark: "#a95703",
    contrastText: "#ffffff",

    container: "#fef0df",
    onContainer: "#6f3200",

    solid: "#e97b12",
    onSolid: "#ffffff",

    mainChannel: "201 106 4",
    lightChannel: "233 138 21",
    darkChannel: "169 87 3",
    contrastTextChannel: "255 255 255",
  },

  error: {
    // Danger
    light: "#d94f45",
    main: "#b42318",
    dark: "#912018",
    contrastText: "#ffffff",

    container: "#fde7e5",
    onContainer: "#6a1b15",

    solid: "#d63c41",
    onSolid: "#ffffff",

    mainChannel: "180 35 24",
    lightChannel: "217 79 69",
    darkChannel: "145 32 24",
    contrastTextChannel: "255 255 255",
  },

  info: {
    light: "#6f8fe8",
    main: "#355ec9",
    dark: "#2a4ea7",
    contrastText: "#ffffff",

    container: "#e9efff",
    onContainer: "#1f3b85",

    solid: "#4d72dd",
    onSolid: "#ffffff",

    mainChannel: "53 94 201",
    lightChannel: "111 143 232",
    darkChannel: "42 78 167",
    contrastTextChannel: "255 255 255",
  },

  brand: {
    light: "#6a86db",
    main: "#202945",
    dark: "#171f35",
    contrastText: "#ffffff",

    container: "#e4e8f4",
    onContainer: "#202945",

    solid: "#2f3b63",
    onSolid: "#ffffff",

    fixed: "#202945",
    fixedDim: "#586084",
    onFixed: "#ffffff",

    mainChannel: "32 41 69",
    lightChannel: "106 134 219",
    darkChannel: "23 31 53",
    contrastTextChannel: "255 255 255",
  },

  grey: {
    50: "#f8f8fa",
    100: "#eef1f5",
    200: "#e6e9f0",
    300: "#dde1e8",
    400: "#bcc2cd",
    500: "#a5acb8",
    600: "#8a90a0",
    700: "#505563",
    800: "#2c3140",
    900: "#1a1c23",
  },
} as const;

/**
 * Dark mode palette
 *
 * The hex values preserve the original DiamondDS token roles.
 *
 * Mapping convention:
 * - accent maps to `light`
 * - main maps to `main`
 * - emphasis maps to `dark`
 *
 * This is semantic rather than strictly visual. In dark mode, `dark` may appear
 * visually lighter than `main` because it represents stronger emphasis.
 */
const darkPalette = {
  mode: "dark",

  common: {
    black: "#000000",
    white: "#ffffff",
  },

  background: {
    default: "#0e1017",
    paper: "#161820",
  },
  surface: {
    subtle: "#222632",
    strong: "#2c3140",
    disabled: "rgba(255, 255, 255, 0.14)",
  },

  text: {
    primary: "#e8eaf0",
    secondary: "#b6bcc9",
    disabled: "rgba(255, 255, 255, 0.36)",
    onSolid: "#ffffff",
    placeholder: "#7c8394",
    placeholderFocus: "#b6bcc9",
    primaryChannel: "232 234 240",
    secondaryChannel: "182 188 201",
  },

  divider: "#3a3f4c",

  border: {
    subtle: "#3a3f4c",
    base: "#505664",
    emphasis: "#7c8394",
  },

  action: {
    hover: "rgba(255, 255, 255, 0.16)",
    hoverSolid: "rgba(255, 255, 255, 0.16)",
    selected: "rgba(255, 255, 255, 0.12)",
    focus: "rgba(255, 255, 255, 0.12)",
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.14)",
    hoverOpacity: 0.16,
    selectedOpacity: 0.12,
    disabledOpacity: 0.38,
    focusOpacity: 0.12,
  },

  primary: {
    light: "#a5bcff",
    main: "#8aa7ff",
    dark: "#c4d4ff",
    contrastText: "#0b1638",

    container: "#1b2c5f",
    onContainer: "#e8eeff",

    solid: "#3f63c9",
    onSolid: "#ffffff",

    mainChannel: "138 167 255",
    lightChannel: "165 188 255",
    darkChannel: "196 212 255",
    contrastTextChannel: "11 22 56",
  },

  secondary: {
    light: "#7be4ea",
    main: "#58d6de",
    dark: "#9af0f3",
    contrastText: "#002529",

    container: "#0d3338",
    onContainer: "#ccf7f9",

    solid: "#0a858e",
    onSolid: "#ffffff",

    mainChannel: "88 214 222",
    lightChannel: "123 228 234",
    darkChannel: "154 240 243",
    contrastTextChannel: "0 37 41",
  },

  success: {
    light: "#8ae5a2",
    main: "#6fd88a",
    dark: "#b3f0c0",
    contrastText: "#08210f",

    container: "#10341a",
    onContainer: "#d2f7da",

    solid: "#23913c",
    onSolid: "#ffffff",

    mainChannel: "111 216 138",
    lightChannel: "138 229 162",
    darkChannel: "179 240 192",
    contrastTextChannel: "8 33 15",
  },

  warning: {
    light: "#ffc68a",
    main: "#ffb067",
    dark: "#ffd9b0",
    contrastText: "#311700",

    container: "#382006",
    onContainer: "#ffe4c8",

    solid: "#f07a13",
    onSolid: "#ffffff",

    mainChannel: "255 176 103",
    lightChannel: "255 198 138",
    darkChannel: "255 217 176",
    contrastTextChannel: "49 23 0",
  },

  error: {
    light: "#ffb0aa",
    main: "#ff9088",
    dark: "#ffc7c2",
    contrastText: "#2f0907",

    container: "#3a1613",
    onContainer: "#ffd9d6",

    solid: "#d63c41",
    onSolid: "#ffffff",

    mainChannel: "255 144 136",
    lightChannel: "255 176 170",
    darkChannel: "255 199 194",
    contrastTextChannel: "47 9 7",
  },

  info: {
    light: "#bccdff",
    main: "#9fb7ff",
    dark: "#d5e0ff",
    contrastText: "#101936",

    container: "#1b2b57",
    onContainer: "#dce4ff",

    solid: "#4d72dd",
    onSolid: "#ffffff",

    mainChannel: "159 183 255",
    lightChannel: "188 205 255",
    darkChannel: "213 224 255",
    contrastTextChannel: "16 25 54",
  },

  brand: {
    light: "#c4d2ff",
    main: "#aabdff",
    dark: "#d7e1ff",
    contrastText: "#0d1530",

    container: "#202945",
    onContainer: "#e3e8f7",

    solid: "#3a4a78",
    onSolid: "#ffffff",

    fixed: "#202945",
    fixedDim: "#586084",
    onFixed: "#ffffff",

    mainChannel: "170 189 255",
    lightChannel: "196 210 255",
    darkChannel: "215 225 255",
    contrastTextChannel: "13 21 48",
  },

  grey: {
    50: "#e8eaf0",
    100: "#b6bcc9",
    200: "#7c8394",
    300: "#505664",
    400: "#3a3f4c",
    500: "#2c3140",
    600: "#222632",
    700: "#161820",
    800: "#0e1017",
  },
} as const;

const colorSchemes = {
  light: {
    palette: lightPalette,
  },
  dark: {
    palette: darkPalette,
  },
} as const;

export const createDiamondTheme = (defaultMode: DSMode = "light"): Theme => {
  const DiamondDSThemeOptions = mergeThemeOptions({
    /**
     * MUI owns light/dark palette resolution.
     * No DiamondDS colour CSS file is imported by this theme.
     */
    cssVariables: {
      colorSchemeSelector: "[data-mode='%s']",
    },

    defaultColorScheme: defaultMode,
    colorSchemes,

    typography: {
      fontFamily: [
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
    },

    logos: {
      normal: {
        src:
          defaultMode === "dark"
            ? (logoImageDark ?? logoImageLight)
            : logoImageLight,
        srcDark: logoImageDark ?? logoImageLight,
        alt: "Diamond Light Source Logo",
        width: "100",
      },
      short: {
        src: logoShort,
        alt: "Diamond Light Source Logo",
        width: "35",
      },
    },

    /**
     * Component overrides
     *
     * Overrides consume the resolved MUI palette only. They avoid raw hex values
     * and avoid external CSS variables so light/dark mode stays fully owned by
     * MUI colour schemes.
     */
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: false,
          disableTouchRipple: false,
          focusRipple: false,
        },
      },

      /**
       * Buttons use `solid` for contained controls and `container` for tonal
       * outlined/text interaction surfaces.
       */
      MuiButton: {
        defaultProps: {
          disableFocusRipple: true,
        },
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: OverrideArgs<ButtonProps>): CSSObject => {
            const base: CSSObject = {
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            };

            const variant = ownerState.variant ?? "text";
            const rawColour = ownerState.color ?? "primary";

            if (rawColour === "inherit") {
              return {
                ...base,
                ...getFocusOutline(theme),
              };
            }

            const colour = getIntentFromColourProp(rawColour);
            const p = getIntentPalette(theme, colour);

            if (variant === "contained") {
              return {
                ...base,
                backgroundColor: p.solid,
                color: p.onSolid,
                ...getInteractiveSurfaceStateStyles(
                  theme,
                  p.solid,
                  getPalette(theme).action.hover,
                ),
                "&.Mui-focusVisible": {
                  outline: "2px solid",
                  outlineColor: getPalette(theme).primary.light,
                  outlineOffset: "2px",
                  boxShadow: getOverlayInset(getPalette(theme).action.focus),
                },
                "&.Mui-disabled": getDisabledControlStyles(
                  theme,
                  getPalette(theme).surface.disabled,
                ),
                "&:hover": {
                  backgroundColor: p.solid,
                  boxShadow: getOverlayInset(
                    getPalette(theme).action.hoverSolid,
                  ),
                },
              };
            }

            if (variant === "outlined") {
              return {
                ...base,
                ...getFocusOutline(theme),
                color: p.onContainer,
                backgroundColor: p.container,
                border: `1px solid ${p.light}`,
                ...getInteractiveSurfaceStateStyles(theme, p.container),
                "&:hover": {
                  backgroundColor: p.container,
                  borderColor: p.main,
                  boxShadow: getOverlayInset(getPalette(theme).action.hover),
                },
                "&:active": {
                  backgroundColor: p.container,
                  borderColor: p.dark,
                  boxShadow: getOverlayInset(getPalette(theme).action.selected),
                },
                "&.Mui-disabled": {
                  ...getDisabledControlStyles(theme),
                  borderColor: getPalette(theme).border.subtle,
                },
              };
            }

            if (variant === "text") {
              return {
                ...base,
                ...getFocusOutline(theme),
                color: p.main,
                "&:hover": {
                  backgroundColor: p.container,
                  boxShadow: getOverlayInset(getPalette(theme).action.hover),
                },
                "&.Mui-disabled": {
                  color: getPalette(theme).text.disabled,
                },
              };
            }

            return {
              ...base,
              ...getFocusOutline(theme),
            };
          },
        },
      },

      MuiIconButton: {
        defaultProps: {
          disableRipple: false,
          disableFocusRipple: true,
        },
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: OverrideArgs<{
            color?: "inherit" | "default" | IntentColour;
          }>): CSSObject => {
            const rawColour = ownerState.color ?? "default";

            if (rawColour === "inherit" || rawColour === "default") {
              return {
                color: getPalette(theme).text.secondary,
                "&:hover": {
                  boxShadow: getOverlayInset(getPalette(theme).action.hover),
                },
                "&.Mui-disabled": {
                  color: getPalette(theme).text.disabled,
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                ...getFocusOutline(theme),
              };
            }

            const colour = getIntentFromColourProp(rawColour);
            const p = getIntentPalette(theme, colour);

            return {
              color: p.main,
              "&:hover": {
                backgroundColor: p.container,
                boxShadow: getOverlayInset(getPalette(theme).action.hover),
              },
              "&.Mui-disabled": {
                color: getPalette(theme).text.disabled,
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              ...getFocusOutline(theme),
            };
          },
        },
      },

      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme }: ThemeOnlyArgs): CSSObject => ({
            textTransform: "none",
            border: `1px solid ${getPalette(theme).border.base}`,

            "&:hover": {
              borderColor: getPalette(theme).border.emphasis,
            },

            "&.Mui-selected": {
              backgroundColor: getPalette(theme).primary.container,
              color: getPalette(theme).primary.onContainer,
              borderColor: getPalette(theme).primary.light,
            },

            "&.Mui-selected:hover": {
              backgroundColor: getPalette(theme).primary.container,
              borderColor: getPalette(theme).primary.main,
              boxShadow: getOverlayInset(getPalette(theme).action.hover),
            },

            "&.Mui-disabled": {
              color: getPalette(theme).text.disabled,
              borderColor: getPalette(theme).border.subtle,
            },
          }),
        },
      },

      MuiChip: {
        styleOverrides: {
          root: ({ ownerState, theme }: OverrideArgs<ChipProps>): CSSObject => {
            const base: CSSObject = {
              "& .MuiChip-icon": {
                color: "currentColor",
              },
            };

            const rawColour = ownerState.color ?? "default";
            const isDefault = rawColour === "default";
            const isOutlined = ownerState.variant === "outlined";
            const isInteractive = !!(
              ownerState.clickable || ownerState.onDelete
            );

            if (isDefault) {
              const backgroundColor = getPalette(theme).surface.strong;

              return {
                ...base,
                ...(isInteractive ? getFocusOutline(theme) : {}),
                color: getPalette(theme).text.primary,
                borderColor: getPalette(theme).border.base,
                backgroundColor,
                ...(isInteractive && {
                  ...getInteractiveSurfaceStateStyles(theme, backgroundColor),
                  "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                    {
                      backgroundColor,
                      boxShadow: getOverlayInset(
                        getPalette(theme).action.focus,
                      ),
                    },
                  "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                    {
                      backgroundColor,
                      boxShadow: getOverlayInset(
                        getPalette(theme).action.focus,
                      ),
                    },
                }),
              };
            }

            const colour = getIntentFromColourProp(rawColour);
            const p = getIntentPalette(theme, colour);

            if (isOutlined) {
              return {
                ...base,
                ...(isInteractive ? getFocusOutline(theme) : {}),
                color: p.onContainer,
                borderColor: p.light,
                backgroundColor: p.container,
                ...(isInteractive && {
                  ...getInteractiveSurfaceStateStyles(theme, p.container),
                  "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                    {
                      backgroundColor: p.container,
                      borderColor: p.light,
                      boxShadow: getOverlayInset(
                        getPalette(theme).action.focus,
                      ),
                    },
                  "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                    {
                      backgroundColor: p.container,
                      borderColor: p.light,
                      boxShadow: getOverlayInset(
                        getPalette(theme).action.focus,
                      ),
                    },
                }),
              };
            }

            return {
              ...base,
              ...(isInteractive ? getFocusOutline(theme) : {}),
              color: p.onSolid,
              backgroundColor: p.solid,
              ...(isInteractive && {
                ...getInteractiveSurfaceStateStyles(theme, p.solid),
                "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                  {
                    backgroundColor: p.solid,
                    boxShadow: getOverlayInset(getPalette(theme).action.focus),
                  },
                "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                  {
                    backgroundColor: p.solid,
                    boxShadow: getOverlayInset(getPalette(theme).action.focus),
                  },
              }),
            };
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          input: ({ theme }: ThemeOnlyArgs): CSSObject => ({
            "&::placeholder": {
              color: getPalette(theme).text.placeholder,
              opacity: 1,
            },
            "&::-webkit-input-placeholder": {
              color: getPalette(theme).text.placeholder,
              opacity: 1,
            },
            "&::-moz-placeholder": {
              color: getPalette(theme).text.placeholder,
              opacity: 1,
            },
            "&:focus::placeholder": {
              color: getPalette(theme).text.placeholderFocus,
            },
            "&:focus::-webkit-input-placeholder": {
              color: getPalette(theme).text.placeholderFocus,
              opacity: 1,
            },
            "&:focus::-moz-placeholder": {
              color: getPalette(theme).text.placeholderFocus,
              opacity: 1,
            },
          }),

          root: ({ theme }: ThemeOnlyArgs): CSSObject => ({
            "&.Mui-error input::placeholder, &.Mui-error input::-webkit-input-placeholder, &.Mui-error input::-moz-placeholder":
              {
                color: getPalette(theme).error.light,
                opacity: 1,
              },
            "&.Mui-disabled input::placeholder, &.Mui-disabled input::-webkit-input-placeholder, &.Mui-disabled input::-moz-placeholder":
              {
                color: getPalette(theme).text.disabled,
                opacity: 1,
              },
          }),
        },
      },

      /**
       * Inputs keep neutral borders by default. Focus uses the selected intent;
       * error always wins over focus and hover.
       */
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: OverrideArgs<OutlinedInputProps>): CSSObject => {
            const palette = getPalette(theme);

            const colour = getIntentFromColourProp(ownerState.color);
            const p = palette[colour];

            return {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: palette.border.base,
              },

              "&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: palette.border.emphasis,
                },

              "&.Mui-focused:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: p.main,
                  borderWidth: 2,
                },

              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: palette.error.main,
              },

              "&.Mui-focusVisible": {
                outline: "2px solid",
                outlineColor: palette.primary.light,
                outlineOffset: "2px",
              },

              "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: palette.border.subtle,
              },
            };
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }: ThemeOnlyArgs): CSSObject => {
            const palette = getPalette(theme);

            return {
              "&:not(.MuiInputLabel-shrink)": {
                color: palette.text.secondary,
              },
              "&.Mui-disabled:not(.MuiInputLabel-shrink)": {
                color: palette.text.disabled,
              },
              "&.Mui-focused": {
                color: palette.primary.main,
              },
              "&.Mui-focused.MuiFormLabel-colorSecondary": {
                color: palette.secondary.main,
              },
              "&.Mui-focused.MuiFormLabel-colorSuccess": {
                color: palette.success.main,
              },
              "&.Mui-focused.MuiFormLabel-colorWarning": {
                color: palette.warning.main,
              },
              "&.Mui-focused.MuiFormLabel-colorError": {
                color: palette.error.main,
              },
              "&.Mui-focused.MuiFormLabel-colorInfo": {
                color: palette.info.main,
              },
              "&.Mui-focused.Mui-error": {
                color: palette.error.main,
              },
              "&.Mui-disabled": {
                color: palette.text.disabled,
              },
            };
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: ({ theme }: OverrideArgs<TabProps>): CSSObject => ({
            textTransform: "none",
            color: getPalette(theme).text.secondary,
            fontWeight: 500,
            minHeight: 44,
            "&:hover": {
              color: getPalette(theme).text.primary,
              boxShadow: getOverlayInset(getPalette(theme).action.hover),
            },
            "&.Mui-selected": {
              color: getPalette(theme).primary.main,
              fontWeight: 600,
            },
            "&.Mui-disabled": {
              color: getPalette(theme).text.disabled,
            },
            "&.Mui-focusVisible, &:focus-visible": {
              outline: "2px solid",
              outlineColor: getPalette(theme).primary.light,
              outlineOffset: "-2px",
            },
          }),
        },
      },

      /**
       * Alerts use Material-style tonal containers by default and solid colours
       * only for filled variants.
       */
      MuiAlert: {
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: OverrideArgs<AlertProps>): CSSObject => {
            const severity = getIntentFromColourProp(
              ownerState.severity,
              "success",
            );
            const p = getIntentPalette(theme, severity);

            const common: CSSObject = {
              borderRadius: 8,
              alignItems: "flex-start",
              "& .MuiAlert-icon": {
                color: "currentColor",
                opacity: 1,
              },
              "& .MuiAlert-action": {
                color: "inherit",
                "& .MuiIconButton-root:hover": {
                  boxShadow: getOverlayInset(getPalette(theme).action.hover),
                },
              },
            };

            if (ownerState.variant === "filled") {
              return {
                ...common,
                backgroundColor: p.solid,
                color: p.onSolid,
              };
            }

            if (ownerState.variant === "outlined") {
              return {
                ...common,
                backgroundColor: p.container,
                color: p.onContainer,
                border: `1px solid ${p.light}`,
              };
            }

            return {
              ...common,
              backgroundColor: p.container,
              color: p.onContainer,
              border: `1px solid ${getPalette(theme).border.subtle}`,
            };
          },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: ({ theme }: ThemeOnlyArgs): CSSObject => ({
            height: 6,
            borderRadius: 999,
            overflow: "hidden",
            backgroundColor: getPalette(theme).surface.strong,
          }),
          bar: ({
            ownerState,
            theme,
          }: OverrideArgs<LinearProgressProps>): CSSObject => {
            const colour = getIntentFromColourProp(ownerState.color);
            const p = getIntentPalette(theme, colour);

            return {
              backgroundColor: p.main,
            };
          },
        },
      },

      MuiCircularProgress: {
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: OverrideArgs<CircularProgressProps>): CSSObject => {
            const colour = getIntentFromColourProp(ownerState.color);
            const p = getIntentPalette(theme, colour);

            return {
              color: p.main,
            };
          },
        },
      },

      MuiSkeleton: {
        styleOverrides: {
          root: ({ theme }: ThemeOnlyArgs): CSSObject => ({
            backgroundColor: getPalette(theme).surface.strong,
          }),
          wave: ({ theme }: ThemeOnlyArgs): CSSObject => ({
            backgroundColor: getPalette(theme).surface.strong,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              transform: "translateX(-100%)",
              backgroundImage: `linear-gradient(90deg, transparent, ${getPalette(theme).action.hover}, transparent)`,
            },
          }),
        },
      },

      MuiSnackbar: {
        styleOverrides: {
          root: {
            "& .MuiSnackbarContent-root, & .MuiAlert-root": {
              minWidth: 320,
              maxWidth: 560,
            },
          },
        },
      },

      MuiSnackbarContent: {
        styleOverrides: {
          root: ({ theme }: ThemeOnlyArgs): CSSObject => ({
            backgroundColor: getPalette(theme).surface.subtle,
            color: getPalette(theme).text.primary,
            border: `1px solid ${getPalette(theme).border.subtle}`,
            borderRadius: 8,
          }),
          message: {
            padding: "8px 0",
          },
          action: ({ theme }: ThemeOnlyArgs): CSSObject => ({
            color: "inherit",
            "& .MuiIconButton-root:hover": {
              boxShadow: getOverlayInset(getPalette(theme).action.hover),
            },
          }),
        },
      },

      MuiCheckbox: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: OverrideArgs<CheckboxProps>): CSSObject => {
            const rawColour = ownerState.color ?? "primary";
            const isDefault = rawColour === "default";
            const colour = getIntentFromColourProp(rawColour);
            const p = !isDefault ? getIntentPalette(theme, colour) : null;

            return {
              color: getPalette(theme).text.secondary,
              borderRadius: 8,
              "&:hover": {
                backgroundColor: getPalette(theme).action.hover,
              },
              ...getFocusOutline(theme),
              "&.Mui-checked": {
                color: isDefault ? getPalette(theme).text.primary : p?.main,
              },
              "&.MuiCheckbox-indeterminate": {
                color: isDefault ? getPalette(theme).text.primary : p?.main,
              },
              "&.Mui-disabled": {
                color: getPalette(theme).action.disabled,
              },
            };
          },
        },
      },

      MuiRadio: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: OverrideArgs<RadioProps>): CSSObject => {
            const rawColour = ownerState.color ?? "primary";
            const isDefault = rawColour === "default";
            const colour = getIntentFromColourProp(rawColour);
            const p = !isDefault ? getIntentPalette(theme, colour) : null;

            return {
              color: getPalette(theme).text.secondary,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: getPalette(theme).action.hover,
              },
              ...getFocusOutline(theme),
              "&.Mui-checked": {
                color: isDefault ? getPalette(theme).text.primary : p?.main,
              },
              "&.Mui-disabled": {
                color: getPalette(theme).action.disabled,
              },
            };
          },
        },
      },
    },
  });

  return createTheme(DiamondDSThemeOptions);
};

/**
 * Pre-built themes for convenience.
 * Most apps can use DiamondDSTheme directly because it contains both schemes.
 */
export const DiamondDSTheme = createDiamondTheme("light");
export const DiamondDSThemeDark = createDiamondTheme("dark");

/**
 * Backwards compatibility alias. Use createDiamondTheme() for new code.
 */
export const createMuiTheme = createDiamondTheme;
