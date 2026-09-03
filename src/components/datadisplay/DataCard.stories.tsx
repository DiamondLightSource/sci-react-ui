import { Meta, StoryObj } from "@storybook/react";
import { DataCard, type DataCardProps } from "./DataCard";
import { Box, Stack, Typography } from "../MUI/MuiWrapped";
import { LucideStar } from "lucide-react";

const meta = {
  title: "Components/Data Display/DataCard",
  component: DataCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A compact component for displaying structured label-value data in dashboard and system views.",
      },
    },
  },
} satisfies Meta<DataCardProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const standardProps: DataCardProps = {
  title: "Card title",
  value: { label: "Label", value: "Value", suffix: "Suffix" },
  subvalue: { label: "Label", value: "Value", suffix: "Suffix" },
  colour: "neutral",
  icon: LucideStar,
};

export const StandardCard: Story = {
  name: "Standard data card",
  args: standardProps,
  render: (args) => {
    return (
      <Box width={300}>
        <DataCard {...args} />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "The standard card consists of title, main value (with optional label and/or suffix and Lucide icon) and optional subvalue.",
      },
    },
  },
};

export const Stacked: Story = {
  name: "Stacked data card",
  args: {
    title: "Beamline",
    value1: {
      label: "Front end",
      value: "Open",
    },
    value2: {
      label: "EH3 shutter",
      value: "Open",
    },
    colour: "success",
  },
  render: (args) => {
    return (
      <Box width={300}>
        <DataCard {...args} />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `Shows two data entries of the same importance. Default representation when two values are given.`,
      },
    },
  },
};

export const Pair: Story = {
  name: "Paired variant",
  args: {
    title: "Current sample",
    value1: { label: "Puck", value: "4" },
    value2: { label: "Pin", value: "6" },
    subvalue: { label: "Name", value: "AlOx 06" },
    colour: "info",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Two data entries can be combined in one line. Useful to show subvalue too.",
      },
    },
  },
  render: (args) => {
    return (
      <Box width={300}>
        <DataCard {...args} />
      </Box>
    );
  },
};

export const Colours: Story = {
  render: (_args) => {
    return (
      <Stack direction="column" spacing={1} width={300}>
        <DataCard {...standardProps} title="none" colour="none" />
        <DataCard {...standardProps} title="neutral" colour="neutral" />
        <DataCard {...standardProps} title="info" colour="info" />
        <DataCard {...standardProps} title="success" colour="success" />
        <DataCard {...standardProps} title="warning" colour="warning" />
        <DataCard {...standardProps} title="danger" colour="danger" />
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Colour describes intent or severity.",
      },
    },
  },
  args: {
    // Unused! Just to keep linter happy
    title: "",
    value: { value: "" },
    colour: "none",
  },
};

const layoutProps: DataCardProps[] = [
  {
    title: "Ring current",
    value: { value: "299.97", suffix: "mA" },
    subvalue: { label: "Refill in", value: "492", suffix: "s" },
    colour: "success",
  },
  {
    title: "Current sample",
    value1: { label: "Puck", value: "4" },
    value2: { label: "Pin", value: "6" },
    subvalue: { label: "Name", value: "AlOx 06" },
    colour: "info",
  },
  {
    title: "Run ID",
    value: { value: "ixx-15542" },
    colour: "neutral",
  },
  {
    title: "Scan progress",
    value: { value: "35", suffix: "%" },
    subvalue: { label: "Remaining", value: "11m 46s" },
    colour: "info",
  },
];

export const Layout: Story = {
  name: "A comment on the layout",
  render: (_args) => {
    return (
      <>
        <Typography>Columns with unconstrained widths:</Typography>
        <Stack direction="row" spacing={2} pb={2}>
          {layoutProps.map((cardProps, index) => (
            <DataCard {...cardProps} key={index} />
          ))}
        </Stack>

        <Typography>Columns with fixed widths:</Typography>
        <Stack direction="row" spacing={2}>
          {layoutProps.map((cardProps, index) => (
            <Box display="flex" width={200} key={index}>
              <DataCard {...cardProps} key={index} />
            </Box>
          ))}
        </Stack>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DataCard will grow to fill available space, so parent container decides how to layout the components.",
      },
    },
  },
  args: {
    // Unused! Just to keep linter happy
    title: "",
    value: { value: "" },
    colour: "none",
  },
};
