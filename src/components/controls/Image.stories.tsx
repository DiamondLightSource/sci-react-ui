import { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

import diamond from "../../public/images/diamond.jpg";

const meta: Meta<typeof Image> = {
  title: "Components/Controls/Image",
  component: Image,
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
  args: { src: diamond, style: { width: "20vw" } },
  parameters: {
    docs: {
      description: {
        story: "Basic Image",
      },
    },
  },
};

export const ErrorImage: Story = {
  args: { src: "doesnotexist.jpg", style: { width: "20vw" } },
  parameters: {
    docs: {
      description: {
        story: "Image displayed when original image fails to load",
      },
    },
  },
};
