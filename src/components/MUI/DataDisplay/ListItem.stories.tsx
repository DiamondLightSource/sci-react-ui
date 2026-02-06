import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";
import { ListItemText } from "./ListItemText";
import { List } from "./List";
import { ListItemIcon } from "./ListItemIcon";
import diamond from "../../../public/images/diamond.jpg";
import soleil from "../../../public/images/soleil.jpg";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ListItemAvatar } from "./ListItemAvatar";
import { Avatar } from "./Avatar";

const meta: Meta<typeof ListItem> = {
  title: "MUI/Data Display/List/ListItem",
  component: ListItem,
  parameters: { layout: "padded" },
  argTypes: {
    dense: { control: "boolean" },
    disableGutters: { control: "boolean" },
    disablePadding: { control: "boolean" },
    divider: { control: "boolean" },
  },
  args: {
    dense: false,
    disableGutters: false,
    disablePadding: false,
    divider: true,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <List>
      <ListItem {...args}>
        <ListItemText primary="Item one" secondary="More info" />
      </ListItem>
      <ListItem {...args}>
        <ListItemText primary="Item two" secondary="More info" />
      </ListItem>
      <ListItem {...args}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem {...args}>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Sent" />
      </ListItem>
      <ListItem {...args}>
        <ListItemAvatar>
          <Avatar alt="Diamond" src={diamond}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Third List Item"
          secondary="And some more info..."
        />
      </ListItem>
      <ListItem {...args}>
        <ListItemAvatar>
          <Avatar alt="Soleil" src={soleil} />
        </ListItemAvatar>
        <ListItemText
          primary="Fourth List Item"
          secondary="And even more info..."
        />
      </ListItem>
    </List>
  ),
};
