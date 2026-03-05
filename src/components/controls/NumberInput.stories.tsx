import { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "Components/Controls/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A number input field, which validates by number mode and limits.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleCommit = (number: number) => {
  alert(JSON.stringify({ number }));
};

export const Input: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default number input field.",
      },
    },
  },
};

export const NumberWithLabel: Story = {
  args: { label: "A floating point number" },
  parameters: {
    docs: {
      description: {
        story: "Number input field with a label.",
      },
    },
  },
};

export const InvalidDefaultNumber: Story = {
  args: {
    label: "An invalid default number",
    defaultValue: "15.2e5",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Number input field with a label and an invalid default value given.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: "Number input field with natural number mode and given limits.",
      },
    },
  },
};

export const IntegerNumber: Story = {
  args: {
    label: "An integer number",
    numberMode: "integer",
    defaultValue: -1,
  },
  parameters: {
    docs: {
      description: {
        story: "Number input field with integer number mode.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "Number input field with floating point number mode and given limits.",
      },
    },
  },
};

export const ScientificNumber: Story = {
  args: {
    label: "A scientific number",
    numberMode: "scientific",
    defaultValue: "1e5",
  },
  parameters: {
    docs: {
      description: {
        story: "Number input field with scientific number mode.",
      },
    },
  },
};

export const NumberWithOnlyReturnKeyCommit: Story = {
  args: {
    label: "A floating point number",
    onCommit: handleCommit,
    commitOnBlur: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Number input field with commit on return.",
      },
    },
  },
};

export const NumberWithOnlyBlurCommit: Story = {
  args: {
    label: "A floating point number",
    onCommit: handleCommit,
    commitOnReturn: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Number input field with commit on blur.",
      },
    },
  },
};
