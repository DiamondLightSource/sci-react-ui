import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Box, SpeedDialAction, SpeedDial } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";
import { LucideIcon } from "../../datadisplay/Icons";
import { Briefcase, Copy, Printer, Save, Share2 } from "lucide-react";
import React from "react";

const meta: Meta<typeof SpeedDial> = {
  title: "MUI/Navigation/SpeedDial",
  component: SpeedDial,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    ariaLabel: { control: "text" },
    direction: { control: "select", options: ["up", "down", "left", "right"] },
  },
  args: { ariaLabel: "SpeedDial", direction: "up" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(true);

    return (
      <Box
        sx={{
          position: "relative",
          height: 320,
          overflow: "visible",
        }}
      >
        <SpeedDial
          {...args}
          ariaLabel="SpeedDial actions"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          icon={<LucideIcon icon={Briefcase} aria-label="Open actions" />}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
        >
          <SpeedDialAction
            icon={<LucideIcon icon={Copy} />}
            slotProps={{ tooltip: { title: "Copy" } }}
            onClick={() => setOpen(false)}
          />
          <SpeedDialAction
            icon={<LucideIcon icon={Save} />}
            slotProps={{ tooltip: { title: "Save" } }}
            onClick={() => setOpen(false)}
          />
          <SpeedDialAction
            icon={<LucideIcon icon={Printer} />}
            slotProps={{ tooltip: { title: "Print" } }}
            onClick={() => setOpen(false)}
          />
          <SpeedDialAction
            icon={<LucideIcon icon={Share2} />}
            slotProps={{ tooltip: { title: "Share" } }}
            onClick={() => setOpen(false)}
          />
        </SpeedDial>
      </Box>
    );
  },
};
