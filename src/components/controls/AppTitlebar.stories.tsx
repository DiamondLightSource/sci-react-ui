import { Meta, StoryObj } from "@storybook/react";
import { AppTitle, AppTitlebar } from "./AppTitlebar";

const meta: Meta<typeof AppTitlebar> = {
  title: "SciReactUI/Control/AppTitlebar",
  component: AppTitlebar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A large title for your app.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    title: "Your App Name",
  },
  parameters: {
    docs: {
      description: {
        story: 'Display a title by simply setting title="Your App Name".',
      },
    },
  },
};

export const InCentreSlot: Story = {
  args: {
    centreSlot: <AppTitle title="My Great App (in middle)" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "If you would like it to appear in a different position, pass AppTitle in to your preferred slot.",
      },
    },
  },
};

export const DifferentBackground: Story = {
  args: {
    title: "My Great App",
    sx: { backgroundColor: "red" },
  },
  parameters: {
    docs: {
      description: {
        story: "You can pass styles to the bar.",
      },
    },
  },
};

export const DifferentColourAndLarge: Story = {
  args: {
    children: (
      <AppTitle
        title="My Great App"
        sx={{ color: "yellow", fontSize: "4em" }}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can add styles directly to the title when it's a child or in a slot.",
      },
    },
  },
};
