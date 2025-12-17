import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "MUI/Layout/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    component: { control: "text" },
    p: { control: { type: "number", min: 0, max: 10, step: 0.5 } },
    m: { control: { type: "number", min: 0, max: 10, step: 0.5 } },
    bgcolor: { control: "text" },
    color: { control: "text" },
    borderRadius: { control: { type: "number", min: 0, max: 24, step: 1 } },
  },
  args: {
    component: "div",
    p: 2,
    m: 0,
    bgcolor: "background.paper",
    color: "text.primary",
    borderRadius: 1,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Box
      component={args.component as any}
      sx={{
        p: args.p,
        m: args.m,
        bgcolor: args.bgcolor,
        color: args.color,
        borderRadius: args.borderRadius,
        width: 320,
      }}
    >
      Box content
    </Box>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      <Box
        sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText" }}
      >
        Primary
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
        }}
      >
        Secondary
      </Box>
      <Box sx={{ p: 2, bgcolor: "success.main", color: "common.white" }}>
        Success
      </Box>
    </div>
  ),
};
