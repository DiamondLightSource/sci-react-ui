import type { Meta, StoryObj } from "@storybook/react";
import { Box, TextField } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

type TFArgs = React.ComponentProps<typeof TextField>;

const meta: Meta<TFArgs> = {
  title: "MUI/Inputs/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "standard"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    size: { control: { type: "select" }, options: ["small", "medium"] },
    margin: {
      control: { type: "select" },
      options: ["none", "dense", "normal"],
    },
    type: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    error: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    multiline: { control: "boolean" },
    rows: { control: { type: "number", min: 1, max: 12, step: 1 } },
  },
  args: {
    variant: "outlined",
    color: "primary",
    size: "medium",
    margin: "none",
    type: "text",
    label: "Sample name",
    placeholder: "Enter sample name",
    helperText: "",
    error: false,
    required: false,
    disabled: false,
    fullWidth: false,
    multiline: false,
    rows: 1,
  },
};

export default meta;
type Story = StoryObj<TFArgs>;

export const Basic: Story = {
  render: (args) => <TextField {...args} />,
};

export const Variants: Story = {
  render: (args) => (
    <Box style={{ display: "grid", gap: 12 }}>
      <TextField
        {...args}
        variant="outlined"
        label="Outlined"
        helperText="Default for forms, planning and configuration"
      />
      <TextField
        {...args}
        variant="filled"
        label="Filled"
        helperText="Use for live instrument control"
      />
      <TextField
        {...args}
        variant="standard"
        label="Standard"
        helperText="Use rarely for compact or inline contexts"
      />
    </Box>
  ),
  args: { color: "primary" },
};

export const DefaultInput: Story = {
  name: "Default input",
  render: (_args) => (
    <Box style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <TextField
        variant="outlined"
        label="Sample name"
        placeholder="Enter sample name"
      />
      <TextField
        variant="outlined"
        label="Proposal number"
        placeholder="MX12345"
      />
    </Box>
  ),
};

export const LiveInstrumentInput: Story = {
  name: "Live instrument input",
  render: (_args) => (
    <Box style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <TextField
        variant="filled"
        color="primary"
        label="Motor position"
        placeholder="0.00"
        helperText="Use filled inputs when changes affect a live instrument or running system."
      />
      <TextField
        variant="filled"
        color="primary"
        label="Exposure"
        placeholder="0.5"
        helperText="Filled inputs should be used deliberately in operational contexts."
      />
    </Box>
  ),
};

export const States: Story = {
  render: (args) => (
    <Box style={{ display: "grid", gap: 12 }}>
      <TextField {...args} label="Default" helperText="Ready for input" />

      <TextField
        {...args}
        label="Read-only"
        value="Current value"
        helperText="Value can be viewed and copied but not edited"
        InputProps={{ readOnly: true }}
      />

      <TextField
        {...args}
        required
        label="Required"
        helperText="Required field"
      />

      <TextField
        {...args}
        error
        label="Error"
        helperText="Enter a valid value"
      />

      <TextField {...args} disabled label="Disabled" placeholder="Disabled" />

      <Box style={{ maxWidth: 420 }}>
        <TextField
          {...args}
          fullWidth
          label="Full width"
          placeholder="Expands to container width"
        />
      </Box>
    </Box>
  ),
  args: {
    variant: "outlined",
    color: "primary",
  },
};

export const Validation: Story = {
  render: (_args) => (
    <Box style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <TextField
        variant="outlined"
        label="Energy"
        placeholder="12.4"
        helperText="Enter energy in keV."
      />
      <TextField
        variant="outlined"
        error
        label="Energy"
        placeholder="12.4"
        helperText="Energy must be between 5 and 25 keV."
      />
    </Box>
  ),
};

export const Multiline: Story = {
  args: {
    multiline: true,
    rows: 4,
    label: "Notes",
    placeholder: "Add notes for this setup…",
    helperText:
      "Use multiline fields for comments, notes, or longer descriptions.",
  },
  render: (args) => <TextField {...args} />,
};

export const InputTypes: Story = {
  render: (args) => (
    <Box style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <TextField {...args} type="text" label="Text" placeholder="Text…" />
      <TextField {...args} type="number" label="Number" placeholder="0" />
      <TextField
        {...args}
        type="email"
        label="Email"
        placeholder="name@example.com"
      />
      <TextField {...args} type="search" label="Search" placeholder="Find…" />
      <TextField
        {...args}
        type="password"
        label="Password"
        placeholder="••••••••"
      />
    </Box>
  ),
  args: { variant: "outlined", helperText: "" },
};
