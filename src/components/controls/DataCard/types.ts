import type { LucideIcon } from "lucide-react";

export type DecoratedValue = {
  value: string;
  label?: string;
  suffix?: string;
};

export type SingleProps = {
  title: string;
  value: DecoratedValue;
  subvalue?: DecoratedValue;
  icon?: LucideIcon;

  value1?: never;
  value2?: never;
  stacked?: never;
};

export type PairProps = {
  title: string;
  value1: DecoratedValue;
  value2: DecoratedValue;
  subvalue?: DecoratedValue;

  /** `true` by default, but ignored if `subvalue` is provided */
  stacked?: boolean;
  value?: never;
  icon?: never;
};

export type DataObjectProps = SingleProps | PairProps;
