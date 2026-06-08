import { SvgIcon, type SvgIconProps } from "@mui/material";
import type { LucideIcon as LucideIconType } from "lucide-react";
import { iconSizes, type IconSize } from "./iconSizes";

const muiFontSizeMap = {
  small: "xs",
  medium: "sm",
  large: "md",
} as const;

export interface LucideIconProps extends Omit<SvgIconProps, "component"> {
  icon: LucideIconType;

  /**
   * DiamondDS icon size.
   * Prefer this over `fontSize`.
   */
  size?: IconSize;

  /**
   * MUI compatibility alias.
   * Prefer `size` for DiamondDS icons.
   */
  fontSize?: SvgIconProps["fontSize"];
}

export function LucideIcon({
  icon,
  size,
  fontSize = "medium",
  sx,
  ...props
}: LucideIconProps) {
  const resolvedSize =
    size ??
    (fontSize === "small" || fontSize === "medium" || fontSize === "large"
      ? muiFontSizeMap[fontSize]
      : "md");

  const config = iconSizes[resolvedSize];

  return (
    <SvgIcon
      component={icon}
      inheritViewBox
      fontSize={fontSize}
      sx={{
        width: config.size,
        height: config.size,
        fill: "none",
        stroke: "currentColor",

        "& *": {
          stroke: "currentColor",
          strokeWidth: config.strokeWidth,
        },

        ...sx,
      }}
      {...props}
    />
  );
}

export default LucideIcon;
