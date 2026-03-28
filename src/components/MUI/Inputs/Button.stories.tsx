import type { Meta, StoryObj } from "@storybook/react";
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

const meta: Meta<typeof Button> = {
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
    href: { control: "text" },
    rel: { control: "text" },
    children: { name: "label", control: "text" },
  },
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "medium",
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
  render: (args) => (
    <Button {...args} href={args.href || undefined} rel={args.rel || undefined}>
      {args.children}
    </Button>
  ),
};

export const Variants: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={1}>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  args: {
    disableFocusRipple: true
  },

  render: (args) => (
    <Stack direction="row" spacing={1}>
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
  )
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
