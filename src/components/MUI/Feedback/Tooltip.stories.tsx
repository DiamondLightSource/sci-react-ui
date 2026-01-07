import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "../DataDisplay/IconButton";

const meta: Meta<typeof Tooltip> = {
  title: "MUI/Feedback/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    title: { control: "text" },
    placement: {
      control: "select",
      options: [
        "bottom",
        "bottom-start",
        "bottom-end",
        "top",
        "top-start",
        "top-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
    arrow: { control: "boolean" },
    disableInteractive: { control: "boolean" },
  },
  args: {
    title: "Tooltip",
    placement: "top",
    arrow: true,
    disableInteractive: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Tooltip {...args} title={args.title!}>
      <IconButton aria-label="info">
        <InfoIcon />
      </IconButton>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      }}
    >
      <Tooltip {...args} title={args.title!} placement="top">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip {...args} title={args.title!} placement="right">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip {...args} title={args.title!} placement="bottom">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip {...args} title={args.title!} placement="left">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip {...args} title={args.title!} placement="top-start">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip {...args} title={args.title!} placement="top-end">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </div>
  ),
};
