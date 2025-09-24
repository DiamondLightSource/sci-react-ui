import { Meta, StoryObj } from "@storybook/react";
import {ProgressDelayed} from "./ProgressDelayed";
import {LinearProgress} from "@mui/material";

const meta: Meta<typeof ProgressDelayed> = {
	title: "Components/Controls/ProgressDelayed",
	component: ProgressDelayed,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "Displays a progress only after a time period (default 1s). Generally, short delays do not need feedback.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultProgress: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: "The default progress spinner.",
			},
		},
	},
};

export const WithoutFadeIn: Story = {
	args: {
		fade: false
	},
	parameters: {
		docs: {
			description: {
				story: "Progress spinner without fade in.",
			},
		},
	},
};

export const TwoSecondDelay: Story = {
	args: {
		delay: 2000
	},
	parameters: {
		docs: {
			description: {
				story: "Progress spinner with a two second delay.",
			},
		},
	},
};


export const LargeProgress: Story = {
	args: {
		size: "large"
	},
	parameters: {
		docs: {
			description: {
				story: "The large progress spinner",
			},
		},
	},
};


export const CustomProgress: Story = {
	args: {
		progress: <LinearProgress />
	},
	parameters: {
		docs: {
			description: {
				story: "Custom progress using linear progress.",
			},
		},
	},
};