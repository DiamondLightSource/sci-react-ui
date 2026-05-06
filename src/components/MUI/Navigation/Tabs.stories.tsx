import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box, Tab, Tabs } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Tabs> = {
  title: "MUI/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    variant: {
      control: "select",
      options: ["standard", "scrollable", "fullWidth"],
    },
    textColor: {
      control: "select",
      options: ["inherit", "primary", "secondary"],
    },
    indicatorColor: { control: "select", options: ["primary", "secondary"] },
  },
  args: {
    orientation: "horizontal",
    variant: "standard",
    textColor: "primary",
    indicatorColor: "primary",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <Box>
        <Tabs {...args} value={value} onChange={(_, v) => setValue(v)}>
          <Tab label="Tab One" />
          <Tab label="Tab Two" />
          <Tab label="Tab Three" />
        </Tabs>
      </Box>
    );
  },
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <Box>
        <Tabs {...args} value={value} onChange={(_, v) => setValue(v)}>
          <Tab label="Item A" />
          <Tab label="Item B" />
          <Tab label="Item C" />
        </Tabs>
      </Box>
    );
  },
};
