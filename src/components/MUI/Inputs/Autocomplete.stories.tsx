import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from "./Autocomplete";
import { TextField } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";
import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";

const elements = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium",
  "Boron",
  "Carbon",
  "Nitrogen",
  "Oxygen",
  "Fluorine",
  "Neon",
  "Sodium",
  "Magnesium",
];

type CommonArgs = ExtraArgs & {
  options: string[];
  freeSolo: boolean;
  disableClearable: boolean;
  autoHighlight: boolean;
  autoSelect: boolean;
  filterSelectedOptions: boolean;
  size: "small" | "medium";
  limitTags?: number;
};

type SingleArgs = CommonArgs & {
  multiple?: false;
  defaultValue?: string | null;
};

type MultipleArgs = CommonArgs & {
  multiple: true;
  defaultValue?: string[];
};

type StoryArgs = SingleArgs | MultipleArgs;

type ExtraArgs = {
  label: string;
  placeholder?: string;
  tfVariant: "outlined" | "filled" | "standard";
  tfColor: "primary" | "secondary" | "success" | "error" | "info" | "warning";
};

const meta: Meta<StoryArgs> = {
  title: "MUI/Inputs/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    options: { control: "object" },
    freeSolo: { control: "boolean" },
    disableClearable: { control: "boolean" },
    autoHighlight: { control: "boolean" },
    autoSelect: { control: "boolean" },
    filterSelectedOptions: { control: "boolean" },
    size: { control: "select", options: ["small", "medium"] },
    tfVariant: {
      name: "TextField variant",
      control: "select",
      options: ["outlined", "filled", "standard"],
    },
    tfColor: {
      name: "TextField color",
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    defaultValue: { control: false },
  },
  args: {
    options: elements,
    freeSolo: false,
    disableClearable: false,
    autoHighlight: true,
    autoSelect: false,
    filterSelectedOptions: true,
    size: "medium",
    tfVariant: "outlined",
    tfColor: "primary",
    label: "Select element",
    placeholder: "Type to search…",
    defaultValue: null,
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

const withTextField = (args: StoryArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { defaultValue, ...rest } = args;

  return {
    ...rest,
    renderInput: (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={args.label}
        variant={args.tfVariant}
        color={args.tfColor}
        placeholder={args.placeholder}
      />
    ),
  };
};

export const Basic: Story = {
  render: (args: StoryArgs) => <Autocomplete {...withTextField(args)} />,
};

export const FreeSoloMode: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Enables freeSolo mode, allowing users to enter values that are not present in the options list. This behaves like a text input with suggestions rather than a strict selector.",
      },
    },
  },
  args: {
    freeSolo: true,
    disableClearable: true,
  },
  render: (args: StoryArgs) => <Autocomplete {...withTextField(args)} />,
};

export const MultipleSelections: StoryObj<MultipleArgs> = {
  args: {
    multiple: true,
    defaultValue: [],
  },
  render: (args) => {
    const [value, setValue] = React.useState<string[]>(args.defaultValue ?? []);
    return (
      <Autocomplete
        {...withTextField(args)}
        multiple
        value={value}
        onChange={(_, newValue) => setValue(newValue ?? [])}
      />
    );
  },
};
