import { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

import logoImageDark from "../public/base/logo-dark.svg"
import logoImageLight from "../public/base/logo-light.svg"

const meta: Meta<typeof Logo> = {
  title: "SciReactUI/Control/Logo",
  component: Logo,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ALogo: Story = {
  args: {
    logo: {
        src: logoImageLight,
        alt: "Home",
        width: "100px"
    }
  },
};

export const ALogoButColourModeAware: Story = {
  args: {
    logo: {
        src: logoImageDark,
        srcDark: logoImageLight,
        alt: "Home",
        width: "100px"
    }
  },
};
