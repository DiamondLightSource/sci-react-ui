import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";

import {
  AddIcon,
  Box,
  Button,
  DeleteIcon,
  SaveIcon,
  SendIcon,
  Stack,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const icons = {
  none: null,
  save: <SaveIcon />,
  add: <AddIcon />,
  send: <SendIcon />,
  delete: <DeleteIcon />,
};

type IconName = keyof typeof icons;

type ButtonStoryProps = ComponentProps<typeof Button> & {
  icon: IconName;
  iconPosition: "start" | "end";
};

const meta: Meta<ButtonStoryProps> = {
  title: "MUI/Inputs/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "contained", "outlined"],
    },
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
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    icon: {
      control: "select",
      options: Object.keys(icons),
    },
    iconPosition: {
      control: "radio",
      options: ["start", "end"],
      if: { arg: "icon", neq: "none" },
    },
    href: { control: "text" },
    rel: { control: "text" },
    children: { name: "label", control: "text" },
  },
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "medium",
    icon: "none",
    iconPosition: "start",
    disabled: false,
    disableElevation: false,
    fullWidth: false,
    href: "",
    rel: "",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ icon = "none", iconPosition = "start", ...args }) => {
    const iconElement = icons[icon as IconName];

    return (
      <Button
        {...args}
        startIcon={iconPosition === "start" ? iconElement : undefined}
        endIcon={iconPosition === "end" ? iconElement : undefined}
        href={args.href || undefined}
        rel={args.rel || undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const Variants: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button variant="text">Text</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="contained">Contained</Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Button size="small" variant="contained">
        Small
      </Button>
      <Button size="medium" variant="contained">
        Medium
      </Button>
      <Button size="large" variant="contained">
        Large
      </Button>
    </Stack>
  ),
};

export const Colours: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button color="primary" variant="contained">
        Primary
      </Button>
      <Button color="secondary" variant="contained">
        Secondary
      </Button>
      <Button color="success" variant="contained">
        Success
      </Button>
      <Button color="error" variant="contained">
        Error
      </Button>
      <Button color="info" variant="contained">
        Info
      </Button>
      <Button color="warning" variant="contained">
        Warning
      </Button>
    </Stack>
  ),
};

export const WithStartIcon: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button startIcon={<SaveIcon />} variant="contained">
        Save
      </Button>
      <Button startIcon={<AddIcon />} color="success" variant="contained">
        Add
      </Button>
    </Stack>
  ),
};

export const WithEndIcon: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button endIcon={<SendIcon />} variant="contained">
        Send
      </Button>
      <Button endIcon={<DeleteIcon />} color="error" variant="contained">
        Delete
      </Button>
    </Stack>
  ),
};

export const States: Story = {
  render: (_args) => (
    <Stack spacing={1} sx={{ maxWidth: 480 }}>
      <Box>
        <Button disabled variant="contained">
          Disabled
        </Button>
      </Box>
      <Box>
        <Button disableElevation variant="contained">
          No elevation
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          href="https://mui.com/"
          rel="noopener noreferrer"
        >
          Link example
        </Button>
      </Box>
      <Button variant="contained" fullWidth>
        Full width
      </Button>
    </Stack>
  ),
};

export const PrimaryAction: Story = {
  name: "Primary action",
  render: (_args) => (
    <Button variant="contained" color="primary">
      Run
    </Button>
  ),
};

export const PrimarySecondaryAction: Story = {
  name: "Primary & Secondary action",
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button variant="outlined" color="primary">
        Preview
      </Button>
      <Button variant="contained" color="primary">
        Run
      </Button>
    </Stack>
  ),
};

export const PrimaryAlternativeAction: Story = {
  name: "Primary & Alternative action",
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button variant="contained" color="primary">
        Run
      </Button>
      <Button variant="outlined" color="secondary">
        Advanced mode
      </Button>
    </Stack>
  ),
};

export const ActivePrimaryAlternativeAction: Story = {
  name: "Active Primary & Alternative mode",
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button variant="contained" color="primary">
        Run
      </Button>
      <Button variant="contained" color="secondary">
        Exit mode
      </Button>
    </Stack>
  ),
};

export const SecondaryActiveAlternativeAction: Story = {
  name: "Secondary & Active-Alternative mode",
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button variant="outlined" color="primary">
        Stop
      </Button>
      <Button variant="contained" color="secondary">
        Exit mode
      </Button>
    </Stack>
  ),
};

export const SecondaryAlternativeAction: Story = {
  name: "Running with active alternative mode",
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button variant="outlined" color="primary">
        Stop
      </Button>
      <Button variant="outlined" color="secondary">
        Advanced mode
      </Button>
    </Stack>
  ),
};

export const DestructiveAction: Story = {
  name: "Destructive action",
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button variant="contained" color="primary">
        Save
      </Button>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Stack>
  ),
};

export const ConfirmedDestructiveAction: Story = {
  name: "Confirmed destructive action",
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button variant="text" color="inherit">
        Cancel
      </Button>
      <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
        Delete permanently
      </Button>
    </Stack>
  ),
};
