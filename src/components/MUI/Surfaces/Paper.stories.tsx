import type { Meta, StoryObj } from "@storybook/react";
import { Paper } from "./Paper";

const meta: Meta<typeof Paper> = {
  title: "MUI/Surfaces/Paper",
  component: Paper,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["elevation", "outlined"] },
    elevation: { control: { type: "number", min: 0, max: 24, step: 1 } },
    square: { control: "boolean" },
  },
  args: { variant: "elevation", elevation: 1, square: false },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Paper {...args} sx={{ p: 2, maxWidth: 360 }}>
      Paper content
    </Paper>
  ),
};

export const Elevations: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Paper {...args} elevation={0} sx={{ p: 2 }}>
        elevation 0
      </Paper>
      <Paper {...args} elevation={3} sx={{ p: 2 }}>
        elevation 3
      </Paper>
      <Paper {...args} elevation={8} sx={{ p: 2 }}>
        elevation 8
      </Paper>
      <Paper {...args} elevation={16} sx={{ p: 2 }}>
        elevation 16
      </Paper>
    </div>
  ),
};
