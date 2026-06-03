import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  Divider,
  InboxIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MailIcon,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof List> = {
  title: "MUI/Data Display/List",
  component: List,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    dense: { control: "boolean" },
    disablePadding: { control: "boolean" },
  },
  args: {
    dense: false,
    disablePadding: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemText primary="Item one" secondary="Secondary text" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item two" secondary="Secondary text" />
      </ListItem>
    </List>
  ),
};

export const WithListItemIcons: Story = {
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
        <ListItemText primary="Sent mail" />
      </ListItem>
    </List>
  ),
};

export const WithAvatars: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemIcon>
          <Avatar>AB</Avatar>
        </ListItemIcon>
        <ListItemText primary="Alice Brown" secondary="Online" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar>CD</Avatar>
        </ListItemIcon>
        <ListItemText primary="Chris Doe" secondary="Offline" />
      </ListItem>
    </List>
  ),
};

export const WithListSubheader: Story = {
  render: (args) => (
    <List
      {...args}
      subheader={<ListSubheader component="div">Folders</ListSubheader>}
    >
      <ListItem>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
    </List>
  ),
};

export const WithListItemButton: Story = {
  render: (args) => (
    <List {...args} component="nav">
      <ListItem disablePadding>
        <ListItemButton selected>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </ListItem>
    </List>
  ),
};

export const WithDividers: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemText primary="Item one" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Item two" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Item three" />
      </ListItem>
    </List>
  ),
};

export const Dense: Story = {
  args: { dense: true },
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemText primary="Dense item one" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Dense item two" />
      </ListItem>
    </List>
  ),
};
