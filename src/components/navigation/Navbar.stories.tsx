import { Meta, StoryObj } from "@storybook/react";
import { NavLink, NavLinks, Navbar } from "./Navbar";

import logoImageDark from "../../public/generic/logo-dark-surface.svg";
import logoImageLight from "../../public/generic/logo-light-surface.svg";
import { ColourSchemeButton } from "../controls/ColourSchemeButton";
import { User } from "../controls/User";
import { MockLink } from "../../utils/MockLink";
import { Logo } from "../controls/Logo";
import { NavMenu, NavMenuLink } from "../navigation/NavMenu";
import { Chip, Typography } from "../../components/MUI/MuiWrapped";
import { TextLight, TextDark } from "../../../.storybook/ThemeSwapper";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navigation/Navbar",
  component: Navbar,
  subcomponents: { NavMenu, NavMenuLink, NavLink, NavLinks },
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
        </NavLinks>
        <NavMenu key="links" label={"Planets"}>
          <NavMenuLink href="#Earth" key="earth">
            Earth
          </NavMenuLink>
          <NavMenuLink href="#Mars" key="mars">
            Mars
          </NavMenuLink>
          <NavMenuLink href="#Jupiter" key="jupiter">
            Jupiter
          </NavMenuLink>
        </NavMenu>
      </>
    ),
    logo: "theme",
  },
  parameters: {
    disableThemeSwapper: true,
  },
};

export const NavbarVariants: Story = {
  render: (_args) => (
    <>
      <Navbar leftSlot={<Typography>Default (brand-fixed)</Typography>} />
      <Navbar
        surface="brand"
        variant="solid"
        leftSlot={<Typography>Brand Solid</Typography>}
      />
      <Navbar
        surface="primary"
        variant="container"
        leftSlot={<Typography>Primary Container</Typography>}
      />
      <Navbar
        surface="surface"
        elevation={2}
        leftSlot={<Typography>Surface Elevated</Typography>}
      />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Navbar defaults to brand-fixed, but surface, variant, and elevation can be customised.",
      },
    },
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

export const WithLinksInMenu: Story = {
  args: {
    leftSlot: (
      <NavMenu label="Menu">
        <NavMenuLink href="#Link1">First Link</NavMenuLink>
        <NavMenuLink href="#Link2">Second Link</NavMenuLink>
        <NavMenuLink href="#Link3">Third Link</NavMenuLink>
      </NavMenu>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "The `NavMenu` component is used to contain multiple links.",
      },
    },
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
          tone={"inverse"}
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
  parameters: {
    disableThemeSwapper: true,
  },
};

export const LinksAndMenus: Story = {
  args: {
    leftSlot: (
      <>
        <NavLinks>
          <NavLink href="#Mercury">Mercury</NavLink>
          <NavLink href="#Venus">Venus</NavLink>
        </NavLinks>
        <NavMenu key="links" label={"Planets"}>
          <NavMenuLink href="#Earth" key="earth">
            Earth
          </NavMenuLink>
          <NavMenuLink href="#Mars" key="mars">
            Mars
          </NavMenuLink>
        </NavMenu>

        <NavMenu key="links" label={"Stars"}>
          <NavMenuLink href="#Sun" key="sun">
            Sun
          </NavMenuLink>
          <NavMenuLink href="#AlphaCentauri" key="star">
            Alpha Centauri
          </NavMenuLink>
          <NavMenuLink href="#DA40DiamondStar" key="plane">
            DA40 Diamond
          </NavMenuLink>
          <NavMenuLink href="#BillMurray" key="film">
            Bill Murray
          </NavMenuLink>
        </NavMenu>
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

export const AllFixedLight: Story = {
  ...All,
  name: "All (Fixed Light)",
  parameters: {
    docs: {
      disable: true,
    },
  },
  globals: {
    themeMode: TextLight,
  },
};

export const AllFixedDark: Story = {
  ...All,
  name: "All (Fixed Dark)",
  parameters: {
    docs: {
      disable: true,
    },
  },
  globals: {
    themeMode: TextDark,
  },
};
