import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "MUI/Data Display/IconButton",
  component: Icon,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    // These rely on the Material Icons font if you use ligatures.
    // If your project doesn't load the font, the text will render as plain text.
    color: {
      control: "select",
      options: [
        "inherit",
        "primary",
        "secondary",
        "action",
        "disabled",
        "error",
        "info",
        "success",
        "warning",
      ],
    },
    fontSize: {
      control: "select",
      options: ["inherit", "small", "medium", "large"],
    },
    baseClassName: { control: "text" },
    children: { name: "ligature/text", control: "text" },
  },
  args: {
    children: "home",
    color: "inherit",
    fontSize: "medium",
    baseClassName: "material-icons", // if you load the Material Icons font
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Icon {...args} />,
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <Icon {...args} fontSize="small">
        home
      </Icon>{" "}
      <Icon {...args} fontSize="medium">
        home
      </Icon>{" "}
      <Icon {...args} fontSize="large">
        home
      </Icon>
    </>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <>
      <Icon {...args} color="primary">
        home
      </Icon>{" "}
      <Icon {...args} color="secondary">
        home
      </Icon>{" "}
      <Icon {...args} color="error">
        home
      </Icon>{" "}
      <Icon {...args} color="success">
        home
      </Icon>{" "}
      <Icon {...args} color="info">
        home
      </Icon>{" "}
      <Icon {...args} color="warning">
        home
      </Icon>
    </>
  ),
};
