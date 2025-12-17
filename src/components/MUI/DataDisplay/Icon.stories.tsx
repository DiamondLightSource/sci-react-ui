import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

const iconChildrenMap = {
  home: <HomeIcon />,
  favorite: <FavoriteIcon />,
  search: <SearchIcon />,
  settings: <SettingsIcon />,
} as const;

const meta: Meta<typeof Icon> = {
  title: "MUI/Data Display/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
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
    children: {
      name: "icon",
      control: "select",
      options: Object.keys(iconChildrenMap),
      mapping: iconChildrenMap,
    },
    baseClassName: { control: false },
  },
  args: {
    color: "inherit",
    fontSize: "medium",
    children: "home",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <Icon {...args} /> };

export const Colors: Story = {
  render: (args) => (
    <>
      <Icon {...args} color="primary" />
      <Icon {...args} color="secondary" />
      <Icon {...args} color="error" />
      <Icon {...args} color="success" />
      <Icon {...args} color="info" />
      <Icon {...args} color="warning" />
      <Icon {...args} color="action" />
      <Icon {...args} color="disabled" />
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <Icon {...args} fontSize="small" />
      <Icon {...args} fontSize="medium" />
      <Icon {...args} fontSize="large" />
    </>
  ),
};
