import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Rating } from "./Rating";

type RatingArgs = React.ComponentProps<typeof Rating>;

const meta: Meta<RatingArgs> = {
  title: "MUI/Inputs/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 5, step: 0.5 } },
    precision: { control: { type: "number", min: 0.1, max: 1, step: 0.1 } },
    max: { control: { type: "number", min: 1, max: 10, step: 1 } },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["small", "medium", "large"] },
    icon: { control: false },
    emptyIcon: { control: false },
    onChange: { control: false },
  },
  args: {
    value: 3.5,
    precision: 0.5,
    max: 5,
    readOnly: false,
    disabled: false,
    size: "medium",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? 3.5);
    return (
      <Rating {...args} value={value} onChange={(_, v) => setValue(v ?? 0)} />
    );
  },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 4 },
  render: (args) => <Rating {...args} />,
};
