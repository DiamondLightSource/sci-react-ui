import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import React from "react";
import Tab from "@mui/material/Tab";

const meta: Meta<typeof Tabs> = {
  title: "MUI/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
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
    value: { control: false },
    onChange: { control: false },
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

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Tabs {...args} value={value} onChange={(_, v) => setValue(v)}>
          <Tab label="Tab One" />
          <Tab label="Tab Two" />
          <Tab label="Tab Three" />
        </Tabs>
      </div>
    );
  },
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <div style={{ display: "flex", height: 160 }}>
        <Tabs {...args} value={value} onChange={(_, v) => setValue(v)}>
          <Tab label="Item A" />
          <Tab label="Item B" />
          <Tab label="Item C" />
        </Tabs>
      </div>
    );
  },
};
