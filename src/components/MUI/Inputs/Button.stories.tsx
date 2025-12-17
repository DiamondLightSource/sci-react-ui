import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { Box } from "../Layout/Box";

const iconMap = {
  none: undefined,
  save: <SaveIcon />,
  send: <SendIcon />,
  delete: <DeleteIcon />,
  add: <AddIcon />,
} as const;
type IconKey = keyof typeof iconMap;

const applyIconArgs = (args: any) => {
  const { startIconName, endIconName, ...rest } = args;
  return {
    ...rest,
    startIcon: iconMap[startIconName as IconKey],
    endIcon: iconMap[endIconName as IconKey],
  };
};

const meta: Meta<typeof Button> = {
  title: "MUI/Inputs/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "contained", "outlined"],
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
      ],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    disableElevation: { control: "boolean" },
    disableFocusRipple: { control: "boolean" },
    disableRipple: { control: "boolean" },
    fullWidth: { control: "boolean" },
    startIconName: {
      name: "startIcon",
      control: { type: "select" },
      options: Object.keys(iconMap),
    },
    endIconName: {
      name: "endIcon",
      control: { type: "select" },
      options: Object.keys(iconMap),
    },

    href: { control: "text" },
    target: { control: { type: "select" }, options: ["", "_self", "_blank"] },
    rel: { control: "text" },
    ariaLabel: { name: "aria-label", control: "text" },

    component: { control: false },
    children: { name: "label", control: "text" },
  },
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "medium",
    disableElevation: false,
    disabled: false,
    disableFocusRipple: false,
    disableRipple: false,
    fullWidth: false,
    startIconName: "none" as IconKey,
    endIconName: "none" as IconKey,
    href: "",
    target: "",
    rel: "",
    ariaLabel: "",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Button
      {...applyIconArgs(args)}
      aria-label={args.ariaLabel || undefined}
      href={args.href || undefined}
      target={args.target || undefined}
      rel={args.rel || undefined}
    >
      {args.children}
    </Button>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Button {...applyIconArgs(args)} variant="text">
        Text
      </Button>
      <Button {...applyIconArgs(args)} variant="contained">
        Contained
      </Button>
      <Button {...applyIconArgs(args)} variant="outlined">
        Outlined
      </Button>
    </Stack>
  ),
  args: { color: "primary" },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Button {...applyIconArgs(args)} size="small">
        Small
      </Button>
      <Button {...applyIconArgs(args)} size="medium">
        Medium
      </Button>
      <Button {...applyIconArgs(args)} size="large">
        Large
      </Button>
    </Stack>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Button {...applyIconArgs(args)} color="primary">
        Primary
      </Button>
      <Button {...applyIconArgs(args)} color="secondary">
        Secondary
      </Button>
      <Button {...applyIconArgs(args)} color="success">
        Success
      </Button>
      <Button {...applyIconArgs(args)} color="error">
        Error
      </Button>
      <Button {...applyIconArgs(args)} color="info">
        Info
      </Button>
      <Button {...applyIconArgs(args)} color="warning">
        Warning
      </Button>
    </Stack>
  ),
  args: { variant: "contained" },
};

export const WithIcons: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Button {...applyIconArgs({ ...args, startIconName: "save" })}>
        Save
      </Button>

      <Button
        {...applyIconArgs({ ...args, startIconName: "add" })}
        variant="contained"
        color="success"
      >
        Add
      </Button>
      <Button
        {...applyIconArgs({ ...args, endIconName: "send" })}
        variant="outlined"
        color="info"
      >
        Send
      </Button>
      <Button
        {...applyIconArgs({ ...args, endIconName: "delete" })}
        variant="text"
        color="error"
      >
        Delete
      </Button>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack spacing={1} sx={{ maxWidth: 480 }}>
      <Box sx={{ display: "inline-block" }}>
        <Button {...applyIconArgs(args)} disabled>
          Disabled
        </Button>
      </Box>
      <Box sx={{ display: "inline-block" }}>
        <Button {...applyIconArgs(args)} variant="contained" disableElevation>
          No Elevation
        </Button>
      </Box>
      <Box sx={{ display: "inline-block" }}>
        <Button
          {...applyIconArgs(args)}
          variant="outlined"
          color="primary"
          href={args.href || "https://mui.com/"}
        >
          Link example
        </Button>
      </Box>
      <Button {...applyIconArgs(args)} variant="contained" fullWidth>
        Full width
      </Button>
    </Stack>
  ),
};
