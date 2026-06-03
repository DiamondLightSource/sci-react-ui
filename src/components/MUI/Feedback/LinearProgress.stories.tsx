import type { Meta, StoryObj } from "@storybook/react";
import { LinearProgress, Stack, Typography } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof LinearProgress> = {
  title: "MUI/Feedback/LinearProgress",
  component: LinearProgress,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
        "inherit",
      ],
    },
    variant: {
      control: "select",
      options: ["indeterminate", "determinate", "buffer", "query"],
    },
    value: { control: { type: "number", min: 0, max: 100, step: 1 } },
    valueBuffer: { control: { type: "number", min: 0, max: 100, step: 1 } },
  },
  args: {
    color: "primary",
    variant: "indeterminate",
    value: 40,
    valueBuffer: 60,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <LinearProgress {...args} />,
};

export const Determinate: Story = {
  args: { variant: "determinate", value: 50 },
  render: (args) => <LinearProgress {...args} />,
};

export const Buffer: Story = {
  args: { variant: "buffer", value: 30, valueBuffer: 60 },
  render: (args) => <LinearProgress {...args} />,
};

export const Query: Story = {
  args: { variant: "query" },
  render: (args) => <LinearProgress {...args} />,
};

export const DeterminateValues: Story = {
  parameters: {
    docs: {
      description: {
        story: "Determinate linear progress with different values.",
      },
    },
  },
  render: (args) => (
    <Stack spacing={3}>
      {[0, 25, 50, 75, 100].map((value) => (
        <LinearProgress
          key={value}
          {...args}
          variant="determinate"
          value={value}
        />
      ))}
    </Stack>
  ),
};

export const WithLabelValues: Story = {
  parameters: {
    docs: {
      description: {
        story: "Linear progress with value labels.",
      },
    },
  },
  render: (args) => (
    <Stack spacing={3} sx={{ width: 300 }}>
      {[0, 25, 50, 75, 100].map((value) => (
        <Stack key={value} spacing={1}>
          <LinearProgress {...args} variant="determinate" value={value} />
          <Typography variant="caption">{value}%</Typography>
        </Stack>
      ))}
    </Stack>
  ),
};
