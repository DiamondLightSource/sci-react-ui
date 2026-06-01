import { Meta, StoryObj } from "@storybook/react";
import NewAppBar from "./NewAppBar";
import { ColourSchemeButton } from "./ColourSchemeButton";
import { User } from "./User";

// Mocked user for stories
const mockUser = {
  name: "Jane Doe",
  fedid: "ab12345",
};

const meta: Meta<typeof NewAppBar> = {
  title: "Components/Controls/NewAppBar",
  component: NewAppBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NeutralSurface: Story = {
  args: {
    title: "AppTitle",
  },
};

export const Brand: Story = {
  args: {
    title: "AppTitle",
    variant: "brand",
    logo: "theme",
  },
};

export const WithActions: Story = {
  args: {
    title: "AppTitle",
    logo: "theme",
    endSlot: (
      <>
        <ColourSchemeButton />
        <User />
      </>
    ),
  },
};

export const BrandWithActions: Story = {
  args: {
    title: "AppTitle",
    variant: "brand",
    logo: "theme",
    endSlot: (
      <>
        <ColourSchemeButton />
        <User />
      </>
    ),
  },
};

export const LoggedIn: Story = {
  args: {
    title: "AppTitle",
    logo: "theme",
    endSlot: (
      <>
        <ColourSchemeButton />
        <User user={mockUser} />
      </>
    ),
  },
};

export const BrandLoggedIn: Story = {
  args: {
    title: "AppTitle",
    variant: "brand",
    logo: "theme",
    endSlot: (
      <>
        <ColourSchemeButton />
        <User user={mockUser} />
      </>
    ),
  },
};
