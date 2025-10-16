import { Box, CircularProgress, circularProgressClasses } from "@mui/material";

interface ProgressProps {
  speed?: "slow" | "medium" | "fast";
  size?: "small" | "medium" | "large";
}

const speed = {
	snail : "100000ms",   // imperceptible orbit
	verySlow : "4000ms",  // 1 orbit per 4 seconds
	slow: "2000ms",       // 1 orbit per 2 seconds
	medium: "1000ms",     // 1 orbit per second
	fast: "500ms",        // 0.5 orbit per second
	ludicrous: "250ms",   // Sb speed
	synchrotron: "130ms"  // One earth orbit
}
const size = {
	small: 1,
	medium: 2,
	large: 3,
	veryLarge: 5
}

const Progress = (props: ProgressProps) => (
  <Box
    sx={{
      position: "relative",
      zoom: size[props.size ?? "medium"],
    }}
  >
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
        position: "absolute",
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
        position: "absolute",
        left: 2.4,
        top: 2.4,
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: "round",
          strokeDasharray: "10 120",
        },
        ["@media (prefers-reduced-motion: reduce)"] :{
          animationDuration: speed["verySlow"],
        },
      })}
      size={35}
      thickness={2}
    />
  </Box>
);

export { Progress };
export type { ProgressProps };
