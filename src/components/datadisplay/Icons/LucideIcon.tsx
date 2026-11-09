import { forwardRef } from "react";
import { SvgIcon, type SvgIconProps } from "@mui/material";
import type { LucideIcon as LucideIconType } from "lucide-react";
import { iconSizes, type IconSize } from "./iconSizes";

// Picks the stroke weight for MUI's `fontSize`; the rendered size stays with MUI.
const muiFontSizeMap: Record<string, IconSize> = {
  small: "sm",
  medium: "md",
  large: "lg",
};

export interface LucideIconProps extends Omit<SvgIconProps, "component"> {
  icon: LucideIconType;

  /**
   * Explicit pixel size, a key of `iconSizes`.
   * Without `size`, the icon follows MUI's `fontSize` (and the surrounding font size).
   */
  size?: IconSize;
}

export const LucideIcon = forwardRef<SVGSVGElement, LucideIconProps>(
  ({ icon, size, fontSize = "medium", sx, ...props }, ref) => {
    const config = iconSizes[size ?? muiFontSizeMap[fontSize] ?? "md"];

    return (
      <SvgIcon
        ref={ref}
        component={icon}
        inheritViewBox
        fontSize={fontSize}
        strokeWidth={config.strokeWidth}
        sx={[
          {
            fill: "none",
            stroke: "currentColor",
          },
          size !== undefined && { width: config.size, height: config.size },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...props}
      />
    );
  },
);

LucideIcon.displayName = "LucideIcon";

export default LucideIcon;
