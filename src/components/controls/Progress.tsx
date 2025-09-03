// Inspired by the former Facebook spinners.
import {Box, CircularProgress, circularProgressClasses, CircularProgressProps} from "@mui/material";

const Progress = (props: CircularProgressProps) => (
	<Box sx={{ position: 'relative' }}>
		<CircularProgress
			variant="determinate"
			sx={(theme) => ({
				color: theme.vars.palette.primary.main,
			})}
			size={40}
			thickness={7}
			{...props}
			value={100}
		/>
		<CircularProgress
			variant="determinate"
			sx={(theme) => ({
				color: "black",
				position: 'absolute',
				left: 2,
				top: 2,
			})}
			size={36}
			thickness={3}
			{...props}
			value={100}
		/>
		<CircularProgress
			variant="indeterminate"
			disableShrink
			sx={(theme) => ({
				color: theme.vars.palette.secondary.main,
				animationDuration: '250ms',
				position: 'absolute',
				left: 3,
				top: 3,
				[`& .${circularProgressClasses.circle}`]: {
					strokeLinecap: 'round',
				},
			})}
			size={34}
			thickness={1}
			{...props}
		/>
	</Box>
);

export { Progress };