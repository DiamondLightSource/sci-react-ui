import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import Stack from "@mui/material/Stack";
import Diamond from "../../../public/images/diamond.jpg";

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
    sx: { control: false },
    width: { control: { type: "number", min: 24, max: 160, step: 4 } },
    height: { control: { type: "number", min: 24, max: 160, step: 4 } },
  },
  args: {
    variant: "circular",
    children: "AB",
    alt: "User avatar",
    src: "",
    width: 56,
    height: 56,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const withSize = (args: any) => {
  const { width, height, ...rest } = args;
  return { ...rest, sx: { width, height } };
};

export const Basic: Story = {
  render: (args) => <Avatar {...withSize(args)}>{args.children}</Avatar>,
};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2}>
      <Avatar {...withSize({ ...args, variant: "circular" })}>AB</Avatar>
      <Avatar {...withSize({ ...args, variant: "rounded" })}>CD</Avatar>
      <Avatar {...withSize({ ...args, variant: "square" })}>EF</Avatar>
    </Stack>
  ),
};

export const WithImage: Story = {
  args: {
    src: Diamond,
    alt: "Random",
    children: "",
  },
  render: (args) => <Avatar {...withSize(args)} />,
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar {...withSize({ ...args, width: 40, height: 40 })}>SM</Avatar>
      <Avatar {...withSize({ ...args, width: 56, height: 56 })}>MD</Avatar>
      <Avatar {...withSize({ ...args, width: 80, height: 80 })}>LG</Avatar>
    </Stack>
  ),
};
