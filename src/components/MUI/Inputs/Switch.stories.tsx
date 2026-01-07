import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Switch } from "./Switch";

type SWArgs = React.ComponentProps<typeof Switch>;

const meta: Meta<SWArgs> = {
  title: "MUI/Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
      ],
    },
    size: { control: "select", options: ["small", "medium"] },
    disabled: { control: "boolean" },
    edge: { control: "select", options: [false, "start", "end"] },

    checked: { control: false },
    onChange: { control: false },
  },
  args: {
    color: "primary",
    size: "medium",
    disabled: false,
    edge: false,
  },
};
export default meta;
type Story = StoryObj<SWArgs>;

export const Basic: Story = { render: (args) => <Switch {...args} /> };

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(true);
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const ColorsAndSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Switch {...args} color="primary" />
      <Switch {...args} color="secondary" />
      <Switch {...args} color="success" />
      <Switch {...args} color="error" />
      <Switch {...args} size="small" color="info" />
      <Switch {...args} size="small" color="warning" />
    </div>
  ),
};
