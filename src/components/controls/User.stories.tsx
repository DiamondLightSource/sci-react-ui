import { Meta, StoryObj } from "@storybook/react";

import { User } from "./User";
import { Avatar, Link, MenuItem } from "@mui/material";
import {Auth} from "../systems/auth";

const meta: Meta<typeof User> = {
  title: "Components/Controls/User",
  component: User,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A control to login/logout with, and to show user info.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: { user: null },
  parameters: {
    docs: {
      description: {
        story: "Default display when not yet logged in.",
      },
    },
  }
};

export const LoggedIn: Story = {
  args: { user: { name: "Name Surname", fedid: "FedID" }, onLogout: () => {} },
  parameters: {
    docs: {
      description: {
        story: "Default display when logged in.",
      },
    },
  },
};

export const LoggedInNoFedId: Story = {
  args: { user: { name: "User's Name" }, onLogout: () => {} },
  parameters: {
    docs: {
      description: {
        story: "Logged in, but no Fed ID.",
      },
    },
  },
};

export const LoggedInLongName: Story = {
  args: {
    user: { name: "Jonathan Edwards Longname", fedid: "abc12345" },
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Logged in with a long name.",
      },
    },
  },
};

export const LoggedInChangeColour: Story = {
  args: {
    colour: "red",
    user: { name: "Name Surname", fedid: "abc12345" },
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "You can change the colour used to display it.",
      },
    },
  },
};

export const LoggedInReplaceAvatar: Story = {
  args: {
    user: { name: "Name Surname", fedid: "abc12345" },
    avatar: <Avatar sx={{ bgcolor: "red" }}>SRU</Avatar>,
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "You can change the avatar image. Perhaps use a photo.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: "You can add additional menu items.",
      },
    },
  },
};

export const UsingAuth: Story = {
  args: {
    auth: {
      authenticated: false,
      initialised: false,
      getProfileUrl:() => "",
      getToken: () => "",
      login() {},
      logout() {},
      _keycloak: null,
      user: {
        name: "User Name ",
        givenName: "",
        familyName: "",
        fedId: "",
        email: ""
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: "If you are using SciReactUI's auth mechanism, you can simply pass the useAuth counterpart in." +
          "<br/><br/>" +
          "<pre>const auth = useAuth();</pre>" +
          "<br/>" +
          "<pre>&lt;User auth={auth}/&gt;</pre>",
      },
    },
  },
};