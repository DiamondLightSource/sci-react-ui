import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Icon } from "../MuiWrapped";
import { colourSet } from "../../../utils/diamond";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";
import { LucideIcon } from "../../datadisplay/Icons";
import { Plus, Send, Trash2 } from "lucide-react";

const iconChildrenMap = {
  add: <LucideIcon icon={Plus} />,
  send: <LucideIcon icon={Send} />,
  delete: <LucideIcon icon={Trash2} />,
} as const;

const meta: Meta<typeof Icon> = {
  title: "MUI/Data Display/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    color: {
      control: "select",
      options: colourSet,
    },
    fontSize: {
      control: "select",
      options: ["inherit", "small", "medium", "large"],
    },
    children: {
      name: "icon",
      control: "select",
      options: Object.keys(iconChildrenMap),
      mapping: iconChildrenMap,
    },
    baseClassName: { control: false },
  },
  args: {
    color: "primary",
    fontSize: "medium",
    children: "send",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <Icon {...args} /> };

export const Colours: Story = {
  render: (args) => (
    <>
      <Icon {...args} color="primary" />
      <Icon {...args} color="secondary" />
      <Icon {...args} color="error" />
      <Icon {...args} color="success" />
      <Icon {...args} color="info" />
      <Icon {...args} color="warning" />
      <Icon {...args} color="action" />
      <Icon {...args} color="disabled" />
    </>
  ),
};
