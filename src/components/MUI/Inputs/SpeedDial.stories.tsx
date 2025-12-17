import type { Meta, StoryObj } from "@storybook/react";
import { SpeedDial } from "./SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

const meta: Meta<typeof SpeedDial> = {
  title: "MUI/Inputs/SpeedDial",
  component: SpeedDial,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    ariaLabel: { control: "text" },
    direction: { control: "select", options: ["up", "down", "left", "right"] },
    FabProps: { control: false },
    open: { control: "boolean" },
    onClose: { control: false },
    onOpen: { control: false },
  },
  args: { ariaLabel: "SpeedDial", direction: "up", open: true },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <div style={{ height: 240 }}>
      <SpeedDial
        {...args}
        icon={<SpeedDialIcon />}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <SpeedDialAction icon={<FileCopyIcon />} tooltipTitle="Copy" />
        <SpeedDialAction icon={<SaveIcon />} tooltipTitle="Save" />
        <SpeedDialAction icon={<PrintIcon />} tooltipTitle="Print" />
        <SpeedDialAction icon={<ShareIcon />} tooltipTitle="Share" />
      </SpeedDial>
    </div>
  ),
};
