import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Box } from "../Layout/Box";
import { Typography } from "../DataDisplay/Typography";
import { Button } from "../Inputs/Button";

type Args = React.ComponentProps<typeof Modal> & {
  title?: string;
  content?: string;
};

const meta: Meta<Args> = {
  title: "MUI/Utils/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    open: { control: false },
    onClose: { control: false },
    title: { control: "text" },
    content: { control: "text" },
    keepMounted: { control: "boolean" },
    hideBackdrop: { control: "boolean" },
    closeAfterTransition: { control: "boolean" },
  },
  args: {
    title: "Text in a modal",
    content: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
    keepMounted: false,
    hideBackdrop: false,
    closeAfterTransition: false,
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Basic: Story = {
  render: (args: Args) => {
    const [open, setOpen] = React.useState(false);
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      minWidth: 320,
      bgcolor: "background.paper",
      border: "1px solid",
      boxShadow: 24,
      p: 3,
    };
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          keepMounted={args.keepMounted}
          hideBackdrop={args.hideBackdrop}
          closeAfterTransition={args.closeAfterTransition}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-title" variant="h6">
              {args.title}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {args.content}
            </Typography>
          </Box>
        </Modal>
      </>
    );
  },
};
