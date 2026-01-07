import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from "./Autocomplete";
import { Chip } from "../DataDisplay/Chip";
import { TextField } from "./TextField";

const options = [
  "Apple",
  "Apricot",
  "Banana",
  "Blueberry",
  "Cherry",
  "Date",
  "Fig",
  "Grape",
  "Kiwi",
  "Lime",
  "Mango",
  "Orange",
  "Papaya",
  "Pear",
  "Plum",
  "Raspberry",
  "Strawberry",
];

type ExtraArgs = {
  label: string;
  placeholder?: string;
  tfVariant: "outlined" | "filled" | "standard";
  tfColor: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  defaultValue?: string[] | string | null;
};
type AutoArgs = React.ComponentProps<typeof Autocomplete> & ExtraArgs;

const meta: Meta<AutoArgs> = {
  title: "MUI/Inputs/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    multiple: { control: "boolean" },
    freeSolo: { control: "boolean" },
    disableClearable: { control: "boolean" },
    autoHighlight: { control: "boolean" },
    autoSelect: { control: "boolean" },
    filterSelectedOptions: { control: "boolean" },
    size: { control: { type: "select" }, options: ["small", "medium"] },
    options: { control: { type: "object" } },
    tfVariant: {
      name: "TextField variant",
      control: { type: "select" },
      options: ["outlined", "filled", "standard"],
    },
    tfColor: {
      name: "TextField color",
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    renderInput: { control: false },
    renderTags: { control: false },
    value: { control: false },
    onChange: { control: false },
    defaultValue: { control: false },
  },
  args: {
    options,
    multiple: false,
    freeSolo: false,
    disableClearable: false,
    autoHighlight: true,
    autoSelect: false,
    filterSelectedOptions: true,
    size: "medium",
    tfVariant: "outlined",
    tfColor: "primary",
    label: "Choose a fruit",
    placeholder: "Type to search…",
    limitTags: -1,
    defaultValue: null,
  },
};
export default meta;
type Story = StoryObj<AutoArgs>;

const withTF = (args: AutoArgs) => ({
  ...args,
  renderInput: (params: any) => (
    <TextField
      {...params}
      label={args.label}
      variant={args.tfVariant}
      color={args.tfColor}
      placeholder={args.placeholder}
    />
  ),
});

export const Basic: Story = {
  render: (args) => <Autocomplete {...withTF(args)} />,
};

export const FreeSolo: Story = {
  args: { freeSolo: true, disableClearable: true },
  render: (args) => <Autocomplete {...withTF(args)} />,
};

export const MultipleChips: Story = {
  args: {
    multiple: true,
    filterSelectedOptions: true,
    size: "small",
    defaultValue: [],
  },
  render: (args) => {
    const initial = Array.isArray(args.defaultValue)
      ? (args.defaultValue as string[])
      : [];
    const [value, setValue] = React.useState<string[]>(initial);
    return (
      <Autocomplete
        {...withTF(args)}
        multiple
        value={value}
        onChange={(_, newValue) => setValue((newValue ?? []) as string[])}
        options={options}
        renderTags={(selected = [], getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={String(option)}
              label={String(option)}
              size="small"
            />
          ))
        }
      />
    );
  },
};

export const ToggleMultipleSafely: Story = {
  args: {
    multiple: false,
    filterSelectedOptions: true,
    size: "medium",
    defaultValue: null,
  },
  render: (args) => {
    const [value, setValue] = React.useState<string[] | string | null>(
      args.defaultValue ?? null,
    );
    React.useEffect(() => {
      setValue((prev) => {
        if (args.multiple) {
          if (prev == null) return [];
          return Array.isArray(prev) ? prev : prev ? [prev] : [];
        } else {
          if (prev == null) return null;
          return Array.isArray(prev) ? (prev[0] ?? null) : prev;
        }
      });
    }, [args.multiple]);
    return (
      <Autocomplete
        {...withTF(args)}
        multiple={args.multiple}
        value={value as any}
        onChange={(_, newValue) => {
          if (args.multiple) setValue((newValue ?? []) as string[]);
          else setValue((newValue as string) ?? null);
        }}
        options={options}
        renderTags={(selected = [], getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={String(option)}
              label={String(option)}
              size="small"
            />
          ))
        }
      />
    );
  },
};
