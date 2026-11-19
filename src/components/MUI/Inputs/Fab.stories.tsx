import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Box, Fab } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";
import { LucideIcon } from "../../datadisplay/Icons";
import { Briefcase, Folder, Plus, Save, Trash2 } from "lucide-react";

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
      <LucideIcon icon={Plus} />
    </Fab>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Box>
      <Fab {...args} color="primary">
        <LucideIcon icon={Plus} />
      </Fab>
      <Fab {...args} color="secondary">
        <LucideIcon icon={Briefcase} />
      </Fab>
      <Fab {...args} color="success">
        <LucideIcon icon={Save} />
      </Fab>
      <Fab {...args} color="error">
        <LucideIcon icon={Trash2} />
      </Fab>
      <Fab {...args} color="info">
        <LucideIcon icon={Folder} />
      </Fab>
      <Fab {...args} color="warning">
        <LucideIcon icon={Briefcase} />
      </Fab>
    </Box>
  ),
};

export const Extended: Story = {
  args: { variant: "extended" },
  render: (args) => (
    <Box>
      <Fab {...args}>
        <LucideIcon icon={Plus} sx={{ mr: 1 }} />
        Add
      </Fab>
      <Fab {...args} color="secondary">
        <LucideIcon icon={Trash2} sx={{ mr: 1 }} />
        Delete
      </Fab>
    </Box>
  ),
};
