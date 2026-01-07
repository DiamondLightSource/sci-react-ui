import type { Meta, StoryObj } from "@storybook/react";
import { GridV2 } from "./Grid2";
import { Box } from "./Box";

const meta: Meta<typeof GridV2> = {
  title: "MUI/Layout/Grid v2",
  component: GridV2,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    spacing: { control: { type: "number", min: 0, max: 10, step: 0.5 } },
    columns: { control: { type: "number", min: 1, max: 24, step: 1 } },
  },
  args: { spacing: 2, columns: 12 },
};
export default meta;

type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      bgcolor: "primary.main",
      color: "primary.contrastText",
      p: 1,
      textAlign: "center",
      borderRadius: 1,
    }}
  >
    {children}
  </Box>
);

export const Basic: Story = {
  render: (args) => (
    <GridV2 container spacing={args.spacing} columns={args.columns}>
      <GridV2 size={{ xs: 4 }}>
        <Item>xs=4</Item>
      </GridV2>
      <GridV2 size={{ xs: 4 }}>
        <Item>xs=4</Item>
      </GridV2>
      <GridV2 size={{ xs: 4 }}>
        <Item>xs=4</Item>
      </GridV2>
    </GridV2>
  ),
};

export const Responsive: Story = {
  render: (args) => (
    <GridV2 container spacing={args.spacing} columns={12}>
      <GridV2 size={{ xs: 12, sm: 12, md: 4 }}>
        <Item>xs=12 sm=6 md=4</Item>
      </GridV2>
      <GridV2 size={{ xs: 12, sm: 12, md: 4 }}>
        <Item>xs=12 sm=6 md=4</Item>
      </GridV2>
      <GridV2 size={{ xs: 12, sm: 12, md: 4 }}>
        <Item>xs=12 sm=12 md=4</Item>
      </GridV2>
    </GridV2>
  ),
};
