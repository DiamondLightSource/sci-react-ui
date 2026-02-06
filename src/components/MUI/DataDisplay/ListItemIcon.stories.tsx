import type { Meta, StoryObj } from "@storybook/react";
import { ListItemIcon } from "./ListItemIcon";
import { ListItem } from "./ListItem";
import { List } from "./List";
import { ListItemText } from "./ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const meta: Meta<typeof ListItemIcon> = {
  title: "MUI/Data Display/List/ListItemIcon",
  component: ListItemIcon,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <List>
      <ListItem>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Sent" />
      </ListItem>
    </List>
  ),
};
