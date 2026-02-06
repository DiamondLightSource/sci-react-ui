import type { Meta, StoryObj } from "@storybook/react";
import { ListSubheader } from "./ListSubheader";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { ListItemText } from "./ListItemText";

const meta: Meta<typeof ListSubheader> = {
  title: "MUI/Data Display/List/ListSubheader",
  component: ListSubheader,
  parameters: { layout: "padded" },
  argTypes: {
    color: {
      control: { type: "radio" },
      options: ["default", "inherit", "primary"],
    },
    disableGutters: { control: "boolean" },
    disableSticky: { control: "boolean" },
    inset: { control: "boolean" },
  },
  args: {
    color: "default",
    disableGutters: false,
    disableSticky: false,
    inset: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <List subheader={<ListSubheader {...args}>Folders</ListSubheader>}>
      <ListItem>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
  ),
};
