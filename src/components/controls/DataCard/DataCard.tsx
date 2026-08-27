import { Box, Divider, Paper, useTheme } from "@mui/material";
import { DataObject } from "./DataObject";
import { createDiamondTheme } from "@diamondlightsource/sci-react-ui";
import { getPalette, type DataColour } from "./palette";
import type { DataObjectProps } from "./types";

export const DataCard = (props: DataObjectProps & { colour: DataColour }) => {
  const theme: ReturnType<typeof createDiamondTheme> = useTheme();
  const palette = getPalette(props.colour, theme);

  return (
    <Paper
      sx={{
        padding: 2,
        flexGrow: 1,
        background: palette.container,
      }}
    >
      <DataObject {...props} palette={palette} />
    </Paper>
  );
};

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
