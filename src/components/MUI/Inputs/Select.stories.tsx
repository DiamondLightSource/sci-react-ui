import type { Meta, StoryObj } from "@storybook/react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const elementOptions = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium",
  "Boron",
  "Carbon",
];

type ExtraArgs = {
  label?: string;
  items?: string[];
};
type SelectArgs = React.ComponentProps<typeof Select> & ExtraArgs;

const meta: Meta<SelectArgs> = {
  title: "MUI/Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: { control: "select", options: ["outlined", "filled", "standard"] },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    size: { control: "select", options: ["small", "medium"] },
    displayEmpty: { control: "boolean" },
    label: { control: "text" },
    items: { control: { type: "object" } },
  },
  args: {
    variant: "outlined",
    color: "primary",
    size: "medium",
    displayEmpty: false,
    label: "element",
    items: elementOptions,
    defaultValue: elementOptions[0],
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
  args: {
    multiple: true,
    defaultValue: [elementOptions[0], elementOptions[2]],
  },
  render: (args: SelectArgs) => renderSelectWithLabel(args),
};

export const FilledAndStandard: Story = {
  render: (args: SelectArgs) => (
    <Box>
      {renderSelectWithLabel({ ...args, variant: "filled" })}
      {renderSelectWithLabel({ ...args, variant: "standard" })}
    </Box>
  ),
};
