import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "MUI/Navigation/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    underline: { control: "select", options: ["none", "hover", "always"] },
    color: {
      control: "select",
      options: [
        "inherit",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
      ],
    },
    href: { control: "text" },
    target: { control: "select", options: ["", "_self", "_blank"] },
    rel: { control: "text" },
    children: { name: "text", control: "text" },
  },
  args: {
    underline: "hover",
    color: "primary",
    href: "https://mui.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    children: "MUI docs",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <Link {...args} /> };
