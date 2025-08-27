import { Box, Typography } from "@mui/material";
import { DataOrEmpty } from "./DataBox";

interface DataCellProps {
  data?: string | null;
}

const DataCell = ({ data }: DataCellProps) => (
  <Box>
    <Typography component="span" sx={{ fontSize: "smaller" }}>
      <DataOrEmpty data={data} />
    </Typography>
  </Box>
);

export { DataCell };
