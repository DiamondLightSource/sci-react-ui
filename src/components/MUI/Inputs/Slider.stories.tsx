import type { Meta, StoryObj } from "@storybook/react";
import { Box, Slider } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Slider> = {
  title: "MUI/Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    size: { control: "select", options: ["small", "medium"] },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    marks: { control: "boolean" },
    valueLabelDisplay: { control: "select", options: ["off", "auto", "on"] },
    disabled: { control: "boolean" },
  },
  args: {
    color: "primary",
    size: "medium",
    min: 0,
    max: 100,
    step: 1,
    marks: false,
    valueLabelDisplay: "auto",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  render: (args) => <Slider {...args} />,
};

export const DiscreteWithMarks: Story = {
  args: { step: 10, marks: true, valueLabelDisplay: "auto" },
  render: (args) => <Slider {...args} />,
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
    <Box style={{ height: 200 }}>
      <Slider {...args} />
    </Box>
  ),
};
