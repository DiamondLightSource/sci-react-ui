import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import Button from "@mui/material/Button";

const meta: Meta<typeof Alert> = {
  title: "MUI/Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    severity: {
      control: "select",
      options: ["success", "info", "warning", "error"],
    },
    variant: { control: "select", options: ["standard", "outlined", "filled"] },
    children: { name: "message", control: "text" },
    icon: { control: false },
    action: { control: false },
    onClose: { control: false },
  },
  args: {
    severity: "info",
    variant: "standard",
    children: "This is an info alert",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <Alert {...args} /> };

export const Variants: Story = {
  render: (args) => (
    <>
      <Alert {...args} variant="standard">
        Standard
      </Alert>
      <Alert {...args} variant="outlined">
        Outlined
      </Alert>
      <Alert {...args} variant="filled">
        Filled
      </Alert>
    </>
  ),
};

export const WithActionAndClose: Story = {
  render: (args) => (
    <>
      <Alert
        {...args}
        severity="warning"
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
        onClose={() => console.log("alert close")}
      >
        Warning with action
      </Alert>
    </>
  ),
};
