import { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
	title: "Components/Controls/Progress",
	component: Progress,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A progress circle, inspired by Diamond Light",
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


export const ALargeVersion: Story = {
	args: {
		size: "large",
	},
	parameters: {
		docs: {
			description: {
				story: "The large version of the progress spinner.",
			},
		},
	},
};


export const ASlowerVersion: Story = {
	args: {
		speed: "slow"
	},
	parameters: {
		docs: {
			description: {
				story: "A slower version of the progress spinner.",
			},
		},
	},
};