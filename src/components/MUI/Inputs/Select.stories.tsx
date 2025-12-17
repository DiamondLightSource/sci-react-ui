import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const cityOptions = ["London", "Paris", "Berlin", "Rome", "Madrid"];

type ExtraArgs = {
  label?: string;
  items?: string[];
};
type SelectArgs = React.ComponentProps<typeof Select> & ExtraArgs;

const meta: Meta<SelectArgs> = {
  title: "MUI/Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["outlined", "filled", "standard"] },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    size: { control: "select", options: ["small", "medium"] },
    multiple: { control: "boolean" },
    displayEmpty: { control: "boolean" },
    value: { control: false },
    onChange: { control: false },

    label: { control: "text" },
    items: { control: { type: "object" } },
  },
  args: {
    variant: "outlined",
    color: "primary",
    size: "medium",
    multiple: false,
    displayEmpty: false,
    label: "City",
    items: cityOptions,
    defaultValue: cityOptions[0],
  },
};
export default meta;
type Story = StoryObj<SelectArgs>;

const renderSelectWithLabel = (args: SelectArgs) => (
  <FormControl
    variant={args.variant}
    color={args.color}
    size={args.size}
    sx={{ minWidth: 200 }}
  >
    {args.label && <InputLabel id="demo-select-label">{args.label}</InputLabel>}
    <Select {...args} labelId="demo-select-label" label={args.label}>
      {(args.items || []).map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const Basic: Story = {
  render: (args: SelectArgs) => renderSelectWithLabel(args),
};

export const Multiple: Story = {
  args: { multiple: true, defaultValue: [cityOptions[0], cityOptions[2]] },
  render: (args: SelectArgs) => renderSelectWithLabel(args),
};

export const FilledAndStandard: Story = {
  render: (args: SelectArgs) => (
    <div style={{ display: "grid", gap: 12 }}>
      {renderSelectWithLabel({ ...args, variant: "filled" })}
      {renderSelectWithLabel({ ...args, variant: "standard" })}
    </div>
  ),
};
