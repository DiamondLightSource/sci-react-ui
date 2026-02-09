import type { Meta, StoryObj } from "@storybook/react";
import { ListItemText } from "./ListItemText";
import { ListItem } from "./ListItem";
import { List } from "./List";

const meta: Meta<typeof ListItemText> = {
  title: "MUI/Data Display/List/ListItemText",
  component: ListItemText,
  parameters: { layout: "padded" },
  argTypes: {
    primary: { control: "text" },
    secondary: { control: "text" },
    inset: { control: "boolean" },
  },
  args: {
    primary: "Primary text",
    secondary: "Secondary text",
    inset: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <List>
      <ListItem>
        <ListItemText {...args} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Another item" />
      </ListItem>
    </List>
  ),
};
