import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Box, Switch } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

type SWArgs = React.ComponentProps<typeof Switch>;

const meta: Meta<SWArgs> = {
  title: "MUI/Inputs/Switch",
  component: Switch,
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
    size: { control: "select", options: ["small", "medium"] },
    disabled: { control: "boolean" },
    edge: { control: "select", options: [false, "start", "end"] },
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

export const Basic: Story = {
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

export const Colours: Story = {
  render: (args) => (
    <Box>
      <Switch {...args} color="primary" />
      <Switch {...args} color="secondary" />
      <Switch {...args} color="success" />
      <Switch {...args} color="error" />
    </Box>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Box>
      <Switch {...args} size="small" />
      <Switch {...args} size="medium" />
    </Box>
  ),
};
