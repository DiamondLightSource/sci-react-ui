import "../styles/diamondDS/diamond-colors-primitives.css";

import type {} from "@mui/material/themeCssVarsAugmentation";
import { createTheme, Theme } from "@mui/material/styles";

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

declare module "@mui/material/styles" {
  interface TypeBackground {
    surface1?: string;
    surface2?: string;
  }
  interface PaletteColor {
    bgCanvas?: string;
    bgSurface1?: string;
    bgSurface2?: string;
  }
  interface SimplePaletteColorOptions {
    bgCanvas?: string;
    bgSurface1?: string;
    bgSurface2?: string;
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

      // Prevent "Material dark overlays" by defining action tokens from primitives
      action: {
        hover: "var(--ds-overlay-hover)",
        selected: "var(--ds-overlay-selected)",
        focus: "var(--ds-overlay-focus)",
        disabled: "var(--ds-overlay-disabled)",
        disabledBackground: "var(--ds-overlay-disabled-bg)",

        hoverOpacity: 0.08,
        selectedOpacity: 0.12,
        disabledOpacity: 0.38,
        focusOpacity: 0.12,
      },

      text: {
        primary: "var(--ds-gray-12)",
        secondary: "var(--ds-gray-11)",
        disabled: "var(--ds-gray-8)",
      },

      background: {
        default: "var(--ds-bg-canvas)", // page / app shell
        paper: "var(--ds-bg-paper)", // cards, dialogs
        outlinedBg: "var(--ds-bg-surface-2)", // inputs, outlined containers
        surface1: "var(--ds-bg-surface-1)",
        surface2: "var(--ds-bg-surface-2)",
      },

      divider: "var(--ds-border-subtle)",
      dividerInverse: "var(--ds-white-a4)",

      primary: {
        main: "var(--ds-indigo-9)",
        light: "var(--ds-indigo-8)",
        dark: "var(--ds-indigo-10)",
        darker: "var(--ds-indigo-11)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-indigo-9Channel)",
        lightChannel: "var(--ds-indigo-8Channel)",
        darkChannel: "var(--ds-indigo-10Channel)",

        bgCanvas: "var(--ds-indigo-1)",
        bgSurface1: "var(--ds-indigo-2)",
        bgSurface2: "var(--ds-indigo-3)",
      },

      secondary: {
        main: "var(--ds-navy-9)",
        light: "var(--ds-navy-8)",
        dark: "var(--ds-navy-10)",
        darker: "var(--ds-navy-11)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-navy-9Channel)",
        lightChannel: "var(--ds-navy-8Channel)",
        darkChannel: "var(--ds-navy-10Channel)",

        bgCanvas: "var(--ds-navy-1)",
        bgSurface1: "var(--ds-navy-2)",
        bgSurface2: "var(--ds-navy-3)",
      },

      brand: {
        main: "var(--ds-navy-10)",
        light: "var(--ds-navy-9)",
        dark: "var(--ds-navy-11)",
        darker: "var(--ds-navy-12)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-navy-10Channel)",
        lightChannel: "var(--ds-navy-9Channel)",
        darkChannel: "var(--ds-navy-11Channel)",
      },

      error: {
        main: "var(--ds-red-10)",
        light: "var(--ds-red-9)",
        dark: "var(--ds-red-11)",
        darker: "var(--ds-red-11)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-red-9Channel)",
        lightChannel: "var(--ds-red-8Channel)",
        darkChannel: "var(--ds-red-10Channel)",

        bgCanvas: "var(--ds-red-1)",
        bgSurface1: "var(--ds-red-2)",
        bgSurface2: "var(--ds-red-3)",
      },

      warning: {
        main: "var(--ds-orange-10)",
        light: "var(--ds-orange-9)",
        dark: "var(--ds-orange-11)",
        darker: "var(--ds-orange-11)",
        contrastText: "var(--ds-fg-fixed-white)",

        mainChannel: "var(--ds-orange-9Channel)",
        lightChannel: "var(--ds-orange-8Channel)",
        darkChannel: "var(--ds-orange-10Channel)",

        bgCanvas: "var(--ds-orange-1)",
        bgSurface1: "var(--ds-orange-2)",
        bgSurface2: "var(--ds-orange-3)",
      },

      success: {
        main: "var(--ds-green-10)",
        light: "var(--ds-green-9)",
        dark: "var(--ds-green-11)",
        darker: "var(--ds-green-11)",
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
          root: ({ ownerState, theme }) => {
            const base = { textTransform: "none" as const };

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
              };
            }

            if (variant === "text") {
              return {
                ...base,
                ...(darker && { "--variant-textColor": darker, color: darker }),
              };
            }

            return base;
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: ({ ownerState }) => {
            const base = {
              "& .MuiChip-icon, & .MuiChip-deleteIcon": {
                color: "currentColor",
              },
            } as const;

            const isDefault = (ownerState.color ?? "default") === "default";
            const isOutlined = ownerState.variant === "outlined";
            const isInteractive = ownerState.clickable || ownerState.onDelete;

            if (isDefault) {
              return {
                ...base,
                color: "var(--ds-olive-12)",
                borderColor: "var(--ds-border-strong)",
                backgroundColor: isOutlined
                  ? "transparent"
                  : "var(--ds-olive-4)",

                ...(isInteractive && {
                  "&:hover": {
                    backgroundColor: isOutlined
                      ? "var(--ds-overlay-hover)"
                      : "var(--ds-olive-5)",
                  },
                }),
              };
            }

            return base;
          },

          outlinedPrimary: ({ theme }) => ({
            color: theme.palette.primary.darker ?? theme.palette.primary.dark,
            borderColor: `rgba(${theme.palette.primary.darkChannel ?? theme.palette.primary.mainChannel} / 0.7)`,
          }),
          outlinedSecondary: ({ theme }) => ({
            color: theme.palette.secondary.dark,
            borderColor: `rgba(${theme.palette.secondary.darkChannel ?? theme.palette.secondary.mainChannel} / 0.7)`,
          }),
          outlinedError: ({ theme }) => ({
            color: theme.palette.error.darker ?? theme.palette.error.dark,
            borderColor: `rgba(${theme.palette.error.darkChannel ?? theme.palette.error.mainChannel} / 0.7)`,
          }),
          outlinedWarning: ({ theme }) => ({
            color: theme.palette.warning.darker ?? theme.palette.warning.dark,
            borderColor: `rgba(${theme.palette.warning.darkChannel ?? theme.palette.warning.mainChannel} / 0.7)`,
          }),
          outlinedInfo: ({ theme }) => ({
            color: theme.palette.info.darker ?? theme.palette.info.dark,
            borderColor: `rgba(${theme.palette.info.darkChannel ?? theme.palette.info.mainChannel} / 0.7)`,
          }),
          outlinedSuccess: ({ theme }) => ({
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
          root: ({ ownerState, theme }) => {
            const base = {
              "&:hover, &.Mui-focusVisible": { backgroundColor: "transparent" },
            } as const;

            // ✅ Disabled wins over everything
            if (ownerState.disabled) {
              return {
                ...base,

                // Force disabled look regardless of colour/default/anything
                color: "var(--ds-fg-disabled)",

                // Ensure our DS icons render as outlined when disabled
                "--ds-checkbox-box-fill": "none",
                "--ds-checkbox-box-stroke": "var(--ds-fg-disabled)",
                "--ds-checkbox-box-strokeWidth": "2",

                // Disabled glyph colour (tick/bar)
                "--ds-checkbox-glyph": "var(--ds-fg-disabled)",
              } as any;
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

            const varsPalette = !isDefault
              ? (theme as any).vars?.palette?.[colour]
              : null;
            const fallbackPalette = !isDefault
              ? (theme.palette as any)[colour]
              : null;

            const selectedMain = isDefault
              ? "var(--ds-olive-9)" // if someone sets color="default", selected remains neutral
              : (varsPalette?.main ?? fallbackPalette?.main);

            const selectedMainChannel = isDefault
              ? null
              : (varsPalette?.mainChannel ?? fallbackPalette?.mainChannel);

            // Unchecked (enabled) should always look "default"
            const uncheckedOutline = "var(--ds-olive-9)"; // or var(--ds-gray-9)

            return {
              ...base,

              // ✅ Unchecked: neutral outline, regardless of intent colour
              "&:not(.Mui-checked):not(.MuiCheckbox-indeterminate)": {
                color: uncheckedOutline,

                // If DS icon variables are ever used pre-fill, keep it outlined
                "--ds-checkbox-box-fill": "none",
                "--ds-checkbox-box-stroke": uncheckedOutline,
                "--ds-checkbox-box-strokeWidth": "2",
              },

              // ✅ Checked: solid fill in intent colour + white tick
              "&.Mui-checked": {
                color: selectedMain,
                "--ds-checkbox-box-fill": "currentColor",
                "--ds-checkbox-box-stroke": "none",
                "--ds-checkbox-box-strokeWidth": "0",
                "--ds-checkbox-glyph": "var(--ds-white)",
              },

              // ✅ Indeterminate: “outlined button feel” in intent colour
              "&.MuiCheckbox-indeterminate": {
                color: selectedMain,
                "--ds-checkbox-box-fill": "none",
                "--ds-checkbox-box-stroke": "currentColor",
                "--ds-checkbox-box-strokeWidth": "2",
                "--ds-checkbox-glyph": "currentColor",
              },

              // Optional: hover tint for selected states only
              ...(selectedMainChannel && {
                "&.Mui-checked:hover, &.MuiCheckbox-indeterminate:hover": {
                  backgroundColor: `rgba(${selectedMainChannel} / ${theme.palette.action.hoverOpacity})`,
                },
              }),
            };
          },
        },
      },
    },
  });

  return createTheme(DiamondDSThemeOptions);
};
export const DiamondDSTheme = createMuiTheme("light");
export const DiamondDSThemeDark = createMuiTheme("dark");
