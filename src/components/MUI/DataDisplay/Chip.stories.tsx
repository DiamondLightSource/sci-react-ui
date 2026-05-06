import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { colourSet } from "../../../utils/diamond";
import {
  Button,
  Chip,
  Stack,
  SaveIcon,
  SendIcon,
  DeleteIcon,
  AddIcon,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const iconMap = {
  none: undefined,
  save: <SaveIcon />,
  send: <SendIcon />,
  delete: <DeleteIcon />,
  add: <AddIcon />,
} as const;

const meta: Meta<typeof Chip> = {
  title: "MUI/Data Display/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["filled", "outlined"] },
    color: {
      control: "select",
      options: colourSet,
    },
    size: { control: "select", options: ["small", "medium"] },
    clickable: { control: "boolean" },
    disabled: { control: "boolean" },
    icon: {
      control: "select",
      options: Object.keys(iconMap),
      mapping: iconMap,
    },
    deleteIcon: {
      control: "select",
      options: Object.keys(iconMap),
      mapping: iconMap,
    },
    onDelete: { control: false },
    sx: { control: false },
  },
  args: {
    label: "Chip",
    variant: "filled",
    color: "primary",
    size: "medium",
    clickable: false,
    disabled: false,
    icon: undefined,
    deleteIcon: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Chip {...args} />,
};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Chip {...args} variant="filled" label="Filled" />
      <Chip {...args} variant="outlined" label="Outlined" />
    </Stack>
  ),
};

export const Colours: Story = {
  args: { variant: "filled" },
  render: (args) => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {colourSet.map((colour) => (
        <Chip key={colour} {...args} color={colour} label={colour} />
      ))}
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Stack direction="row" spacing={1}>
      <Chip {...args} icon={iconMap.save} label="Save" />
      <Chip {...args} icon={iconMap.add} label="Add" color="success" />
      <Chip {...args} icon={iconMap.send} label="Send" color="info" />
      <Chip {...args} icon={iconMap.delete} label="Remove" color="error" />
    </Stack>
  ),
};

export const Deletable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Chips can be removed by the user. The Reset button restores the initial set.",
      },
    },
  },
  render: (args) => {
    const initialChips = [
      { key: 1, label: "Item A" },
      { key: 2, label: "Item B" },
      { key: 3, label: "Item C" },
    ];

    const [chips, setChips] = React.useState(initialChips);

    const handleDelete = (key: number) => {
      setChips((prev) => prev.filter((chip) => chip.key !== key));
    };

    const handleReset = () => {
      setChips(initialChips);
    };

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        {chips.map((chip) => (
          <Chip
            key={chip.key}
            {...args}
            label={chip.label}
            deleteIcon={iconMap.delete}
            onDelete={() => handleDelete(chip.key)}
          />
        ))}

        <Button
          size="small"
          variant="contained"
          onClick={handleReset}
          disabled={chips.length === initialChips.length}
        >
          Reset
        </Button>
      </Stack>
    );
  },
};
