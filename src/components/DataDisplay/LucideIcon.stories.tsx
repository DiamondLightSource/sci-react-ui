import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import { Plus, Save, Search, Send, Settings, Star, Trash2 } from "lucide-react";
import { LucideIcon } from "./Icons/LucideIcon";

const icons = {
  Star,
  Save,
  Plus,
  Send,
  Trash2,
  Search,
  Settings,
};

const meta: Meta<typeof LucideIcon> = {
  title: "Components/DataDisplay/LucideIcon",
  component: LucideIcon,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: {
      control: "select",
      options: [
        "inherit",
        "action",
        "disabled",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
      ],
    },
    fontSize: {
      control: "select",
      options: ["inherit", "small", "medium", "large"],
      table: {
        category: "MUI compatibility",
      },
    },
  },
  args: {
    icon: Star,
    size: "md",
    color: "inherit",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <LucideIcon icon={Star} size="xs" />
      <LucideIcon icon={Star} size="sm" />
      <LucideIcon icon={Star} size="md" />
      <LucideIcon icon={Star} size="lg" />
      <LucideIcon icon={Star} size="xl" />
    </Stack>
  ),
};

export const Colours: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <LucideIcon icon={Star} color="primary" />
      <LucideIcon icon={Star} color="secondary" />
      <LucideIcon icon={Star} color="success" />
      <LucideIcon icon={Star} color="error" />
      <LucideIcon icon={Star} color="warning" />
      <LucideIcon icon={Star} color="info" />
    </Stack>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <LucideIcon icon={Star} />
      <LucideIcon icon={Plus} />
      <LucideIcon icon={Send} />
      <LucideIcon icon={Trash2} />
      <LucideIcon icon={Search} />
      <LucideIcon icon={Settings} />
    </Stack>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <Stack spacing={1}>
      {Object.entries(icons).map(([name, icon]) => (
        <Box key={name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LucideIcon icon={icon} />
          <Typography variant="body2">{name}</Typography>
        </Box>
      ))}
    </Stack>
  ),
};
