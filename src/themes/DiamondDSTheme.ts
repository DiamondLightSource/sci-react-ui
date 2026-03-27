import "../styles/diamondDS/diamond-ds-roles.css";

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
  hover?: string;
  container?: string;
  onContainer?: string;
  containerHover?: string;
  accent?: string;
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
      strong: string;
      emphasis: string;
    };
    surface: {
      subtle: string;
      strong: string;
      hover: string;
    };
  }

  interface PaletteOptions {
    brand?: SimplePaletteColorOptions;
    borders?: {
      subtle?: string;
      strong?: string;
      emphasis?: string;
    };
    surface?: {
      subtle?: string;
      strong?: string;
      hover?: string;
    };
  }

  interface PaletteColor {
    hover?: string;
    container?: string;
    onContainer?: string;
    containerHover?: string;
    accent?: string;
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
  }

  interface SimplePaletteColorOptions {
    hover?: string;
    container?: string;
    onContainer?: string;
    containerHover?: string;
    accent?: string;
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
  }
}

export type DSMode = "light" | "dark";

const getIntentPalette = (theme: Theme, colour: IntentColour): ExtendedPaletteColor => {
  const varsPalette = (theme as any).vars?.palette?.[colour] as ExtendedPaletteColor | undefined;
  const fallbackPalette = (theme.palette as any)[colour] as ExtendedPaletteColor | undefined;
  return {
    ...fallbackPalette,
    ...varsPalette,
  };
};

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
        hover: "var(--ds-surface-hover)",
        selected: "var(--ds-surface-container-high)",
        focus: "var(--ds-surface-hover)",
        disabled: "rgba(0 0 0 / 0.38)",
        disabledBackground: "rgba(0 0 0 / 0.12)",

        hoverOpacity: 0.12,
        selectedOpacity: 0.16,
        disabledOpacity: 0.38,
        focusOpacity: 0.16,
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

      divider: "var(--ds-outline-variant)",

      borders: {
        subtle: "var(--ds-outline-variant)",
        strong: "var(--ds-outline)",
        emphasis: "var(--ds-outline-emphasis)",
      },

      surface: {
        subtle: "var(--ds-surface-container)",
        strong: "var(--ds-surface-container-high)",
        hover: "var(--ds-surface-hover)",
      },

      primary: {
        light: "var(--ds-primary-accent)",
        main: "var(--ds-primary)",
        dark: "var(--ds-primary-hover)",
        hover: "var(--ds-primary-hover)",
        container: "var(--ds-primary-container)",
        onContainer: "var(--ds-on-primary-container)",
        containerHover: "var(--ds-primary-container-hover)",
        accent: "var(--ds-primary-accent)",
        contrastText: "var(--ds-on-primary)",
        mainChannel: "var(--ds-primary-mainChannel)",
        lightChannel: "var(--ds-primary-lightChannel)",
        darkChannel: "var(--ds-primary-darkChannel)",
      },

      secondary: {
        light: "var(--ds-secondary-accent)",
        main: "var(--ds-secondary)",
        dark: "var(--ds-secondary-hover)",
        hover: "var(--ds-secondary-hover)",
        container: "var(--ds-secondary-container)",
        onContainer: "var(--ds-on-secondary-container)",
        containerHover: "var(--ds-secondary-container-hover)",
        accent: "var(--ds-secondary-accent)",
        contrastText: "var(--ds-on-secondary)",
        mainChannel: "var(--ds-secondary-mainChannel)",
        lightChannel: "var(--ds-secondary-lightChannel)",
        darkChannel: "var(--ds-secondary-darkChannel)",
      },

      brand: {
        light: "var(--ds-brand-accent)",
        main: "var(--ds-brand)",
        dark: "var(--ds-brand-hover)",
        hover: "var(--ds-brand-hover)",
        container: "var(--ds-brand-container)",
        onContainer: "var(--ds-on-brand-container)",
        containerHover: "var(--ds-brand-container-hover)",
        accent: "var(--ds-brand-accent)",
        contrastText: "var(--ds-on-brand)",
        mainChannel: "var(--ds-brand-mainChannel)",
        lightChannel: "var(--ds-brand-lightChannel)",
        darkChannel: "var(--ds-brand-darkChannel)",
      },

      error: {
        light: "var(--ds-danger-accent)",
        main: "var(--ds-danger)",
        dark: "var(--ds-danger-hover)",
        hover: "var(--ds-danger-hover)",
        container: "var(--ds-danger-container)",
        onContainer: "var(--ds-on-danger-container)",
        containerHover: "var(--ds-danger-container-hover)",
        accent: "var(--ds-danger-accent)",
        contrastText: "var(--ds-on-danger)",
        mainChannel: "var(--ds-danger-mainChannel)",
        lightChannel: "var(--ds-danger-lightChannel)",
        darkChannel: "var(--ds-danger-darkChannel)",
      },

      warning: {
        light: "var(--ds-warning-accent)",
        main: "var(--ds-warning)",
        dark: "var(--ds-warning-hover)",
        hover: "var(--ds-warning-hover)",
        container: "var(--ds-warning-container)",
        onContainer: "var(--ds-on-warning-container)",
        containerHover: "var(--ds-warning-container-hover)",
        accent: "var(--ds-warning-accent)",
        contrastText: "var(--ds-on-warning)",
        mainChannel: "var(--ds-warning-mainChannel)",
        lightChannel: "var(--ds-warning-lightChannel)",
        darkChannel: "var(--ds-warning-darkChannel)",
      },

      success: {
        light: "var(--ds-success-accent)",
        main: "var(--ds-success)",
        dark: "var(--ds-success-hover)",
        hover: "var(--ds-success-hover)",
        container: "var(--ds-success-container)",
        onContainer: "var(--ds-on-success-container)",
        containerHover: "var(--ds-success-container-hover)",
        accent: "var(--ds-success-accent)",
        contrastText: "var(--ds-on-success)",
        mainChannel: "var(--ds-success-mainChannel)",
        lightChannel: "var(--ds-success-lightChannel)",
        darkChannel: "var(--ds-success-darkChannel)",
      },

      info: {
        light: "var(--ds-info-accent)",
        main: "var(--ds-info)",
        dark: "var(--ds-info-hover)",
        hover: "var(--ds-info-hover)",
        container: "var(--ds-info-container)",
        onContainer: "var(--ds-on-info-container)",
        containerHover: "var(--ds-info-container-hover)",
        accent: "var(--ds-info-accent)",
        contrastText: "var(--ds-on-info)",
        mainChannel: "var(--ds-info-mainChannel)",
        lightChannel: "var(--ds-info-lightChannel)",
        darkChannel: "var(--ds-info-darkChannel)",
      },

      grey: {
        50: "#F4F4F6",
        100: "#ECEDF0",
        200: "#E2E3E8",
        300: "#C9CBD3",
        400: "#9EA2AD",
        500: "#7A7E8A",
        600: "#60646C",
        700: "#4B4F5A",
        800: "#2C2F3C",
        900: "#1A1C23",
      },
    },

    components: {
      MuiButton: {
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

            if (rawColour === "inherit") return base;

            const colour = rawColour as IntentColour;
            const p = getIntentPalette(theme, colour);

            if (variant === "contained") {
              return {
                ...base,
                "&:hover": {
                  backgroundColor: p.hover ?? p.dark ?? p.main,
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
                color: p.main,
                borderColor: p.main,
                "&:hover": {
                  backgroundColor: p.containerHover ?? p.container ?? theme.palette.surface.hover,
                  borderColor: p.main,
                },
              };
            }

            if (variant === "text") {
              return {
                ...base,
                color: p.main,
                "&:hover": {
                  backgroundColor: p.containerHover ?? p.container ?? theme.palette.surface.hover,
                },
              };
            }

            return base;
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: ({ ownerState }: { ownerState: ChipProps }): CSSObject => {
            const base: CSSObject = {
              "& .MuiChip-icon, & .MuiChip-deleteIcon": {
                color: "currentColor",
              },
            };

            const isDefault = (ownerState.color ?? "default") === "default";
            const isOutlined = ownerState.variant === "outlined";
            const isInteractive = !!(ownerState.clickable || ownerState.onDelete);

            if (isDefault) {
              return {
                ...base,
                color: "var(--ds-on-surface)",
                borderColor: "var(--ds-outline)",
                backgroundColor: isOutlined ? "transparent" : "var(--ds-surface-container)",
                ...(isInteractive && {
                  "&:hover": {
                    backgroundColor: isOutlined
                      ? "var(--ds-surface-hover)"
                      : "var(--ds-surface-container-high)",
                  },
                }),
              } as CSSObject;
            }

            return base;
          },

          outlinedPrimary: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
          }),
          outlinedSecondary: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
          }),
          outlinedError: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
          }),
          outlinedWarning: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.warning.main,
            borderColor: theme.palette.warning.main,
          }),
          outlinedInfo: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.info.main,
            borderColor: theme.palette.info.main,
          }),
          outlinedSuccess: ({ theme }: { theme: Theme }): CSSObject => ({
            color: theme.palette.success.main,
            borderColor: theme.palette.success.main,
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
          root: ({
            ownerState,
            theme,
          }: {
            ownerState: CheckboxProps;
            theme: Theme;
          }): CSSObject => {
            const base: CSSObject = {
              "&:hover, &.Mui-focusVisible": {
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

            const raw = (ownerState.color ?? "default") as "default" | IntentColour;
            const isDefault = raw === "default";
            const colour = raw as IntentColour;
            const p = !isDefault ? getIntentPalette(theme, colour) : null;

            const selectedMain = isDefault ? theme.palette.text.secondary : p?.main;
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

      MuiInput: {
        styleOverrides: {
          root: ({ ownerState, theme }: OverrideArgs<InputProps>) => {
            const colour = (ownerState.color ?? "primary") as IntentColour;
            const p = getIntentPalette(theme, colour);

            return {
              "&:before": {
                borderBottomColor: theme.palette.borders.strong,
              },
              "&:hover:not(.Mui-disabled):not(.Mui-error):before": {
                borderBottomColor: theme.palette.borders.emphasis,
              },
              "&.Mui-focused:not(.Mui-error):after": {
                borderBottomColor: p.light,
                borderBottomWidth: 2,
              },
              "&.Mui-error:before": {
                borderColor: theme.palette.error.light,
              },
              "&.Mui-error:hover:not(.Mui-disabled):before": {
                borderBottomColor: theme.palette.error.light,
              },
              "&.Mui-error.Mui-focused:after": {
                borderBottomColor: theme.palette.error.light,
                borderBottomWidth: 2,
              },
              "&.Mui-disabled:before": {
                borderBottomStyle: "solid",
                borderBottomColor: theme.palette.divider,
              },
            };
          },

          input: ({ theme }: ThemeOnlyArgs) => ({
            "&::placeholder": {
              color: theme.palette.text.placeholder,
              opacity: 1,
            },
            "&:focus::placeholder": {
              color: theme.palette.text.placeholderFocus,
            },
          }),
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
            const colour = (ownerState.color ?? "primary") as IntentColour;
            const p = getIntentPalette(theme, colour);

            return {
              backgroundColor: theme.palette.surface.subtle,

              "&:hover:not(.Mui-disabled)": {
                backgroundColor: theme.palette.surface.hover,
              },

              "&:before": {
                borderBottomColor: theme.palette.borders.strong,
              },

              "&:hover:not(.Mui-disabled):not(.Mui-error):before": {
                borderBottomColor: theme.palette.borders.emphasis,
              },

              "&.Mui-focused:not(.Mui-error):after": {
                borderBottomColor: p.light,
                borderBottomWidth: 2,
              },

              "&.Mui-error:before": {
                borderColor: theme.palette.error.light,
              },

              "&.Mui-error:hover:not(.Mui-disabled):before": {
                borderBottomColor: theme.palette.error.light,
              },

              "&.Mui-error.Mui-focused:after": {
                borderBottomColor: theme.palette.error.light,
                borderBottomWidth: 2,
              },
            };
          },

          input: ({ theme }: ThemeOnlyArgs) => ({
            "&::placeholder": {
              color: theme.palette.text.placeholder,
              opacity: 1,
            },
            "&:focus::placeholder": {
              color: theme.palette.text.placeholderFocus,
            },
          }),
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ ownerState, theme }: OverrideArgs<OutlinedInputProps>) => {
            const colour = (ownerState.color ?? "primary") as IntentColour;
            const p = getIntentPalette(theme, colour);

            return {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.borders.strong,
              },

              "&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.borders.emphasis,
              },

              "&.Mui-focused:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
                borderColor: p.light,
                borderWidth: 2,
              },

              "&.Mui-focused:hover:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
                borderColor: p.light,
                borderWidth: 2,
              },

              "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.error.light,
              },

              "&.Mui-error:hover:not(.Mui-disabled):not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.error.light,
              },

              "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.error.light,
                borderWidth: 2,
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
    },
  });

  return createTheme(DiamondDSThemeOptions);
};

export const DiamondDSTheme = createMuiTheme("light");
export const DiamondDSThemeDark = createMuiTheme("dark");