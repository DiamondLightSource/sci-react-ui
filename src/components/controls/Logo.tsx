import { BoxProps, useTheme } from "@mui/material";
import { useColorScheme } from "@mui/material";
import React from "react";

export interface LogoProps extends BoxProps {
  short?: boolean;

  /**
   * Tone of the logo.
   * - "default": follows light/dark mode
   * - "inverse": forces the inverse version
   */
  tone?: "default" | "inverse";

  /**
   * @deprecated Use `tone="inverse"` instead.
   * When true, forces the inverse logo.
   */
  interchange?: boolean;

  style?: React.CSSProperties;
}

const Logo = ({
  short = false,
  tone = "default",
  interchange,
  style,
}: LogoProps) => {
  const theme = useTheme();
  const { mode } = useColorScheme();

  const logo = short ? theme.logos?.short : theme.logos?.normal;

  if (!logo) return null;

  // Keep backwards compatibility for interchange
  const effectiveTone = interchange ? "inverse" : tone;

  let src = logo.src;

  if (logo.srcDark) {
    if (effectiveTone === "inverse") {
      src = logo.srcDark;
    } else {
      src = mode === "dark" ? logo.srcDark : logo.src;
    }
  }

  return (
    <img
      src={src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      style={style}
    />
  );
};

export { Logo };
