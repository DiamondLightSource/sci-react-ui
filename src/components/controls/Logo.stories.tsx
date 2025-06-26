import { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "SciReactUI/Control/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Show the logo associated with the theme",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TheLogo: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "The normally sized logo",
      },
    },
  },
};

export const TheShortLogo: Story = {
  args: { short: true },
  parameters: {
    docs: {
      description: {
        story: "The shorter image.",
      },
    },
  },
};

export const LightLogoForDarkTheme: Story = {
  args: {
    interchange: true,
    style: { "padding" : "10px", "background": "grey"}
  },
  parameters: {
    docs: {
      description: {
        story: "You can switch-over the light and dark logo. Useful depending on what background it is displayed on.",
      },
    },
  },
};
