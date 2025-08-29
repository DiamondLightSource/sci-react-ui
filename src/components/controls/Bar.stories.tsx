import { Meta, StoryObj } from "@storybook/react";
import { Bar, BarProps } from "./Bar";

const meta: Meta<typeof Bar> = {
  title: "Components/Controls/Bar",
  component: Bar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Slot = ({ children }: BarProps) => (
  <div
    style={{
      color: "black",
      background: "white",
      padding: "5px 8px",
      borderRadius: "10px",
    }}
  >
    {children}
  </div>
);

export const AllSlots: Story = {
  args: {
    leftSlot: <Slot>Left Slot</Slot>,
    centreSlot: <Slot>Centre Slot</Slot>,
    rightSlot: <Slot>Right Slot</Slot>,
  },
  parameters: {
    docs: {
      description: {
        story: "Three slots are available, left, centre and right.",
      },
    },
  },
};

export const Children: Story = {
  args: {
    leftSlot: <Slot>Left Slot</Slot>,
    children: <Slot>Children</Slot>,
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

export const Width: Story = {
  args: {
    leftSlot: <Slot>|&lt;</Slot>,
    centreSlot: <Slot>Normal width</Slot>,
    rightSlot: <Slot>&gt;|</Slot>,
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
    leftSlot: <Slot>|&lt;</Slot>,
    centreSlot: <Slot>Max width</Slot>,
    rightSlot: <Slot>&gt;|</Slot>,
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
    leftSlot: <Slot>|&lt;</Slot>,
    centreSlot: <Slot>&quot;sm&quot; width</Slot>,
    rightSlot: <Slot>&gt;|</Slot>,
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

export const Styles: Story = {
  args: {
    leftSlot: (
      <p>
        <strong>Colours...</strong>
      </p>
    ),
    centreSlot: (
      <p>
        <strong>and text-size...</strong>
      </p>
    ),
    rightSlot: (
      <p>
        <strong>adjusted.</strong>
      </p>
    ),
    style: { background: "#600", color: "#0df", fontSize: "larger" },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Styles are passed through to the underlining Container with the "style" parameter.',
      },
    },
  },
};

export const Content: Story = {
  args: {
    leftSlot: <h4>My text</h4>,
    centreSlot: (
      <label>
        My input: <input placeholder={"text input"} />
      </label>
    ),
    rightSlot: <button>My Button</button>,
    style: { color: "white" },
  },
  parameters: {
    docs: {
      description: {
        story: "Bars can hold anything you want",
      },
    },
  },
};

export const Spacing: Story = {
  args: {
    style: { background: "green", height: "10px" },
  },
  parameters: {
    docs: {
      description: {
        story: "They can become spacing devices to, to add a strip of colour.",
      },
    },
  },
};
