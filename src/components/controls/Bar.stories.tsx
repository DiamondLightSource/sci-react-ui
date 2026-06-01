import { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@mui/material";
import { Bar } from "./Bar";

const meta: Meta<typeof Bar> = {
  title: "Components/Controls/Bar",
  component: Bar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftSlot: <Typography variant="body1">Left</Typography>,
    centreSlot: <Typography variant="body1">Centre</Typography>,
    rightSlot: <Typography variant="body1">Right</Typography>,
  },
};

export const Primary: Story = {
  args: {
    color: "primary",
    leftSlot: <Typography variant="body1">Primary Bar</Typography>,
    rightSlot: <Typography>Actions</Typography>,
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    leftSlot: <Typography variant="body1">Secondary Bar</Typography>,
  },
};

export const Subtle: Story = {
  args: {
    color: "primary",
    variant: "subtle",
    leftSlot: <Typography variant="body1">Subtle Primary</Typography>,
  },
};

export const WithTitle: Story = {
  args: {
    color: "primary",
    leftSlot: <Typography variant="h6">My App</Typography>,
    rightSlot: <Typography>Controls</Typography>,
  },
};

export const FullWidth: Story = {
  args: {
    containerWidth: false,
    leftSlot: <Typography>Full width content</Typography>,
    rightSlot: <Typography>Right</Typography>,
  },
};

export const AllSlots: Story = {
  args: {
    leftSlot: <Typography>Left</Typography>,
    centreSlot: <Typography>Centre</Typography>,
    rightSlot: <Typography>Right</Typography>,
  },
  parameters: {
    docs: {
      description: {
        story: "Three slots are available, left, centre and right.",
      },
    },
  },
};

export const WithChildren: Story = {
  args: {
    leftSlot: <Typography>Left</Typography>,
    children: <Typography>Children</Typography>,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Children appear on the left, proceeding anything added directly to the "leftSlot".',
      },
    },
  },
};

export const WithContent: Story = {
  args: {
    leftSlot: <Typography variant="body1">Text content</Typography>,
    centreSlot: <input placeholder="Input field" />,
    rightSlot: <button>Action</button>,
  },
};

export const Width: Story = {
  args: {
    leftSlot: <Typography>|&lt;</Typography>,
    centreSlot: <Typography>&quot;md&quot; Width</Typography>,
    rightSlot: <Typography>&gt;|</Typography>,
    containerWidth: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          'You can change the width of the content of the bar by setting "containerWidth", ' +
          "either with a Breakpoint value (xs, sm, md, lg, xl) or false to match the screen width.",
      },
    },
  },
};

export const WidthMax: Story = {
  args: {
    leftSlot: <Typography>|&lt;</Typography>,
    centreSlot: <Typography>Max Width</Typography>,
    rightSlot: <Typography>&gt;|</Typography>,
    containerWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When "containerWidth" is set to "false", the content of the bar is as wide as the screen.',
      },
    },
  },
};

export const WidthThin: Story = {
  args: {
    leftSlot: <Typography>|&lt;</Typography>,
    centreSlot: <Typography>&quot;sm&quot; width</Typography>,
    rightSlot: <Typography>&gt;|</Typography>,
    containerWidth: "sm",
  },
  parameters: {
    docs: {
      description: {
        story:
          'When "containerWidth" is set to one of "xs, sm, md, lg, xl", the content of the bar ' +
          "uses the corresponding width set in the theme.",
      },
    },
  },
};
