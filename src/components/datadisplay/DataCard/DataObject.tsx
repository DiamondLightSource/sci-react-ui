import { Box, Divider, Stack, Typography } from "@mui/material";
import { DataItem } from "./DataItem";
import type { ReactNode } from "react";
import type { DataObjectProps, PairProps, SingleProps } from "./types";
import type { DataColours } from "./palette";

export const DataObject = (
  props: DataObjectProps & { palette: DataColours },
) => {
  if (props.value) {
    return <SingleDataObject {...props} />;
  }

  // if subvalue provided, force pair
  const stacked = props.subvalue != null ? false : (props.stacked ?? true);
  if (stacked) {
    return <StackedDataObject {...props} />;
  }
  return <DataObjectPair {...props} />;
};

/**
 * Standard variant: title, value with optional label and/or suffix,
 * optional icon, and optional secondary value underneath
 */
const SingleDataObject = (props: SingleProps & { palette: DataColours }) => {
  return (
    <DataStack>
      <Title title={props.title} palette={props.palette} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        <DataItem size="large" {...props.value} palette={props.palette} />
        <Box
          sx={{
            ml: "auto",
            pl: 2,
            display: "flex",
            alignItems: "center",
            minHeight: "32px", // Fixes the height regardless of icon presence
          }}
          color={props.palette.icon}
        >
          {props.icon && <props.icon height="32px" width="32px" />}
        </Box>
      </Box>
      {props.subvalue && (
        <DataItem size="small" {...props.subvalue} palette={props.palette} />
      )}
    </DataStack>
  );
};

/**
 * Two vertically-stacked data items. No subitem!
 */
const StackedDataObject = (props: PairProps & { palette: DataColours }) => {
  return (
    <DataStack>
      <Title title={props.title} palette={props.palette} />
      <DataItem size="medium" {...props.value1} {...props} />
      <DataItem size="medium" {...props.value2} {...props} />
    </DataStack>
  );
};

/**
 * Combines two data items into a single line,
 * with optional secondary value underneath
 */
const DataObjectPair = (props: PairProps & { palette: DataColours }) => {
  return (
    <DataStack>
      <Title {...props} />
      <Stack direction="row" gap={2} padding={0}>
        <DataItem size="large" {...props.value1} {...props} />
        <Divider orientation="vertical" flexItem />
        <DataItem size="large" {...props.value2} {...props} />
      </Stack>
      {props.subvalue && (
        <DataItem size="small" {...props.subvalue} {...props} />
      )}
    </DataStack>
  );
};

const DataStack = ({ children }: { children: ReactNode }) => {
  return (
    <Stack direction="column" gap={0.5} overflow={"clip"}>
      {children}
    </Stack>
  );
};

const Title = ({ title, palette }: { title: string; palette: DataColours }) => {
  return (
    <Typography color={palette.secondary} fontWeight={500} fontSize={"16px"}>
      {title}
    </Typography>
  );
};
