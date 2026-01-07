import type { Meta, StoryObj } from "@storybook/react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { ListItemIcon } from "./ListItemIcon";
import { ListItemText } from "./ListItemText";
import { Divider } from "./Divider";

const meta: Meta<typeof List> = {
  title: "MUI/Data Display/List/List",
  component: List,
  parameters: { layout: "padded" },
  argTypes: {
    dense: { control: "boolean" },
    disablePadding: { control: "boolean" },
    subheader: { control: "text" },
  },
  args: {
    dense: false,
    disablePadding: false,
    subheader: "",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" secondary="All messages" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Sent" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Drafts" />
      </ListItem>
    </List>
  ),
};
