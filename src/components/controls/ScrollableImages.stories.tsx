import { Meta, StoryObj } from "@storybook/react";

import { ImageInfo, ScrollableImages } from "./ScrollableImages";

import diamond from "../../public/images/diamond.jpg";
import soleil from "../../public/images/soleil.jpg";
import bessy from "../../public/images/bessy.jpg";
import shanghai from "../../public/images/shanghai.jpg";
import { useEffect, useState } from "react";

const meta: Meta<typeof ScrollableImages> = {
  title: "Components/Controls/ScrollableImages",
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

const tiffImage: ImageInfo[] = [
  {
    src: "/images/multi-page-tiff.tiff",
    alt: "Tiff",
  },
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

export const NoSlider: Story = {
  args: { images: imagesList, slider: false },
};

export const NoNumbers: Story = {
  args: { images: imagesList, numeration: false },
};

export const DifferentBackgroundColour: Story = {
  args: { images: imagesList, backgroundColor: "#166" },
};

export const OneImage: Story = {
  args: { images: imagesList[0] },
};

export const DynamicImages: StoryObj = {
  render: () => {
    const [visibleImages, setVisibleImages] = useState(imagesList);
    let nImages = 1;

    useEffect(() => {
      let increment = 1;
      const interval = setInterval(() => {
        setVisibleImages(imagesList.slice(0, nImages));
        nImages += increment;
        if (nImages === imagesList.length) {
          increment = -1;
        } else if (nImages === 1) {
          increment = 1;
        }
      }, 2000);

      return () => clearInterval(interval);
    }, []);

    return (
      <ScrollableImages
        images={visibleImages}
        width={300}
        height={300}
        buttons
        slider
        numeration
      />
    );
  },
};

export const TiffImage: Story = {
  args: { images: tiffImage },
};
