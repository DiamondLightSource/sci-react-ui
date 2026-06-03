import type { Meta, StoryObj } from "@storybook/react";
import {
  AddIcon,
  Box,
  DeleteIcon,
  Fab,
  FolderIcon,
  SaveIcon,
  WorkIcon,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Fab> = {
  title: "MUI/Inputs/Floating Action Button",
  component: Fab,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "inherit",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
      ],
    },
    size: { control: "select", options: ["small", "medium", "large"] },
    variant: { control: "select", options: ["circular", "extended"] },
    disabled: { control: "boolean" },
  },
  args: {
    color: "primary",
    size: "medium",
    variant: "circular",
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Fab {...args}>
      <AddIcon />
    </Fab>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Box>
      <Fab {...args} color="primary">
        <AddIcon />
      </Fab>
      <Fab {...args} color="secondary">
        <WorkIcon />
      </Fab>
      <Fab {...args} color="success">
        <SaveIcon />
      </Fab>
      <Fab {...args} color="error">
        <DeleteIcon />
      </Fab>
      <Fab {...args} color="info">
        <FolderIcon />
      </Fab>
      <Fab {...args} color="warning">
        <WorkIcon />
      </Fab>
    </Box>
  ),
};

export const Extended: Story = {
  args: { variant: "extended" },
  render: (args) => (
    <Box>
      <Fab {...args}>
        <AddIcon sx={{ mr: 1 }} />
        Add
      </Fab>
      <Fab {...args} color="secondary">
        <DeleteIcon sx={{ mr: 1 }} />
        Delete
      </Fab>
    </Box>
  ),
};
