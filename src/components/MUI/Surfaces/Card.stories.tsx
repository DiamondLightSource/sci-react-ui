import type { Meta, StoryObj } from "@storybook/react";
import Diamond from "../../../public/images/diamond.jpg";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof Card> = {
  title: "MUI/Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: {
      control: "select",
      options: ["elevation", "outlined"],
    },
    raised: { control: "boolean" },
    elevation: {
      control: { type: "number", min: 0, max: 24, step: 1 },
    },
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
      <CardMedia component="img" image={Diamond} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Diamond Light Source
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Diamond Light Source is the UK’s national synchrotron serving
          scientists and researchers from around the world.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn more</Button>
      </CardActions>
    </Card>
  ),
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    elevation: 0,
  },
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
