import type { Meta, StoryObj } from "@storybook/react";
import { TransferList } from "./TransferList";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof TransferList> = {
  title: "MUI/Inputs/TransferList",
  component: TransferList,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  args: {
    left: [
      "Hydrogen",
      "Helium",
      "Lithium",
      "Beryllium",
      "Boron",
      "Carbon",
      "Nitrogen",
      "Oxygen",
      "Fluorine",
    ],
    right: ["Neon", "Sodium", "Magnesium"],
    titleLeft: "Available",
    titleRight: "Chosen",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <TransferList {...args} />,
};
