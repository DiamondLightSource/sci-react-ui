import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NoSsr } from "./NoSsr";
import { Box } from "../Layout/Box";

type Args = React.ComponentProps<typeof NoSsr> & {
  serverContent?: string;
  clientContent?: string;
};

const meta: Meta<Args> = {
  title: "MUI/Utils/NoSsr",
  component: NoSsr,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    defer: { control: "boolean" },
    fallback: { control: "text" },
    serverContent: { control: "text" },
    clientContent: { control: "text" },
  },
  args: {
    defer: false,
    fallback: null,
    serverContent: "Server and Client",
    clientContent: "Client only",
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Basic: Story = {
  render: (args: Args) => (
    <div>
      <Box
        sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText" }}
      >
        {args.serverContent}
      </Box>
      <NoSsr defer={args.defer} fallback={args.fallback}>
        <Box
          sx={{
            p: 2,
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
          }}
        >
          {args.clientContent}
        </Box>
      </NoSsr>
    </div>
  ),
};
