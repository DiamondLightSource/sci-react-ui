import { BoxProps, useTheme } from "@mui/material";
import {
  ImageColorSchemeSwitch
} from "./ImageColorSchemeSwitch";
import React from "react";

interface LogoProps extends BoxProps {
  short?: boolean;
  style?: React.CSSProperties;
}

const Logo = ({ short = false, style }: LogoProps) => {
  const theme = useTheme();
  const logo =
    short !== undefined && short ? theme.logos?.short : theme.logos?.normal;

  return logo && <ImageColorSchemeSwitch style={style} image={logo} />;
};

export { Logo };
