import { useColorScheme } from "@mui/material";
import { IconButton, IconButtonProps } from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";

export const ColourSchemeButton = ({ sx, ...props }: IconButtonProps) => {
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
      sx={[
        {
          ml: 1,
          color: "inherit",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        },
        // Had to add to satisfy typing
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {isDark ? <LightModeIcon /> : <BedtimeIcon />}
    </IconButton>
  );
};
