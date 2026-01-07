import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Typography } from "../DataDisplay/Typography";
import { Button } from "../Inputs/Button";

const meta: Meta<typeof Dialog> = {
  title: "MUI/Feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    fullWidth: { control: "boolean" },
    maxWidth: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", false],
    },
    fullScreen: { control: "boolean" },
    scroll: { control: "select", options: ["paper", "body"] },
  },
  args: { fullWidth: true, maxWidth: "sm", fullScreen: false, scroll: "paper" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Title</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body2">Content goes here.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button variant="contained">Action</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};

export const FullScreen: Story = {
  args: { fullScreen: true },
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button onClick={() => setOpen(true)}>Open full-screen</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Full Screen</DialogTitle>
          <DialogContent dividers>
            <Typography>Full-screen content.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};
