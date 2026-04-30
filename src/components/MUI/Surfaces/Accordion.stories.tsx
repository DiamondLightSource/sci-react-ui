import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ExpandMoreIcon,
  Stack,
  Typography,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Accordion> = {
  title: "MUI/Surfaces/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    disabled: { control: "boolean" },
    disableGutters: { control: "boolean" },
    square: { control: "boolean" },
    defaultExpanded: { control: "boolean" },
    expanded: { control: false },
    onChange: { control: false },
    sx: { control: false },
  },
  args: {
    disabled: false,
    disableGutters: false,
    square: false,
    defaultExpanded: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Summary</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Details</Typography>
      </AccordionDetails>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: (args) => (
    <Stack spacing={1.5}>
      <Accordion {...args}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Item 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Content 1</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion {...args}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Item 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Content 2</Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Disabled</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Cannot expand</Typography>
      </AccordionDetails>
    </Accordion>
  ),
};

export const DefaultExpanded: Story = {
  args: { defaultExpanded: true },
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Expanded by default</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Initial content is visible</Typography>
      </AccordionDetails>
    </Accordion>
  ),
};
