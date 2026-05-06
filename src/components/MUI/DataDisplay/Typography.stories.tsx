import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Typography } from "../MuiWrapped";
import { colourSet } from "../../../utils/diamond";
import { TypographyProps } from "@mui/material/Typography";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const textSizes: TypographyProps["variant"][] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "caption",
  "button",
  "overline",
];

const meta: Meta<typeof Typography> = {
  title: "MUI/Data Display/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: textSizes,
    },
    color: {
      control: { type: "select" },
      options: colourSet,
    },
    align: {
      control: { type: "select" },
      options: ["inherit", "left", "center", "right", "justify"],
    },
    gutterBottom: { control: "boolean" },
    noWrap: { control: "boolean" },
    paragraph: { control: "boolean" },
    children: { name: "text", control: "text" },
    sx: { control: false },
  },
  args: {
    variant: "body1",
    color: "inherit",
    align: "inherit",
    gutterBottom: false,
    noWrap: false,
    paragraph: false,
    children:
      "The quick brown fox jumps over the lazy dog and again, the quick brown fox jumps over the lazy dog.",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Typography {...args} />,
};

export const TextSizes: Story = {
  render: (args) => (
    <Stack spacing={1}>
      {textSizes.map((textSize) => (
        <Typography key={textSize} {...args} variant={textSize}>
          {textSize}
        </Typography>
      ))}
    </Stack>
  ),
};

export const Alignment: Story = {
  render: (args) => (
    <Stack spacing={1}>
      <Typography {...args} align="left">
        Left aligned
      </Typography>
      <Typography {...args} align="center">
        Center aligned
      </Typography>
      <Typography {...args} align="right">
        Right aligned
      </Typography>
    </Stack>
  ),
};

export const Colours: Story = {
  render: (args) => (
    <Stack spacing={1}>
      {colourSet.map((colourOption) => (
        <Typography key={colourOption} {...args} color={colourOption}>
          {colourOption}
        </Typography>
      ))}
    </Stack>
  ),
};
