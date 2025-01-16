import { Meta, StoryObj } from "@storybook/react";
import { Visit } from "../utils/diamond";
import { VisitInput } from "./VisitInput";

const meta: Meta<typeof VisitInput> = {
  title: "SciReactUI/Control/VisitInput",
  component: VisitInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleSubmit = (visit: Visit, parameters?: object) => {
  alert(JSON.stringify({ visit, parameters }));
};

export const Input: Story = {};

export const InitialVisit: Story = {
  args: {
    visit: { proposalCode: "xx", proposalNumber: 99999, number: 7 },
  },
};

export const InputWithSubmitButton: Story = {
  args: { onSubmit: handleSubmit },
};

export const InitialVisitWithSubmitButton: Story = {
  args: {
    onSubmit: handleSubmit,
    visit: { proposalCode: "xx", proposalNumber: 99999, number: 7 },
  },
};

export const InitialVisitWithoutReturnKeySubmission: Story = {
  args: {
    onSubmit: handleSubmit,
    visit: { proposalCode: "xx", proposalNumber: 99999, number: 7 },
    submitOnReturn: false,
  },
};

export const InitialVisitWithoutSubmitButton: Story = {
  args: {
    onSubmit: handleSubmit,
    visit: { proposalCode: "xx", proposalNumber: 99999, number: 7 },
    submitButton: false,
  },
};
