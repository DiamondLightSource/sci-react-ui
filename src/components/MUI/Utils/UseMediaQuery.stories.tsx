import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { UseMediaQuery } from "./UseMediaQuery";

import { useTheme } from "@mui/material/styles";
import { Box } from "../Layout/Box";

type Args = React.ComponentProps<typeof UseMediaQuery> & {
  useThemeBreakpoint?: boolean;
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl";
};

const meta: Meta<Args> = {
  title: "MUI/Utils/useMediaQuery",
  component: UseMediaQuery,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    query: { control: "text" },
    useThemeBreakpoint: { control: "boolean" },
    breakpoint: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
  args: {
    query: "(min-width:600px)",
    useThemeBreakpoint: false,
    breakpoint: "sm",
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Basic: Story = {
  render: (args: Args) => {
    const theme = useTheme();
    const query = args.useThemeBreakpoint
      ? theme.breakpoints.up(args.breakpoint || "sm")
      : args.query;
    return (
      <Box sx={{ display: "grid", gap: 1 }}>
        <UseMediaQuery query={query} />
      </Box>
    );
  },
};
