
import {Box, CircularProgress, circularProgressClasses} from "@mui/material";

interface ProgressProps {
	speed?: "slow" | "medium" | "fast",
	size?: "small" | "medium" | "large"
}

const speed = {
	"slow": "400ms",
	"medium": "300ms",
	"fast": "200ms",
}
const size = {
	"small": 1,
	"medium": 2,
	"large": 3,
}

const Progress = (props: ProgressProps) => (
	<Box sx={{
		position: 'relative',
		zoom:size[props.size ?? "medium"]
	}}>
		<CircularProgress
			variant="determinate"
			sx={(theme) => ({
				color: theme.vars.palette.primary.light,
			})}
			size={40}
			thickness={9}
			value={100}
			role={undefined}
		/>
		<CircularProgress
			variant="determinate"
			sx={(theme) => ({
				color: theme.vars.palette.primary.dark,
				position: 'absolute',
				left: 2,
				top: 2,
			})}
			size={36}
			thickness={4}
			value={100}
			role={undefined}
		/>
		<CircularProgress
			variant="indeterminate"
			disableShrink
			sx={(theme) => ({
				color: theme.vars.palette.secondary.main,
				animationDuration: speed[props.speed ?? "medium"],
				position: 'absolute',
				left: 2.4,
				top: 2.4,
				[`& .${circularProgressClasses.circle}`]: {
					strokeLinecap: 'round',
					strokeDasharray: '10 120'
				},
			})}
			size={35}
			thickness={2}
		/>
	</Box>
);

export { Progress };
export type {ProgressProps}