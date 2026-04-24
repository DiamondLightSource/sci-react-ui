import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const BoxPath = (props: React.SVGProps<SVGPathElement>) => (
  <path
    d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2z"
    fill="var(--ds-checkbox-box-fill, none)"
    stroke="var(--ds-checkbox-box-stroke, currentColor)"
    strokeWidth="var(--ds-checkbox-box-strokeWidth, 2)"
    strokeLinejoin="round"
    {...props}
  />
);

/** Unchecked (outline only) */
export function DsCheckboxBlankIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <BoxPath />
    </SvgIcon>
  );
}

/** Checked (fill + tick) */
export function DsCheckboxCheckedIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <BoxPath />
      <path
        d="M10 14.17l-3.59-3.58L5 12l5 5 9-9-1.41-1.41z"
        fill="var(--ds-checkbox-glyph, var(--ds-white))"
      />
    </SvgIcon>
  );
}

/** Indeterminate (outlined feel by default via vars, bar uses glyph var) */
export function DsCheckboxIndeterminateIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <BoxPath />
      <path d="M7 11h10v2H7z" fill="var(--ds-checkbox-glyph, currentColor)" />
    </SvgIcon>
  );
}
