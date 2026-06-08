import { IconButton, IconButtonProps, useColorScheme } from "@mui/material";

import { SunIcon, MoonIcon } from "../DataDisplay/Icons";

export const ColourSchemeButton = (props: IconButtonProps) => {
  const { mode, systemMode, setMode } = useColorScheme();

  const resolvedMode = mode === "system" ? systemMode : mode;
  const isDark = resolvedMode === "dark";

  return (
    <IconButton
      aria-label={`Colour scheme switcher: ${resolvedMode ?? "unknown"}`}
      {...props}
      onClick={(event) => {
        setMode(isDark ? "light" : "dark");
        props.onClick?.(event);
      }}
      sx={(theme) => ({
        ml: 1,
        width: 32,
        height: 32,
        borderRadius: 1,
        backgroundColor: theme.palette.surface.strong,
        color: theme.palette.text.primary,
        "&:hover": {
          backgroundColor: theme.palette.surface.strong,
          borderColor: theme.palette.border.subtle,
        },
      })}
    >
      {isDark() ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};
