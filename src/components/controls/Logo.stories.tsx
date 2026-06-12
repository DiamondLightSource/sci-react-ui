import { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Controls/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Show the logo associated with the theme",
      },
    },
  },
  argTypes: {
    fixedTone: {
      control: { type: "select" },
      options: ["undefined", "light", "dark"],
      mapping: {
        undefined: undefined,
        light: "light",
        dark: "dark",
      },
      description:
        "Force to light/dark version. Select 'undefined' to reset to default behavior.",
    },
    tone: {
      control: { type: "radio" },
      options: ["default", "inverse"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TheLogo: Story = {
  args: {
    fixedTone: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "The normally sized logo",
      },
    },
  },
};

export const TheShortLogo: Story = {
  args: {
    short: true,
    fixedTone: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "The shorter image.",
      },
    },
  },
};

export const LightLogoForDarkTheme: Story = {
  args: {
    tone: "inverse",
    fixedTone: undefined,
    style: { padding: "10px", background: "grey" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can swap the light and dark logo. Useful depending on what background it is displayed on.",
      },
    },
  },
};

export const ForcedDarkLogoForLightAndDarkTheme: Story = {
  args: {
    fixedTone: "dark",
    style: { padding: "10px", background: "grey" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Forces the dark logo regardless of theme. Use 'undefined' in controls to reset.",
      },
    },
  },
};
