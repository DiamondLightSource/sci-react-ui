import type { Meta, StoryObj } from "@storybook/react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Divider> = {
  title: "MUI/Data Display/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: { control: "select", options: ["fullWidth", "inset", "middle"] },
    textAlign: { control: "select", options: ["center", "left", "right"] },
    flexItem: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "fullWidth",
    orientation: "horizontal",
    textAlign: "center",
    flexItem: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: (args) => <Divider {...args} /> };

export const WithLabel: Story = {
  args: { children: "Section" },
  render: (args) => <Divider {...args} />,
};

export const Vertical: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center" height={60}>
      <Typography>Item A</Typography>
      <Divider {...args} orientation="vertical" flexItem />
      <Typography>Item B</Typography>
    </Stack>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <List sx={{ width: 300, bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemText primary="Full width" />
      </ListItem>
      <Divider {...args} variant="fullWidth" />

      <ListItem>
        <ListItemText primary="Inset" />
      </ListItem>
      <Divider {...args} variant="inset" />

      <ListItem>
        <ListItemText primary="Middle" />
      </ListItem>
      <Divider {...args} variant="middle" />
    </List>
  ),
};
