import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import PageviewIcon from "@mui/icons-material/Pageview";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { Stack } from "../Layout/Stack";
import { AvatarGroup } from "./AvatarGroup";

const meta: Meta<typeof Avatar> = {
  title: "MUI/Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["circular", "rounded", "square"],
    },
    children: { name: "initials", control: "text" },
    alt: { control: "text" },
    src: { control: "text" },
    imgProps: { control: false },
    sx: { control: "object" },
  },
  args: {
    variant: "circular",
    children: "AB",
    alt: "User avatar",
    src: "",
    sx: { width: 56, height: 56, bgcolor: "primary" },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Avatar {...args}>{args.children}</Avatar>,
};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2}>
      <Avatar
        {...args}
        variant="circular"
        sx={{ bgcolor: "red", height: 56, width: 56 }}
      >
        AB
      </Avatar>
      <Avatar
        {...args}
        variant="rounded"
        sx={{ bgcolor: "orange", height: 56, width: 56 }}
      >
        CD
      </Avatar>
      <Avatar
        {...args}
        variant="square"
        sx={{ bgcolor: "green", height: 56, width: 56 }}
      >
        EF
      </Avatar>
    </Stack>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2}>
      <Avatar {...args}>
        <FolderIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: "pink", width: 56, height: 56 }}>
        <PageviewIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: "green", width: 56, height: 56 }}>
        <AssignmentIcon />
      </Avatar>
    </Stack>
  ),
};

export const Grouped: Story = {
  render: (args) => (
    <AvatarGroup max={4}>
      <Avatar sx={{ bgcolor: "red" }}>AB</Avatar>
      <Avatar sx={{ bgcolor: "orange" }}>CD</Avatar>
      <Avatar sx={{ bgcolor: "green" }}>EF</Avatar>
      <Avatar>IJ</Avatar>
      <Avatar>KL</Avatar>
    </AvatarGroup>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar {...args} sx={{ ...args.sx, width: 40, height: 40 }}>
        SM
      </Avatar>
      <Avatar {...args} sx={{ ...args.sx, width: 56, height: 56 }}>
        MD
      </Avatar>
      <Avatar {...args} sx={{ ...args.sx, width: 80, height: 80 }}>
        LG
      </Avatar>
    </Stack>
  ),
};
