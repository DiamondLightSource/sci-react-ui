import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { Button } from "../Inputs/Button";
import { ListItemIcon } from "../DataDisplay/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

const originMap = {
  tl: { vertical: "top", horizontal: "left" },
  tc: { vertical: "top", horizontal: "center" },
  tr: { vertical: "top", horizontal: "right" },
  bl: { vertical: "bottom", horizontal: "left" },
  bc: { vertical: "bottom", horizontal: "center" },
  br: { vertical: "bottom", horizontal: "right" },
} as const;

const meta: Meta<typeof Menu> = {
  title: "MUI/Navigation/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    anchorOrigin: {
      control: "select",
      options: Object.keys(originMap),
      mapping: originMap,
    },
    transformOrigin: {
      control: "select",
      options: Object.keys(originMap),
      mapping: originMap,
    },
    keepMounted: { control: "boolean" },
    variant: { control: "select", options: ["selectedMenu", "menu"] },
  },
  args: {
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "left" },
    keepMounted: false,
    variant: "menu",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open menu</Button>
        <Menu
          {...args}
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open menu</Button>
        <Menu
          {...args}
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
            Save
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            Send
          </MenuItem>
        </Menu>
      </div>
    );
  },
};
