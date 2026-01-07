import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { BottomNavigation } from "./BottomNavigation";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

const meta: Meta<typeof BottomNavigation> = {
  title: "MUI/Navigation/BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    showLabels: { control: "boolean" },
    value: { control: false },
    onChange: { control: false },
  },
  args: { showLabels: true },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <BottomNavigation
        {...args}
        value={value}
        onChange={(_, v) => setValue(v)}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  },
};
