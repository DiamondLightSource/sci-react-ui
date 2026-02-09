import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "MUI/Data Display/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["fullWidth", "inset", "middle"] },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    textAlign: { control: "select", options: ["center", "left", "right"] },
    flexItem: { control: "boolean" },
    children: { name: "label", control: "text" },
  },
  args: {
    variant: "fullWidth",
    orientation: "horizontal",
    textAlign: "center",
    flexItem: false,
    children: "",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <Divider {...args} /> };

export const WithLabel: Story = {
  args: { children: "Section" },
  render: (args) => <Divider {...args} />,
};

export const Vertical: Story = {
  args: { orientation: "vertical", flexItem: true },
  render: (args) => (
    <div style={{ height: 80, display: "flex" }}>
      <Divider {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 8 }}>
      <Divider {...args} variant="fullWidth" />
      <Divider {...args} variant="inset" />
      <Divider {...args} variant="middle" />
    </div>
  ),
};
