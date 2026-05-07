import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ToggleButton, ToggleButtonGroup } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

type TBGArgs = React.ComponentProps<typeof ToggleButtonGroup>;

const meta: Meta<TBGArgs> = {
  title: "MUI/Inputs/ToggleButtonGroup",
  component: ToggleButtonGroup,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    color: {
      control: "select",
      options: [
        "standard",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
      ],
    },
    size: { control: "select", options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: {
    color: "primary",
    size: "medium",
    disabled: false,
    orientation: "horizontal",
  },
};
export default meta;
type Story = StoryObj<TBGArgs>;

export const Exclusive: Story = {
  args: { exclusive: true },
  render: (args) => {
    const [value, setValue] = React.useState<string | null>("left");
    return (
      <ToggleButtonGroup
        {...args}
        value={value}
        onChange={(_, next) => setValue(next)}
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    );
  },
};

export const Multiple: Story = {
  args: { exclusive: false },
  render: (args) => {
    const [value, setValue] = React.useState<string[]>(["bold"]);
    return (
      <ToggleButtonGroup
        {...args}
        value={value}
        onChange={(_, next) => setValue(next)}
      >
        <ToggleButton value="bold">Bold</ToggleButton>
        <ToggleButton value="italic">Italic</ToggleButton>
        <ToggleButton value="underline">Underline</ToggleButton>
      </ToggleButtonGroup>
    );
  },
};
