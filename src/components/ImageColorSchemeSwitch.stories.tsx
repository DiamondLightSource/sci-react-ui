import { Meta, StoryObj } from "@storybook/react";
import { ImageColorSchemeSwitch } from "./ImageColorSchemeSwitch";

import imageDark from "../public/generic/logo-dark.svg"
import imageLight from "../public/generic/logo-light.svg"

const meta: Meta<typeof ImageColorSchemeSwitch> = {
	title: "SciReactUI/Control/ImageColorSchemeSwitch",
	component: ImageColorSchemeSwitch,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: 'Switch between an image depending on the color scheme mode, light or dark versions'
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitchingImage: Story = {
	args: {
		image: {
			src: imageDark,
			srcDark: imageLight,
			alt: "Testing Switching Image",
			width: "100"
		}
	},
	parameters: {
		docs: {
			description: {
				story: 'This image changes depending on the color scheme mode selected.'
			},
		},
	},
};


export const LargeSwitchingImage: Story = {
	args: {
		image: {
			src: imageDark,
			srcDark: imageLight,
			alt: "Testing Switching Image",
			width: "300"
		}
	},
};

export const NonSwitchingImage: Story = {
	args: {
	  image: {
		  src: imageLight,
		  alt: "Testing Non-Switching Image",
		  width: "300"
	  }
	},
	parameters: {
		docs: {
			description: {
				story: 'This image only has a single src so will NOT switch when the color scheme mode switches.'
			},
		},
	},
};
