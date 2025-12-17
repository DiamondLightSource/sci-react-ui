import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Slider } from "./Slider";

type SliderArgs = React.ComponentProps<typeof Slider>;

const meta: Meta<SliderArgs> = {
  title: "MUI/Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    size: { control: "select", options: ["small", "medium"] },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    min: { control: { type: "number", min: 0, max: 100, step: 1 } },
    max: { control: { type: "number", min: 0, max: 100, step: 1 } },
    step: { control: { type: "number", min: 1, max: 20, step: 1 } },
    marks: { control: "boolean" },
    valueLabelDisplay: { control: "select", options: ["off", "auto", "on"] },
    disabled: { control: "boolean" },
    value: { control: false },
    onChange: { control: false },
  },
  args: {
    color: "primary",
    size: "medium",
    orientation: "horizontal",
    min: 0,
    max: 100,
    step: 1,
    marks: false,
    valueLabelDisplay: "off",
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<SliderArgs>;

export const Basic: Story = { render: (args) => <Slider {...args} /> };

export const DiscreteWithMarks: Story = {
  args: { step: 10, marks: true, valueLabelDisplay: "auto" },
  render: (args) => <Slider {...args} />,
};

export const Range: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<number[]>([20, 80]);
    return (
      <Slider
        {...args}
        value={value}
        onChange={(_, v) => setValue(v as number[])}
        valueLabelDisplay="auto"
      />
    );
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    min: 0,
    max: 100,
    step: 5,
    marks: true,
    valueLabelDisplay: "auto",
  },
  render: (args) => (
    <div style={{ height: 200 }}>
      <Slider {...args} />
    </div>
  ),
};
