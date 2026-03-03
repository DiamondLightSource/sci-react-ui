import * as React from "react";
import type { LucideIcon } from "lucide-react";
import type { DsIconName } from "./registry";
import { dsIcons } from "./registry";

type DsIconSize = "small" | "medium" | "large" | number;

export type DsIconProps = Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
  icon?: LucideIcon;
  name?: DsIconName;
  size?: DsIconSize;
  strokeWidth?: number;
};

export function DsIcon({
  icon,
  name,
  size = "medium",
  strokeWidth = 1.5,
  style,
  ...rest
}: DsIconProps) {
  const Icon = icon ?? (name ? dsIcons[name] : undefined);
  if (!Icon) return null;

  const wh = sizeToEm(size);

  return (
    <Icon
      strokeWidth={strokeWidth}
      style={{
        width: wh,
        height: wh,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    />
  );
}