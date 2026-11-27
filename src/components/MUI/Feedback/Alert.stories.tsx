import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Alert, AlertTitle, Button, Stack } from "../MuiWrapped";
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
    <Stack spacing={2}>
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
    <Stack spacing={2}>
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

export const WithClose: Story = {
  render: (args) => (
    <Alert {...args} onClose={() => console.log("alert close")}>
      Alert with a close button
    </Alert>
  ),
};

export const WithActionAndClose: Story = {
  render: (args) => (
    <Alert
      {...args}
      severity="warning"
      action={
        <Button color="inherit" variant="outlined" size="small">
          Undo
        </Button>
      }
      onClose={() => console.log("alert close")}
    >
      Warning with action
    </Alert>
  ),
};

export const WithTitle: Story = {
  render: ({ children, ...args }) => (
    <Alert {...args}>
      <AlertTitle>Alert title</AlertTitle>
      {children}
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: ({ children: _children, ...args }) => (
    <Alert {...args}>
      <AlertTitle>Alert title</AlertTitle>
    </Alert>
  ),
};

export const VariantsWithTitle: Story = {
  render: ({ children: _children, ...args }) => (
    <Stack spacing={2}>
      <Alert {...args} variant="standard">
        <AlertTitle>Standard</AlertTitle>
        This is a standard Alert with a title.
      </Alert>
      <Alert {...args} variant="outlined">
        <AlertTitle>Outlined</AlertTitle>
        This is an outlined Alert with a title.
      </Alert>
      <Alert {...args} variant="filled">
        <AlertTitle>Filled</AlertTitle>
        This is a filled Alert with a title.
      </Alert>
    </Stack>
  ),
};

export const SeverityLevelsWithTitle: Story = {
  render: ({ children: _children, ...args }) => (
    <Stack spacing={2}>
      <Alert {...args} severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success Alert with an encouraging title.
      </Alert>
      <Alert {...args} severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info Alert with an informative title.
      </Alert>
      <Alert {...args} severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning Alert with a cautious title.
      </Alert>
      <Alert {...args} severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error Alert with a scary title.
      </Alert>
    </Stack>
  ),
};

export const WithCloseWithTitle: Story = {
  render: ({ children: _children, ...args }) => (
    <Alert {...args} onClose={() => console.log("alert close")}>
      <AlertTitle>Info</AlertTitle>
      This is an info Alert with a title and a close button.
    </Alert>
  ),
};

export const WithActionAndCloseWithTitle: Story = {
  render: ({ children: _children, ...args }) => (
    <Alert
      {...args}
      severity="warning"
      action={
        <Button color="inherit" variant="outlined" size="small">
          Undo
        </Button>
      }
      onClose={() => console.log("alert close")}
    >
      <AlertTitle>Warning</AlertTitle>
      This is a warning Alert with a title, an action and a close button.
    </Alert>
  ),
};
