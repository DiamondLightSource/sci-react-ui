import type { Meta, StoryObj } from "@storybook/react";
import { Fab } from "./Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import NavigationIcon from "@mui/icons-material/Navigation";

const meta: Meta<typeof Fab> = {
  title: "MUI/Inputs/Fab",
  component: Fab,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
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
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Fab {...args} color="primary">
        <AddIcon />
      </Fab>
      <Fab {...args} color="secondary">
        <EditIcon />
      </Fab>
      <Fab {...args} color="success">
        <AddIcon />
      </Fab>
      <Fab {...args} color="error">
        <AddIcon />
      </Fab>
      <Fab {...args} color="info">
        <AddIcon />
      </Fab>
      <Fab {...args} color="warning">
        <AddIcon />
      </Fab>
    </div>
  ),
};

export const Extended: Story = {
  args: { variant: "extended" },
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Fab {...args}>
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab {...args} color="secondary">
        <EditIcon sx={{ mr: 1 }} />
        Edit
      </Fab>
    </div>
  ),
};
