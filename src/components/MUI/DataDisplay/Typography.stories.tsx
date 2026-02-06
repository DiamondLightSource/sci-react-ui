import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";
import { Stack } from "../Layout/Stack";

const meta: Meta<typeof Typography> = {
  title: "MUI/Data Display/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "caption",
        "button",
        "overline",
      ],
    },
    color: {
      control: { type: "select" },
      options: [
        "inherit",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
        "textPrimary",
        "textSecondary",
      ],
    },
    align: {
      control: { type: "select" },
      options: ["inherit", "left", "center", "right", "justify"],
    },
    gutterBottom: { control: "boolean" },
    noWrap: { control: "boolean" },
    paragraph: { control: "boolean" },
    children: { name: "text", control: "text" },
    sx: { control: false },
  },
  args: {
    variant: "body1",
    color: "inherit",
    align: "inherit",
    gutterBottom: false,
    noWrap: false,
    paragraph: false,
    children: "The quick brown fox jumps over the lazy dog.",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Typography {...args} />,
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={1}>
      <Typography {...args} variant="h4">
        Heading (h4)
      </Typography>
      <Typography {...args} variant="subtitle1">
        Subtitle 1
      </Typography>
      <Typography {...args} variant="body1">
        Body 1
      </Typography>
      <Typography {...args} variant="body2">
        Body 2
      </Typography>
      <Typography {...args} variant="caption">
        Caption
      </Typography>
      <Typography {...args} variant="overline">
        OVERLINE
      </Typography>
      <Typography {...args} variant="button">
        Button text
      </Typography>
    </Stack>
  ),
};

export const AlignmentAndWrap: Story = {
  render: (args) => (
    <Stack spacing={1}>
      <Typography {...args} align="left">
        Left aligned
      </Typography>
      <Typography {...args} align="center">
        Center aligned
      </Typography>
      <Typography {...args} align="right">
        Right aligned
      </Typography>
      <Typography {...args} noWrap sx={{ maxWidth: 240 }}>
        This is a very very very long line that will be truncated when noWrap is
        true.
      </Typography>
      <Typography {...args} paragraph>
        Paragraph renders with bottom margin to separate blocks in content
        layouts.
      </Typography>
    </Stack>
  ),
};

export const Colors: Story = {
  args: { variant: "body1" },
  render: (args) => (
    <Stack spacing={1}>
      <Typography {...args} color="primary">
        Primary
      </Typography>
      <Typography {...args} color="secondary">
        Secondary
      </Typography>
      <Typography {...args} color="success">
        Success
      </Typography>
      <Typography {...args} color="error">
        Error
      </Typography>
      <Typography {...args} color="info">
        Info
      </Typography>
      <Typography {...args} color="warning">
        Warning
      </Typography>
      <Typography {...args} color="textPrimary">
        textPrimary
      </Typography>
      <Typography {...args} color="textSecondary">
        textSecondary
      </Typography>
    </Stack>
  ),
};
