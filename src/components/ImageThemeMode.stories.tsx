import { Meta, StoryObj } from "@storybook/react";
import { ImageThemeMode } from "./ImageThemeMode";

import imageDark from "../public/generic/logo-dark.svg"
import imageLight from "../public/generic/logo-light.svg"

const meta: Meta<typeof ImageThemeMode> = {
  title: "SciReactUI/Control/ImageThemeMode",
  component: ImageThemeMode,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitchingImage: Story = {
   args: {
      logo: {
         src: imageDark,
         srcDark: imageLight,
         alt: "Home",
         width: "100px"
      }
   },
};

export const NonSwitchingImage: Story = {
  args: {
    logo: {
        src: imageLight,
        alt: "Home",
        width: "100px"
    }
  },
};

