"use client";

import {
  alpha,
  Box,
  Chip,
  ChipProps,
  Divider,
  Grid,
  GridProps,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";

const defaultTextColour: TypographyProps["color"] = "inherit";
type ChipColour = NonNullable<ChipProps["color"]>;

const chipColours: ChipColour[] = ["success", "error", "info", "warning"];

interface DataDisplayProps<T extends string | number> {
  label: string;
  icon?: LucideIcon;
  value?: T;
  setColourCallback?: (value: T) => TypographyProps["color"];
}

// This is to preserve the T typeguard, so numbers and strings are only allowed certain props
export type DataTagProps<T extends string | number> = DataDisplayProps<T> &
  (T extends number ? { suffix?: string; toFixed?: number } : object) & {
    size?: number | "full";
    /** When to hide data field. Null or undefined only hides if value is null or undefined, falsy hides it if the value is 0, false or any other falsy value */
    hideIf?: "nullOrUndefined" | "falsy" | "never";
    /** Shrink width of data tag, as opposed to taking up whole column */
    shrinkWidth?: boolean;
  };

export const DataTag = <T extends string | number>({
  label,
  value,
  hideIf = "nullOrUndefined",
  shrinkWidth = false,
  size = 1,
  setColourCallback,
  ...props
}: DataTagProps<T>) => {
  const colVal: TypographyProps["color"] = value
    ? setColourCallback
      ? setColourCallback(value)
      : defaultTextColour
    : "textDisabled";

  let formattedValue: string | undefined;

  const chipColour = chipColours.find((colour) => colour === colVal);

  if (typeof value === "number") {
    const numericProps = props as DataTagProps<number>;
    formattedValue = value.toString();
    if (numericProps.toFixed)
      formattedValue = value.toFixed(numericProps.toFixed);
    if (numericProps.suffix)
      formattedValue = `${formattedValue}${numericProps.suffix}`;
  } else {
    formattedValue = value;
  }

  const handleCopy = () => {
    if (formattedValue) {
      navigator.clipboard.writeText(formattedValue);
    }
  };

  const hideField = () => {
    switch (hideIf) {
      // This is a switch case in case we want to add more conditions in the future
      case "falsy":
        return !value;
      case "nullOrUndefined":
        return formattedValue === null || formattedValue === undefined;
      default:
        return false;
    }
  };

  const gridColumn =
    size === "full" ? "1 / -1" : size > 1 ? `span ${size}` : "auto";

  const contentFitProps = shrinkWidth
    ? {
        maxWidth: "fit-content",
        minHeight: "fit-content",
        maxHeight: "fit-content",
      }
    : {};

  const Icon = props.icon;
  return (
    <Grid
      display={hideField() ? "none" : "grid"}
      gridColumn={gridColumn}
      minWidth="fit-content"
      onClick={handleCopy}
      {...contentFitProps}
      sx={{
        cursor: "copy",
        flex: "1 1 100px",
      }}
    >
      <Stack
        role={"data"}
        aria-details={`data-tag${colVal === defaultTextColour ? `` : `-${colVal}`}`}
        direction="row"
        alignItems="center"
        borderLeft={8}
        pl={1}
        borderColor={`${colVal}.main`}
        gap={1}
        padding={"xs"}
        pr={1}
        sx={(theme) => ({
          bgcolor:
            chipColour && chipColour !== "default"
              ? alpha(theme.palette[chipColour].main, 0.08)
              : "surface.subtle",
        })}
        color="text.tertiary"
        minHeight={"1.5rem"}
        minWidth="fit-content"
        height="100%"
      >
        {Icon && <Icon aria-label="datatag-icon" size="16px" />}
        <Typography variant={"body2"}>{label}</Typography>
        <Divider orientation={"vertical"} flexItem />
        <Typography
          variant={"body1"}
          color={"inherit"}
          fontWeight={"bold"}
          flexGrow={1}
        >
          {formattedValue ?? "?"}
        </Typography>
        {chipColour && (
          <Chip
            size="small"
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              height: 16,
              fontSize: "0.625rem",
              "& .MuiChip-label": {
                px: 0.75,
              },
            }}
            color={chipColour}
            label={chipColour}
          />
        )}
      </Stack>
    </Grid>
  );
};

export interface ResponsiveColumnGridProps extends Pick<GridProps, "spacing"> {
  children: ReactElement<DataTagProps<string | number>>[];
}

export const DataTagGrid = ({
  children,
  spacing = "0.2rem",
  ...rest
}: ResponsiveColumnGridProps) => {
  return (
    <Box flexGrow={1} minWidth="180px">
      <Box
        display="grid"
        {...rest}
        role={"grid"}
        gridTemplateColumns={{
          xs: "minmax(100px, 1fr)",
          lg: "repeat(1, 1fr) minmax(100px, 1fr)",
          xl: "repeat(2, 1fr) minmax(100px, 1fr)",
        }}
        gap={spacing}
        minWidth="fit-content"
      >
        {children}
      </Box>
    </Box>
  );
};
