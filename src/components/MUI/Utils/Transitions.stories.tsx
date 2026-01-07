import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Fade, Grow, Slide, Collapse, Zoom } from "./Transitions";

import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "../Layout/Box";
import { Switch } from "../Inputs/Switch";

type ExtraArgs = {
  show?: boolean;
  text?: string;
  direction?: "left" | "right" | "up" | "down";
};
type Args = ExtraArgs;

const meta: Meta<Args> = {
  title: "MUI/Utils/Transitions",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    show: { control: "boolean" },
    text: { control: "text" },
    direction: { control: "select", options: ["left", "right", "up", "down"] },
  },
  args: {
    show: true,
    text: "Transition content",
    direction: "up",
  },
};
export default meta;
type Story = StoryObj<Args>;

const Icon = (text: string) => (
  <Box
    sx={{
      width: 120,
      height: 60,
      border: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "background.paper",
    }}
  >
    {text}
  </Box>
);

export const All: Story = {
  render: (args: Args) => {
    const [checked, setChecked] = React.useState<boolean>(args.show ?? true);
    return (
      <Box sx={{ display: "grid", gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          }
          label="Show"
        />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Fade in={checked}>{Icon("Fade")}</Fade>
          <Grow in={checked}>{Icon("Grow")}</Grow>
          <Slide
            in={checked}
            direction={args.direction}
            mountOnEnter
            unmountOnExit
          >
            {Icon("Slide")}
          </Slide>
          <Collapse in={checked}>{Icon("Collapse")}</Collapse>
          <Zoom in={checked}>{Icon("Zoom")}</Zoom>
        </Box>
      </Box>
    );
  },
};
