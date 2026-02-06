import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "MUI/Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "rectangular", "circular"],
    },
    animation: { control: "select", options: ["pulse", "wave", false] },
    width: { control: { type: "number", min: 16, max: 600, step: 4 } },
    height: { control: { type: "number", min: 16, max: 600, step: 4 } },
  },
  args: { variant: "text", animation: "pulse", width: 240, height: 24 },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <Skeleton {...args} /> };
