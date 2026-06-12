import React from "react";
import { BoxProps, useTheme } from "@mui/material";
import { ImageColourSchemeSwitch } from "./ImageColourSchemeSwitch";

interface LogoProps extends BoxProps {
  short?: boolean;

  /** When light, the light image will appear in both light and dark mode and vice-versa. Takes priority over tone when both are defined. */
  fixedTone?: "light" | "dark";

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
  fixedTone = undefined,
  tone = "default",
  interchange,
  style,
}: LogoProps) => {
  const theme = useTheme();

  const logo = short ? theme.logos?.short : theme.logos?.normal;

  if (!logo) return null;

  // Keep backwards compatibility for interchange
  const effectiveTone = interchange ? "inverse" : tone;

  return (
    <ImageColourSchemeSwitch
      image={logo}
      fixedTone={fixedTone}
      tone={effectiveTone}
      style={style}
    />
  );
};

export { Logo };
export type { LogoProps };
