import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Radio } from "./Radio";

const meta: Meta<typeof RadioGroup> = {
  title: "MUI/Inputs/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    row: { control: "boolean" },
    name: { control: "text" },
  },
  args: { row: true, name: "choices" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="a">
      <FormControlLabel value="a" control={<Radio />} label="Option A" />
      <FormControlLabel value="b" control={<Radio />} label="Option B" />
      <FormControlLabel value="c" control={<Radio />} label="Option C" />
    </RadioGroup>
  ),
};

export const Vertical: Story = {
  args: { row: false },
  render: (args) => (
    <RadioGroup {...args} defaultValue="b">
      <FormControlLabel value="a" control={<Radio />} label="Alpha" />
      <FormControlLabel value="b" control={<Radio />} label="Beta" />
      <FormControlLabel value="c" control={<Radio />} label="Gamma" />
    </RadioGroup>
  ),
};
