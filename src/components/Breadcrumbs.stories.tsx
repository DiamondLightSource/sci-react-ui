import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "SciReactUI/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    path: [
      { name: "first", href: "first" },
      { name: "second", href: "second/could/be/here" },
      { name: "third", href: "third" },
      { name: "last", href: "/" },
    ],
  },
};

export const ShortPath: Story = {
  args: {
    path: [{ name: "just one", href: "/" }],
  },
};

export const LongPath: Story = {
  args: {
    path: [
      { name: "first", href: "first" },
      { name: "the second", href: "the/second" },
      { name: "third", href: "third" },
      { name: "fourth", href: "fourth/could/be/here" },
      { name: "almost last", href: "almost last" },
      { name: "last one", href: "/" },
    ],
  },
};

export const Empty: Story = {
  args: {
    path: [],
  },
};

export const ColorChange: Story = {
  args: {
    path: [
      { name: "first", href: "first" },
      { name: "second", href: "second/could/be/here" },
      { name: "third", href: "third" },
      { name: "last", href: "/" },
    ],
    rootProps: {
      sx: { backgroundColor: "blue" },
    },
    muiBreadcrumbsProps: {
      sx: { color: "yellow" },
    },
  },
};
