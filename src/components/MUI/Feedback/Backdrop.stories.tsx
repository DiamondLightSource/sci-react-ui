import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Backdrop, Button, CircularProgress, Stack } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Backdrop> = {
  title: "MUI/Feedback/Backdrop",
  component: Backdrop,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    invisible: { control: "boolean" },
  },
  args: { invisible: false },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    return (
      <Stack direction="row">
        <Backdrop {...args} open={true}>
          <CircularProgress />
        </Backdrop>
      </Stack>
    );
  },
};

/**
 * Click show to open backdrop and click again to close.
 */
export const ControlledBackdrop: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Stack direction="row">
        <Button onClick={() => setOpen(true)}>Show</Button>
        <Backdrop {...args} open={open} onClick={() => setOpen(false)}>
          <CircularProgress />
        </Backdrop>
      </Stack>
    );
  },
};
