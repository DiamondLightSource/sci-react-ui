import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { Box } from "./Box";

const meta: Meta<typeof Stack> = {
  title: "MUI/Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
    },
    spacing: { control: { type: "number", min: 0, max: 10, step: 0.5 } },
    divider: { control: false },
    alignItems: {
      control: "select",
      options: ["stretch", "flex-start", "center", "flex-end", "baseline"],
    },
    justifyContent: {
      control: "select",
      options: [
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
  },
  args: {
    direction: "row",
    spacing: 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      bgcolor: "primary.main",
      color: "primary.contrastText",
      px: 2,
      py: 1,
      borderRadius: 1,
    }}
  >
    {children}
  </Box>
);

export const Basic: Story = {
  render: (args) => (
    <Stack {...args}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Stack>
  ),
};

export const Vertical: Story = {
  args: { direction: "column" },
  render: (args) => (
    <Stack {...args}>
      <Item>A</Item>
      <Item>B</Item>
      <Item>C</Item>
    </Stack>
  ),
};
