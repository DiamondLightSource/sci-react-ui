import type { Meta, StoryObj } from "@storybook/react-webpack5";
import * as React from "react";
import { BottomNavigation, BottomNavigationAction } from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";
import { LucideIcon } from "../../datadisplay/Icons";
import { Heart, History, MapPin } from "lucide-react";

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
        <BottomNavigationAction
          label="Recents"
          icon={<LucideIcon icon={History} />}
        />
        <BottomNavigationAction
          label="Favourites"
          icon={<LucideIcon icon={Heart} />}
        />
        <BottomNavigationAction
          label="Nearby"
          icon={<LucideIcon icon={MapPin} />}
        />
      </BottomNavigation>
    );
  },
};
