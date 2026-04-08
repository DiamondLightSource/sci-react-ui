import "../styles/diamondDS/diamond-ds-roles.css";

import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { CSSObject } from "@mui/material/styles";

import type { ButtonProps } from "@mui/material/Button";
import type { ChipProps } from "@mui/material/Chip";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import type { TabProps } from "@mui/material/Tab";
import type { AlertProps } from "@mui/material/Alert";
import type { LinearProgressProps } from "@mui/material/LinearProgress";
import type { CircularProgressProps } from "@mui/material/CircularProgress";
import type { SnackbarProps } from "@mui/material/Snackbar";
import type { SnackbarContentProps } from "@mui/material/SnackbarContent";
import type { SkeletonProps } from "@mui/material/Skeleton";

import { mergeThemeOptions } from "./ThemeManager";

import logoImageLight from "../public/diamond/logo-light.svg";
import logoImageDark from "../public/diamond/logo-dark.svg";
import logoShort from "../public/diamond/logo-short.svg";

import React from "react";
import {
  DsCheckboxBlankIcon,
  DsCheckboxCheckedIcon,
  DsCheckboxIndeterminateIcon,
} from "./icons";

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
};

declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    paper: string;
  }

  interface TypeText {
    placeholder?: string;
    placeholderFocus?: string;
  }

  interface Palette {
    brand?: PaletteColor;
    borders: {
      subtle: string;
      base: string;
      strong: string;
    };
    surface: {
      subtle: string;
      strong: string;
    };
    intentSurface: Record<
      IntentColour,
      {
        subtle: string;
        onSubtle: string;
      }
    >;
  }

  interface PaletteOptions {
    brand?: SimplePaletteColorOptions;
    borders?: {
      subtle?: string;
      base?: string;
      strong?: string;
    };
    surface?: {
      subtle?: string;
      strong?: string;
    };
    intentSurface?: Partial<
      Record<
        IntentColour,
        {
          subtle?: string;
          onSubtle?: string;
        }
      >
    >;
  }

  interface PaletteColor {
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
  }

  interface SimplePaletteColorOptions {
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
  }
}

export type DSMode = "light" | "dark";

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

export const createMuiTheme = (mode: DSMode): Theme => {
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
          mode === "dark"
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
        disabledOpacity: 0.36,
        focusOpacity: 0.1,
      },

      text: {
        primary: "var(--ds-on-surface)",
        secondary: "var(--ds-on-surface-variant)",
        disabled: "var(--ds-on-surface-disabled)",
        placeholder: "var(--ds-placeholder)",
        placeholderFocus: "var(--ds-placeholder-focus)",
      },

      background: {
        default: "var(--ds-background)",
        paper: "var(--ds-surface)",
      },

      divider: "var(--ds-border-subtle)",

      borders: {
        subtle: "var(--ds-border-subtle)",
        base: "var(--ds-border)",
        strong: "var(--ds-border-strong)",
      },

      surface: {
        subtle: "var(--ds-surface-container)",
        strong: "var(--ds-surface-container-high)",
      },

      intentSurface: {
        primary: {
          subtle: "var(--ds-primary-container)",
          onSubtle: "var(--ds-on-primary-container)",
        },
        secondary: {
          subtle: "var(--ds-secondary-container)",
          onSubtle: "var(--ds-on-secondary-container)",
        },
        error: {
          subtle: "var(--ds-danger-container)",
          onSubtle: "var(--ds-on-danger-container)",
        },
        warning: {
          subtle: "var(--ds-warning-container)",
          onSubtle: "var(--ds-on-warning-container)",
        },
        success: {
          subtle: "var(--ds-success-container)",
          onSubtle: "var(--ds-on-success-container)",
        },
        info: {
          subtle: "var(--ds-info-container)",
          onSubtle: "var(--ds-on-info-container)",
        },
      },

      primary: {
        light: "var(--ds-primary-accent)",
        main: "var(--ds-primary)",
        dark: "var(--ds-primary-hover)",
        contrastText: "var(--ds-on-primary)",
        mainChannel: "var(--ds-primary-mainChannel)",
        lightChannel: "var(--ds-primary-lightChannel)",
        darkChannel: "var(--ds-primary-darkChannel)",
      },

      secondary: {
        light: "var(--ds-secondary-accent)",
        main: "var(--ds-secondary)",
        dark: "var(--ds-secondary-hover)",
        contrastText: "var(--ds-on-secondary)",
        mainChannel: "var(--ds-secondary-mainChannel)",
        lightChannel: "var(--ds-secondary-lightChannel)",
        darkChannel: "var(--ds-secondary-darkChannel)",
      },

      brand: {
        light: "var(--ds-brand-accent)",
        main: "var(--ds-brand)",
        dark: "var(--ds-brand-hover)",
        contrastText: "var(--ds-on-brand)",
        mainChannel: "var(--ds-brand-mainChannel)",
        lightChannel: "var(--ds-brand-lightChannel)",
        darkChannel: "var(--ds-brand-darkChannel)",
      },

      error: {
        light: "var(--ds-danger-accent)",
        main: "var(--ds-danger)",
        dark: "var(--ds-danger-hover)",
        contrastText: "var(--ds-on-danger)",
        mainChannel: "var(--ds-danger-mainChannel)",
        lightChannel: "var(--ds-danger-lightChannel)",
        darkChannel: "var(--ds-danger-darkChannel)",
      },

      warning: {
        light: "var(--ds-warning-accent)",
        main: "var(--ds-warning)",
        dark: "var(--ds-warning-hover)",
        contrastText: "var(--ds-on-warning)",
        mainChannel: "var(--ds-warning-mainChannel)",
        lightChannel: "var(--ds-warning-lightChannel)",
        darkChannel: "var(--ds-warning-darkChannel)",
      },

      success: {
        light: "var(--ds-success-accent)",
        main: "var(--ds-success)",
        dark: "var(--ds-success-hover)",
        contrastText: "var(--ds-on-success)",
        mainChannel: "var(--ds-success-mainChannel)",
        lightChannel: "var(--ds-success-lightChannel)",
        darkChannel: "var(--ds-success-darkChannel)",
      },

      info: {
        light: "var(--ds-info-accent)",
        main: "var(--ds-info)",
        dark: "var(--ds-info-hover)",
        contrastText: "var(--ds-on-info)",
        mainChannel: "var(--ds-info-mainChannel)",
        lightChannel: "var(--ds-info-lightChannel)",
        darkChannel: "var(--ds-info-darkChannel)",
      },

      grey: {
        50: "#F4F4F6",
        100: "#ECEDF0",
        200: "#E2E3E8",
        300: "#D4D7DF",
        400: "#B4B8C3",
        500: "#9EA2AD",
        600: "#7A7E8A",
        700: "#4B4F5A",
        800: "#2C2F3C",
        900: "#1A1C23",
      },
    },

    components: {
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
            const subtle = theme.palette.intentSurface[colour].subtle;
            const onSubtle = theme.palette.intentSurface[colour].onSubtle;

            if (variant === "contained") {
              return {
                ...base,
                ...getFocusOutline(focusToken),
                "&:hover": {
                  backgroundColor: p.dark ?? p.main,
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                },
              };
            }

            if (variant === "outlined") {
              return {
                ...base,
                ...getFocusOutline(focusToken),
                color: onSubtle,
                borderColor: p.main,
                backgroundColor: subtle,
                "&:hover": {
                  backgroundColor: subtle,
                  boxShadow: getOverlayInset(),
                  borderColor: p.main,
                },
                "&.Mui-disabled": {
                  opacity: 1,
                  backgroundColor: "transparent",
                  color: "var(--ds-on-surface-disabled)",
                  borderColor: "var(--ds-border-subtle)",
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
                  boxShadow: "inset 0 0 0 9999px var(--ds-overlay-hover)",
                },
                ...getFocusOutline(),
              };
            }

            const colour = rawColour as IntentColour;
            const p = getIntentPalette(theme, colour);
            const subtle = theme.palette.intentSurface[colour].subtle;
            const focusToken = getFocusToken(colour);

            return {
              color: p.main,
              "&:hover": {
                backgroundColor: subtle,
                boxShadow: "inset 0 0 0 9999px var(--ds-overlay-hover)",
              },
              ...getFocusOutline(focusToken),
            };
          },
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
              "& .MuiChip-icon, & .MuiChip-deleteIcon": {
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
                backgroundColor: "var(--ds-surface-container)",
                ...(isInteractive && {
                  "&:hover": {
                    backgroundColor: "var(--ds-surface-container)",
                    boxShadow: getOverlayInset(),
                  },
                }),
              } as CSSObject;
            }

            const colour = rawColour as IntentColour;
            const p = getIntentPalette(theme, colour);
            const focusToken = getFocusToken(colour);
            const subtle = theme.palette.intentSurface[colour].subtle;
            const onSubtle = theme.palette.intentSurface[colour].onSubtle;

            if (isOutlined) {
              return {
                ...base,
                ...(isInteractive ? getFocusOutline(focusToken) : {}),
                color: onSubtle,
                borderColor: p.main,
                backgroundColor: subtle,
                ...(isInteractive && {
                  "&:hover": {
                    backgroundColor: subtle,
                    boxShadow: getOverlayInset(),
                  },
                }),
              } as CSSObject;
            }

            return {
              ...base,
              ...(isInteractive ? getFocusOutline(focusToken) : {}),
            } as CSSObject;
          },
        },
      },

      MuiCheckbox: {
        defaultProps: {
          icon: React.createElement(DsCheckboxBlankIcon),
          checkedIcon: React.createElement(DsCheckboxCheckedIcon),
          indeterminateIcon: React.createElement(DsCheckboxIndeterminateIcon),
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
            const raw = (ownerState.color ?? "default") as
              | "default"
              | IntentColour;
            const isDefault = raw === "default";
            const colour = raw as IntentColour;
            const p = !isDefault ? getIntentPalette(theme, colour) : null;
            const focusToken = isDefault
              ? "var(--ds-focus-ring)"
              : getFocusToken(colour);

            const base: CSSObject = {
              ...getFocusOutline(focusToken),
              "&:hover": {
                backgroundColor: "transparent",
              },
            };

            if (ownerState.disabled) {
              return {
                ...base,
                color: theme.palette.text.disabled,
                "--ds-checkbox-box-fill": "none",
                "--ds-checkbox-box-stroke": theme.palette.text.disabled,
                "--ds-checkbox-box-strokeWidth": "2",
                "--ds-checkbox-glyph": theme.palette.text.disabled,
              } as unknown as CSSObject;
            }

            const selectedMain = isDefault
              ? theme.palette.text.secondary
              : p?.main;
            const selectedMainChannel = isDefault ? null : p?.mainChannel;
            const uncheckedOutline = theme.palette.text.secondary;

            return {
              ...base,

              "&:not(.Mui-checked):not(.MuiCheckbox-indeterminate)": {
                color: uncheckedOutline,
                "--ds-checkbox-box-fill": "none",
                "--ds-checkbox-box-stroke": uncheckedOutline,
                "--ds-checkbox-box-strokeWidth": "2",
              },

              "&.Mui-checked": {
                color: selectedMain,
                "--ds-checkbox-box-fill": "currentColor",
                "--ds-checkbox-box-stroke": "none",
                "--ds-checkbox-box-strokeWidth": "0",
                "--ds-checkbox-glyph": "#ffffff",
              },

              "&.MuiCheckbox-indeterminate": {
                color: selectedMain,
                "--ds-checkbox-box-fill": "none",
                "--ds-checkbox-box-stroke": "currentColor",
                "--ds-checkbox-box-strokeWidth": "2",
                "--ds-checkbox-glyph": "currentColor",
              },

              ...(selectedMainChannel && {
                "&.Mui-checked:hover, &.MuiCheckbox-indeterminate:hover": {
                  backgroundColor: `rgba(${selectedMainChannel} / ${theme.palette.action.hoverOpacity})`,
                },
              }),
            } as unknown as CSSObject;
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
                  borderColor: theme.palette.borders.strong,
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
            const subtle = theme.palette.intentSurface[mappedSeverity].subtle;
            const onSubtle = theme.palette.intentSurface[mappedSeverity].onSubtle;

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
                backgroundColor: p.main,
                color: p.contrastText,
              };
            }

            if (ownerState.variant === "outlined") {
              return {
                ...common,
                backgroundColor: subtle,
                color: onSubtle,
                border: `1px solid ${p.main}`,
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

          bar: ({ ownerState, theme }: OverrideArgs<LinearProgressProps>): CSSObject => {
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
          root: ({ ownerState, theme }: OverrideArgs<CircularProgressProps>): CSSObject => {
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
            backgroundColor: "var(--ds-surface-container-high)",
            color: "var(--ds-on-surface)",
            border: "1px solid var(--ds-border-subtle)",
            borderRadius: 8,
            boxShadow: "none",
          },

          message: {
            padding: "8px 0",
          },

          action: {
            color: "inherit",

            "& .MuiIconButton-root:hover": {
              boxShadow: "inset 0 0 0 9999px var(--ds-overlay-hover)",
            },
          },
        },
      },

    },
  });

  return createTheme(DiamondDSThemeOptions);
};

export const DiamondDSTheme = createMuiTheme("light");
export const DiamondDSThemeDark = createMuiTheme("dark");