import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const meta: Meta<typeof List> = {
  title: "MUI/Data Display/List",
  component: List,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
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

export const Basic: Story = {
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

export const Dense: Story = {
  args: { dense: true },
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemText primary="Item one" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item two" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item three" />
      </ListItem>
    </List>
  ),
};
