import { Meta, StoryObj } from "@storybook/react";
import { ImageColourSchemeSwitch } from "./ImageColourSchemeSwitch";

import imageDark from "../../public/generic/logo-dark.svg";
import imageLight from "../../public/generic/logo-light.svg";

const meta: Meta<typeof ImageColourSchemeSwitch> = {
  title: "Components/Controls/ImageColourSchemeSwitch",
  component: ImageColourSchemeSwitch,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitchingImage: Story = {
  args: {
    image: {
      src: imageDark,
      srcDark: imageLight,
      alt: "Testing Switching Image",
      width: "100",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "This image changes depending on the colour scheme mode selected.",
      },
    },
  },
};

export const LargeSwitchingImage: Story = {
  args: {
    image: {
      src: imageDark,
      srcDark: imageLight,
      alt: "Testing Switching Image",
      width: "300",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "You can set a specific size for the image.",
      },
    },
  },
};

export const AddAdditionalStyles: Story = {
  args: {
    image: {
      src: imageDark,
      srcDark: imageLight,
      alt: "Testing Switching Image",
      width: "100",
    },
    style: { border: "3px dotted red" },
  },
  parameters: {
    docs: {
      description: {
        story: "You also add additional styles to the underlying img tag.",
      },
    },
  },
};
export const LightImageForDarkTheme: Story = {
  args: {
    image: {
      src: imageDark,
      srcDark: imageLight,
      alt: "Testing Switching Image",
      width: "120",
    },
    interchange: true,
    style: { padding: "10px", background: "grey" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can choose to flip which image shows in which mode. This may be useful with certain background colours.",
      },
    },
  },
};

export const NonSwitchingImage: Story = {
  args: {
    image: {
      src: imageLight,
      alt: "Testing Non-Switching Image",
      width: "100",
    },
    style: { border: "1px solid black" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "This image only has a single src so will NOT switch when the colour scheme mode switches.",
      },
    },
  },
};
