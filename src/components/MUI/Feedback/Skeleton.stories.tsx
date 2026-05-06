import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, Stack, Typography } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Skeleton> = {
  title: "MUI/Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "rectangular", "circular", "rounded"],
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", false],
    },
    width: {
      control: { type: "number", min: 16, max: 600, step: 4 },
    },
    height: {
      control: { type: "number", min: 16, max: 400, step: 4 },
    },
  },
  args: {
    variant: "rectangular",
    animation: "pulse",
    width: 240,
    height: 180,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Skeleton represents elements while content is loading.
 * Multiple Skeletons can be composed to represent complex layouts.
 */
export const Basic: Story = {
  render: (args) => <Skeleton {...args} />,
};

export const Variants: Story = {
  render: (_args) => (
    <Stack spacing={1}>
      <Typography variant="caption">Text</Typography>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Typography variant="caption">Circular</Typography>
      <Skeleton variant="circular" width={40} height={40} />
      <Typography variant="caption">Rectangular</Typography>
      <Skeleton variant="rectangular" width={210} height={60} />
      <Typography variant="caption">Rounded</Typography>
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  ),
};

export const Animations: Story = {
  render: (args) => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Stack spacing={1}>
        <Typography variant="caption">Pulse</Typography>
        <Skeleton {...args} animation="pulse" />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption">Wave</Typography>
        <Skeleton {...args} animation="wave" />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption">None</Typography>
        <Skeleton {...args} animation={false} />
      </Stack>
    </Stack>
  ),
};
