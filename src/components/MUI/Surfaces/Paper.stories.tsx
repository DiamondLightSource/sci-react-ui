import { Paper, Typography, Stack } from "../MuiWrapped";
import type { Meta, StoryObj } from "@storybook/react";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Paper> = {
  title: "MUI/Surfaces/Paper",
  component: Paper,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: {
      control: "select",
      options: ["elevation", "outlined"],
    },
    elevation: {
      control: {
        type: "number",
        min: 0,
        max: 24,
        step: 1,
      },
    },
    square: { control: "boolean" },
    sx: { control: false },
  },
  args: {
    variant: "elevation",
    elevation: 1,
    square: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Paper {...args} sx={{ p: 2, maxWidth: 360 }}>
      <Typography>Paper content</Typography>
    </Paper>
  ),
};

export const Variants: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={2}>
      <Paper variant="elevation" elevation={5} sx={{ p: 2 }}>
        <Typography>Elevation</Typography>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography>Outlined</Typography>
      </Paper>
    </Stack>
  ),
};

export const Elevations: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={2}>
      {[0, 3, 8, 16].map((level) => (
        <Paper key={level} elevation={level} sx={{ p: 2 }}>
          <Typography>Elevation {level}</Typography>
        </Paper>
      ))}
    </Stack>
  ),
};

export const CustomBackground: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={2}>
      {[1, 8, 24].map((level) => (
        <Paper
          key={level}
          elevation={level}
          sx={(theme) => ({
            p: 2,
            backgroundColor: theme.palette.error.container,
            color: theme.palette.error.onContainer,
          })}
        >
          <Typography>elevation {level}</Typography>
        </Paper>
      ))}
    </Stack>
  ),
};

export const Corners: Story = {
  render: (_args) => (
    <Stack direction="row" spacing={2}>
      <Paper elevation={5} sx={{ p: 2, width: 200 }}>
        <Typography>Rounded (default)</Typography>
      </Paper>
      <Paper elevation={5} square sx={{ p: 2, width: 200 }}>
        <Typography>Square</Typography>
      </Paper>
    </Stack>
  ),
};
