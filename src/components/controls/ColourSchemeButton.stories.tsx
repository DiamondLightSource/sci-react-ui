import { Meta, StoryObj } from "@storybook/react";
import { ColourSchemeButton } from "./ColourSchemeButton";
import { TextLight, TextDark } from "../../../.storybook/ThemeSwapper";

const meta: Meta<typeof ColourSchemeButton> = {
  title: "Components/Controls/ColourSchemeButton",
  component: ColourSchemeButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Interactively switch between dark and light modes (does not follow global theme switching above).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  parameters: {
    disableThemeSwapper: true,
  },
};

export const LightSelected: Story = {
  globals: {
    themeMode: TextLight,
  },
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const DarkSelected: Story = {
  globals: {
    themeMode: TextDark,
  },
  parameters: {
    docs: {
      disable: true,
    },
  },
};
