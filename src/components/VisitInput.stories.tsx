import { Meta, StoryObj } from "@storybook/react";

import {VisitInput} from "./VisitInput";

const meta: Meta<typeof VisitInput> = {
  title: "SciReactUI/Control/VisitInput",
  component: VisitInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {};

export const InitialVisit: Story = {
  args: {
    visit: { proposalCode: "xx", proposalNumber: 99999, number: 7 },
  },
};

export const InputWithSubmit: Story = {
  args: { onSubmit: () => {} },
};

export const InitialVisitWithSubmit: Story = {
  args: {
    onSubmit: () => {},
    visit: { proposalCode: "xx", proposalNumber: 99999, number: 7 },
  },
};
