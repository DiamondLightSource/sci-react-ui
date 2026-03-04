import "../styles/diamondDS/diamond-colors-primitives.css";
import "../styles/diamondDS/diamond-tokens-semantic.css";

import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { CSSObject } from "@mui/material/styles";

import type { AlertProps } from "@mui/material/Alert";
import type { AppBarProps } from "@mui/material/AppBar";
import type { ButtonProps } from "@mui/material/Button";
import type { ChipProps } from "@mui/material/Chip";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { InputProps } from "@mui/material/Input";
import type { FilledInputProps } from "@mui/material/FilledInput";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import type { RadioProps } from "@mui/material/Radio";
import type { SliderProps } from "@mui/material/Slider";
import type { SwitchProps } from "@mui/material/Switch";
import type { TabProps } from "@mui/material/Tab";

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
type AlertSeverity = "error" | "warning" | "info" | "success";
type AlertVariant = "standard" | "filled" | "outlined";

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
        light: "var(--ds-border-emphasis-primary)",
        main: "var(--ds-intent-primary-solid-bg)",
        dark: "var(--ds-intent-primary-solid-bg-hover)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-indigo-9Channel)",
        lightChannel: "var(--ds-indigo-8Channel)",
        darkChannel: "var(--ds-indigo-10Channel)",
        bgCanvas: "var(--ds-indigo-1)",
        bgSurface1: "var(--ds-indigo-2)",
        bgSurface2: "var(--ds-indigo-3)",
      },

      secondary: {
        light: "var(--ds-border-emphasis-navy)",
        main: "var(--ds-intent-navy-solid-bg)",
        dark: "var(--ds-intent-navy-solid-bg-hover)",
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
        light: "var(--ds-border-emphasis-red)",
        main: "var(--ds-intent-red-solid-bg)",
        dark: "var(--ds-intent-red-solid-bg-hover)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-red-9Channel)",
        lightChannel: "var(--ds-red-8Channel)",
        darkChannel: "var(--ds-red-10Channel)",
        bgCanvas: "var(--ds-red-1)",
        bgSurface1: "var(--ds-red-2)",
        bgSurface2: "var(--ds-red-3)",
      },

      warning: {
        light: "var(--ds-border-emphasis-orange)",
        main: "var(--ds-intent-orange-solid-bg)",
        dark: "var(--ds-intent-orange-solid-bg-hover)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-orange-9Channel)",
        lightChannel: "var(--ds-orange-8Channel)",
        darkChannel: "var(--ds-orange-10Channel)",
        bgCanvas: "var(--ds-orange-1)",
        bgSurface1: "var(--ds-orange-2)",
        bgSurface2: "var(--ds-orange-3)",
      },

      success: {
        light: "var(--ds-border-emphasis-green)",
        main: "var(--ds-intent-green-solid-bg)",
        dark: "var(--ds-intent-green-solid-bg-hover)",
        contrastText: "var(--ds-fg-on-solid)",
        mainChannel: "var(--ds-green-9Channel)",
        lightChannel: "var(--ds-green-8Channel)",
        darkChannel: "var(--ds-green-10Channel)",
        bgCanvas: "var(--ds-green-1)",
        bgSurface1: "var(--ds-green-2)",
        bgSurface2: "var(--ds-green-3)",
      },

      info: {
        light: "var(--ds-border-emphasis-cyan)",
        main: "var(--ds-intent-cyan-solid-bg)",
        dark: "var(--ds-intent-cyan-solid-bg-hover)",
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

      // ─── BUTTON ────────────────────────────────────────────────────────────

      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }: { ownerState: ButtonProps; theme: Theme }): CSSObject => {
            const base: CSSObject = { textTransform: "none" };

            const variant = ownerState.variant ?? "text";
            const rawColour = ownerState.color ?? "primary";
            if (rawColour === "inherit") return base;

            const colour = rawColour as MuiIntent;

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
                color: intentOutlinedFg,
              } as CSSObject;
            }

            return base;
          },
        },
      },

      // ─── CHIP ──────────────────────────────────────────────────────────────

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

          outlinedPrimary: (): CSSObject => chipOutlined("primary"),
          outlinedSecondary: (): CSSObject => chipOutlined("secondary"),
          outlinedError: (): CSSObject => chipOutlined("error"),
          outlinedWarning: (): CSSObject => chipOutlined("warning"),
          outlinedInfo: (): CSSObject => chipOutlined("info"),
          outlinedSuccess: (): CSSObject => chipOutlined("success"),
        },
      },

      // ─── CHECKBOX ─────────────────────────────────────────────────────────

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

      // ─── INPUT (standard) ─────────────────────────────────────────────────

      MuiInput: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<InputProps>) => {
            const colour = (ownerState.color ?? "primary") as MuiIntent;
            return {
              "&:before": { borderBottomColor: "var(--ds-border-emphasis)" },
              "&:hover:not(.Mui-disabled):not(.Mui-error):before": {
                borderBottomColor: "var(--ds-border-strong)",
              },
              "&.Mui-focused:not(.Mui-error):after": {
                borderBottomColor: `var(--ds-border-focus-${colour})`,
                borderBottomWidth: 2,
              },
              "&.Mui-error:before": { borderColor: "var(--ds-intent-error-subtle-border)" },
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
        },
      },

      // ─── INPUT BASE ───────────────────────────────────────────────────────

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

      // ─── FILLED INPUT ─────────────────────────────────────────────────────

      MuiFilledInput: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<FilledInputProps>) => {
            const colour = (ownerState.color ?? "primary") as MuiIntent;
            return {
              backgroundColor: "var(--ds-bg-surface-2)",
              "&:hover:not(.Mui-disabled)": { backgroundColor: "var(--ds-bg-hover)" },
              "&:before": { borderBottomColor: "var(--ds-border-emphasis)" },
              "&:hover:not(.Mui-disabled):not(.Mui-error):before": {
                borderBottomColor: "var(--ds-border-strong)",
              },
              "&.Mui-focused:not(.Mui-error):after": {
                borderBottomColor: `var(--ds-border-focus-${colour})`,
                borderBottomWidth: 2,
              },
              "&.Mui-error:before": { borderColor: "var(--ds-intent-error-subtle-border)" },
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
        },
      },

      // ─── OUTLINED INPUT ───────────────────────────────────────────────────

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

      // ─── INPUT LABEL ──────────────────────────────────────────────────────

      MuiInputLabel: {
        styleOverrides: {
          root: () => ({
            "&:not(.MuiInputLabel-shrink)": { color: "var(--ds-fg-muted)" },
            "&.Mui-disabled:not(.MuiInputLabel-shrink)": { color: "var(--ds-fg-disabled)" },
            "&.Mui-focused": { color: "var(--ds-intent-primary-label)" },
            "&.Mui-focused.MuiFormLabel-colorSecondary": { color: "var(--ds-intent-secondary-fg-muted)" },
            "&.Mui-focused.MuiFormLabel-colorSuccess": { color: "var(--ds-intent-success-fg-muted)" },
            "&.Mui-focused.MuiFormLabel-colorWarning": { color: "var(--ds-intent-warning-fg-muted)" },
            "&.Mui-focused.MuiFormLabel-colorError": { color: "var(--ds-intent-error-fg-muted)" },
            "&.Mui-focused.MuiFormLabel-colorInfo": { color: "var(--ds-intent-info-fg-muted)" },
            "&.Mui-focused.Mui-error": { color: "var(--ds-intent-error-fg-muted)" },
            "&.Mui-disabled": { color: "var(--ds-fg-disabled)" },
          }),
        },
      },

      // ─── SELECT ───────────────────────────────────────────────────────────
      // Trigger inherits OutlinedInput/FilledInput/Input overrides above.
      // These target the dropdown icon only; listbox is handled by MuiMenu.

      MuiSelect: {
        styleOverrides: {
          icon: (): CSSObject => ({
            color: "var(--ds-fg-muted)",
            "&.Mui-disabled": { color: "var(--ds-fg-disabled)" },
          }),
        },
      },

      // ─── MENU (Select & standalone) ───────────────────────────────────────

      MuiMenu: {
        styleOverrides: {
          paper: (): CSSObject => ({
            backgroundColor: "var(--ds-select-listbox-bg)",
            border: "1px solid var(--ds-border-subtle)",
            boxShadow:
              "0px 4px 6px -2px rgba(0,0,0,0.08), 0px 12px 16px -4px rgba(0,0,0,0.12)",
          }),
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: (): CSSObject => ({
            color: "var(--ds-fg-default)",
            "&:hover": { backgroundColor: "var(--ds-select-option-hover-bg)" },
            "&.Mui-selected": {
              backgroundColor: "var(--ds-select-option-selected-bg)",
              color: "var(--ds-select-option-selected-fg)",
              "&:hover": { backgroundColor: "var(--ds-select-option-focused-bg)" },
            },
            "&.Mui-focusVisible": { backgroundColor: "var(--ds-select-option-focused-bg)" },
            "&.Mui-disabled": { color: "var(--ds-fg-disabled)", opacity: 1 },
          }),
        },
      },

      // ─── AUTOCOMPLETE ─────────────────────────────────────────────────────

      MuiAutocomplete: {
        styleOverrides: {
          paper: (): CSSObject => ({
            backgroundColor: "var(--ds-select-listbox-bg)",
            border: "1px solid var(--ds-border-subtle)",
            boxShadow:
              "0px 4px 6px -2px rgba(0,0,0,0.08), 0px 12px 16px -4px rgba(0,0,0,0.12)",
          }),
          option: (): CSSObject => ({
            color: "var(--ds-fg-default)",
            '&[data-focus="true"], &.Mui-focused': {
              backgroundColor: "var(--ds-select-option-hover-bg)",
            },
            '&[aria-selected="true"]': {
              backgroundColor: "var(--ds-select-option-selected-bg)",
              color: "var(--ds-select-option-selected-fg)",
              '&[data-focus="true"]': {
                backgroundColor: "var(--ds-select-option-focused-bg)",
              },
            },
          }),
          noOptions: (): CSSObject => ({ color: "var(--ds-fg-muted)" }),
          loading: (): CSSObject => ({ color: "var(--ds-fg-muted)" }),
          clearIndicator: (): CSSObject => ({
            color: "var(--ds-fg-muted)",
            "&:hover": { color: "var(--ds-fg-default)" },
          }),
          popupIndicator: (): CSSObject => ({
            color: "var(--ds-fg-muted)",
            "&:hover": { color: "var(--ds-fg-default)" },
          }),
        },
      },

      // ─── SWITCH ───────────────────────────────────────────────────────────

      MuiSwitch: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<SwitchProps>): CSSObject => {
            const rawColour = ownerState.color ?? "primary";
            const trackCheckedBg =
              rawColour === "default" || rawColour === "inherit"
                ? "var(--ds-switch-track-checked)"
                : `var(--ds-intent-${rawColour}-solid-bg)`;

            return {
              "& .MuiSwitch-track": {
                backgroundColor: "var(--ds-switch-track-unchecked)",
                opacity: 1,
              },
              "& .MuiSwitch-thumb": {
                color: "var(--ds-fg-on-solid)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              },
              "& .MuiSwitch-switchBase.Mui-checked": {
                "& + .MuiSwitch-track": {
                  backgroundColor: trackCheckedBg,
                  opacity: 1,
                },
              },
              "& .MuiSwitch-switchBase.Mui-disabled": {
                "& .MuiSwitch-thumb": { color: "var(--ds-switch-thumb-disabled)" },
                "& + .MuiSwitch-track": {
                  backgroundColor: "var(--ds-switch-track-disabled)",
                  opacity: 1,
                },
              },
            } as CSSObject;
          },
        },
      },

      // ─── RADIO ────────────────────────────────────────────────────────────

      MuiRadio: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<RadioProps>): CSSObject => {
            if (ownerState.disabled) {
              return {
                color: "var(--ds-fg-disabled)",
                "--ds-radio-stroke": "var(--ds-radio-disabled-stroke)",
                "--ds-radio-fill": "var(--ds-radio-disabled-fill)",
              } as unknown as CSSObject;
            }

            const rawColour = ownerState.color ?? "primary";
            const checkedColor =
              rawColour === "default" || rawColour === "inherit"
                ? "var(--ds-olive-9)"
                : `var(--ds-intent-${rawColour}-solid-bg)`;

            return {
              "&:hover, &.Mui-focusVisible": { backgroundColor: "transparent" },
              "&:not(.Mui-checked)": {
                color: "var(--ds-radio-unchecked-stroke)",
                "--ds-radio-stroke": "var(--ds-radio-unchecked-stroke)",
                "--ds-radio-fill": "none",
              },
              "&.Mui-checked": {
                color: checkedColor,
                "--ds-radio-stroke": "none",
                "--ds-radio-fill": checkedColor,
                "--ds-radio-dot": "var(--ds-fg-on-solid)",
              },
            } as unknown as CSSObject;
          },
        },
      },

      // ─── SLIDER ───────────────────────────────────────────────────────────

      MuiSlider: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<SliderProps>): CSSObject => {
            const rawColour = ownerState.color ?? "primary";
            const accentColor =
              rawColour === "secondary"
                ? "var(--ds-intent-secondary-solid-bg)"
                : `var(--ds-intent-${rawColour}-solid-bg)`;
            const hoverShadow =
              rawColour === "secondary"
                ? "var(--ds-intent-secondary-subtle-bg)"
                : `var(--ds-intent-${rawColour}-subtle-bg)`;

            return {
              color: accentColor,
              "& .MuiSlider-rail": {
                backgroundColor: "var(--ds-slider-rail-color)",
                opacity: 1,
              },
              "& .MuiSlider-track": {
                backgroundColor: accentColor,
                borderColor: accentColor,
              },
              "& .MuiSlider-thumb": {
                backgroundColor: accentColor,
                "&:hover, &.Mui-focusVisible": { boxShadow: `0 0 0 8px ${hoverShadow}` },
                "&.Mui-active": { boxShadow: `0 0 0 12px ${hoverShadow}` },
              },
              "& .MuiSlider-mark": { backgroundColor: "var(--ds-slider-mark-color)" },
              "& .MuiSlider-markActive": { backgroundColor: "var(--ds-fg-on-solid)" },
              "& .MuiSlider-valueLabel": {
                backgroundColor: accentColor,
                color: "var(--ds-slider-value-label-fg)",
              },
              "&.Mui-disabled": {
                color: "var(--ds-slider-disabled-color)",
                "& .MuiSlider-track, & .MuiSlider-thumb": {
                  backgroundColor: "var(--ds-slider-disabled-color)",
                  borderColor: "var(--ds-slider-disabled-color)",
                },
                "& .MuiSlider-rail": { backgroundColor: "var(--ds-slider-disabled-color)" },
              },
            } as CSSObject;
          },
        },
      },

      // ─── ALERT ────────────────────────────────────────────────────────────

      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<AlertProps>): CSSObject => {
            const severity = (ownerState.severity ?? "info") as AlertSeverity;
            const variant = (ownerState.variant ?? "standard") as AlertVariant;

            if (variant === "standard") {
              return {
                backgroundColor: `var(--ds-alert-${severity}-bg)`,
                color: `var(--ds-alert-${severity}-fg)`,
                borderLeft: `3px solid var(--ds-alert-${severity}-border)`,
                "& .MuiAlert-icon": { color: `var(--ds-alert-${severity}-icon)` },
                "& .MuiAlert-action .MuiIconButton-root": {
                  color: `var(--ds-alert-${severity}-fg)`,
                },
              };
            }

            if (variant === "outlined") {
              return {
                backgroundColor: "transparent",
                color: `var(--ds-alert-${severity}-fg)`,
                borderColor: `var(--ds-alert-${severity}-border)`,
                "& .MuiAlert-icon": { color: `var(--ds-alert-${severity}-icon)` },
              };
            }

            // filled
            return {
              backgroundColor: `var(--ds-intent-${severity}-solid-bg)`,
              color: "var(--ds-fg-on-solid)",
              "& .MuiAlert-icon": { color: "var(--ds-fg-on-solid)" },
            };
          },
        },
      },

      // ─── TABS ─────────────────────────────────────────────────────────────

      MuiTabs: {
        styleOverrides: {
          root: (): CSSObject => ({
            borderBottom: "1px solid var(--ds-tabs-divider-color)",
          }),
          indicator: (): CSSObject => ({
            backgroundColor: "var(--ds-tabs-indicator-color)",
            height: 2,
          }),
        },
      },

      MuiTab: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<TabProps>): CSSObject => ({
            textTransform: "none",
            color: "var(--ds-tabs-tab-fg-inactive)",
            fontWeight: 500,
            minHeight: 44,
            "&:hover": {
              color: "var(--ds-tabs-tab-fg-active)",
              backgroundColor: "var(--ds-tabs-tab-hover-bg)",
            },
            "&.Mui-selected": {
              color: "var(--ds-tabs-tab-fg-active)",
              fontWeight: 600,
            },
            "&.Mui-disabled": {
              color: "var(--ds-tabs-tab-fg-disabled)",
            },
          }),
        },
      },

      // ─── APPBAR ───────────────────────────────────────────────────────────

      MuiAppBar: {
        styleOverrides: {
          root: ({ ownerState }: OverrideArgs<AppBarProps>): CSSObject => {
            const isBrand = ownerState.color === "primary" || ownerState.color === "secondary";
            return {
              backgroundColor: isBrand ? "var(--ds-appbar-brand-bg)" : "var(--ds-appbar-bg)",
              color: isBrand ? "var(--ds-appbar-brand-fg)" : "var(--ds-appbar-fg)",
              borderBottom: "1px solid var(--ds-appbar-border)",
              boxShadow: "none",
            };
          },
        },
      },

      // ─── DRAWER ───────────────────────────────────────────────────────────

      MuiDrawer: {
        styleOverrides: {
          paper: (): CSSObject => ({
            backgroundColor: "var(--ds-drawer-bg)",
            borderRight: "1px solid var(--ds-drawer-border)",
            boxShadow: "none",
          }),
        },
      },

      // ─── TABLE ────────────────────────────────────────────────────────────

      MuiTable: {
        styleOverrides: {
          root: (): CSSObject => ({
            borderCollapse: "separate",
            borderSpacing: 0,
          }),
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: (): CSSObject => ({
            "& .MuiTableCell-head": {
              backgroundColor: "var(--ds-table-header-bg)",
              color: "var(--ds-table-header-fg)",
              fontWeight: 600,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              borderBottom: "2px solid var(--ds-table-border)",
            },
          }),
        },
      },

      MuiTableBody: {
        styleOverrides: {
          root: (): CSSObject => ({
            "& .MuiTableRow-root:hover": {
              backgroundColor: "var(--ds-table-row-hover-bg)",
            },
            "& .MuiTableRow-root.Mui-selected": {
              backgroundColor: "var(--ds-table-row-selected-bg)",
              color: "var(--ds-table-row-selected-fg)",
              "&:hover": {
                backgroundColor: "var(--ds-table-row-selected-bg)",
                filter: "brightness(0.97)",
              },
            },
          }),
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: (): CSSObject => ({
            borderBottom: "1px solid var(--ds-table-border)",
            color: "var(--ds-fg-default)",
            padding: "12px 16px",
          }),
          footer: (): CSSObject => ({
            backgroundColor: "var(--ds-table-footer-bg)",
            borderTop: "2px solid var(--ds-table-border)",
            borderBottom: "none",
            color: "var(--ds-fg-muted)",
          }),
        },
      },

      // ─── TOOLTIP ──────────────────────────────────────────────────────────

      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
        styleOverrides: {
          tooltip: (): CSSObject => ({
            backgroundColor: "var(--ds-tooltip-bg)",
            color: "var(--ds-tooltip-fg)",
            fontSize: "0.75rem",
            fontWeight: 500,
            padding: "4px 10px",
            borderRadius: 6,
            maxWidth: 280,
          }),
          arrow: (): CSSObject => ({
            color: "var(--ds-tooltip-bg)",
          }),
        },
      },

      // ─── BADGE ────────────────────────────────────────────────────────────

      MuiBadge: {
        styleOverrides: {
          badge: ({ ownerState }: { ownerState: any }): CSSObject => {
            const rawColour = ownerState.color ?? "default";
            if (rawColour === "default") {
              return {
                backgroundColor: "var(--ds-badge-default-bg)",
                color: "var(--ds-badge-default-fg)",
              };
            }
            return {
              backgroundColor: `var(--ds-intent-${rawColour}-solid-bg)`,
              color: "var(--ds-fg-on-solid)",
            };
          },
        },
      },

      // ─── SNACKBAR ─────────────────────────────────────────────────────────

      MuiSnackbarContent: {
        styleOverrides: {
          root: (): CSSObject => ({
            backgroundColor: "var(--ds-snackbar-bg)",
            color: "var(--ds-snackbar-fg)",
            boxShadow:
              "0px 4px 6px -2px rgba(0,0,0,0.08), 0px 12px 16px -4px rgba(0,0,0,0.12)",
          }),
          action: (): CSSObject => ({
            "& .MuiButton-root, & .MuiIconButton-root": {
              color: "var(--ds-snackbar-action-fg)",
            },
          }),
        },
      },

      // ─── ACCORDION ────────────────────────────────────────────────────────

      MuiAccordion: {
        styleOverrides: {
          root: (): CSSObject => ({
            border: "1px solid var(--ds-accordion-border)",
            borderRadius: "6px !important",
            boxShadow: "none",
            marginBottom: 8,
            "&:before": { display: "none" },
            "&.Mui-expanded": {
              backgroundColor: "var(--ds-accordion-expanded-bg)",
              margin: "0 0 8px 0",
            },
          }),
        },
      },

      MuiAccordionSummary: {
        styleOverrides: {
          root: (): CSSObject => ({
            backgroundColor: "var(--ds-accordion-summary-bg)",
            "&:hover": { backgroundColor: "var(--ds-accordion-summary-hover-bg)" },
            "&.Mui-expanded": {
              minHeight: 48,
              borderBottom: "1px solid var(--ds-accordion-border)",
            },
          }),
          content: (): CSSObject => ({
            color: "var(--ds-fg-default)",
            fontWeight: 500,
          }),
          expandIconWrapper: (): CSSObject => ({
            color: "var(--ds-fg-muted)",
          }),
        },
      },

      MuiAccordionDetails: {
        styleOverrides: {
          root: (): CSSObject => ({
            backgroundColor: "var(--ds-accordion-details-bg)",
            padding: "16px",
            color: "var(--ds-fg-default)",
          }),
        },
      },

      // ─── NAV ITEM (ListItemButton) ────────────────────────────────────────

      MuiListItemButton: {
        styleOverrides: {
          root: (): CSSObject => ({
            borderRadius: 6,
            color: "var(--ds-nav-item-fg-default)",
            "&:hover": {
              backgroundColor: "var(--ds-nav-item-bg-hover)",
              color: "var(--ds-nav-item-fg-hover)",
            },
            "&.Mui-selected": {
              backgroundColor: "var(--ds-nav-item-bg-active)",
              color: "var(--ds-nav-item-fg-active)",
              "& .MuiListItemIcon-root": { color: "var(--ds-nav-item-icon-active)" },
              "&:hover": {
                backgroundColor: "var(--ds-nav-item-bg-active)",
                filter: "brightness(0.97)",
              },
            },
          }),
        },
      },

      MuiListItemIcon: {
        styleOverrides: {
          root: (): CSSObject => ({
            color: "var(--ds-fg-muted)",
            minWidth: 36,
          }),
        },
      },

      MuiListItemText: {
        styleOverrides: {
          primary: (): CSSObject => ({
            fontSize: "0.875rem",
            fontWeight: 500,
          }),
        },
      },

    }, // End of components
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
