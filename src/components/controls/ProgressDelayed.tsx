import {ReactElement, useRef, useState} from "react";
import {Progress, ProgressProps} from "./Progress";
import {Box, CircularProgressProps} from "@mui/material";

interface ProgressDelayedProps extends ProgressProps {
	progress?: ReactElement,
	delay?: number,
	fade?: boolean
}

const ProgressDelayed = ( props: ProgressDelayedProps) => {
	const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
	const [show, setShow] = useState(false)
	
	if( timerRef.current) {
		clearTimeout(timerRef.current)
	}
	
	timerRef.current = setTimeout(()=>{
		setShow(true)
	}, props.delay ?? 1000)
	
	if( !show ) {
		return null
	}
	
	return (<>
			<style>{`
				@keyframes progress-delay-fade-in {
					from { opacity: 0; }
					to { opacity: 1.0; }
				}
			`}</style>
			<Box style={{animation: props.fade ?? true ? "progress-delay-fade-in 500ms" : undefined}}>
				{props.progress ?? <Progress size={props.size} speed={props.speed} />}
			</Box>
		</>
	)
}

export { ProgressDelayed };