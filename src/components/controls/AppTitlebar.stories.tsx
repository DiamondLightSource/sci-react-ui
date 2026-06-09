import { Meta, StoryObj } from "@storybook/react";
import { AppTitle, AppTitlebar, AppTitlebarProps } from "./AppTitlebar";

const meta: Meta<AppTitlebarProps> = {
  title: "Components/Controls/AppTitlebar",
  component: AppTitlebar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `A large title for your app. Not to be confused with MUI's AppBar component.  
        See also:  
        [AppBar Story](?path=/docs/mui-surfaces-appbar--docs) (opens in this tab)  
        [MUI AppBar documentation](https://v7.mui.com/material-ui/react-app-bar/)`,
      },
    },
  },

  argTypes: {
    surface: { table: { disable: true } },
    variant: { table: { disable: true } },
    elevation: { table: { disable: true } },

    leftSlot: { control: false },
    centreSlot: { control: false },
    rightSlot: { control: false },
    children: { control: false },
  },

  args: {
    title: "Your App Name",
  },
};

export default meta;
type Story = StoryObj<AppTitlebarProps>;

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

export const WithActions: Story = {
  args: {
    title: "My App",
    rightSlot: <button>Action</button>,
  },
  parameters: {
    docs: {
      description: {
        story: "Use slots to add actions or controls to the title bar.",
      },
    },
  },
};

export const CustomTypography: Story = {
  args: {
    children: <AppTitle title="My Great App" variant="h2" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can override the title content if you need custom typography.",
      },
    },
  },
};
export const AppTitlebarVariants: Story = {
  render: (_args) => (
    <>
      <AppTitlebar title="Default (primary solid)" />

      <AppTitlebar
        title="Primary Container"
        surface="primary"
        variant="container"
      />

      <AppTitlebar title="Surface Elevated" surface="surface" elevation={2} />

      <AppTitlebar title="Brand Solid" surface="brand" variant="solid" />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "AppTitlebar defaults to surface container but can be adapted for different emphasis and context.",
      },
    },
  },
};
