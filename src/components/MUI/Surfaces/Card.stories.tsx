import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import Diamond from "../../../public/images/diamond.jpg";
import { Typography } from "../DataDisplay/Typography";
import { Button } from "../Inputs/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

const meta: Meta<typeof Card> = {
  title: "MUI/Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["elevation", "outlined"] },
    raised: { control: "boolean" },
    elevation: { control: { type: "number", min: 0, max: 24, step: 1 } },
    sx: { control: false },
  },
  args: {
    variant: "elevation",
    raised: false,
    elevation: 1,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={Diamond} alt="Random" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Card title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Some descriptive text to show typical card content area sizing.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ),
};

export const Outlined: Story = {
  args: { variant: "outlined", elevation: 0 },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6">Outlined card</Typography>
        <Typography variant="body2" color="text.secondary">
          Uses the outlined variant with zero elevation.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Action</Button>
      </CardActions>
    </Card>
  ),
};
