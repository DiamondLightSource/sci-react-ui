import type { Meta, StoryObj } from "@storybook/react";
import { SvgIcon } from "./SvgIcon";
import { IconButton } from "./IconButton";
import { Stack } from "../Layout/Stack";

const meta: Meta<typeof SvgIcon> = {
  title: "MUI/Data Display/SvgIcon",
  component: SvgIcon,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
    layout: "padded",
  },
  argTypes: {
    color: {
      control: "select",
      options: [
        "inherit",
        "primary",
        "secondary",
        "action",
        "disabled",
        "error",
        "info",
        "success",
        "warning",
      ],
      description: "Applies theme color",
    },
    fontSize: {
      control: "select",
      options: ["inherit", "small", "medium", "large"],
      description: "Applies theme size preset",
    },
    viewBox: {
      control: "text",
      description: "ViewBox for the SVG; default is '0 0 24 24'",
    },
    inheritViewBox: {
      control: "boolean",
      description:
        "If true, use the viewBox of the child SVG element rather than the default",
    },
    titleAccess: {
      control: "text",
      description:
        "Adds a <title> element for accessibility (sets role='img' if provided)",
    },
    sx: {
      control: "object",
      description: "MUI `sx` prop",
    },
  },
  args: {
    color: "primary",
    fontSize: "medium",
    viewBox: "0 0 24 24",
    inheritViewBox: false,
    titleAccess: "Down arrow",
    sx: undefined,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

const d = "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z";

export const Basic: Story = {
  render: (args) => <SvgIcon {...args}>{<path d={d} />}</SvgIcon>,
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <SvgIcon {...args} fontSize="small">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} fontSize="medium">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} fontSize="large">
        {<path d={d} />}
      </SvgIcon>
      <div style={{ fontSize: 32, display: "flex", alignItems: "center" }}>
        <SvgIcon {...args} fontSize="inherit">
          {<path d={d} />}
        </SvgIcon>
      </div>
    </Stack>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      <SvgIcon {...args} color="inherit">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} color="primary">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} color="secondary">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} color="error">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} color="warning">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} color="info">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} color="success">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} color="action">
        {<path d={d} />}
      </SvgIcon>
      <SvgIcon {...args} color="disabled">
        {<path d={d} />}
      </SvgIcon>
    </Stack>
  ),
};

export const CustomViewBoxAndInherit: Story = {
  args: {
    viewBox: "0 0 48 48",
    inheritViewBox: false,
    titleAccess: "Custom viewBox icon",
    pathD: "M24 4L12 20h8v16h8V20h8L24 4z",
  },
  render: (args) => (
    <Stack direction="row" spacing={4} alignItems="center">
      <SvgIcon {...args}>{<path d={d} />}</SvgIcon>
      <SvgIcon {...args} inheritViewBox>
        <svg viewBox="0 0 32 32">
          <path d="M16 2l-6 10h4v8h4v-8h4L16 2z" />
        </svg>
      </SvgIcon>
    </Stack>
  ),
};

export const InIconButton: Story = {
  args: { color: "primary" },
  render: (args) => (
    <Stack direction="row" spacing={2}>
      <IconButton color="primary" aria-label="download">
        <SvgIcon viewBox="0 0 24 24">
          <path d="M5 20h14v-2H5v2zm7-18v12l4-4 1.41 1.41L12 18l-5.41-5.59L8 10l4 4V2h2z" />
        </SvgIcon>
      </IconButton>
      <IconButton color="secondary" aria-label="arrow down">
        <SvgIcon>
          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
        </SvgIcon>
      </IconButton>
    </Stack>
  ),
};
