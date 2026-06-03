import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Rating } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Rating> = {
  title: "MUI/Inputs/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    value: { control: { type: "number", min: 0, max: 5, step: 0.5 } },
    precision: {
      control: "select",
      options: [1.0, 0.5, 0.25, 0.2, 0.1],
    },
    max: { control: { type: "number", min: 1, max: 10, step: 1 } },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["small", "medium", "large"] },
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
type Story = StoryObj<typeof Rating>;

export const Basic: Story = {
  render: (args) => <Rating {...args} />,
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 4 },
  render: (args) => <Rating {...args} />,
};
