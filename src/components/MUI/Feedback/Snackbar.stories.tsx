import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Snackbar } from "./Snackbar";
import { Button } from "../Inputs/Button";

const anchorMap = {
  "top-left": { vertical: "top", horizontal: "left" },
  "top-center": { vertical: "top", horizontal: "center" },
  "top-right": { vertical: "top", horizontal: "right" },
  "bottom-left": { vertical: "bottom", horizontal: "left" },
  "bottom-center": { vertical: "bottom", horizontal: "center" },
  "bottom-right": { vertical: "bottom", horizontal: "right" },
} as const;

const meta: Meta<typeof Snackbar> = {
  title: "MUI/Feedback/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    message: { control: "text" },
    autoHideDuration: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
    anchorOrigin: {
      control: { type: "select" },
      options: Object.keys(anchorMap),
      mapping: anchorMap,
    },
  },
  args: {
    message: "Saved",
    autoHideDuration: 3000,
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button onClick={() => setOpen(true)}>Show</Button>
        <Snackbar {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const Positions: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <Snackbar
          {...args}
          anchorOrigin={anchorMap["top-left"]}
          open={open}
          onClose={() => setOpen(false)}
        />
        <Snackbar
          {...args}
          anchorOrigin={anchorMap["top-center"]}
          open={open}
          onClose={() => setOpen(false)}
        />
        <Snackbar
          {...args}
          anchorOrigin={anchorMap["top-right"]}
          open={open}
          onClose={() => setOpen(false)}
        />
        <Snackbar
          {...args}
          anchorOrigin={anchorMap["bottom-left"]}
          open={open}
          onClose={() => setOpen(false)}
        />
        <Snackbar
          {...args}
          anchorOrigin={anchorMap["bottom-center"]}
          open={open}
          onClose={() => setOpen(false)}
        />
        <Snackbar
          {...args}
          anchorOrigin={anchorMap["bottom-right"]}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
