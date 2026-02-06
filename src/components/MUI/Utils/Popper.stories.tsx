import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popper, PopperProps } from "./Popper";
import { Button } from "../Inputs/Button";
import { Fade } from "./Transitions";
import { Box } from "../Layout/Box";

type Args = {
  placement?: PopperProps["placement"];
  disablePortal?: boolean;
  keepMounted?: boolean;
  transition?: boolean;
  content?: string;
};

const meta: Meta<Args> = {
  title: "MUI/Utils/Popper",
  component: Popper,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    placement: {
      control: "select",
      options: [
        "bottom",
        "top",
        "right",
        "left",
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end",
        "right-start",
        "right-end",
        "left-start",
        "left-end",
      ],
    },
    disablePortal: { control: "boolean" },
    keepMounted: { control: "boolean" },
    transition: { control: "boolean" },
    content: { control: "text" },
  },
  args: {
    placement: "bottom",
    disablePortal: false,
    keepMounted: false,
    transition: true,
    content: "The content of the Popper.",
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Basic: Story = {
  render: (args: Args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? "demo-popper" : undefined;
    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
      setAnchorEl(anchorEl ? null : event.currentTarget);
    return (
      <>
        <Button aria-describedby={id} type="button" onClick={handleClick}>
          Toggle Popper
        </Button>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement={args.placement}
          disablePortal={args.disablePortal}
          keepMounted={args.keepMounted}
          transition={args.transition}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={250}>
              <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                {args.content}
              </Box>
            </Fade>
          )}
        </Popper>
      </>
    );
  },
};
