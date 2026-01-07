import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress } from "./CircularProgress";

const meta: Meta<typeof CircularProgress> = {
  title: "MUI/Feedback/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
        "inherit",
      ],
    },
    variant: { control: "select", options: ["indeterminate", "determinate"] },
    value: { control: { type: "number", min: 0, max: 100, step: 1 } },
    size: { control: { type: "number", min: 8, max: 200, step: 2 } },
    thickness: { control: { type: "number", min: 1, max: 10, step: 0.5 } },
  },
  args: {
    color: "primary",
    variant: "indeterminate",
    value: 40,
    size: 40,
    thickness: 3.6,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <CircularProgress {...args} />,
};

export const Determinate: Story = {
  args: { variant: "determinate", value: 70 },
  render: (args) => <CircularProgress {...args} />,
};
