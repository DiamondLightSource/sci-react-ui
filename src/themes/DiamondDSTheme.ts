import "../styles/diamondDS/diamond-ds-roles.css";

import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { CSSObject } from "@mui/material/styles";

import type { ButtonProps } from "@mui/material/Button";
import type { ChipProps } from "@mui/material/Chip";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { RadioProps } from "@mui/material/Radio";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import type { TabProps } from "@mui/material/Tab";
import type { AlertProps } from "@mui/material/Alert";
import type { LinearProgressProps } from "@mui/material/LinearProgress";
import type { CircularProgressProps } from "@mui/material/CircularProgress";

import { mergeThemeOptions } from "./ThemeManager";

import logoImageLight from "../public/diamond/logo-light.svg";
import logoImageDark from "../public/diamond/logo-dark.svg";
import logoShort from "../public/diamond/logo-short.svg";

type OverrideArgs<OwnerState = unknown> = {
  ownerState: OwnerState;
  theme: Theme;
};

type ThemeOnlyArgs = { theme: Theme };

type IntentColour =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

type ExtendedPaletteColor = {
  light?: string;
  main?: string;
  dark?: string;
  contrastText?: string;
  mainChannel?: string;
  lightChannel?: string;
  darkChannel?: string;
  container?: string;
  onContainer?: string;
  solid?: string;
  onSolid?: string;
};

declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    paper: string;
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
    primaryChannel?: string;
    secondaryChannel?: string;
  }
  interface Palette {
    brand?: PaletteColor;
    borders: {
      subtle: string;
      base: string;
      emphasis: string;
    };
    surface: {
      subtle: string;
      strong: string;
    };
  }

  interface PaletteOptions {
    brand?: SimplePaletteColorOptions;
    borders?: {
      subtle?: string;
      base?: string;
      emphasis?: string;
    };
    surface?: {
      subtle?: string;
      strong?: string;
    };
  }

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
}

export type DSMode = "light" | "dark";

// --- Helpers ---

const getIntentPalette = (
  theme: Theme,
  colour: IntentColour
): ExtendedPaletteColor => {
  const varsPalette = (theme as any).vars?.palette?.[colour] as
    | ExtendedPaletteColor
    | undefined;
  const fallbackPalette = (theme.palette as any)[colour] as
    | ExtendedPaletteColor
    | undefined;

  if (process.env.NODE_ENV !== "production" && !fallbackPalette) {
    console.warn(
      `[DiamondDS] getIntentPalette: colour "${colour}" not found in palette`
    );
  }

  return {
    ...fallbackPalette,
    ...varsPalette,
  };
};

const getFocusToken = (colour?: IntentColour) => {
  if (!colour) return "var(--ds-focus-ring)";
  return `var(--ds-focus-ring-${colour === "error" ? "danger" : colour})`;
};

const getFocusOutline = (token?: string): CSSObject => ({
  "&.Mui-focusVisible": {
    outline: "var(--ds-focus-ring-width) solid",
    outlineColor: token ?? "var(--ds-focus-ring)",
    outlineOffset: "var(--ds-focus-ring-offset)",
  },
});

const getOverlayInset = (token = "var(--ds-overlay-hover)") =>
  `inset 0 0 0 9999px ${token}`;

// --- Theme factory ---

export const createDiamondTheme = (mode: DSMode): Theme => {
  const DiamondDSThemeOptions = mergeThemeOptions({
    typography: {
      fontFamily: [
        "Inter Variable",
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
          mode === "dark" ? (logoImageDark ?? logoImageLight) : logoImageLight,
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

    palette: {
      mode,

      action: {
        hover: "var(--ds-overlay-hover)",
        selected: "var(--ds-overlay-selected)",
        focus: "var(--ds-overlay-focus)",
        disabled: "var(--ds-on-surface-disabled)",
        disabledBackground: "var(--ds-surface-disabled)",

        hoverOpacity: 0.04,
        selectedOpacity: 0.08,
        disabledOpacity: 0.1,
        focusOpacity: 0.1,
      },

      text: {
        primary: "var(--ds-on-surface)",
        secondary: "var(--ds-on-surface-variant)",
        onSolid: "var(--ds-on-solid)",
        disabled: "var(--ds-on-surface-disabled)",
        placeholder: "var(--ds-placeholder)",
        placeholderFocus: "var(--ds-placeholder-focus)",

        primaryChannel: "var(--ds-on-surface-channel)",
        secondaryChannel: "var(--ds-on-surface-variant-channel)",
      },

      background: {
        default: "rgb(var(--ds-background-channel))",
        paper: "rgb(var(--ds-surface-channel))",
      },

      divider: "var(--ds-border-subtle)",

      borders: {
        subtle: "var(--ds-border-subtle)",
        base: "var(--ds-border)",
        emphasis: "var(--ds-border-emphasis)",
      },

      surface: {
        subtle: "var(--ds-surface-container)",
        strong: "var(--ds-surface-container-high)",
      },

      primary: {
        light: "var(--ds-primary-accent)",
        main: "var(--ds-primary)",
        dark: "var(--ds-primary-emphasis)",
        contrastText: "var(--ds-on-primary)",
        container: "var(--ds-primary-container)",
        onContainer: "var(--ds-on-primary-container)",
        solid: "var(--ds-primary-solid)",
        onSolid: "var(--ds-on-primary-solid)",

        contrastTextChannel: "var(--ds-on-primary-channel)",
        mainChannel: "var(--ds-primary-mainChannel)",
        lightChannel: "var(--ds-primary-lightChannel)",
        darkChannel: "var(--ds-primary-darkChannel)",
      },

      secondary: {
        light: "var(--ds-secondary-accent)",
        main: "var(--ds-secondary)",
        dark: "var(--ds-secondary-emphasis)",
        contrastText: "var(--ds-on-secondary)",
        container: "var(--ds-secondary-container)",
        onContainer: "var(--ds-on-secondary-container)",
        solid: "var(--ds-secondary-solid)",
        onSolid: "var(--ds-on-secondary-solid)",

        contrastTextChannel: "var(--ds-on-secondary-channel)",
        mainChannel: "var(--ds-secondary-mainChannel)",
        lightChannel: "var(--ds-secondary-lightChannel)",
        darkChannel: "var(--ds-secondary-darkChannel)",
      },

      brand: {
        light: "var(--ds-brand-accent)",
        main: "var(--ds-brand)",
        dark: "var(--ds-brand-emphasis)",
        contrastText: "var(--ds-on-brand)",
        container: "var(--ds-brand-container)",
        onContainer: "var(--ds-on-brand-container)",
        solid: "var(--ds-brand-solid)",
        onSolid: "var(--ds-on-brand-solid)",

        contrastTextChannel: "var(--ds-on-brand-channel)",
        mainChannel: "var(--ds-brand-mainChannel)",
        lightChannel: "var(--ds-brand-lightChannel)",
        darkChannel: "var(--ds-brand-darkChannel)",
      },

      error: /* Danger */ {
        light: "var(--ds-danger-accent)",
        main: "var(--ds-danger)",
        dark: "var(--ds-danger-emphasis)",
        contrastText: "var(--ds-on-danger)",
        container: "var(--ds-danger-container)",
        onContainer: "var(--ds-on-danger-container)",
        solid: "var(--ds-danger-solid)",
        onSolid: "var(--ds-on-danger-solid)",

        contrastTextChannel: "var(--ds-on-danger-channel)",
        mainChannel: "var(--ds-danger-mainChannel)",
        lightChannel: "var(--ds-danger-lightChannel)",
        darkChannel: "var(--ds-danger-darkChannel)",
      },

      warning: {
        light: "var(--ds-warning-accent)",
        main: "var(--ds-warning)",
        dark: "var(--ds-warning-emphasis)",
        contrastText: "var(--ds-on-warning)",
        container: "var(--ds-warning-container)",
        onContainer: "var(--ds-on-warning-container)",
        solid: "var(--ds-warning-solid)",
        onSolid: "var(--ds-on-warning-solid)",

        contrastTextChannel: "var(--ds-on-warning-channel)",
        mainChannel: "var(--ds-warning-mainChannel)",
        lightChannel: "var(--ds-warning-lightChannel)",
        darkChannel: "var(--ds-warning-darkChannel)",
      },

      success: {
        light: "var(--ds-success-accent)",
        main: "var(--ds-success)",
        dark: "var(--ds-success-emphasis)",
        contrastText: "var(--ds-on-success)",
        container: "var(--ds-success-container)",
        onContainer: "var(--ds-on-success-container)",
        solid: "var(--ds-success-solid)",
        onSolid: "var(--ds-on-success-solid)",

        contrastTextChannel: "var(--ds-on-success-channel)",
        mainChannel: "var(--ds-success-mainChannel)",
        lightChannel: "var(--ds-success-lightChannel)",
        darkChannel: "var(--ds-success-darkChannel)",
      },

      info: {
        light: "var(--ds-info-accent)",
        main: "var(--ds-info)",
        dark: "var(--ds-info-emphasis)",
        contrastText: "var(--ds-on-info)",
        container: "var(--ds-info-container)",
        onContainer: "var(--ds-on-info-container)",
        solid: "var(--ds-info-solid)",
        onSolid: "var(--ds-on-info-solid)",

        contrastTextChannel: "var(--ds-on-info-channel)",
        mainChannel: "var(--ds-info-mainChannel)",
        lightChannel: "var(--ds-info-lightChannel)",
        darkChannel: "var(--ds-info-darkChannel)",
      },

      grey: {
        50: "#F8F8FA",
        100: "#EEF1F5",
        200: "#E6E9F0",
        300: "#DDE1E8",
        400: "#BCC2CD",
        500: "#A5ACB8",
        600: "#8A90A0",
        700: "#505563",
        800: "#2C3140",
        900: "#1A1C23",
      },
    },

    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
          focusRipple: false,
        },
      },

      MuiButton: {
        defaultProps: {
          disableFocusRipple: true,
        },
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: {
            ownerState: ButtonProps;
            theme: Theme;
          }): CSSObject => {
            const base: CSSObject = {
              textTransform: "none",
              boxShadow: "none",
            };

            const variant = ownerState.variant ?? "text";
            const rawColour = ownerState.color ?? "primary";

            if (rawColour === "inherit") {
              return {
                ...base,
                ...getFocusOutline(),
              };
            }

            const colour = rawColour as IntentColour;
            const p = getIntentPalette(theme, colour);
            const focusToken = getFocusToken(colour);
            const subtle = p.container;
            const onSubtle = p.onContainer;

            if (variant === "contained") {
              return {
                ...base,
                ...getFocusOutline(focusToken),
                backgroundColor: p.solid ?? p.main,
                color: p.onSolid ?? "var(--ds-on-solid)",
                "&:hover": {
                  backgroundColor: p.solid ?? p.main,
                  boxShadow: getOverlayInset("var(--ds-overlay-hover-solid)"),
                },
                "&:active": {
                  backgroundColor: p.solid ?? p.main,
                  boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
                },
                "&.Mui-focusVisible": {
                  outline: "var(--ds-focus-ring-width) solid",
                  outlineColor: focusToken,
                  outlineOffset: "var(--ds-focus-ring-offset)",
                  boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                },
                "&.Mui-disabled": {
                  opacity: 1,
                  backgroundColor: "var(--ds-surface-disabled)",
                  color: "var(--ds-on-surface-disabled)",
                  boxShadow: "none",
                },
              };
            }

          if (variant === "outlined") {
            return {
              ...base,
              ...getFocusOutline(focusToken),

              color: onSubtle,
              backgroundColor: subtle,

              "&:hover": {
                backgroundColor: subtle,
                boxShadow: getOverlayInset(),
              },

              "&:active": {
                backgroundColor: subtle,
                boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
              },

              "&.Mui-disabled": {
                opacity: 1,
                backgroundColor: "transparent",
                color: "var(--ds-on-surface-disabled)",
                boxShadow: "none",
              },
            };
          }

            if (variant === "text") {
              return {
                ...base,
                ...getFocusOutline(focusToken),
                color: p.main,
                "&:hover": {
                  backgroundColor: subtle,
                  boxShadow: getOverlayInset(),
                },
              };
            }

            return {
              ...base,
              ...getFocusOutline(focusToken),
            };
          },
        },
      },

      MuiIconButton: {
        defaultProps: {
          disableRipple: true,
          disableFocusRipple: true,
        },
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: {
            ownerState: { color?: "inherit" | IntentColour | "default" };
            theme: Theme;
          }): CSSObject => {
            const rawColour = ownerState.color ?? "default";

            if (rawColour === "inherit" || rawColour === "default") {
              return {
                "&:hover": {
                  boxShadow: getOverlayInset(),
                },
                ...getFocusOutline(),
              };
            }

            const colour = rawColour as IntentColour;
            const p = getIntentPalette(theme, colour);
            const subtle = p.container;
            const focusToken = getFocusToken(colour);

            return {
              color: p.main,
              "&:hover": {
                backgroundColor: subtle,
                boxShadow: getOverlayInset(),
              },
              ...getFocusOutline(focusToken),
            };
          },
        },
      },

      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: "none",
            border: `1px solid ${theme.palette.borders.base}`,
            "&:hover": {
              borderColor: theme.palette.borders.emphasis,
            },
          }),
        },
      },

      MuiChip: {
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: {
            ownerState: ChipProps;
            theme: Theme;
          }): CSSObject => {
            const base: CSSObject = {
              "& .MuiChip-icon": {
                color: "currentColor",
              },
            };

            const rawColour = ownerState.color ?? "default";
            const isDefault = rawColour === "default";
            const isOutlined = ownerState.variant === "outlined";
            const isInteractive = !!(ownerState.clickable || ownerState.onDelete);

            if (isDefault) {
              return {
                ...base,
                ...(isInteractive ? getFocusOutline() : {}),

                color: "var(--ds-on-surface)",
                borderColor: "var(--ds-border)",
                backgroundColor: "var(--ds-surface-container-high)",

                ...(isInteractive && {
                  "&:hover": {
                    backgroundColor: "var(--ds-surface-container-high)",
                    boxShadow: getOverlayInset(),
                  },

                  "&:active": {
                    backgroundColor: "var(--ds-surface-container-high)",
                    boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
                  },

                  "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                    {
                      backgroundColor: "var(--ds-surface-container-high)",
                      boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                    },

                  "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                    {
                      backgroundColor: "var(--ds-surface-container-high)",
                      boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                    },
                }),
              };
            }

            const colour = rawColour as IntentColour;
            const p = getIntentPalette(theme, colour);
            const focusToken = getFocusToken(colour);

            if (isOutlined) {
              const subtle = p.container;
              const onSubtle = p.onContainer;

              return {
                ...base,
                ...(isInteractive ? getFocusOutline(focusToken) : {}),

                color: onSubtle,
                borderColor: p.light,
                backgroundColor: subtle,

                ...(isInteractive && {
                  "&:hover": {
                    backgroundColor: subtle,
                    borderColor: p.light,
                    boxShadow: getOverlayInset(),
                  },

                  "&:active": {
                    backgroundColor: subtle,
                    borderColor: p.light,
                    boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
                  },

                  "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                    {
                      backgroundColor: subtle,
                      borderColor: p.light,
                      boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                    },

                  "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                    {
                      backgroundColor: subtle,
                      borderColor: p.light,
                      boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                    },
                }),
              };
            }

            const solid = p.solid ?? p.main;

            return {
              ...base,
              ...(isInteractive ? getFocusOutline(focusToken) : {}),

              color: p.onSolid ?? "var(--ds-on-solid)",
              backgroundColor: solid,

              ...(isInteractive && {
                "&:hover": {
                  backgroundColor: solid,
                  boxShadow: getOverlayInset("var(--ds-overlay-hover-solid)"),
                },

                "&:active": {
                  backgroundColor: solid,
                  boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
                },

                "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                  {
                    backgroundColor: solid,
                    boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                  },

                "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                  {
                    backgroundColor: solid,
                    boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                  },
              }),
            };
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          input: ({ theme }: ThemeOnlyArgs) => ({
            "&::placeholder": {
              color: theme.palette.text.placeholder,
              opacity: 1,
            },
            "&::-webkit-input-placeholder": {
              color: theme.palette.text.placeholder,
              opacity: 1,
            },
            "&::-moz-placeholder": {
              color: theme.palette.text.placeholder,
              opacity: 1,
            },
            "&:focus::placeholder": {
              color: theme.palette.text.placeholderFocus,
            },
            "&:focus::-webkit-input-placeholder": {
              color: theme.palette.text.placeholderFocus,
              opacity: 1,
            },
            "&:focus::-moz-placeholder": {
              color: theme.palette.text.placeholderFocus,
              opacity: 1,
            },
          }),

          root: ({ theme }: ThemeOnlyArgs) => ({
            "&.Mui-error input::placeholder, &.Mui-error input::-webkit-input-placeholder, &.Mui-error input::-moz-placeholder":
              {
                color: theme.palette.error.light,
                opacity: 1,
              },
            "&.Mui-disabled input::placeholder, &.Mui-disabled input::-webkit-input-placeholder, &.Mui-disabled input::-moz-placeholder":
              {
                color: theme.palette.text.disabled,
                opacity: 1,
              },
          }),
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ ownerState, theme }: OverrideArgs<OutlinedInputProps>) => {
            const colour = (ownerState.color ?? "primary") as IntentColour;
            const p = getIntentPalette(theme, colour);
            const focusToken = getFocusToken(colour);

            return {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.borders.base,
              },

              "&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: theme.palette.borders.emphasis,
                },

              "&.Mui-focused:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: p.light,
                  borderWidth: 2,
                },

              "&.Mui-focused:hover:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: p.light,
                  borderWidth: 2,
                },

              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.error.light,
              },

              "&.Mui-error:hover:not(.Mui-disabled):not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: theme.palette.error.light,
                },

              "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.error.light,
                borderWidth: 2,
              },

              "&.Mui-focusVisible": {
                outline: "var(--ds-focus-ring-width) solid",
                outlineColor: focusToken,
                outlineOffset: "var(--ds-focus-ring-offset)",
              },

              "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--ds-border-subtle)",
              },
            };
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }: ThemeOnlyArgs) => ({
            "&:not(.MuiInputLabel-shrink)": {
              color: theme.palette.text.secondary,
            },

            "&.Mui-disabled:not(.MuiInputLabel-shrink)": {
              color: theme.palette.text.disabled,
            },

            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },

            "&.Mui-focused.MuiFormLabel-colorSecondary": {
              color: theme.palette.secondary.main,
            },
            "&.Mui-focused.MuiFormLabel-colorSuccess": {
              color: theme.palette.success.main,
            },
            "&.Mui-focused.MuiFormLabel-colorWarning": {
              color: theme.palette.warning.main,
            },
            "&.Mui-focused.MuiFormLabel-colorError": {
              color: theme.palette.error.main,
            },
            "&.Mui-focused.MuiFormLabel-colorInfo": {
              color: theme.palette.info.main,
            },

            "&.Mui-focused.Mui-error": {
              color: theme.palette.error.main,
            },

            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
            },
          }),
        },
      },

      MuiTab: {
        styleOverrides: {
          root: ({ theme }: OverrideArgs<TabProps>): CSSObject => ({
            textTransform: "none",
            color: theme.palette.text.secondary,
            fontWeight: 500,
            minHeight: 44,

            "&:hover": {
              color: theme.palette.text.primary,
              boxShadow: getOverlayInset(),
            },

            "&.Mui-selected": {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },

            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
            },

            "&.Mui-focusVisible, &:focus-visible": {
              outline: "var(--ds-focus-ring-width) solid var(--ds-focus-ring)",
              outlineOffset: "-2px",
            },
          }),
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: ({
            ownerState,
            theme,
          }: {
            ownerState: AlertProps;
            theme: Theme;
          }): CSSObject => {
            const severity = (ownerState.severity ?? "success") as IntentColour;
            const mappedSeverity = severity === "error" ? "error" : severity;
            const p = getIntentPalette(theme, mappedSeverity);
            const subtle = p.container;
            const onSubtle = p.onContainer;

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
                  boxShadow: getOverlayInset(),
                },
              },
            };

            if (ownerState.variant === "filled") {
              return {
                ...common,
                backgroundColor: p.solid ?? p.main,
                color: p.onSolid ?? "var(--ds-on-solid)",
              };
            }

            if (ownerState.variant === "outlined") {
              return {
                ...common,
                backgroundColor: subtle,
                color: onSubtle,
                border: `1px solid ${p.light}`,
              };
            }

            return {
              ...common,
              backgroundColor: subtle,
              color: onSubtle,
              border: "1px solid var(--ds-border-subtle)",
            };
          },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 6,
            borderRadius: 999,
            overflow: "hidden",
            backgroundColor: "var(--ds-surface-container-high)",
          },

          bar: ({
            ownerState,
            theme,
          }: OverrideArgs<LinearProgressProps>): CSSObject => {
            const colour = (ownerState.color ?? "primary") as IntentColour;
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
            const colour = (ownerState.color ?? "primary") as IntentColour;
            const p = getIntentPalette(theme, colour);

            return {
              color: p.main,
            };
          },
        },
      },

      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--ds-surface-container-high)",
          },

          wave: {
            backgroundColor: "var(--ds-surface-container-high)",
            position: "relative",
            overflow: "hidden",

            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              transform: "translateX(-100%)",
              backgroundImage:
                "linear-gradient(90deg, transparent, var(--ds-overlay-hover), transparent)",
            },
          },
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
          root: {
            backgroundColor: "var(--ds-surface-container)",
            color: "var(--ds-on-surface)",
            border: "1px solid var(--ds-border-subtle)",
            borderRadius: 8,
          },

          message: {
            padding: "8px 0",
          },

          action: {
            color: "inherit",

            "& .MuiIconButton-root:hover": {
              boxShadow: getOverlayInset(),
            },
          },
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
          }: {
            ownerState: CheckboxProps;
            theme: Theme;
          }): CSSObject => {
            const rawColour = ownerState.color ?? "primary";
            const isDefault = rawColour === "default";
            const p = !isDefault
              ? getIntentPalette(theme, rawColour as IntentColour)
              : null;
            const focusToken = !isDefault
              ? getFocusToken(rawColour as IntentColour)
              : undefined;

            return {
              color: "var(--ds-on-surface-variant)",
              borderRadius: 8,

              "&:hover": {
                backgroundColor: "var(--ds-overlay-hover)",
              },

              ...getFocusOutline(focusToken),

              "&.Mui-checked": {
                color: isDefault ? "var(--ds-on-surface)" : p?.main,
              },

              "&.MuiCheckbox-indeterminate": {
                color: isDefault ? "var(--ds-on-surface)" : p?.main,
              },

              "&.Mui-disabled": {
                color: "var(--ds-action-disabled)",
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
          }: {
            ownerState: RadioProps;
            theme: Theme;
          }): CSSObject => {
            const rawColour = ownerState.color ?? "primary";
            const isDefault = rawColour === "default";
            const colour = rawColour as IntentColour;

            const p = !isDefault ? getIntentPalette(theme, colour) : null;
            const focusToken = !isDefault ? getFocusToken(colour) : undefined;

            return {
              color: "var(--ds-on-surface-variant)",
              borderRadius: "50%",

              "&:hover": {
                backgroundColor: "var(--ds-overlay-hover)",
              },

              ...getFocusOutline(focusToken),

              "&.Mui-checked": {
                color: isDefault ? "var(--ds-on-surface)" : p?.main,
              },

              "&.Mui-disabled": {
                color: "var(--ds-action-disabled)",
              },
            };
          },
        },
      },

    },
  });

  return createTheme(DiamondDSThemeOptions);
};

// Convenience exports — derive from the factory so they stay in sync.
export const DiamondDSTheme = createDiamondTheme("light");
export const DiamondDSThemeDark = createDiamondTheme("dark");

// Keep the old export name as an alias for backwards compatibility.
export const createMuiTheme = createDiamondTheme;