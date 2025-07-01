import { BoxProps, useTheme } from "@mui/material";
import { ImageColourSchemeSwitch } from "./ImageColourSchemeSwitch";
import React from "react";

interface LogoProps extends BoxProps {
  short?: boolean;
  interchange?: boolean;
  style?: React.CSSProperties;
}

const Logo = ({ short = false, interchange = false, style }: LogoProps) => {
  const theme = useTheme();
  const logo =
    short !== undefined && short ? theme.logos?.short : theme.logos?.normal;

  return (
    logo && (
      <ImageColourSchemeSwitch
        image={logo}
        interchange={interchange}
        style={style}
      />
    )
  );
};

export { Logo };
