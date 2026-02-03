import "../styles/diamondDS/diamond-colors-primitives.css";

import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { CSSObject } from "@mui/material/styles";

import type { ButtonProps } from "@mui/material/Button";
import type { ChipProps } from "@mui/material/Chip";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { InputProps } from "@mui/material/Input";
import type { InputBaseProps } from "@mui/material/InputBase";
import type { FilledInputProps } from "@mui/material/FilledInput";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import type { InputLabelProps } from "@mui/material/InputLabel";

import { dark } from "@mui/material/styles/createPalette";

type OverrideArgs<OwnerState = unknown> = {
  ownerState: OwnerState;
  theme: Theme;
};
type ThemeOnlyArgs = { theme: Theme };

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

/** MUI module augmentation for custom properties */
declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    paper: string;
    surface1?: string;
    surface2?: string;
  }

  interface Palette {
    brand?: PaletteColor;
    
    borders: {
      subtle: string;
      strong: string;
      emphasis: string;
    };
  }

  interface PaletteOptions {
    brand?: SimplePaletteColorOptions;

    borders?: {
      subtle?: string;
      strong?: string;
      emphasis?: string;
    };    
  }

  interface PaletteColor {
    lighter?: string;
    darkest?: string;
    darker?: string;
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;

    bgCanvas?: string;
    bgSurface1?: string;
    bgSurface2?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darkest?: string;
    darker?: string;
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

      // Prevent "Material dark overlays" by defining action tokens from primitives
      action: {
        hover: "var(--ds-overlay-hover)",
        selected: "var(--ds-overlay-selected)",
        focus: "var(--ds-overlay-focus)",
        disabled: "var(--ds-overlay-disabled)",
        disabledBackground: "var(--ds-overlay-disabled-bg)",

        hoverOpacity: 0.12,
        selectedOpacity: 0.16,
        disabledOpacity: 0.38,
        focusOpacity: 0.16,
      },

      text: {
        primary: "var(--ds-olive-12)", // main text, input value
        secondary: "var(--ds-olive-11)", // secondary text, helper text, labels
        disabled: "var(--ds-olive-9)", // disabled text

        placeholder: "var(--ds-olive-10)",        // default hint text (if not secondary)
        placeholderFocus: "var(--ds-olive-9)",   // optional, calmer on focus
      },

      background: {
        default: "var(--ds-bg-canvas)", // page background
        paper: "var(--ds-bg-paper)", //  cards, sheets, menus, etc. 
        surface1: "var(--ds-bg-surface-1)", // e.g. cards
        surface2: "var(--ds-bg-surface-2)", // e.g. inputs, outlined containers
      },

      divider: "var(--ds-border-subtle)", // Framework-level structural separator
      dividerInverse: "var(--ds-white-a4)",

      borders: {
        subtle: "var(--ds-border-subtle)", // Structural, non-interactive boundaries
        strong: "var(--ds-border-strong)", // Interactive baseline 
        emphasis: "var(--ds-border-emphasis)", // Interactive emphasis
      },

      primary: {
        lighter: "var(--ds-indigo-7)",        
        light: "var(--ds-indigo-8)",
        main: "var(--ds-indigo-9)",
        dark: "var(--ds-indigo-10)",
        darker: "var(--ds-indigo-11)",
        darkest: "var(--ds-indigo-12)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-indigo-9Channel)",
        lightChannel: "var(--ds-indigo-8Channel)",
        darkChannel: "var(--ds-indigo-10Channel)",

        bgCanvas: "var(--ds-indigo-1)",
        bgSurface1: "var(--ds-indigo-2)",
        bgSurface2: "var(--ds-indigo-3)",
      },

      secondary: {
        lighter: "var(--ds-navy-7)",        
        light: "var(--ds-navy-8)",
        main: "var(--ds-navy-9)",
        dark: "var(--ds-navy-10)",
        darker: "var(--ds-navy-11)",
        darkest: "var(--ds-navy-12)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-navy-9Channel)",
        lightChannel: "var(--ds-navy-8Channel)",
        darkChannel: "var(--ds-navy-10Channel)",

        bgCanvas: "var(--ds-navy-1)",
        bgSurface1: "var(--ds-navy-2)",
        bgSurface2: "var(--ds-navy-3)",
      },

      brand: { // Brand colore (same as ds-navy-10) for background use
        main: "var(--ds-bg-brand)", // Stays the same on light/dark modes
        contrastText: "var(--ds-fg-fixed-white)",
      },

      error: {
        lighter: "var(--ds-red-7)",
        light: "var(--ds-red-8)",
        main: "var(--ds-red-9)",
        dark: "var(--ds-red-10)",
        darker: "var(--ds-red-11)",
        darkest: "var(--ds-red-12)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-red-9Channel)",
        lightChannel: "var(--ds-red-8Channel)",
        darkChannel: "var(--ds-red-10Channel)",

        bgCanvas: "var(--ds-red-1)",
        bgSurface1: "var(--ds-red-2)",
        bgSurface2: "var(--ds-red-3)",
      },

      warning: {
        lighter: "var(--ds-orange-7)",
        light: "var(--ds-orange-8)",
        main: "var(--ds-orange-9)",
        dark: "var(--ds-orange-10)",
        darker: "var(--ds-orange-11)",
        darkest: "var(--ds-orange-12)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-orange-9Channel)",
        lightChannel: "var(--ds-orange-8Channel)",
        darkChannel: "var(--ds-orange-10Channel)",

        bgCanvas: "var(--ds-orange-1)",
        bgSurface1: "var(--ds-orange-2)",
        bgSurface2: "var(--ds-orange-3)",
      },

      success: {
        lighter: "var(--ds-green-7)",
        light: "var(--ds-green-8)",
        main: "var(--ds-green-9)",
        dark: "var(--ds-green-10)",
        darker: "var(--ds-green-11)",
        darkest: "var(--ds-green-12)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-green-9Channel)",
        lightChannel: "var(--ds-green-8Channel)",
        darkChannel: "var(--ds-green-10Channel)",

        bgCanvas: "var(--ds-green-1)",
        bgSurface1: "var(--ds-green-2)",
        bgSurface2: "var(--ds-green-3)",
      },

      info: {
        main: "var(--ds-indigo-9)",
        light: "var(--ds-indigo-8)",
        dark: "var(--ds-indigo-10)",
        darker: "var(--ds-indigo-11)",
        darkest: "var(--ds-indigo-12)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-indigo-9Channel)",
        lightChannel: "var(--ds-indigo-8Channel)",
        darkChannel: "var(--ds-indigo-10Channel)",

        bgCanvas: "var(--ds-indigo-1)",
        bgSurface1: "var(--ds-indigo-2)",
        bgSurface2: "var(--ds-indigo-3)",
      },

      grey: {
        50: "var(--ds-olive-1)",
        100: "var(--ds-olive-2)",
        200: "var(--ds-olive-3)",
        300: "var(--ds-olive-4)",
        400: "var(--ds-olive-5)",
        500: "var(--ds-olive-6)",
        600: "var(--ds-olive-7)",
        700: "var(--ds-olive-8)",
        800: "var(--ds-olive-9)",
        900: "var(--ds-olive-10)",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: (
            { ownerState, theme }: { ownerState: ButtonProps; theme: Theme }
          ): CSSObject => {
            const base: CSSObject = { textTransform: "none" };

            const variant = ownerState.variant ?? "text";

            const rawColour = ownerState.color ?? "primary";
            if (rawColour === "inherit") return base;

            const colour = rawColour as
              | "primary"
              | "secondary"
              | "error"
              | "warning"
              | "info"
              | "success";

            const varsPalette = (theme as any).vars?.palette?.[colour];
            const fallbackPalette = (theme.palette as any)[colour];

            const darker =
              varsPalette?.darker ??
              fallbackPalette?.darker ??
              varsPalette?.dark ??
              fallbackPalette?.dark;

            const mainChannel =
              varsPalette?.mainChannel ?? fallbackPalette?.mainChannel;

            if (variant === "outlined") {
              return {
                ...base,
                ...(darker && {
                  "--variant-outlinedColor": darker,
                  color: darker,
                }),
                ...(mainChannel && {
                  "--variant-outlinedBorder": `rgba(${mainChannel} / 0.7)`,
                  borderColor: `rgba(${mainChannel} / 0.7)`,
                }),
              } as CSSObject;
            }

            if (variant === "text") {
              return {
                ...base,
                ...(darker && { "--variant-textColor": darker, color: darker }),
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
                color: "var(--ds-olive-12)",
                borderColor: "var(--ds-border-strong)",
                backgroundColor: isOutlined ? "transparent" : "var(--ds-olive-4)",

                ...(isInteractive && {
                  "&:hover": {
                    backgroundColor: isOutlined
                      ? "var(--ds-overlay-hover)"
                      : "var(--ds-olive-5)",
                  },
                }),
              } as CSSObject;
            }

            return base;
          },

          outlinedPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.primary.darker ?? theme.palette.primary.dark,
            borderColor: `rgba(${theme.palette.primary.darkChannel ?? theme.palette.primary.mainChannel} / 0.7)`,
          }),
          outlinedSecondary: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.secondary.dark,
            borderColor: `rgba(${theme.palette.secondary.darkChannel ?? theme.palette.secondary.mainChannel} / 0.7)`,
          }),
          outlinedError: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.error.darker ?? theme.palette.error.dark,
            borderColor: `rgba(${theme.palette.error.darkChannel ?? theme.palette.error.mainChannel} / 0.7)`,
          }),
          outlinedWarning: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.warning.darker ?? theme.palette.warning.dark,
            borderColor: `rgba(${theme.palette.warning.darkChannel ?? theme.palette.warning.mainChannel} / 0.7)`,
          }),
          outlinedInfo: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.info.darker ?? theme.palette.info.dark,
            borderColor: `rgba(${theme.palette.info.darkChannel ?? theme.palette.info.mainChannel} / 0.7)`,
          }),
          outlinedSuccess: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.success.darker ?? theme.palette.success.dark,
            borderColor: `rgba(${theme.palette.success.darkChannel ?? theme.palette.success.mainChannel} / 0.7)`,
          }),
        },
      },

      MuiCheckbox: {
        defaultProps: {
          icon: React.createElement(DsCheckboxBlankIcon),
          checkedIcon: React.createElement(DsCheckboxCheckedIcon),
          indeterminateIcon: React.createElement(DsCheckboxIndeterminateIcon),
        },
        styleOverrides: {
          root: (
            { ownerState, theme }: { ownerState: CheckboxProps; theme: Theme }
          ): CSSObject => {
            const base: CSSObject = {
              "&:hover, &.Mui-focusVisible": { backgroundColor: "transparent" },
            };

            // Disabled wins over everything
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

            const raw = (ownerState.color ?? "default") as
              | "default"
              | "primary"
              | "secondary"
              | "error"
              | "warning"
              | "info"
              | "success";

            const isDefault = raw === "default";
            const colour = raw as Exclude<typeof raw, "default">;

            const varsPalette = !isDefault ? (theme as any).vars?.palette?.[colour] : null;
            const fallbackPalette = !isDefault ? (theme.palette as any)[colour] : null;

            const selectedMain = isDefault
              ? "var(--ds-olive-9)"
              : (varsPalette?.main ?? fallbackPalette?.main);

            const selectedMainChannel = isDefault
              ? null
              : (varsPalette?.mainChannel ?? fallbackPalette?.mainChannel);

            const uncheckedOutline = "var(--ds-olive-9)";

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
                "--ds-checkbox-glyph": "var(--ds-white)",
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

      // MUI Input focus color overrides 

      MuiInput: {
        styleOverrides: {
          root: ({ ownerState, theme }: OverrideArgs<InputProps>) => {
            const raw = ownerState.color ?? "primary";
            const colour = (ownerState.color ?? "primary") as
              | "primary"
              | "secondary"
              | "error"
              | "warning"
              | "info"
              | "success";

            const p = theme.palette[colour];

            return {
              // REST (interactive baseline)
              "&:before": {
                borderBottomColor: theme.palette.borders.strong,
              },

              // HOVER (neutral hover emphasis)
              "&:hover:not(.Mui-disabled):not(.Mui-error):before": {
                borderBottomColor: theme.palette.borders.emphasis,
              },

              // FOCUS (semantic colour + weight)
              "&.Mui-focused:not(.Mui-error):after": {
                borderBottomColor: p.light,
                borderBottomWidth: 2,
              },

              // ERROR (rest)
              "&.Mui-error:before": {
                borderColor: theme.palette.error.lighter ?? theme.palette.error.light,
              },

              // ERROR hover
              "&.Mui-error:hover:not(.Mui-disabled):before": {
                borderBottomColor: theme.palette.error.light,
              },

              // ERROR + FOCUS (semantic colour + weight)
              "&.Mui-error.Mui-focused:after": {
                borderBottomColor: theme.palette.error.light,
                borderBottomWidth: 2,
              },

              // DISABLED wins
              "&.Mui-disabled:before": {
                borderBottomStyle: "solid",
                borderBottomColor: "var(--ds-border-disabled)",
              },
            };
          },

          input: ({ theme }: ThemeOnlyArgs) => ({
            "&::placeholder": { color: theme.palette.text.placeholder, opacity: 1 },
            "&:focus::placeholder": { color: theme.palette.text.placeholderFocus },
          }),
        },
      },



      MuiInputBase: {
        styleOverrides: {
          input: ({ theme }: ThemeOnlyArgs) => ({
            "&::placeholder": { color: theme.palette.text.placeholder, opacity: 1 },
            "&::-webkit-input-placeholder": { color: theme.palette.text.placeholder, opacity: 1 },
            "&::-moz-placeholder": { color: theme.palette.text.placeholder, opacity: 1 },

            "&:focus::placeholder": { color: theme.palette.text.placeholderFocus },
            "&:focus::-webkit-input-placeholder": { color: theme.palette.text.placeholderFocus },
            "&:focus::-moz-placeholder": { color: theme.palette.text.placeholderFocus },
          }),

          root: ({ theme }: ThemeOnlyArgs) => ({
            "&.Mui-error input::placeholder, &.Mui-error input::-webkit-input-placeholder, &.Mui-error input::-moz-placeholder": {
              color: theme.palette.error.light,
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
        root: ({ ownerState, theme }: OverrideArgs<FilledInputProps>) => {
          const raw = ownerState.color ?? "primary";
          const colour = (ownerState.color ?? "primary") as
            | "primary"
            | "secondary"
            | "error"
            | "warning"
            | "info"
            | "success";

          const p = theme.palette[colour];

          return {
            backgroundColor: theme.palette.background.surface2,

            "&:hover:not(.Mui-disabled)": {
              backgroundColor: "var(--ds-overlay-hover)",
            },

            // REST (interactive baseline)
            "&:before": {
              borderBottomColor: theme.palette.borders.strong,
            },

            // HOVER (neutral hover emphasis)
            "&:hover:not(.Mui-disabled):not(.Mui-error):before": {
              borderBottomColor: theme.palette.borders.emphasis,
            },

            // FOCUS (semantic colour + weight)
            "&.Mui-focused:not(.Mui-error):after": {
              borderBottomColor: p.light,
              borderBottomWidth: 2,
            },

            // ERROR (rest)
            "&.Mui-error:before": {
               borderColor: theme.palette.error.lighter ?? theme.palette.error.light,
            },

            // ERROR hover
            "&.Mui-error:hover:not(.Mui-disabled):before": {
              borderBottomColor: theme.palette.error.light,
            },

            // ERROR + FOCUS
            "&.Mui-error.Mui-focused:after": {
              borderBottomColor: theme.palette.error.light,
              borderBottomWidth: 2,
            },

            // DISABLED wins
            "&.Mui-disabled": {
              backgroundColor: "var(--ds-bg-disabled)",
              color: "var(--ds-fg-disabled)",
              borderColor: "var(--ds-border-disabled)",
            },
          };
        },

        input: ({ theme }: ThemeOnlyArgs) => ({
          "&::placeholder": { color: theme.palette.text.placeholder, opacity: 1 },
          "&:focus::placeholder": { color: theme.palette.text.placeholderFocus },
        }),
      },
    },

      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ ownerState, theme }: OverrideArgs<OutlinedInputProps>) => {
            const raw = ownerState.color ?? "primary";
            const colour = (ownerState.color ?? "primary") as
            | "primary"
            | "secondary"
            | "error"
            | "warning"
            | "info"
            | "success";

            const p = theme.palette[colour];

            return {
              // REST (interactive baseline)
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.borders.strong,
              },

              // HOVER (neutral affordance) — ONLY when not focused + not error + not disabled
              "&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.borders.emphasis,
              },

              // FOCUS (semantic, and you want LIGHT)
              "&.Mui-focused:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
                borderColor: p.light,
                borderWidth: 2,
              },

              // Make sure FOCUSED + HOVER still uses semantic colour (belt & braces)
              "&.Mui-focused:hover:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
                borderColor: p.light,
                borderWidth: 2,
              },

              // ERROR (rest)
              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.error.lighter ?? theme.palette.error.light,
              },

              // ERROR hover
              "&.Mui-error:hover:not(.Mui-disabled):not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.error.light,
              },

              // ERROR focus 
              "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.error.light,
                borderWidth: 2,
              },

              // DISABLED wins
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
          root: ({ theme }: ThemeOnlyArgs) => ({
            "&:not(.MuiInputLabel-shrink)": {
              color: theme.palette.text.secondary,
            },
            "&.Mui-disabled:not(.MuiInputLabel-shrink)": {
              color: theme.palette.text.disabled,
            },

            "&.Mui-focused": {
              color: theme.palette.primary.darker ?? theme.palette.primary.dark,
            },

            "&.Mui-focused.MuiFormLabel-colorSecondary": {
              color: theme.palette.secondary.darker ?? theme.palette.secondary.dark,
            },
            "&.Mui-focused.MuiFormLabel-colorSuccess": {
              color: theme.palette.success.darker ?? theme.palette.success.dark,
            },
            "&.Mui-focused.MuiFormLabel-colorWarning": {
              color: theme.palette.warning.darker ?? theme.palette.warning.dark,
            },
            "&.Mui-focused.MuiFormLabel-colorError": {
              color: theme.palette.error.darker ?? theme.palette.error.dark,
            },
            "&.Mui-focused.MuiFormLabel-colorInfo": {
              color: theme.palette.info.darker ?? theme.palette.info.dark,
            },

            "&.Mui-focused.Mui-error": {
              color: theme.palette.error.darker ?? theme.palette.error.dark,
            },

            "&.Mui-disabled": {
              color: theme.palette.text.disabled,
            },
          }),
        },
      },
      
    },
  });

  return createTheme(DiamondDSThemeOptions);
};

export const DiamondDSTheme = createMuiTheme("light");
export const DiamondDSThemeDark = createMuiTheme("dark");