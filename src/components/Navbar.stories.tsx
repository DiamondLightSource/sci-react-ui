import Chip from "@mui/material/Chip";
import { Meta, StoryObj } from "@storybook/react";
import { User } from "./User";
import { NavLink, NavLinks, Navbar } from "./Navbar";

import logoImageDark from "../public/generic/logo-dark.svg"
import logoImageLight from "../public/generic/logo-light.svg"

const meta: Meta<typeof Navbar> = {
  title: "SciReactUI/Navigation/Navbar",
  component: Navbar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {},
};

export const WithLogin: Story = {
  args: {
    children: <User onLogin={() => {}} onLogout={() => {}} user={null} />,
  },
};

export const WithUser: Story = {
  args: {
    children: (
      <User
        key="user"
        onLogin={() => {}}
        onLogout={() => {}}
        user={{ name: "Name", fedid: "FedID" }}
        color={"white"}
      />
    ),
  },
};

export const Links: Story = {
  args: {
    children: (
      <NavLinks key="links">
        <NavLink href="#" key="first">
          First
        </NavLink>
        <NavLink href="#" key="second">
          Second
        </NavLink>
      </NavLinks>
    ),
  },
};

export const LinksAndUser: Story = {
  args: {
    children: [
      <NavLinks key="links">
        <NavLink href="#" key="first">
          First
        </NavLink>
        <NavLink href="#" key="second">
          Second
        </NavLink>
      </NavLinks>,
      <User
        key="user"
        onLogin={() => {}}
        onLogout={() => {}}
        user={{ name: "Name", fedid: "FedID" }}
        color={"white"}
      />,
    ],
  },
};

export const WithThemeLogo: Story = {
  args: {
    children: (
      <NavLinks key="links">
        <NavLink href="#" key="first">
          First
        </NavLink>
        <NavLink href="#" key="second">
          Second
        </NavLink>
      </NavLinks>
    ),
    logo: "theme"
  },
  parameters: {
    docs: {
      description: {
        story: 'The logo is pulled in from the theme when `logo` set to "theme".'
      },
    },
  },
};

export const WithNonThemeLogo: Story = {
  
  args: {
    children: (
        <NavLinks key="links">
          <NavLink href="#" key="first">
            First
          </NavLink>
          <NavLink href="#" key="second">
            Second
          </NavLink>
        </NavLinks>
    ),
    logo: {
        src: logoImageLight,
        srcDark: logoImageDark,
        alt: "Home",
        width: "100"
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'A separate image can also be referenced.'
      },
    },
  },
};

export const CustomChildElement: Story = {
  args: {
    children: <Chip label="Hello, World" sx={{ backgroundColor: "#aaaaaa" }} />,
  },
};
