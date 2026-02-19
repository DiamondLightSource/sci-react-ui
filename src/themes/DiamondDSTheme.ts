import "../styles/diamondDS/diamond-colors-primitives.css";
import "../styles/diamondDS/diamond-tokens-semantic.css";

import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { CSSObject } from "@mui/material/styles";

import type { ButtonProps } from "@mui/material/Button";
import type { ChipProps } from "@mui/material/Chip";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { InputProps } from "@mui/material/Input";
import type { FilledInputProps } from "@mui/material/FilledInput";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";

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

declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    paper: string;
    surface1?: string;
    surface2?: string;
  }

  interface Palette {
    brand?: PaletteColor;
    border: {
      subtle: string;
      emphasis: string;
      strong: string;
    };
  }

  interface PaletteOptions {
    brand?: SimplePaletteColorOptions;
    border?: {
      subtle?: string;
      emphasis?: string;
      strong?: string;
    };
  }

  interface PaletteColor {
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
    bgCanvas?: string;
    bgSurface1?: string;
    bgSurface2?: string;
  }

  interface SimplePaletteColorOptions {
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
    bgCanvas?: string;
    bgSurface1?: string;
    bgSurface2?: string;
  }

  interface TypeText {
    placeholder?: string;
    placeholderFocus?: string;
  }
}

export type DSMode = "light" | "dark";

type MuiIntent = "primary" | "secondary" | "error" | "warning" | "info" | "success";

function resolveIntentPalette(theme: Theme, colour: MuiIntent) {
  const t = theme as any;
  return t.vars?.palette?.[colour] ?? (theme.palette as any)[colour];
}

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
        src: mode === "dark" ? (logoImageDark ?? logoImageLight) : logoImageLight,
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
        disabled: "var(--ds-overlay-disabled)",
        disabledBackground: "var(--ds-overlay-disabled-bg)",
        selectedChannel: undefined,
        hoverOpacity: 0.12,
        selectedOpacity: 0.16,
        disabledOpacity: 0.38,
        focusOpacity: 0.16,
      },

      text: {
        primary: "var(--ds-fg-default)",
        secondary: "var(--ds-fg-muted)",
        disabled: "var(--ds-fg-disabled)",
        primaryChannel: "var(--ds-olive-12Channel)",
        secondaryChannel: "var(--ds-olive-11Channel)",
        placeholder: "var(--ds-fg-placeholder)",
        placeholderFocus: "var(--ds-olive-9)",
      },

      background: {
        default: "var(--ds-bg-canvas)",
        paper: "var(--ds-bg-paper)",
        surface1: "var(--ds-bg-surface-1)",
        surface2: "var(--ds-bg-surface-2)",
        defaultChannel: "var(--ds-olive-1Channel)",
        paperChannel: "var(--ds-whiteChannel)",
      },

      primaryChannel: "var(--ds-indigo-9Channel)",

      divider: "var(--ds-border-subtle)",
      dividerInverse: "var(--ds-white-a4)",
      dividerChannel: "var(--ds-olive-6Channel)",

      border: {
        subtle: "var(--ds-border-subtle)",
        emphasis: "var(--ds-border-emphasis)",
        strong: "var(--ds-border-strong)",
      },

      primary: {
        light: "var(--ds-indigo-8)",
        main: "var(--ds-indigo-9)",
        dark: "var(--ds-indigo-10)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-indigo-9Channel)",
        lightChannel: "var(--ds-indigo-8Channel)",
        darkChannel: "var(--ds-indigo-10Channel)",
        bgCanvas: "var(--ds-indigo-1)",
        bgSurface1: "var(--ds-indigo-2)",
        bgSurface2: "var(--ds-indigo-3)",
      },

      secondary: {
        light: "var(--ds-navy-8)",
        main: "var(--ds-navy-9)",
        dark: "var(--ds-navy-10)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-navy-9Channel)",
        lightChannel: "var(--ds-navy-8Channel)",
        darkChannel: "var(--ds-navy-10Channel)",
        bgCanvas: "var(--ds-navy-1)",
        bgSurface1: "var(--ds-navy-2)",
        bgSurface2: "var(--ds-navy-3)",
      },

      brand: {
        main: "var(--ds-bg-brand)",
        light: "var(--ds-navy-9)",
        contrastText: "var(--ds-fg-on-solid)",
      },

      error: {
        light: "var(--ds-red-8)",
        main: "var(--ds-red-9)",
        dark: "var(--ds-red-10)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-red-9Channel)",
        lightChannel: "var(--ds-red-8Channel)",
        darkChannel: "var(--ds-red-10Channel)",
        bgCanvas: "var(--ds-red-1)",
        bgSurface1: "var(--ds-red-2)",
        bgSurface2: "var(--ds-red-3)",
      },

      warning: {
        light: "var(--ds-orange-8)",
        main: "var(--ds-orange-9)",
        dark: "var(--ds-orange-10)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-orange-9Channel)",
        lightChannel: "var(--ds-orange-8Channel)",
        darkChannel: "var(--ds-orange-10Channel)",
        bgCanvas: "var(--ds-orange-1)",
        bgSurface1: "var(--ds-orange-2)",
        bgSurface2: "var(--ds-orange-3)",
      },

      success: {
        light: "var(--ds-green-8)",
        main: "var(--ds-green-9)",
        dark: "var(--ds-green-10)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-green-9Channel)",
        lightChannel: "var(--ds-green-8Channel)",
        darkChannel: "var(--ds-green-10Channel)",
        bgCanvas: "var(--ds-green-1)",
        bgSurface1: "var(--ds-green-2)",
        bgSurface2: "var(--ds-green-3)",
      },

      info: {
        light: "var(--ds-cyan-8)",
        main: "var(--ds-cyan-9)",
        dark: "var(--ds-cyan-10)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-cyan-9Channel)",
        lightChannel: "var(--ds-cyan-8Channel)",
        darkChannel: "var(--ds-cyan-10Channel)",
        bgCanvas: "var(--ds-cyan-1)",
        bgSurface1: "var(--ds-cyan-2)",
        bgSurface2: "var(--ds-cyan-3)",
      },

      grey: {
        50: "var(--ds-olive-2)",
        100: "var(--ds-olive-3)",
        200: "var(--ds-olive-4)",
        300: "var(--ds-olive-5)",
        400: "var(--ds-olive-7)",
        500: "var(--ds-olive-8)",
        600: "var(--ds-olive-9)",
        700: "var(--ds-olive-11)",
        800: "var(--ds-olive-10)",
        900: "var(--ds-olive-12)",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }: { ownerState: ButtonProps; theme: Theme }): CSSObject => {
            const base: CSSObject = { textTransform: "none" };

            const variant = ownerState.variant ?? "text";
            const rawColour = ownerState.color ?? "primary";
            if (rawColour === "inherit") return base;

            const colour = rawColour as MuiIntent;

            // Semantic tokens cover all intents — map colour to token segment
            const intentOutlinedFg = `var(--ds-intent-${colour}-outlined-fg)`;
            const intentOutlinedBorder = `var(--ds-intent-${colour}-outlined-border)`;

            if (variant === "outlined") {
              return {
                ...base,
                color: intentOutlinedFg,
                borderColor: intentOutlinedBorder,
                "&:hover": {
                  borderColor: `var(--ds-intent-${colour}-outlined-border-hover)`,
                },
              } as CSSObject;
            }

            if (variant === "text") {
              return {
                ...base,
                color: intentOutlinedFg, // step 11 — same fg works for text variant
              } as CSSObject;
            }

            return base;
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: ({ ownerState }: { ownerState: ChipProps }): CSSObject => {
            const base: CSSObject = {
              "& .MuiChip-icon, & .MuiChip-deleteIcon": { color: "currentColor" },
            };

            const isDefault = (ownerState.color ?? "default") === "default";
            const isOutlined = ownerState.variant === "outlined";
            const isInteractive = !!(ownerState.clickable || ownerState.onDelete);

            if (isDefault) {
              return {
                ...base,
                color: "var(--ds-fg-default)",
                borderColor: "var(--ds-border-emphasis)",
                backgroundColor: isOutlined ? "transparent" : "var(--ds-bg-surface-2)",
                ...(isInteractive && {
                  "&:hover": {
                    backgroundColor: isOutlined ? "var(--ds-bg-hover)" : "var(--ds-bg-surface-2)",
                  },
                }),
              } as CSSObject;
            }

            return base;
          },

          // All outlined intent variants resolved via semantic tokens
          outlinedPrimary: (): CSSObject => chipOutlined("primary"),
          outlinedSecondary: (): CSSObject => chipOutlined("secondary"),
          outlinedError: (): CSSObject => chipOutlined("error"),
          outlinedWarning: (): CSSObject => chipOutlined("warning"),
          outlinedInfo: (): CSSObject => chipOutlined("info"),
          outlinedSuccess: (): CSSObject => chipOutlined("success"),
        },
      },

      MuiCheckbox: {
        defaultProps: {
          icon: React.createElement(DsCheckboxBlankIcon),
          checkedIcon: React.createElement(DsCheckboxCheckedIcon),
          indeterminateIcon: React.createElement(DsCheckboxIndeterminateIcon),
        },
        styleOverrides: {
          root: ({ ownerState, theme }: { ownerState: CheckboxProps; theme: Theme }): CSSObject => {
            const base: CSSObject = {
              "&:hover, &.Mui-focusVisible": { backgroundColor: "transparent" },
            };

            if (ownerState.disabled) {
              return {
                ...base,
                color: "var(--ds-fg-disabled)",
                "--ds-checkbox-box-fill": "none",
                "--ds-checkbox-box-stroke": "var(--ds-fg-disabled)",
                "--ds-checkbox-box-strokeWidth": "2",
                "--ds-checkbox-glyph": "var(--ds-fg-disabled)",
              } as unknown as CSSObject;
            }

            const raw = (ownerState.color ?? "default") as "default" | MuiIntent;
            const isDefault = raw === "default";
            const colour = raw as Exclude<typeof raw, "default">;

            const p = !isDefault ? resolveIntentPalette(theme, colour) : null;
            const selectedMain = isDefault ? "var(--ds-olive-9)" : p?.main;
            const selectedMainChannel = isDefault ? null : p?.mainChannel;

            return {
              ...base,

              "&:not(.Mui-checked):not(.MuiCheckbox-indeterminate)": {
                color: "var(--ds-olive-9)",
                "--ds-checkbox-box-fill": "none",
                "--ds-checkbox-box-stroke": "var(--ds-olive-9)",
                "--ds-checkbox-box-strokeWidth": "2",
              },

              "&.Mui-checked": {
                color: selectedMain,
                "--ds-checkbox-box-fill": "currentColor",
                "--ds-checkbox-box-stroke": "none",
                "--ds-checkbox-box-strokeWidth": "0",
                "--ds-checkbox-glyph": "var(--ds-fg-on-solid)",
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

      MuiInput: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<InputProps>) => {
            const colour = (ownerState.color ?? "primary") as MuiIntent;

            return {
              "&:before": {
                borderBottomColor: "var(--ds-border-emphasis)",
              },
              "&:hover:not(.Mui-disabled):not(.Mui-error):before": {
                borderBottomColor: "var(--ds-border-strong)",
              },
              "&.Mui-focused:not(.Mui-error):after": {
                borderBottomColor: `var(--ds-border-focus-${colour})`,  // ← dynamic
                borderBottomWidth: 2,
              },
              "&.Mui-error:before": {
                borderColor: "var(--ds-intent-error-subtle-border)",
              },
              "&.Mui-error:hover:not(.Mui-disabled):before": {
                borderBottomColor: "var(--ds-border-emphasis-error)",
              },
              "&.Mui-error.Mui-focused:after": {
                borderBottomColor: "var(--ds-border-focus-error)",
                borderBottomWidth: 2,
              },
              "&.Mui-disabled:before": {
                borderBottomStyle: "solid",
                borderBottomColor: "var(--ds-border-disabled)",
              },
            };
          },
          // ...
        },
      },

      MuiInputBase: {
        styleOverrides: {
          input: ({ theme }: ThemeOnlyArgs) => ({
            "&::placeholder, &::-webkit-input-placeholder, &::-moz-placeholder": {
              color: theme.palette.text.placeholder,
              opacity: 1,
            },
            "&:focus::placeholder, &:focus::-webkit-input-placeholder, &:focus::-moz-placeholder": {
              color: theme.palette.text.placeholderFocus,
            },
          }),

          root: ({ theme }: ThemeOnlyArgs) => ({
            "&.Mui-error input::placeholder, &.Mui-error input::-webkit-input-placeholder, &.Mui-error input::-moz-placeholder": {
              color: "var(--ds-intent-error-subtle-fg)",
              opacity: 1,
            },
            "&.Mui-disabled input::placeholder, &.Mui-disabled input::-webkit-input-placeholder, &.Mui-disabled input::-moz-placeholder": {
              color: theme.palette.text.disabled,
              opacity: 1,
            },
          }),
        },
      },

      MuiFilledInput: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<FilledInputProps>) => {
            const colour = (ownerState.color ?? "primary") as MuiIntent;

            return {
              backgroundColor: "var(--ds-bg-surface-2)",
              "&:hover:not(.Mui-disabled)": {
                backgroundColor: "var(--ds-bg-hover)",
              },
              "&:before": {
                borderBottomColor: "var(--ds-border-emphasis)",
              },
              "&:hover:not(.Mui-disabled):not(.Mui-error):before": {
                borderBottomColor: "var(--ds-border-strong)",
              },
              "&.Mui-focused:not(.Mui-error):after": {
                borderBottomColor: `var(--ds-border-focus-${colour})`,  // ← dynamic
                borderBottomWidth: 2,
              },
              "&.Mui-error:before": {
                borderColor: "var(--ds-intent-error-subtle-border)",
              },
              "&.Mui-error:hover:not(.Mui-disabled):before": {
                borderBottomColor: "var(--ds-border-emphasis-error)",
              },
              "&.Mui-error.Mui-focused:after": {
                borderBottomColor: "var(--ds-border-focus-error)",
                borderBottomWidth: 2,
              },
              "&.Mui-disabled": {
                backgroundColor: "var(--ds-bg-disabled)",
                color: "var(--ds-fg-disabled)",
                borderColor: "var(--ds-border-disabled)",
              },
            };
          },
          // ...
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<OutlinedInputProps>) => {
            const colour = (ownerState.color ?? "primary") as MuiIntent;

            return {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--ds-border-emphasis)",
              },
              "&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--ds-border-strong)",
              },
              "&.Mui-focused:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
                borderColor: `var(--ds-border-focus-${colour})`,
                borderWidth: 2,
              },
              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--ds-intent-error-subtle-border)",
              },
              "&.Mui-error:hover:not(.Mui-disabled):not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--ds-border-emphasis-error)",
              },
              "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--ds-border-focus-error)",
                borderWidth: 2,
              },
              "&.Mui-disabled": {
                backgroundColor: "var(--ds-bg-disabled)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--ds-border-disabled)",
                },
              },
            };
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: () => ({
            "&:not(.MuiInputLabel-shrink)": {
              color: "var(--ds-fg-muted)",
            },
            "&.Mui-disabled:not(.MuiInputLabel-shrink)": {
              color: "var(--ds-fg-disabled)",
            },
            "&.Mui-focused": {
              color: "var(--ds-intent-primary-label)",
            },
            "&.Mui-focused.MuiFormLabel-colorSecondary": {
              color: "var(--ds-intent-secondary-label)",
            },
            "&.Mui-focused.MuiFormLabel-colorSuccess": {
              color: "var(--ds-intent-success-label)",
            },
            "&.Mui-focused.MuiFormLabel-colorWarning": {
              color: "var(--ds-intent-warning-label)",
            },
            "&.Mui-focused.MuiFormLabel-colorError": {
              color: "var(--ds-intent-error-label)",
            },
            "&.Mui-focused.MuiFormLabel-colorInfo": {
              color: "var(--ds-intent-info-label)",
            },
            "&.Mui-focused.Mui-error": {
              color: "var(--ds-intent-error-label)",
            },
            "&.Mui-disabled": {
              color: "var(--ds-fg-disabled)",
            },
          }),
        },
      },
    },
  });

  return createTheme(DiamondDSThemeOptions);
};

// Chip outlined helper — no theme access needed, pure semantic tokens
function chipOutlined(colour: MuiIntent): CSSObject {
  return {
    color: `var(--ds-intent-${colour}-outlined-fg)`,
    borderColor: `var(--ds-intent-${colour}-outlined-border)`,
    "&:hover": {
      borderColor: `var(--ds-intent-${colour}-outlined-border-hover)`,
    },
  };
}

export const DiamondDSTheme = createMuiTheme("light");
export const DiamondDSThemeDark = createMuiTheme("dark");