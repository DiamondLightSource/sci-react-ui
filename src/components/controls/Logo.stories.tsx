import { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "SciReactUI/Control/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Show the logo associated with the theme",
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
        story:
          "The normally sized logo",
      },
    },
  },
};

export const TheShortLogo: Story = {
  args: { short: true },
  parameters: {
    docs: {
      description: {
        story:
          "The shorter image.",
      },
    },
  },
};
