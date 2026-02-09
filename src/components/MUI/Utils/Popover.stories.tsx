import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Popover } from "./Popover";
import { Button } from "../Inputs/Button";

const originMap = {
  tl: { vertical: "top", horizontal: "left" },
  tc: { vertical: "top", horizontal: "center" },
  tr: { vertical: "top", horizontal: "right" },
  bl: { vertical: "bottom", horizontal: "left" },
  bc: { vertical: "bottom", horizontal: "center" },
  br: { vertical: "bottom", horizontal: "right" },
} as const;

const meta: Meta<typeof Popover> = {
  title: "MUI/Utils/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    anchorOrigin: {
      control: "select",
      options: Object.keys(originMap),
      mapping: originMap,
    },
    transformOrigin: {
      control: "select",
      options: Object.keys(originMap),
      mapping: originMap,
    },
    disablePortal: { control: "boolean" },
  },
  args: {
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "left" },
    disablePortal: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
          Open popover
        </Button>
        <Popover
          {...args}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          <div style={{ padding: 16 }}>Popover content</div>
        </Popover>
      </div>
    );
  },
};
