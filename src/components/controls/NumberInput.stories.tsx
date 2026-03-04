import { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "Components/Controls/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleCommit = (number: number, parameters?: object) => {
  alert(JSON.stringify({ number, parameters }));
};

export const Input: Story = {};

export const DefaultNumberWithLabel: Story = {
  args: { label: "A floating point number" },
};

export const InvalidDefaultNumber: Story = {
  args: {
    label: "An invalid default number",
    numberMode: "natural",
    defaultValue: 15.2,
  },
};

export const NaturalNumberWithLimits: Story = {
  args: {
    label: "A natural number",
    numberMode: "natural",
    defaultValue: 1,
    minValue: 0,
    maxValue: 15,
  },
};

export const IntegerNumber: Story = {
  args: {
    label: "An integer number",
    numberMode: "integer",
    defaultValue: -1,
  },
};

export const FloatingNumberWithLimits: Story = {
  args: {
    label: "A floating point number",
    numberMode: "floating",
    defaultValue: 1.1,
    minValue: -50,
    maxValue: 50,
  },
};

export const ScientificNumber: Story = {
  args: {
    label: "A scientific number",
    numberMode: "scientific",
    defaultValue: 1e5,
  },
};

export const DefaultNumberWithOnlyReturnKeySubmission: Story = {
  args: {
    label: "A floating point number",
    onCommit: handleCommit,
    commitOnBlur: false,
  },
};

export const DefaultNumberWithOnlyBlurSubmission: Story = {
  args: {
    label: "A floating point number",
    onCommit: handleCommit,
    commitOnReturn: false,
  },
};
