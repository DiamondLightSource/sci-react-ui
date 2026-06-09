import { Meta, StoryObj } from "@storybook/react";
import { BarSlotsProps, Bar } from "./Bar";
import { Typography } from "../../components/MUI/MuiWrapped";

const meta: Meta<BarSlotsProps> = {
  title: "Components/Controls/Bar",
  component: Bar,
  tags: ["autodocs"],

  argTypes: {
    surface: {
      control: "select",
      options: [
        "surface",
        "paper",
        "background",
        "primary",
        "secondary",
        "brand",
        "brand-fixed",
        "brand-fixedDim",
      ],
      table: { category: "Appearance" },
    },
    variant: {
      control: "select",
      options: ["base", "container", "solid"],
      if: { arg: "surface", neq: ["background"] },
      description:
        "Use 'base' only with surface/paper. Use 'container' or 'solid' for primary, secondary, and brand.",
      table: { category: "Appearance" },
    },
    elevation: {
      control: { type: "number", min: 0, max: 24 },
      if: { arg: "variant", eq: "base" },
      description:
        "Only applies to surface/paper with variant='base'. Ignored otherwise.",
      table: { category: "Appearance" },
    },
    containerWidth: {
      control: "select",
      options: [false, "xs", "sm", "md", "lg", "xl"],
      table: { category: "Layout" },
    },
    leftSlot: { control: false },
    centreSlot: { control: false },
    rightSlot: { control: false },
    children: { control: false },
  },

  args: {
    surface: "surface",
    variant: "base",
    elevation: 0,
    leftSlot: <Typography>Bar</Typography>,
  },
};

export default meta;
type Story = StoryObj<BarSlotsProps>;

export const Default: Story = {
  args: {
    leftSlot: <Typography>Default (surface)</Typography>,
  },
};

export const VariantsOnSurface: Story = {
  render: (_args) => (
    <>
      <Bar
        surface="surface"
        variant="base"
        leftSlot={<Typography>Base</Typography>}
      />
      <Bar
        surface="surface"
        variant="container"
        leftSlot={<Typography>Container</Typography>}
      />
      <Bar
        surface="surface"
        variant="solid"
        leftSlot={<Typography>Solid</Typography>}
      />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Variants control emphasis on neutral surfaces. Base relies on elevation, container is subtle, and solid is strong.",
      },
    },
  },
};

export const ElevationScale: Story = {
  render: (_args) => (
    <>
      <Bar
        surface="surface"
        elevation={0}
        leftSlot={<Typography>Elevation 0</Typography>}
      />
      <Bar
        surface="surface"
        elevation={1}
        leftSlot={<Typography>Elevation 1</Typography>}
      />
      <Bar
        surface="surface"
        elevation={3}
        leftSlot={<Typography>Elevation 3</Typography>}
      />
      <Bar
        surface="surface"
        elevation={6}
        leftSlot={<Typography>Elevation 6</Typography>}
      />
      <Bar
        surface="surface"
        elevation={12}
        leftSlot={<Typography>Elevation 12</Typography>}
      />
      <Bar
        surface="surface"
        elevation={24}
        leftSlot={<Typography>Elevation 24</Typography>}
      />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Elevation controls hierarchy on neutral surfaces with base variant. Higher values appear more raised.",
      },
    },
  },
};

export const PrimaryVsSurface: Story = {
  render: (_args) => (
    <>
      <Bar
        surface="primary"
        variant="solid"
        leftSlot={<Typography>Primary (action)</Typography>}
      />
      <Bar
        surface="surface"
        variant="container"
        leftSlot={<Typography>Surface (layout)</Typography>}
      />
      <Bar
        surface="surface"
        elevation={2}
        leftSlot={<Typography>Surface Elevated</Typography>}
      />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Semantic surfaces (e.g. primary, secondary) express intent, while neutral surfaces define structure and hierarchy.",
      },
    },
  },
};

export const ActionVariants: Story = {
  render: (_args) => (
    <>
      <Bar
        surface="primary"
        variant="solid"
        leftSlot={<Typography>Primary Solid</Typography>}
      />
      <Bar
        surface="primary"
        variant="container"
        leftSlot={<Typography>Primary Container</Typography>}
      />

      <Bar
        surface="secondary"
        variant="solid"
        leftSlot={<Typography>Secondary Solid</Typography>}
      />
      <Bar
        surface="secondary"
        variant="container"
        leftSlot={<Typography>Secondary Container</Typography>}
      />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: "Variants adjust emphasis.",
      },
    },
  },
};

export const BrandOptions: Story = {
  render: (_args) => (
    <>
      <Bar
        surface="brand"
        variant="solid"
        leftSlot={<Typography>Brand Solid</Typography>}
      />
      <Bar
        surface="brand"
        variant="container"
        leftSlot={<Typography>Brand Container</Typography>}
      />
      <Bar
        surface="brand-fixed"
        leftSlot={<Typography>Brand Fixed</Typography>}
      />
      <Bar
        surface="brand-fixedDim"
        leftSlot={<Typography>Brand Fixed Dim</Typography>}
      />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Brand surfaces are used for identity. brand-fixed and brand-fixedDim ignore variant prop and remain consistent across dark/light modes.",
      },
    },
  },
};

export const AllSlots: Story = {
  args: {
    leftSlot: <Typography>Left</Typography>,
    centreSlot: <Typography>Centre</Typography>,
    rightSlot: <Typography>Right</Typography>,
  },
};

export const WithChildren: Story = {
  args: {
    leftSlot: <Typography>Left</Typography>,
    children: <Typography>Children</Typography>,
  },
};

export const Width: Story = {
  args: {
    leftSlot: <Typography>|&lt;</Typography>,
    centreSlot: <Typography>&quot;md&quot; Width</Typography>,
    rightSlot: <Typography>&gt;|</Typography>,
    containerWidth: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          'You can change the width of the content of the bar by setting "containerWidth", ' +
          "either with a Breakpoint value (xs, sm, md, lg, xl) or false to match the screen width.",
      },
    },
  },
};

export const WidthMax: Story = {
  args: {
    leftSlot: <Typography>|&lt;</Typography>,
    centreSlot: <Typography>Max Width</Typography>,
    rightSlot: <Typography>&gt;|</Typography>,
    containerWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When "containerWidth" is set to "false", the content of the bar is as wide as the screen.',
      },
    },
  },
};

export const WidthThin: Story = {
  args: {
    leftSlot: <Typography>|&lt;</Typography>,
    centreSlot: <Typography>&quot;sm&quot; width</Typography>,
    rightSlot: <Typography>&gt;|</Typography>,
    containerWidth: "sm",
  },
  parameters: {
    docs: {
      description: {
        story:
          'When "containerWidth" is set to one of "xs, sm, md, lg, xl", the content of the bar ' +
          "uses the corresponding width set in the theme.",
      },
    },
  },
};
