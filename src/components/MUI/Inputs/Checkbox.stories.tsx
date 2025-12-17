import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Checkbox } from "./Checkbox";

type CBArgs = React.ComponentProps<typeof Checkbox>;

const meta: Meta<CBArgs> = {
  title: "MUI/Inputs/Checkbox",
  component: Checkbox,
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
    indeterminate: { control: "boolean" },

    checked: { control: false },
    onChange: { control: false },
  },
  args: {
    color: "primary",
    size: "medium",
    disabled: false,
    indeterminate: false,
  },
};
export default meta;
type Story = StoryObj<CBArgs>;

export const Basic: Story = {
  render: (args) => <Checkbox {...args} />,
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(true);
    return (
      <Checkbox
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
      <Checkbox {...args} color="primary" />
      <Checkbox {...args} color="secondary" />
      <Checkbox {...args} color="success" />
      <Checkbox {...args} color="error" />
      <Checkbox {...args} size="small" color="info" />
      <Checkbox {...args} size="small" color="warning" />
    </div>
  ),
};
