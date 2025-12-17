import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Drawer } from "./Drawer";
import { Button } from "../Inputs/Button";
import { List } from "../DataDisplay/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const meta: Meta<typeof Drawer> = {
  title: "MUI/Navigation/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    anchor: { control: "select", options: ["left", "right", "top", "bottom"] },
  },
  args: { anchor: "left" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Temporary: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <div
            role="presentation"
            style={{
              width:
                args.anchor === "top" || args.anchor === "bottom"
                  ? "100%"
                  : 250,
            }}
          >
            <List>
              <ListItem>
                <ListItemText primary="Item 1" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Item 2" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Item 3" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  },
};
