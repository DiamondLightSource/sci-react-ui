import { Meta, StoryObj } from "@storybook/react";

import { ImageInfo, ScrollableImages } from "./ScrollableImages";

import diamond from "../../public/images/diamond.jpg";
import soleil from "../../public/images/soleil.jpg";
import bessy from "../../public/images/bessy.jpg";
import shanghai from "../../public/images/shanghai.jpg";

const meta: Meta<typeof ScrollableImages> = {
  title: "SciReactUI/Control/ScrollableImages",
  component: ScrollableImages,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const imagesList: ImageInfo[] = [
  { src: diamond, alt: "Diamond" },
  { src: soleil, alt: "Soleil" },
  { src: bessy, alt: "Bessy" },
  { src: shanghai, alt: "Shanghai" },
];

export const All: Story = {
  args: { images: imagesList, width: 300, height: 300 },
};

export const NoButtons: Story = {
  args: { images: imagesList, buttons: false },
};

export const NoWrap: Story = {
  args: { images: imagesList, wrapAround: false },
};

export const OneImage: Story = {
  args: { images: imagesList[0] },
};
