// src/components/List/List.tsx
import * as React from "react";
import MuiList, { ListProps as MuiListProps } from "@mui/material/List";

export type ListProps = MuiListProps;

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  (props, ref) => <MuiList ref={ref} {...props} />,
);

List.displayName = "List";
