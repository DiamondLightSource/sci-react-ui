import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button, Snackbar, Stack } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Snackbar> = {
  title: "MUI/Feedback/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    message: {
      control: "text",
    },
    autoHideDuration: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
  },
  args: {
    message: "Saved",
    autoHideDuration: 3000,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show
        </Button>

        <Snackbar
          {...args}
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={() => setOpen(false)}
        />
      </Stack>
    );
  },
};
