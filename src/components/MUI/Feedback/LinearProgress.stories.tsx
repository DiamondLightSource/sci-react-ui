import type { Meta, StoryObj } from "@storybook/react";
import { LinearProgress } from "./LinearProgress";

const meta: Meta<typeof LinearProgress> = {
  title: "MUI/Feedback/LinearProgress",
  component: LinearProgress,
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
    variant: {
      control: "select",
      options: ["indeterminate", "determinate", "buffer", "query"],
    },
    value: { control: { type: "number", min: 0, max: 100, step: 1 } },
    valueBuffer: { control: { type: "number", min: 0, max: 100, step: 1 } },
  },
  args: {
    color: "primary",
    variant: "indeterminate",
    value: 40,
    valueBuffer: 60,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <LinearProgress {...args} /> };

export const Determinate: Story = {
  args: { variant: "determinate", value: 50 },
  render: (args) => <LinearProgress {...args} />,
};

export const Buffer: Story = {
  args: { variant: "buffer", value: 30, valueBuffer: 60 },
  render: (args) => <LinearProgress {...args} />,
};
