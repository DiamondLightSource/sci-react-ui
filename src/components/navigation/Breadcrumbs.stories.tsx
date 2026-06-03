import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";
import { MockLink } from "../../utils/MockLink";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Not to be confused with MUI's Breadcrumbs component.  
        See also:  
        [Breadcrumbs Story](?path=/docs/mui-navigation-breadcrumbs--docs) (opens in this tab)  
        [MUI Breadcrumbs documentation](https://v7.mui.com/material-ui/react-breadcrumbs/)`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    path: "/first/second/third/last/",
    linkComponent: MockLink,
  },
};

export const ShortPath: Story = {
  args: {
    path: "just one",
    linkComponent: MockLink,
  },
};

export const LongPath: Story = {
  args: {
    path: "/first/the second/third/fourth/almost last/last one/",
    linkComponent: MockLink,
  },
};

export const DifferentLinkToPathName: Story = {
  args: {
    path: [
      { name: "first", href: "link" },
      { name: "second", href: "other link" },
      { name: "last", href: "/" },
    ],
    linkComponent: MockLink,
  },
};

export const Empty: Story = {
  args: {
    path: [],
    linkComponent: MockLink,
  },
};

export const NoLinkComponent: Story = {
  args: {
    path: "/first/second/third/last/",
  },
};

export const NoLinkComponentWithCustomPath: Story = {
  args: {
    path: [
      { name: "first", href: "link" },
      { name: "second", href: "other link" },
      { name: "last", href: "/" },
    ],
  },
};

export const ColourChange: Story = {
  args: {
    path: ["first", "second", "third", "last"],
    linkComponent: MockLink,
    sx: { backgroundColor: "blue" },
    muiBreadcrumbsProps: {
      sx: { color: "yellow" },
    },
  },
};
