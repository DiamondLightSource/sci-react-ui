import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress, Stack, Typography } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof CircularProgress> = {
  title: "MUI/Feedback/CircularProgress",
  component: CircularProgress,
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
    variant: { control: "select", options: ["indeterminate", "determinate"] },
    value: { control: { type: "number", min: 0, max: 100, step: 1 } },
    size: { control: { type: "number", min: 8, max: 200, step: 2 } },
    thickness: { control: { type: "number", min: 1, max: 10, step: 0.5 } },
  },
  args: {
    color: "primary",
    variant: "indeterminate",
    value: 75,
    size: 40,
    thickness: 3.6,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <CircularProgress {...args} />,
};

export const Determinate: Story = {
  args: { variant: "determinate", value: 70 },
  render: (args) => <CircularProgress {...args} />,
};

export const DeterminateValues: Story = {
  render: (args) => (
    <Stack direction="row" spacing={4}>
      {[0, 25, 50, 75, 100].map((value) => (
        <Stack key={value} alignItems="center" spacing={1}>
          <CircularProgress {...args} variant="determinate" value={value} />
          <Typography variant="caption">{value}%</Typography>
        </Stack>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Circular Progress in different sizes.",
      },
    },
  },
  render: (args) => (
    <Stack direction="row" spacing={4}>
      {[16, 24, 40, 64, 80].map((size) => (
        <CircularProgress
          key={size}
          {...args}
          variant="determinate"
          size={size}
        />
      ))}
    </Stack>
  ),
};

export const Thickness: Story = {
  parameters: {},
  render: (args) => (
    <Stack direction="row" spacing={4}>
      {[2, 3.6, 5, 7].map((thickness) => (
        <CircularProgress
          key={thickness}
          {...args}
          variant="determinate"
          thickness={thickness}
        />
      ))}
    </Stack>
  ),
};
