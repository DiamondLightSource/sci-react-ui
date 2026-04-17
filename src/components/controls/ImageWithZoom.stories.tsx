import { Meta, StoryObj } from "@storybook/react";
import { ImageWithZoom } from "./ImageWithZoom";

import diamond from "../../public/images/diamond.jpg";

const meta: Meta<typeof ImageWithZoom> = {
  title: "Components/Controls/ImageWithZoom",
  component: ImageWithZoom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Image with placeholder, fallback and loading indicator",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicImage: Story = {
  args: { src: diamond, alt: "Diamond" },
  parameters: {
    docs: {
      description: {
        story: "Basic image with zoomable view on side",
      },
    },
  },
};

export const Brightness: Story = {
  args: { src: diamond, alt: "Diamond", brightness: 0.5 },
  parameters: {
    docs: {
      description: {
        story: "Image with brightness filter applied",
      },
    },
  },
};
