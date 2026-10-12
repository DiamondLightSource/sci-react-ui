import { Box, Typography } from "@mui/material";
import type { DecoratedValue } from "./types";
import type { DataColours } from "./palette";

type DataItemSize = "large" | "medium" | "small";

export type DataItemProps = DecoratedValue & {
  size: DataItemSize;
  palette: DataColours;
};

export const DataItem = (props: DataItemProps) => {
  const sizes: Record<DataItemSize, number> = {
    large: 20,
    medium: 18,
    small: 16,
  };
  const fontSize = sizes[props.size];
  const gap = props.size === "small" ? 0.5 : 1;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap,
      }}
    >
      {props.label && (
        <Typography
          sx={{
            color: props.palette.secondary,
            fontWeight: 400,
            fontSize,
          }}
        >
          {props.label}:
        </Typography>
      )}
      <Typography
        sx={{
          color: props.palette.primary,
          fontWeight: 500,
          fontSize,
        }}
      >
        {props.value}
      </Typography>

      {props.suffix && (
        <Typography
          sx={{
            color: props.palette.secondary,
            fontWeight: 400,
            fontSize,
          }}
        >
          {props.suffix}
        </Typography>
      )}
    </Box>
  );
};
