import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../DataDisplay/Typography";
import { Box } from "../Layout/Box";
import { CssBaseline } from "./CssBaseline";

type Args = React.ComponentProps<typeof CssBaseline>;

const meta: Meta<Args> = {
  title: "MUI/Utils/CssBaseline",
  component: CssBaseline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    enableColorScheme: { control: "boolean" },
    children: { control: false },
  },
  args: {
    enableColorScheme: false,
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Basic: Story = {
  render: (args: Args) => (
    <>
      <CssBaseline {...args} />
      <Box sx={{ p: 2, bgcolor: "background.default", color: "text.primary" }}>
        <Typography variant="h6">CssBaseline applied</Typography>
        <Typography variant="body2">
          This area reflects baseline styles.
        </Typography>
      </Box>
    </>
  ),
};
