import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Drawer> = {
  title: "MUI/Navigation/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    anchor: { control: "select", options: ["left", "right", "top", "bottom"] },
  },
  args: { anchor: "left" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Box style={{ display: "flex", gap: 12 }}>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <Box
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
          </Box>
        </Drawer>
      </Box>
    );
  },
};
