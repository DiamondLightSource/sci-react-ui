import type { Meta, StoryObj } from "@storybook/react";
import { Alert, Button, Stack } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Alert> = {
  title: "MUI/Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
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
    children: "Alert message",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <Alert {...args} /> };

export const Variants: Story = {
  render: (args) => (
    <Stack>
      <Alert {...args} variant="standard">
        Standard
      </Alert>
      <Alert {...args} variant="outlined">
        Outlined
      </Alert>
      <Alert {...args} variant="filled">
        Filled
      </Alert>
    </Stack>
  ),
};

export const SeverityLevels: Story = {
  render: (args) => (
    <Stack>
      <Alert {...args} severity="success">
        This is a success alert
      </Alert>
      <Alert {...args} severity="info">
        This is an info alert
      </Alert>
      <Alert {...args} severity="warning">
        This is a warning alert
      </Alert>
      <Alert {...args} severity="error">
        This is an error alert
      </Alert>
    </Stack>
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
