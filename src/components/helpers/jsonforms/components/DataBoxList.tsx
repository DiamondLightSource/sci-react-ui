import { Box, Stack } from "@mui/material";
import { DataBox } from "./DataBox";

interface DataBoxListProps {
  items: { label: string; data?: string | null }[];
}

const DataBoxList = ({ items }: DataBoxListProps) => (
  <Box className="data-box-list">
    <Stack direction="column">
      {/* tag needed for JSON Forms to pass accessibility */}
      <dl>
        {items.map((item, index) => (
          <DataBox key={index} label={item.label} data={item.data} />
        ))}
      </dl>
    </Stack>
  </Box>
);

export { DataBoxList };
