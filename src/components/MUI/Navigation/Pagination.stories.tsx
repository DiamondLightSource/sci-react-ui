import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import React from "react";

const meta: Meta<typeof Pagination> = {
  title: "MUI/Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    count: { control: { type: "number", min: 1, max: 20, step: 1 } },
    page: { control: false },
    onChange: { control: false },
    color: { control: "select", options: ["primary", "secondary", "standard"] },
    variant: { control: "select", options: ["text", "outlined"] },
    shape: { control: "select", options: ["rounded", "circular"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    showFirstButton: { control: "boolean" },
    showLastButton: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    count: 10,
    color: "primary",
    variant: "outlined",
    shape: "rounded",
    size: "medium",
    showFirstButton: false,
    showLastButton: false,
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: (args) => {
    const [page, setPage] = React.useState(1);
    return <Pagination {...args} page={page} onChange={(_, p) => setPage(p)} />;
  },
};
