import { Meta, StoryObj } from "@storybook/react";

import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "SciReactUI/Control/Rating",
  component: Rating,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {};
