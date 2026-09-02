import { Paper, useTheme } from "@mui/material";
import { DataObject } from "./DataObject";
import { createDiamondTheme } from "@diamondlightsource/sci-react-ui";
import { getPalette, type DataColour } from "./palette";
import type { DataObjectProps } from "./types";

export type DataCardProps = DataObjectProps & { colour: DataColour };

export const DataCard = (props: DataCardProps) => {
  const theme: ReturnType<typeof createDiamondTheme> = useTheme();
  const palette = getPalette(props.colour, theme);

  return (
    <Paper
      sx={{
        padding: 2,
        flexGrow: 1,
        background: palette.container,
        border: "1px solid",
        borderColor: "divider"
      }}
    >
      <DataObject {...props} palette={palette} />
    </Paper>
  );
};
