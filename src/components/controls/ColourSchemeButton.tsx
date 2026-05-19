import { useColorScheme } from "@mui/material";
import { IconButton, IconButtonProps } from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";

const ColourSchemeButton = (props: IconButtonProps) => {
  const { mode, setMode } = useColorScheme();

  const isDark = mode === "dark";

  return (
    <IconButton
      color="primary"
      aria-label={`Colour scheme switcher: ${mode}`}
      {...props}
      onClick={(event) => {
        setMode(isDark ? "light" : "dark");
        props.onClick?.(event);
      }}
      sx={{
        ml: 1,
      }}
    >
      {isDark ? <BedtimeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export { ColourSchemeButton };
