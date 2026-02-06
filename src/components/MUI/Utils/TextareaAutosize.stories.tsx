import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextareaAutosize } from "./TextareaAutosize";

type Args = React.ComponentProps<typeof TextareaAutosize>;

const meta: Meta<Args> = {
  title: "MUI/Utils/TextareaAutosize",
  component: TextareaAutosize,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    minRows: { control: { type: "number", min: 1 } },
    maxRows: { control: { type: "number", min: 1 } },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
  },
  args: {
    minRows: 3,
    maxRows: 6,
    placeholder: "Type here...",
    defaultValue: "",
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Basic: Story = {
  render: (args: Args) => <TextareaAutosize {...args} style={{ width: 260 }} />,
};
