import { Meta, StoryObj } from "@storybook/react";

import { ScrollableImages } from "./ScrollableImages";

const meta: Meta<typeof ScrollableImages> = {
  title: "SciReactUI/Control/ScrollableImages",
  component: ScrollableImages,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const imagesList: string[] = [
  "../storybook/images/bessy.jpg",
  "../storybook/images/bessy.jpg",
  "../storybook/images/bessy.jpg",
  "../storybook/images/bessy.jpg",
];

export const ScrollableImage: Story = {
  args: { images: imagesList },
};
