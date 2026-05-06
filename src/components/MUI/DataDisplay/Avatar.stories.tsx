import type { Meta, StoryObj } from "@storybook/react";
import {
  AssignmentIcon,
  Avatar,
  AvatarGroup,
  FolderIcon,
  PageviewIcon,
  Stack,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Avatar> = {
  title: "MUI/Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: {
      control: "select",
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
    sx: { width: 56, height: 56, bgcolor: "primary.main" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Avatar {...args}>{args.children}</Avatar>,
};

export const Variants: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={2}>
      <Avatar variant="circular" sx={{ bgcolor: "error.main" }}>
        AB
      </Avatar>
      <Avatar variant="rounded" sx={{ bgcolor: "warning.main" }}>
        CD
      </Avatar>
      <Avatar variant="square" sx={{ bgcolor: "success.main" }}>
        EF
      </Avatar>
    </Stack>
  ),
};

export const WithIcon: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: "primary.main" }}>
        <FolderIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <PageviewIcon />
      </Avatar>
      <Avatar sx={{ bgcolor: "success.main" }}>
        <AssignmentIcon />
      </Avatar>
    </Stack>
  ),
};

export const Grouped: Story = {
  render: (_args) => (
    <AvatarGroup max={4}>
      <Avatar sx={{ bgcolor: "error.main" }}>AB</Avatar>
      <Avatar sx={{ bgcolor: "warning.main" }}>CD</Avatar>
      <Avatar sx={{ bgcolor: "success.main" }}>EF</Avatar>
      <Avatar>IJ</Avatar>
      <Avatar>KL</Avatar>
    </AvatarGroup>
  ),
};

export const Sizes: Story = {
  render: (_args) => {
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        {[40, 56, 80].map((size) => (
          <Avatar
            key={size}
            sx={{ width: size, height: size, bgcolor: "primary.main" }}
          >
            {size}
          </Avatar>
        ))}
      </Stack>
    );
  },
};
