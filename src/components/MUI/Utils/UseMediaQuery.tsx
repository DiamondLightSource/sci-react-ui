import * as React from "react";
import useMediaQueryHook from "@mui/material/useMediaQuery";

export type UseMediaQueryProps = { query: string };

export const UseMediaQuery = ({ query }: UseMediaQueryProps) => {
  const matches = useMediaQueryHook(query);
  return <span>{`${query} matches: ${matches}`}</span>;
};
