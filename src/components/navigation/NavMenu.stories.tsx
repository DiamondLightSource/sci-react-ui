import type { Meta, StoryObj } from "@storybook/react";
import { NavMenu, NavMenuLink } from "./NavMenu";
import { Button, Divider, Typography } from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import { MockLink } from "../../utils/MockLink";

const meta: Meta<typeof NavMenu> = {
  title: "Components/Navigation/NavMenu",
  component: NavMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A dropdown menu for the Navbar. Can contain multiple `NavMenuLink`s that can be navigated between using the mouse or the keyboard.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicMenu: Story = {
  args: {
    label: "NavMenu",
    children: (
      <>
        <NavMenuLink href="#Link1">First Link</NavMenuLink>
        <NavMenuLink href="#Link2">Second Link</NavMenuLink>
        <NavMenuLink href="#Link3">Third Link</NavMenuLink>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A `NavMenu` populated with `NavMenuLink`s. The menu text is set using `label: "NavMenu"`.',
      },
    },
  },
};

export const RouterMenu: Story = {
  args: {
    label: "NavMenu",
    children: (
      <>
        <NavMenuLink to="/home/first" linkComponent={MockLink}>
          First Route
        </NavMenuLink>
        <NavMenuLink to="/home/second" linkComponent={MockLink}>
          Second Route
        </NavMenuLink>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Like `NavLink`s, `NavMenuLink`s can use routing links too.",
      },
    },
  },
};

export const CustomChildren: Story = {
  args: {
    label: "NavMenu",
    children: (
      <>
        <Typography
          sx={{
            padding: "4px 4px 4px",
            color: "white",
          }}
        >
          Section Header
        </Typography>
        <Divider />
        <Button sx={{ color: "white" }} startIcon={<Autorenew />}>
          Button
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A `NavMenu` may contain components other than `NavMenuLink`s. This one has a section header (made using a `Typography` and a `Divider`) and a button.",
      },
    },
  },
};
