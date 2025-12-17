import type { Meta, StoryObj } from "@storybook/react";
import { MaterialIcons } from "./MaterialIcons";

const meta: Meta<typeof MaterialIcons> = {
  title: "MUI/Data Display/MaterialIcons",
  component: MaterialIcons,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    name: {
      control: "select",
      options: [
        "home",
        "favorite",
        "search",
        "settings",
        "add",
        "edit",
        "delete",
        "send",
        "save",
        "info",
      ],
    },
    color: {
      control: "select",
      options: [
        "inherit",
        "primary",
        "secondary",
        "action",
        "disabled",
        "error",
        "info",
        "success",
        "warning",
      ],
    },
    fontSize: {
      control: "select",
      options: ["inherit", "small", "medium", "large"],
    },
  },
  args: { name: "home", color: "inherit", fontSize: "medium" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <MaterialIcons {...args} /> };

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <MaterialIcons {...args} color="primary" />
      <MaterialIcons {...args} color="secondary" />
      <MaterialIcons {...args} color="error" />
      <MaterialIcons {...args} color="success" />
      <MaterialIcons {...args} color="info" />
      <MaterialIcons {...args} color="warning" />
      <MaterialIcons {...args} color="action" />
      <MaterialIcons {...args} color="disabled" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <MaterialIcons {...args} fontSize="small" />
      <MaterialIcons {...args} fontSize="medium" />
      <MaterialIcons {...args} fontSize="large" />
    </div>
  ),
};
