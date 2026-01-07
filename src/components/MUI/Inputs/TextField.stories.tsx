import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

type TFArgs = React.ComponentProps<typeof TextField>;

const meta: Meta<TFArgs> = {
  title: "MUI/Inputs/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled,", "standard"].map((s) =>
        s.replace(",", ""),
      ),
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
    value: { control: false },
    onChange: { control: false },
    InputProps: { control: false },
    InputLabelProps: { control: false },
    FormHelperTextProps: { control: false },
    sx: { control: false },
  },
  args: {
    variant: "outlined",
    color: "primary",
    size: "medium",
    margin: "none",
    type: "text",
    label: "Your name",
    placeholder: "Type here…",
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
    <div style={{ display: "grid", gap: 12 }}>
      <TextField {...args} variant="outlined" label="Outlined" />
      <TextField {...args} variant="filled" label="Filled" />
      <TextField {...args} variant="standard" label="Standard" />
    </div>
  ),
  args: { color: "primary", helperText: "" },
};

export const SizesAndColors: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <TextField
          {...args}
          size="small"
          color="primary"
          label="Small / primary"
        />
        <TextField
          {...args}
          size="small"
          color="secondary"
          label="Small / secondary"
        />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <TextField
          {...args}
          size="medium"
          color="success"
          label="Medium / success"
        />
        <TextField
          {...args}
          size="medium"
          color="error"
          label="Medium / error"
        />
      </div>
    </div>
  ),
  args: { variant: "outlined", helperText: "" },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      <TextField {...args} required label="Required" helperText="* Required" />
      <TextField {...args} error label="Error" helperText="Invalid value" />
      <TextField {...args} disabled label="Disabled" placeholder="Disabled" />
      <div style={{ maxWidth: 420 }}>
        <TextField
          {...args}
          fullWidth
          label="Full width"
          placeholder="Expands to container width"
        />
      </div>
    </div>
  ),
  args: { variant: "outlined", color: "primary" },
};

export const Multiline: Story = {
  args: {
    multiline: true,
    rows: 4,
    label: "Message",
    placeholder: "Write a few lines…",
  },
  render: (args) => <TextField {...args} />,
};

export const InputTypes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      <TextField {...args} type="text" label="Text" placeholder="Text…" />
      <TextField
        {...args}
        type="password"
        label="Password"
        placeholder="••••••••"
      />
      <TextField {...args} type="number" label="Number" placeholder="0" />
      <TextField
        {...args}
        type="email"
        label="Email"
        placeholder="name@example.com"
      />
      <TextField {...args} type="search" label="Search" placeholder="Find…" />
    </div>
  ),
  args: { variant: "outlined", helperText: "" },
};
