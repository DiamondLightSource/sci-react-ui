import { Meta, StoryObj } from "@storybook/react";

import { User } from "./User";
import {Avatar} from "@mui/material";

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
  args: { user: { name: "Name Surname", fedid: "FedID" } },
};

export const LoggedInNoName: Story = {
  args: { user: { fedid: "FedID" } },
};

export const LoggedInLongName: Story = {
  args: { user: { name: "Jonathan Edwards Longname", fedid: "abc12345" } },
};

export const LoggedInChangeColor: Story = {
  args: {
    color: "red",
    user: { name: "Name Surname", fedid: "abc12345" }
  },
};

export const LoggedInReplaceAvatar: Story = {
  args: {
    user: { name: "Name Surname", fedid: "abc12345" },
    avatar: <Avatar sx={{ bgcolor: "red" }}>JL</Avatar>
  },
};
