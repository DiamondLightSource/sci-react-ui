export const iconSizes = {
  xs: { size: 16, strokeWidth: 1.5 },
  sm: { size: 20, strokeWidth: 1.75 },
  md: { size: 24, strokeWidth: 2 },
  lg: { size: 32, strokeWidth: 2.25 },
  xl: { size: 40, strokeWidth: 2.25 },
} as const;

export type IconSize = keyof typeof iconSizes;
