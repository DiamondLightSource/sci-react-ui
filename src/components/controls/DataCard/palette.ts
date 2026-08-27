import type { Theme } from "@mui/material";

/** Represents intent or severity */
export type DataColour =
  | "none"
  | "neutral"
  | "info"
  | "danger"
  | "warning"
  | "success";

export type DataColours = {
  /** background colour */
  container: string;
  /** values colour */
  primary: string;
  /** labels/suffices colour */
  secondary: string;
  icon: string;
};

export function getPalette(intent: DataColour, theme: Theme): DataColours {
  switch (intent) {
    case "none":
      return {
        container: theme.vars!.palette.background.paper,
        primary: theme.vars!.palette.text.primary,
        secondary: theme.vars!.palette.text.secondary,
        icon: theme.vars!.palette.text.secondary,
      };
    case "neutral":
      return {
        container: theme.vars!.palette.surface.subtle,
        primary: theme.vars!.palette.text.primary,
        secondary: theme.vars!.palette.text.secondary,
        icon: theme.vars!.palette.text.secondary,
      };
    case "info":
      return {
        container: theme.vars!.palette.info.container!,
        primary: theme.vars!.palette.info.onContainer!,
        secondary: theme.vars!.palette.info.dark,
        icon: theme.vars!.palette.info.main,
      };
    case "success":
      return {
        container: theme.vars!.palette.success.container!,
        primary: theme.vars!.palette.success.onContainer!,
        secondary: theme.vars!.palette.success.dark,
        icon: theme.vars!.palette.success.main,
      };
    case "warning":
      return {
        container: theme.vars!.palette.warning.container!,
        primary: theme.vars!.palette.warning.onContainer!,
        secondary: theme.vars!.palette.warning.dark,
        icon: theme.vars!.palette.warning.main,
      };
    case "danger":
      return {
        container: theme.vars!.palette.error.container!,
        primary: theme.vars!.palette.error.onContainer!,
        secondary: theme.vars!.palette.error.dark,
        icon: theme.vars!.palette.error.main,
      };
  }
}
