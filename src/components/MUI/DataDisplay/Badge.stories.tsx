// src/components/Badge/Badge.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

const childMap = {
  mail: <MailIcon />,
  notifications: <NotificationsIcon />,
} as const;

const meta: Meta<typeof Badge> = {
  title: "MUI/Data Display/Badge",
  component: Badge,
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
    variant: { control: "select", options: ["standard", "dot"] },
    badgeContent: { control: "number" },
    max: { control: "number" },
    invisible: { control: "boolean" },
    showZero: { control: "boolean" },
    overlap: { control: "select", options: ["rectangular", "circular"] },
    anchorOrigin: { control: false },
    children: {
      name: "child",
      control: "select",
      options: Object.keys(childMap),
      mapping: childMap,
    },
  },
  args: {
    color: "primary",
    variant: "standard",
    badgeContent: 4,
    max: 99,
    invisible: false,
    showZero: false,
    overlap: "circular",
    children: "mail",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <Badge {...args} /> };

export const Dot: Story = {
  args: { variant: "dot", color: "secondary" },
  render: (args) => <Badge {...args} />,
};

export const Colors: Story = {
  args: { badgeContent: 7 },
  render: (args) => (
    <>
      <Badge {...args} color="primary" />
      <Badge {...args} color="secondary" />
      <Badge {...args} color="error" />
      <Badge {...args} color="success" />
      <Badge {...args} color="info" />
      <Badge {...args} color="warning" />
    </>
  ),
};
