import type { Meta, StoryObj } from "@storybook/react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "MUI/Surfaces/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    disabled: { control: "boolean" },
    disableGutters: { control: "boolean" },
    square: { control: "boolean" },
    expanded: { control: false },
    defaultExpanded: { control: "boolean" },
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
  render: (args: any) => (
    <div style={{ display: "grid", gap: 12 }}>
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
    </div>
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
