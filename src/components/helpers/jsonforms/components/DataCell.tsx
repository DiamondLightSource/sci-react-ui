import {Box, Typography} from "@mui/material";

interface DataBoxProps {
	data: string | null | undefined,
}

const DataCell = ({data}: DataBoxProps) => {
	return (
		<Box>
			<Typography component="span" sx={{ fontSize: "smaller" }}>
				{data ? data : "-"}
			</Typography>
		</Box>
	)
}

export { DataCell };