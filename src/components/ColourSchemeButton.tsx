import { useColorScheme, useTheme } from "@mui/material";
import { IconButton, IconButtonProps } from "@mui/material";
import { LightMode, Bedtime } from "@mui/icons-material";

import { ColourSchemes } from "../utils/globals";

const ColourSchemeButton = (props: IconButtonProps) => {
  const theme = useTheme();
  const { colorScheme: colourScheme, setColorScheme: setColourScheme } =
    useColorScheme();

  if (!colourScheme) return undefined;

  const isDark = (): boolean => colourScheme === ColourSchemes.Dark;

  return (
    <IconButton
      sx={{
        height: 35,
        width: 35,
        borderRadius: "5px",
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        "&:hover": {
          opacity: 0.8,
          backgroundImage: "",
          backgroundColor: isDark() ? "#111" : "skyblue",
          color: "yellow",
        },
      }}
      aria-label={`Colour scheme switcher: ${colourScheme}`}
      {...props}
      onClick={(event) => {
        setColourScheme(isDark() ? ColourSchemes.Light : ColourSchemes.Dark);
        if (props.onClick) props.onClick(event);
      }}
    >
      {isDark() ? <Bedtime /> : <LightMode />}
    </IconButton>
  );
};

export type { IconButtonProps };
export { ColourSchemeButton };
