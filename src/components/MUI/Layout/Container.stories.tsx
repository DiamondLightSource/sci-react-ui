import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";
import { Box } from "./Box";

const meta: Meta<typeof Container> = {
  title: "MUI/Layout/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    maxWidth: {
      control: "select",
      options: [false, "xs", "sm", "md", "lg", "xl"],
    },
    fixed: { control: "boolean" },
    disableGutters: { control: "boolean" },
  },
  args: { maxWidth: "md", fixed: false, disableGutters: false },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Container {...args}>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          p: 2,
          borderRadius: 1,
        }}
      >
        Content inside Container
      </Box>
    </Container>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      <Container {...args} maxWidth="sm">
        <Box sx={{ p: 2, bgcolor: "background.paper" }}>sm</Box>
      </Container>
      <Container {...args} maxWidth="md">
        <Box sx={{ p: 2, bgcolor: "background.paper" }}>md</Box>
      </Container>
      <Container {...args} maxWidth="lg">
        <Box sx={{ p: 2, bgcolor: "background.paper" }}>lg</Box>
      </Container>
    </div>
  ),
};
