import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Portal } from "./Portal";
import { Button } from "../Inputs/Button";
import { Box } from "../Layout/Box";

type Args = React.ComponentProps<typeof Portal> & { text?: string };

const meta: Meta<Args> = {
  title: "MUI/Utils/Portal",
  component: Portal,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    disablePortal: { control: "boolean" },
    container: { control: false },
    children: { control: false },
    text: { control: "text" },
  },
  args: {
    disablePortal: false,
    text: "But I actually render here!",
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Basic: Story = {
  render: (args: Args) => {
    const container = React.useRef<HTMLDivElement | null>(null);
    const [show, setShow] = React.useState(false);
    return (
      <>
        <Button onClick={() => setShow((p) => !p)}>
          {show ? "Unmount children" : "Mount children"}
        </Button>
        <Box sx={{ p: 1, my: 1, border: "1px solid" }}>
          It looks like I will render here.
          {show ? (
            <Portal
              container={() => container.current!}
              disablePortal={args.disablePortal}
            >
              <span>{args.text}</span>
            </Portal>
          ) : null}
        </Box>
        <Box sx={{ p: 1, my: 1, border: "1px solid" }} ref={container} />
      </>
    );
  },
};
