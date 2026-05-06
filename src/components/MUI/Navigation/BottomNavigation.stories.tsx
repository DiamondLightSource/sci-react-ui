import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  FavoriteIcon,
  LocationOnIcon,
  RestoreIcon,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof BottomNavigation> = {
  title: "MUI/Navigation/BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    showLabels: { control: "boolean" },
  },
  args: { showLabels: true },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(0);
    return (
      <BottomNavigation
        {...args}
        value={value}
        onChange={(_, v) => setValue(v)}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favourites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  },
};
