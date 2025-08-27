import Chip from "@mui/material/Chip";
import { Meta, StoryObj } from "@storybook/react";
import { NavLink, NavLinks, Navbar } from "./Navbar";

import logoImageDark from "../../public/generic/logo-dark.svg";
import logoImageLight from "../../public/generic/logo-light.svg";
import { ColourSchemeButton } from "../controls/ColourSchemeButton";
import { User } from "../controls/User";
import { MockLink } from "../../utils/MockLink";
import { Logo } from "../controls/Logo";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navigation/Navbar",
  component: Navbar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {
    rightSlot: (
      <>
        <User
          key="user"
          onLogin={() => {}}
          onLogout={() => {}}
          user={{ name: "Name", fedid: "FedID" }}
          colour={"white"}
        />
        <ColourSchemeButton key="colourScheme" />
      </>
    ),
    children: (
      <>
        <NavLinks key="links">
          <NavLink href="#Mercury" key="mercury">
            Mercury
          </NavLink>
          <NavLink href="#Venus" key="venus">
            Venus
          </NavLink>
          <NavLink href="#Earth" key="earth">
            Earth
          </NavLink>
          <NavLink href="#Mars" key="mars">
            Mars
          </NavLink>
        </NavLinks>
      </>
    ),
    logo: "theme",
  },
};

export const WithUser: Story = {
  args: {
    rightSlot: (
      <User
        key="user"
        onLogin={() => {}}
        onLogout={() => {}}
        user={{ name: "Name", fedid: "FedID" }}
        colour={"white"}
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

export const RouterLinks: Story = {
  args: {
    children: (
      <NavLinks key="links">
        <NavLink to="/home/first" key="first" linkComponent={MockLink}>
          First
        </NavLink>
        <NavLink to="/home/second" key="second" linkComponent={MockLink}>
          Second
        </NavLink>
      </NavLinks>
    ),
  },
};

export const LinksAndUser: Story = {
  args: {
    rightSlot: (
      <User
        key="user"
        onLogin={() => {}}
        onLogout={() => {}}
        user={{ name: "Name", fedid: "FedID" }}
        colour={"white"}
      />
    ),
    children: (
      <>
        <NavLinks key="links">
          <NavLink href="#" key="first">
            First
          </NavLink>
          <NavLink href="#" key="second">
            Second
          </NavLink>
        </NavLinks>
      </>
    ),
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
    logo: "theme",
  },
  parameters: {
    docs: {
      description: {
        story:
          'The logo is pulled in from the theme when `logo` set to "theme".',
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
      width: "100",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "A separate image can also be referenced.",
      },
    },
  },
};

export const WithThemeLogoAsChild: Story = {
  args: {
    children: (
      <>
        <Logo
          interchange={true}
          style={{
            marginRight: "100px",
            transform: "scale(2.2) translateY(-1px)",
          }}
        />
        <NavLinks key="links">
          <NavLink href="#" key="first">
            First
          </NavLink>
          <NavLink href="#" key="second">
            Second
          </NavLink>
        </NavLinks>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can pass the logo in as a child instead of using the Navbar logo setting for advanced control.",
      },
    },
  },
};

export const CustomChildElement: Story = {
  args: {
    children: <Chip label="Hello, World" sx={{ backgroundColor: "#aaaaaa" }} />,
  },
};

export const LinksInSlot: Story = {
  args: {
    rightSlot: (
      <>
        <User
          key="user"
          onLogin={() => {}}
          onLogout={() => {}}
          user={{ name: "Name", fedid: "FedID" }}
          colour={"white"}
        />
        <ColourSchemeButton key="colourScheme" />
      </>
    ),
    leftSlot: (
      <>
        <NavLinks key="links">
          <NavLink href="#Mercury" key="mercury">
            Mercury
          </NavLink>
          <NavLink href="#Venus" key="venus">
            Venus
          </NavLink>
          <NavLink href="#Earth" key="earth">
            Earth
          </NavLink>
          <NavLink href="#Mars" key="mars">
            Mars
          </NavLink>
        </NavLinks>
      </>
    ),
    logo: "theme",
  },
};

export const AllSlots: Story = {
  args: {
    leftSlot: (
      <NavLink to="left" linkComponent={MockLink}>
        Left
      </NavLink>
    ),
    centreSlot: (
      <NavLink to="centre" linkComponent={MockLink}>
        Centre
      </NavLink>
    ),
    rightSlot: (
      <NavLink to="right" linkComponent={MockLink}>
        Right
      </NavLink>
    ),
    children: (
      <NavLink to="children" linkComponent={MockLink}>
        Children
      </NavLink>
    ),
    logo: "theme",
  },
};
export const WithLogin: Story = {
  args: {
    children: <User onLogin={() => {}} onLogout={() => {}} user={null} />,
  },
};

export const Empty: Story = {
  args: {},
};
