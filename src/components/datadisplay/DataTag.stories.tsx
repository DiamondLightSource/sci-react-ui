import { Meta, StoryObj } from "@storybook/react-webpack5";
import { DataTag, DataTagGrid, type DataTagProps } from "./DataCard";
import { Box, Stack, Typography } from "../MUI/MuiWrapped";
import { LucideStar } from "lucide-react";

const meta = {
  title: "Components/Data Display/DataTag",
  component: DataTag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An extremely compact component to display data in high-density scientific views. Clicking a tag copies its formatted value to the clipboard.",
      },
    },
  },
} satisfies Meta<typeof DataTag>;

export default meta;
type Story = StoryObj<typeof meta>;
type StringStory = StoryObj<DataTagProps<string>>;
type NumberStory = StoryObj<DataTagProps<number>>;

const standardStringProps: DataTagProps<string> = {
  label: "Label",
  value: "Value",
  icon: LucideStar,
};

const standardNumberProps: DataTagProps<number> = {
  label: "Label",
  value: 123,
  icon: LucideStar,
};

export const StandardStringTag: StringStory = {
  name: "Standard data tag (with string value)",
  args: standardStringProps,
  render: (args) => (
    <Box width={300}>
      <DataTag {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A tag consists of a label and a value separated by a divider, with an optional Lucide icon. Click the tag to copy the value.",
      },
    },
  },
};

export const StandardNumberTag: NumberStory = {
  name: "Standard data tag (with number value)",
  args: standardNumberProps,
  render: (args) => (
    <Box width={300}>
      <DataTag {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Numeric tags additionally accept `suffix` and `toFixed` props.",
      },
    },
  },
};

export const WithoutIcon: Story = {
  name: "Without icon",
  args: { label: "Label", value: "Value" },
  render: (args) => (
    <Box width={300}>
      <DataTag {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: { story: "The icon is optional." },
    },
  },
};

export const NumberFormatting: Story = {
  name: "Number formatting (suffix and toFixed)",
  args: { label: "Label" },
  render: () => (
    <Stack direction="column" spacing={1} width={300}>
      <DataTag label="Raw" value={299.97123} />
      <DataTag label="toFixed={2}" value={299.97123} toFixed={2} />
      <DataTag label="suffix" value={492} suffix="s" />
      <DataTag label="Ring current" value={299.97123} toFixed={2} suffix="mA" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`toFixed` sets the number of decimal places and `suffix` appends a unit. These props are only available when the value is a number. The copied text includes the suffix.",
      },
    },
  },
};

export const ColourCallback: Story = {
  name: "Colour from value",
  args: { label: "Label" },
  render: () => {
    const thresholdColour = (value: number) =>
      value > 90 ? "error" : value > 70 ? "warning" : "success";

    const statusColour = (value: string) =>
      value === "Open" ? "success" : "error";

    return (
      <Stack direction="column" spacing={1} width={300}>
        <DataTag
          label="Load"
          value={42}
          suffix="%"
          setColourCallback={thresholdColour}
        />
        <DataTag
          label="Load"
          value={78}
          suffix="%"
          setColourCallback={thresholdColour}
        />
        <DataTag
          label="Load"
          value={95}
          suffix="%"
          setColourCallback={thresholdColour}
        />
        <DataTag
          label="Front end"
          value="Open"
          setColourCallback={statusColour}
        />
        <DataTag
          label="EH3 shutter"
          value="Closed"
          setColourCallback={statusColour}
        />
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`setColourCallback` receives the value and returns a theme colour for the tag's left border. Without it the default colour is used.",
      },
    },
  },
};

export const MissingValues: Story = {
  name: "Missing and falsy values",
  args: { label: "Label" },
  render: () => (
    <Stack direction="column" spacing={1} width={300}>
      <Typography>Undefined value:</Typography>
      <DataTag label="Label" value={undefined} />
      <Typography>Zero:</Typography>
      <DataTag label="Label" value={0} />
      <Typography>Empty string:</Typography>
      <DataTag label="Label" value="" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A missing value is displayed as `?`. Falsy values (including `0` and an empty string) are shown with a disabled border colour and do not invoke `setColourCallback`.",
      },
    },
  },
};

export const ShrinkWidth: Story = {
  name: "Shrink width",
  args: { label: "Label" },
  render: () => (
    <Stack direction="column" spacing={2}>
      <Box>
        <Typography>Default (grows to fill the column):</Typography>
        <Box display="flex" width={400}>
          <DataTag label="Label" value="Value" />
        </Box>
      </Box>
      <Box>
        <Typography>shrinkWidth:</Typography>
        <Box display="flex" width={400}>
          <DataTag label="Label" value="Value" shrinkWidth />
        </Box>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "By default a tag takes up the whole column. Set `shrinkWidth` to fit the tag to its content instead.",
      },
    },
  },
};

const gridTags = (
  <>
    <DataTag label="Beamline" value="i03" />
    <DataTag label="Energy" value={12.658} toFixed={2} suffix="keV" />
    <DataTag label="Transmission" value={100} suffix="%" />
    <DataTag label="Flux" value={1.2e12} />
    <DataTag label="Proposal=" value="cm12345" />
    <DataTag label="Pin" value={6} />
  </>
);

export const Grid: Story = {
  name: "DataTagGrid",
  args: { label: "Label" },
  render: () => (
    <Stack direction="column" spacing={2}>
      <Typography>Default spacing:</Typography>
      <DataTagGrid>
        <DataTag label="Beamline" value="i03" />
        <DataTag label="Energy" value={12.658} toFixed={2} suffix="keV" />
        <DataTag label="Transmission" value={100} suffix="%" />
        <DataTag label="Flux" value={1.2e12} />
        <DataTag label="Proposal" value="cm12345" />
        <DataTag label="Pin" value={6} />
      </DataTagGrid>

      <Typography>Custom spacing (1rem):</Typography>
      <DataTagGrid spacing="1rem">
        <DataTag label="Beamline" value="i03" />
        <DataTag label="Energy" value={12.658} toFixed={2} suffix="keV" />
        <DataTag label="Transmission" value={100} suffix="%" />
        <DataTag label="Flux" value={1.2e12} />
      </DataTagGrid>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`DataTagGrid` lays tags out in a responsive grid: one column on small screens, two on large and three on extra-large. Resize the viewport to see it reflow. `spacing` sets the gap between tags.",
      },
    },
  },
};

export const GridSizes: Story = {
  name: "Tag size within a grid",
  args: { label: "Label" },
  render: () => (
    <DataTagGrid>
      <DataTag label="size 1 (default)" value="Value" />
      <DataTag label="size 1" value="Value" />
      <DataTag label="size 1" value="Value" />
      <DataTag label="size 2" value="Spans two columns" size={2} />
      <DataTag label="size 1" value="Value" />
      <DataTag label="size full" value="Spans the full row" size="full" />
    </DataTagGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Inside a `DataTagGrid`, `size` sets how many columns a tag spans. Use a number for a fixed span, or `"full"` to take the entire row. Best viewed at a wide viewport so the extra columns are visible.',
      },
    },
  },
};

export const GridWithHiddenTags: Story = {
  name: "Grid with hidden tags",
  args: { label: "Label" },
  render: () => (
    <DataTagGrid>
      <DataTag label="Always shown" value="Value" />
      <DataTag label="Hidden (undefined)" value={undefined} />
      <DataTag label="Hidden (falsy)" value={0} hideIf="falsy" />
      <DataTag label="Shown (zero)" value={0} />
      {gridTags}
    </DataTagGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Hidden tags use `display: none`, so they leave no gap in the grid.",
      },
    },
  },
};
