import { Box, Divider, Paper, useTheme } from "@mui/material";
import { DataObjectProps } from "./types";
import { getPalette } from "./palette";
import { DataObject } from "./DataObject";

export const DataGroup = ({ items }: { items: DataObjectProps[] }) => {
  const palette = getPalette("none", useTheme());
  return (
    <Paper
      sx={{
        background: palette.container,
        display: "flex",
      }}
    >
      {items.map((dataObject, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
          }}
        >
          {index > 0 && (
            <Divider orientation="vertical" flexItem sx={{ px: 1, my: 1 }} />
          )}
          <Box sx={{ p: 2 }}>
            <DataObject {...dataObject} palette={palette} key={index} />
          </Box>
        </Box>
      ))}
    </Paper>
  );
};