import { Meta, StoryObj } from "@storybook/react";

import { User } from "./User";
import { Avatar, Link, MenuItem } from "@mui/material";

const meta: Meta<typeof User> = {
  title: "SciReactUI/Control/User",
  component: User,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: { user: null },
};

export const LoggedIn: Story = {
  args: { user: { name: "Name Surname", fedid: "FedID" }, onLogout: () => {} },
};

export const LoggedInNoName: Story = {
  args: { user: { fedid: "FedID" }, onLogout: () => {} },
};

export const LoggedInLongName: Story = {
  args: {
    user: { name: "Jonathan Edwards Longname", fedid: "abc12345" },
    onLogout: () => {},
  },
};

export const LoggedInChangeColour: Story = {
  args: {
    colour: "red",
    user: { name: "Name Surname", fedid: "abc12345" },
    onLogout: () => {},
  },
};

export const LoggedInReplaceAvatar: Story = {
  args: {
    user: { name: "Name Surname", fedid: "abc12345" },
    avatar: <Avatar sx={{ bgcolor: "red" }}>JL</Avatar>,
    onLogout: () => {},
  },
};

export const AdditionalMenuItems: Story = {
  args: {
    user: {
      name: "Name Surname",
      fedid: "FedID",
    },
    menuItems: [
      <MenuItem key="profile" aria-label="Profile">
        <Link sx={{ textDecoration: "none" }}>Profile</Link>
      </MenuItem>,
      <MenuItem key="settings" aria-label="Settings">
        <Link sx={{ textDecoration: "none" }}>Settings</Link>
      </MenuItem>,
    ],
    onLogout: () => {},
  },
};
