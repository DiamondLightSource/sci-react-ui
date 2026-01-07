import type { Meta, StoryObj } from "@storybook/react";
import { ListItemButton } from "./ListItemButton";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { ListItemText } from "./ListItemText";

const meta: Meta<typeof ListItemButton> = {
  title: "MUI/Data Display/List/ListItemButton",
  component: ListItemButton,
  parameters: { layout: "padded" },
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    selected: false,
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <List component="nav">
      <ListItem disablePadding>
        <ListItemButton {...args}>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton {...args}>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </ListItem>
    </List>
  ),
};
