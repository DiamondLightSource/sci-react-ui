import type { Meta, StoryObj } from "@storybook/react";
import {
  Breadcrumbs,
  GrainIcon,
  HomeIcon,
  Link,
  Typography,
  WhatshotIcon,
  WorkIcon,
} from "../MuiWrapped";
import {
  muiDocsParameters,
  muiDocsText,
} from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Breadcrumbs> = {
  title: "MUI/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    ...muiDocsParameters,
    docs: {
      description: {
        component: `
${muiDocsText}
Not to be confused with custom [Breadcrumbs component](?path=/docs/components-navigation-breadcrumbs--docs)  (opens in this tab).  
`,
      },
    },
  },
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
      <Link>Instrument Session</Link>
      <Link>Data Collection</Link>
      <Typography color="text.primary">Scan</Typography>
    </Breadcrumbs>
  ),
};

export const CustomSeparator: Story = {
  args: { separator: "›" },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link>Home</Link>
      <Link>Instrument Session</Link>
      <Link>Data Collection</Link>
      <Typography color="text.primary">Scan</Typography>
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
        Instrument Session
      </Link>
      <Typography
        color="text.primary"
        sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
      >
        <GrainIcon fontSize="inherit" />
        Data Collection
      </Typography>
      <Typography
        color="text.primary"
        sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
      >
        <WorkIcon fontSize="inherit" />
        Data Collection
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
      <Link>Instrument Session</Link>
      <Link>Data Collection</Link>
      <Link>Scan</Link>
      <Typography color="text.primary">Item</Typography>
    </Breadcrumbs>
  ),
};
