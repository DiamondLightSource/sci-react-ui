import type { Meta, StoryObj } from "@storybook/react";
import { AppBar } from "./AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "../DataDisplay/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "../DataDisplay/Typography";
import { Button } from "../Inputs/Button";

const meta: Meta<typeof AppBar> = {
  title: "MUI/Navigation/AppBar",
  component: AppBar,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "fullscreen" },
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
        "transparent",
        "inherit",
      ],
    },
    position: {
      control: "select",
      options: ["fixed", "absolute", "sticky", "static", "relative"],
    },
  },
  args: { color: "primary", position: "static" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <AppBar {...args}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Title
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  ),
};
