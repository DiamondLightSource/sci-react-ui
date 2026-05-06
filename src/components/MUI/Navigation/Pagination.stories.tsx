import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Pagination } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Pagination> = {
  title: "MUI/Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    count: { control: { type: "number", min: 1, max: 20, step: 1 } },
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

export const Basic: Story = {
  render: (args) => {
    const [page, setPage] = React.useState(1);
    return <Pagination {...args} page={page} onChange={(_, p) => setPage(p)} />;
  },
};
