import { Meta, StoryObj } from "@storybook/react";
import { ColourSchemeButton } from "./ColourSchemeButton";

const meta: Meta<typeof ColourSchemeButton> = {
  title: "SciReactUI/Control/ColorSchemeButton",
  component: ColourSchemeButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Switch between dark and light modes.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightSelected: Story = {
  args: {},
};
