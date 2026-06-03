import type { Meta, StoryObj } from "@storybook/react";
import {
  Badge,
  MailIcon,
  NotificationsIcon,
  Stack,
  WorkIcon,
} from "../MuiWrapped";
import { colourSet } from "../../../utils/diamond";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const childMap = {
  mail: <MailIcon />,
  notifications: <NotificationsIcon />,
  work: <WorkIcon />,
} as const;

const meta: Meta<typeof Badge> = {
  title: "MUI/Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    color: {
      control: "select",
      options: colourSet,
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

export const InvisibleNumber: Story = {
  args: { variant: "dot", color: "secondary" },
  render: (args) => <Badge {...args} invisible={true} />,
};

export const Colours: Story = {
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

export const DifferentChildren: Story = {
  parameters: {
    docs: {
      description: {
        story: "Badge with different child icons.",
      },
    },
  },
  render: (args) => (
    <Stack direction="row" spacing={4}>
      {Object.entries(childMap).map(([key, child]) => (
        <Badge key={key} {...args} badgeContent={args.badgeContent}>
          {child}
        </Badge>
      ))}
    </Stack>
  ),
};
