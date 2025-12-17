import type { Meta, StoryObj } from "@storybook/react";
import { ImageList } from "./ImageList";

import diamond from "../../../public/images/diamond.jpg";
import bessy from "../../../public/images/bessy.jpg";
import soleil from "../../../public/images/soleil.jpg";
import shanghai from "../../../public/images/shanghai.jpg";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageListItem from "@mui/material/ImageListItem";

const items = [
  {
    img: shanghai,
    title: "Shanghai",
  },
  {
    img: diamond,
    title: "Diamond",
  },
  {
    img: soleil,
    title: "Soleil",
  },
  {
    img: bessy,
    title: "Bessy",
  },
];

const meta: Meta<typeof ImageList> = {
  title: "MUI/Layout/ImageList",
  component: ImageList,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    cols: { control: { type: "number", min: 1, max: 6, step: 1 } },
    rowHeight: { control: { type: "number", min: 80, max: 400, step: 10 } },
    gap: { control: { type: "number", min: 0, max: 32, step: 1 } },
    variant: {
      control: "select",
      options: ["masonry", "quilted", "standard", "woven"],
    },
  },
  args: { cols: 3, rowHeight: 164, gap: 8, variant: "standard" },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <ImageList {...args}>
      {items.map((it) => (
        <ImageListItem key={it.img}>
          <img
            src={`${it.img}?w=248&fit=crop&auto=format`}
            alt={it.title}
            loading="lazy"
          />
          <ImageListItemBar title={it.title} />
        </ImageListItem>
      ))}
    </ImageList>
  ),
};

export const Masonry: Story = {
  args: { variant: "masonry", cols: 3, gap: 8 },
  render: (args) => (
    <ImageList {...args}>
      {items.map((it) => (
        <ImageListItem key={it.img}>
          <img
            src={`${it.img}?w=248&fit=crop&auto=format`}
            alt={it.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
};
