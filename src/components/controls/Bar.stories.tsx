import { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@mui/material";
import { Bar } from "./Bar";

const meta: Meta<typeof Bar> = {
  title: "Components/Controls/Bar",
  component: Bar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftSlot: <Typography variant="body1">Left</Typography>,
    centreSlot: <Typography variant="body1">Centre</Typography>,
    rightSlot: <Typography variant="body1">Right</Typography>,
  },
};

export const Primary: Story = {
  args: {
    color: "primary",
    leftSlot: <Typography variant="body1">Primary Bar</Typography>,
    rightSlot: <Typography>Actions</Typography>,
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    leftSlot: <Typography variant="body1">Secondary Bar</Typography>,
  },
};

export const Subtle: Story = {
  args: {
    color: "primary",
    variant: "subtle",
    leftSlot: <Typography variant="body1">Subtle Primary</Typography>,
  },
};

export const WithTitle: Story = {
  args: {
    color: "primary",
    leftSlot: <Typography variant="h6">My App</Typography>,
    rightSlot: <Typography>Controls</Typography>,
  },
};

export const FullWidth: Story = {
  args: {
    containerWidth: false,
    leftSlot: <Typography>Full width content</Typography>,
    rightSlot: <Typography>Right</Typography>,
  },
};

export const WithContent: Story = {
  args: {
    leftSlot: <Typography variant="body1">Text content</Typography>,
    centreSlot: <input placeholder="Input field" />,
    rightSlot: <button>Action</button>,
  },
};
