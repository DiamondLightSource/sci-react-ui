import { IconButton, IconButtonProps, useColorScheme } from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";

export const ColourSchemeButton = (props: IconButtonProps) => {
  const { mode, setMode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <IconButton
      aria-label={`Colour scheme switcher: ${mode}`}
      {...props}
      onClick={(event) => {
        setMode?.(isDark ? "light" : "dark");
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
      {isDark ? <LightModeIcon /> : <BedtimeIcon />}
    </IconButton>
  );
};
