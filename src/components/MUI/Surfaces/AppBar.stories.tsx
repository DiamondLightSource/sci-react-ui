import type { Meta, StoryObj } from "@storybook/react";
import {
  AppBar,
  Button,
  IconButton,
  MenuIcon,
  Toolbar,
  Typography,
} from "../MuiWrapped";
import {
  muiDocsParameters,
  muiDocsText,
} from "../../../../.storybook/muiDocsParameters";

const meta: Meta<typeof AppBar> = {
  title: "MUI/Surfaces/AppBar",
  component: AppBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    ...muiDocsParameters,
    docs: {
      description: {
        component: `
${muiDocsText}
Not to be confused with custom [AppTitleBar component](?path=/docs/components-controls-apptitlebar--docs)  (opens in this tab).  
`,
      },
    },
  },

  argTypes: {
    position: {
      control: "select",
      options: ["fixed", "absolute", "sticky", "static", "relative"],
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "inherit", "transparent"],
    },
    elevation: {
      control: { type: "number", min: 0, max: 24, step: 1 },
    },
    sx: { control: false },
  },
  args: {
    position: "static",
    color: "primary",
    elevation: 4,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <AppBar {...args}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Application title
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  ),
};
