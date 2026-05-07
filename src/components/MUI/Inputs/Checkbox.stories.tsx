import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Box, Checkbox } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Checkbox> = {
  title: "MUI/Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
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
    size: { control: "select", options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
  args: {
    color: "primary",
    size: "medium",
    disabled: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {};

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

export const Colours: Story = {
  render: (args) => (
    <Box>
      <Checkbox {...args} color="primary" />
      <Checkbox {...args} color="secondary" />
      <Checkbox {...args} color="success" />
      <Checkbox {...args} color="error" />
    </Box>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Box>
      <Checkbox {...args} size="small" />
      <Checkbox {...args} size="medium" />
      <Checkbox {...args} size="large" />
    </Box>
  ),
};
