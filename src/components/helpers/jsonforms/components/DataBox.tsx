import {Box, Stack, Typography} from "@mui/material";

interface DataBoxProps {
	label: string,
	data: string | null | undefined,
}

const DataBox = ({label, data}: DataBoxProps) => {
	return (
		<Box className="data-box" sx={{ paddingBottom: "10px" }}>
			<Stack direction="column">
				<Typography
					component="span"
					className="data-box-label"
					sx={{ fontWeight: "bold", fontSize: "smaller", color: "red" }}
				>
					{label}
				</Typography>
				<Typography className="data-box-data" component="span">
					{data ? data : "-"}
				</Typography>
			</Stack>
		</Box>
	)
}

export { DataBox };