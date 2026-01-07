import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { SvgIcon } from "./SvgIcon";
import { Stack } from "../Layout/Stack";

const ArrowDownPath = (
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
);

const meta: Meta<typeof IconButton> = {
  title: "MUI/Data Display/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
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
      description:
        "Applies theme color to the IconButton (icon inherits via context).",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "IconButton size. Icon inside can also set fontSize.",
    },
    edge: {
      control: "select",
      options: [false, "start", "end"],
      description: "Move the button to the edge of a container for alignment.",
    },
    disabled: { control: "boolean" },
    "aria-label": {
      control: "text",
      name: "aria-label",
      description: "Accessible label for screen readers.",
    },
    sx: { control: "object", description: "MUI `sx` prop for ad‑hoc styling." },

    children: { control: false },
  },
  args: {
    color: "inherit",
    size: "medium",
    edge: false,
    disabled: false,
    "aria-label": "arrow down",
    sx: undefined,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <IconButton {...args}>{ArrowDownPath}</IconButton>,
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton {...args} size="small" aria-label="arrow down small">
        {ArrowDownPath}
      </IconButton>
      <IconButton {...args} size="medium" aria-label="arrow down medium">
        {ArrowDownPath}
      </IconButton>
      <IconButton {...args} size="large" aria-label="arrow down large">
        {ArrowDownPath}
      </IconButton>
    </Stack>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton {...args} color="inherit" aria-label="inherit">
        {ArrowDownPath}
      </IconButton>
      <IconButton {...args} color="primary" aria-label="primary">
        {ArrowDownPath}
      </IconButton>
      <IconButton {...args} color="secondary" aria-label="secondary">
        {ArrowDownPath}
      </IconButton>
      <IconButton {...args} color="success" aria-label="success">
        {ArrowDownPath}
      </IconButton>
      <IconButton {...args} color="error" aria-label="error">
        {ArrowDownPath}
      </IconButton>
      <IconButton {...args} color="info" aria-label="info">
        {ArrowDownPath}
      </IconButton>
      <IconButton {...args} color="warning" aria-label="warning">
        {ArrowDownPath}
      </IconButton>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <IconButton {...args}>{ArrowDownPath}</IconButton>,
};

export const EdgeAlignment: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} sx={{ border: "1px dashed #ccc", p: 2 }}>
      <IconButton {...args} edge="start" aria-label="start edge">
        {ArrowDownPath}
      </IconButton>
      <div style={{ flex: 1 }} />
      <IconButton {...args} edge="end" aria-label="end edge">
        {ArrowDownPath}
      </IconButton>
    </Stack>
  ),
};

export const WithCustomSvgIcon: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton {...args} color="primary" aria-label="custom svg primary">
        <SvgIcon viewBox="0 0 24 24" htmlColor="#1976d2" fontSize="medium">
          <path d="M5 20h14v-2H5v2zm7-18v12l4-4 1.41 1.41L12 18l-5.41-5.59L8 10l4 4V2h2z" />
        </SvgIcon>
      </IconButton>

      <IconButton {...args} color="secondary" aria-label="custom svg secondary">
        <SvgIcon htmlColor="#9c27b0" fontSize="large">
          <path d="M12 2L6 12h4v8h4v-8h4L12 2z" />
        </SvgIcon>
      </IconButton>

      <div style={{ fontSize: 32, display: "flex", alignItems: "center" }}>
        <IconButton {...args} color="inherit" aria-label="inherit font size">
          <SvgIcon fontSize="inherit">
            <path d="M4 12l8 8 8-8-1.41-1.41L13 16.17V4h-2v12.17L5.41 10.59 4 12z" />
          </SvgIcon>
        </IconButton>
      </div>
    </Stack>
  ),
};

export const StyledViaSx: Story = {
  args: {
    sx: { "& svg": { fontSize: 40 } },
  },
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton {...args} color="primary" aria-label="large icon via sx">
        {ArrowDownPath}
      </IconButton>
      <IconButton
        {...args}
        color="secondary"
        aria-label="rotated icon via sx"
        sx={{ "& svg": { transform: "rotate(90deg)" } }}
      >
        {ArrowDownPath}
      </IconButton>
    </Stack>
  ),
};
``;
