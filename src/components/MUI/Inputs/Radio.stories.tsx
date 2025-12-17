import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

type RArgs = React.ComponentProps<typeof Radio>;

const meta: Meta<RArgs> = {
  title: "MUI/Inputs/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
      ],
    },
    size: { control: "select", options: ["small", "medium"] },
    disabled: { control: "boolean" },
    checked: { control: false },
    onChange: { control: false },
  },
  args: {
    color: "primary",
    size: "medium",
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<RArgs>;

export const Basic: Story = { render: (args) => <Radio {...args} /> };

export const GroupControlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("a");
    return (
      <RadioGroup
        value={value}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
        row
      >
        <FormControlLabel
          value="a"
          control={<Radio {...args} />}
          label="Option A"
        />
        <FormControlLabel
          value="b"
          control={<Radio {...args} />}
          label="Option B"
        />
        <FormControlLabel
          value="c"
          control={<Radio {...args} />}
          label="Option C"
        />
      </RadioGroup>
    );
  },
};
