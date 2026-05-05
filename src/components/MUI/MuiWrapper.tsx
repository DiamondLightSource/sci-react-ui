import {forwardRef} from "react";

export default function MuiWrapper<Prop, Element=HTMLDivElement>(
	MuiComponent: any,
	name: string
) {
	
	const RefForward = forwardRef<Element, Prop>(
		(props, ref) => (
			<MuiComponent {...props} ref={ref} />
		)
	)
	
	RefForward.displayName = name; // "MUI." + name
	return RefForward
}