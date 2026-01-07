import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ClickAwayListener } from "./ClickAwayListener";
import { Box } from "../Layout/Box";
import { Button } from "../Inputs/Button";

type ExtraArgs = {
  content?: string;
};
type Args = React.ComponentProps<typeof ClickAwayListener> & ExtraArgs;

const meta: Meta<Args> = {
  title: "MUI/Utils/ClickAwayListener",
  component: ClickAwayListener,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    disableReactTree: { control: "boolean" },
    mouseEvent: {
      control: "select",
      options: [
        "onClick",
        "onMouseDown",
        "onMouseUp",
        "onPointerDown",
        "onPointerUp",
        false,
      ],
    },
    touchEvent: {
      control: "select",
      options: ["onTouchEnd", "onTouchStart", false],
    },
    onClickAway: { control: false },
    children: { control: false },
    content: { control: "text" },
  },
  args: {
    disableReactTree: false,
    mouseEvent: "onClick",
    touchEvent: "onTouchEnd",
    content: "Click me, I will stay visible until you click outside.",
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Basic: Story = {
  render: (args: Args) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => setOpen((p) => !p);
    const handleClickAway = () => setOpen(false);
    return (
      <ClickAwayListener
        onClickAway={handleClickAway}
        disableReactTree={args.disableReactTree}
        mouseEvent={args.mouseEvent}
        touchEvent={args.touchEvent}
      >
        <Box sx={{ position: "relative" }}>
          <Button onClick={handleClick}>Toggle</Button>
          {open && (
            <Box
              sx={{
                border: 1,
                p: 2,
                bgcolor: "background.paper",
                position: "absolute",
                top: 44,
                left: 0,
                minWidth: 260,
              }}
            >
              {args.content}
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    );
  },
};
