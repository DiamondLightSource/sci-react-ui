import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Link as MuiLink } from "@mui/material";

interface MockLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

const MockLink: React.FC<MockLinkProps> = ({ to, children, ...props }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Mock navigation to: ${to}`);
  };

  return (
    <MuiLink
      href={typeof to === "string" ? to : "#"}
      onClick={handleClick}
      underline="hover"
      color="inherit"
      {...props}
    >
      {children}
    </MuiLink>
  );
};

const meta: Meta<typeof Breadcrumbs> = {
  title: "SciReactUI/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
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

export const ColorChange: Story = {
  args: {
    path: ["first", "second", "third", "last"],
    linkComponent: MockLink,
    rootProps: {
      sx: { backgroundColor: "blue" },
    },
    muiBreadcrumbsProps: {
      sx: { color: "yellow" },
    },
  },
};
