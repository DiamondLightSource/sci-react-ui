import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs} from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
	title: "SciReactUI/Navigation/Breadcrumbs",
	component: Breadcrumbs,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		path: "/first/second/third/last/"
	},
}

export const ShortPath: Story = {
	args: {
		path: "just one"
	},
};

export const LongPath: Story = {
	args: {
		path: "/first/the second/third/fourth/almost last/last one/"
	},
};

export const Empty: Story = {
	args: {
		path: ""
	},
};

export const ColorChange: Story = {
	args: {
		path: ["first","second","third","last"],
		rootProps: {
			sx: { backgroundColor: "blue" }
		},
		muiBreadcrumbsProps: {
			sx: { color: "yellow" }
		}
	},
};
