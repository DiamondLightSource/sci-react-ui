import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import { Link } from "./Link";
import { Typography } from "../DataDisplay/Typography";

const meta: Meta<typeof Breadcrumbs> = {
  title: "MUI/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    separator: { control: "text" },
    maxItems: { control: { type: "number", min: 2, max: 10, step: 1 } },
    itemsBeforeCollapse: {
      control: { type: "number", min: 0, max: 5, step: 1 },
    },
    itemsAfterCollapse: {
      control: { type: "number", min: 0, max: 5, step: 1 },
    },
  },
  args: {
    separator: "/",
    maxItems: 8,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link>Home</Link>
      <Link>Library</Link>
      <Typography color="text.primary">Data</Typography>
    </Breadcrumbs>
  ),
};

export const CustomSeparator: Story = {
  args: { separator: "›" },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link>#Home</Link>
      <Link>#Catalog</Link>
      <Link>#Accessories</Link>
      <Typography color="text.primary">Cables</Typography>
    </Breadcrumbs>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Breadcrumbs {...args} separator="›">
      <Link>
        <HomeIcon fontSize="inherit" />
        Home
      </Link>
      <Link>
        <WhatshotIcon fontSize="inherit" />
        Trending
      </Link>
      <Typography
        color="text.primary"
        sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
      >
        <GrainIcon fontSize="inherit" />
        Details
      </Typography>
    </Breadcrumbs>
  ),
};

export const Collapsed: Story = {
  args: {
    maxItems: 3,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
    separator: "/",
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link>Home</Link>
      <Link>Section</Link>
      <Link>Category</Link>
      <Link>Subcategory</Link>
      <Typography color="text.primary">Item</Typography>
    </Breadcrumbs>
  ),
};
