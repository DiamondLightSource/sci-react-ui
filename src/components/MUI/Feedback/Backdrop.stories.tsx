import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Backdrop } from "./Backdrop";
import { CircularProgress } from "./CircularProgress";
import { Button } from "../Inputs/Button";

const meta: Meta<typeof Backdrop> = {
  title: "MUI/Feedback/Backdrop",
  component: Backdrop,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    open: { control: "boolean" },
    invisible: { control: "boolean" },
  },
  args: { open: false, invisible: false },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button onClick={() => setOpen(true)}>Show</Button>
        <Backdrop
          {...args}
          open={open}
          onClick={() => setOpen(false)}
          sx={{ color: "#fff", zIndex: (t) => t.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  },
};
