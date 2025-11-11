import { Box, Stack, Typography } from "@mui/material";

interface DataBoxProps {
  label: string;
  data?: string | null;
}

export const DataOrEmpty = ({ data }: { data?: string | null }) =>
  data ? (
    data
  ) : (
    <Typography
      component="span"
      className="empty"
      sx={{ "&:before": { content: '"-"' } }}
    />
  );

const DataBox = ({ label, data }: DataBoxProps) => (
  <Box className="data-box">
    <Stack direction="column">
      {/* tag needed for JSON Forms accessibility check */}
      <dl>
        <Box className="data-box-label">
          <Typography
            component="dt"
            variant="h6"
            sx={{
              fontWeight: "bold",
              textTransform: "capitalize",
              fontSize: "smaller",
            }}
          >
            {label}
          </Typography>
        </Box>

        <Box className="data-box-data">
          <Typography component="dd">
            <DataOrEmpty data={data} />
          </Typography>
        </Box>
      </dl>
    </Stack>
  </Box>
);

export { DataBox };
