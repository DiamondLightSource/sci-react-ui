import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const iconMap = {
  none: undefined,
  save: <SaveIcon />,
  send: <SendIcon />,
  delete: <DeleteIcon />,
  add: <AddIcon />,
} as const;

const meta: Meta<typeof Chip> = {
  title: "MUI/Data Display/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
    layout: "padded",
  },
  argTypes: {
    label: { control: "text" },
    variant: { control: { type: "select" }, options: ["filled", "outlined"] },
    color: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
      ],
    },
    size: { control: { type: "select" }, options: ["small", "medium"] },
    clickable: { control: "boolean" },
    disabled: { control: "boolean" },

    // Real props with mapping
    icon: {
      control: { type: "select" },
      options: Object.keys(iconMap),
      mapping: iconMap,
    },
    deleteIcon: {
      control: { type: "select" },
      options: Object.keys(iconMap),
      mapping: iconMap,
    },
    onDelete: { control: false },
    sx: { control: false },
  },
  args: {
    label: "Chip",
    variant: "filled",
    color: "default",
    size: "medium",
    clickable: false,
    disabled: false,
    icon: "none",
    deleteIcon: "none",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Chip {...args} />,
};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Chip {...args} variant="filled" label="Filled" />
      <Chip {...args} variant="outlined" label="Outlined" />
    </Stack>
  ),
};

export const Colors: Story = {
  args: { variant: "filled" },
  render: (args) => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip {...args} color="default" label="Default" />
      <Chip {...args} color="primary" label="Primary" />
      <Chip {...args} color="secondary" label="Secondary" />
      <Chip {...args} color="success" label="Success" />
      <Chip {...args} color="error" label="Error" />
      <Chip {...args} color="info" label="Info" />
      <Chip {...args} color="warning" label="Warning" />
    </Stack>
  ),
};

export const WithIcons: Story = {
  args: { color: "primary" },
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Chip {...args} icon={"save"} label="Save" />
      <Chip {...args} icon={"add"} label="Add" color="success" />
      <Chip {...args} icon={"send"} label="Send" color="info" />
      <Chip {...args} icon={"delete"} label="Delete" color="error" />
    </Stack>
  ),
};

export const Deletable: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Chip
        {...args}
        label="Deletable"
        deleteIcon={"delete"}
        onDelete={() => console.log("delete clicked")}
      />
      <Chip
        {...args}
        label="With custom delete icon"
        deleteIcon={"send"}
        onDelete={() => console.log("delete clicked")}
      />
    </Stack>
  ),
};
``;
