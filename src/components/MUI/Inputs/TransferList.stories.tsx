import type { Meta, StoryObj } from "@storybook/react";
import { TransferList } from "./TransferList";
// Vite raw import
import transferListSource from "./TransferList.tsx?raw";

const meta: Meta<typeof TransferList> = {
  title: "MUI/Inputs/TransferList",
  component: TransferList,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
    layout: "padded",
  },
  args: {
    left: [
      "Apple",
      "Banana",
      "Cherry",
      "Date",
      "Fig",
      "Grape",
      "Kiwi",
      "Lemon",
      "Mango",
      "Orange",
      "Pear",
      "Plum",
    ],
    right: ["Blueberry", "Raspberry", "Strawberry"],
    titleLeft: "Available",
    titleRight: "Chosen",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <TransferList left={[]} right={[]} {...args} />,
  parameters: {
    docs: {
      source: {
        code: transferListSource,
        language: "tsx",
      },
    },
  },
};
