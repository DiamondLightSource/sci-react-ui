import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {
  Alert,
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
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
  title: "Components/Data Display/LucideIcon",
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

const selectOptions = ["Beamline", "Sample", "Visit"];

const searchAdornment = {
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <LucideIcon icon={Search} />
      </InputAdornment>
    ),
  },
};

export const InComponents: Story = {
  render: () => (
    <Stack spacing={3}>
      {[false, true].map((disabled) => (
        <Stack key={String(disabled)} direction="row" spacing={2}>
          <Button
            variant="contained"
            disabled={disabled}
            startIcon={<LucideIcon icon={Send} />}
          >
            Send
          </Button>
          <Button
            variant="outlined"
            disabled={disabled}
            startIcon={<LucideIcon icon={Save} />}
          >
            Save
          </Button>
          <Button
            variant="text"
            disabled={disabled}
            startIcon={<LucideIcon icon={Settings} />}
          >
            Settings
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            disabled={disabled}
            startIcon={<LucideIcon icon={Star} />}
          >
            Inherit
          </Button>
          <IconButton aria-label="Delete" disabled={disabled}>
            <LucideIcon icon={Trash2} />
          </IconButton>
        </Stack>
      ))}

      {(["medium", "small"] as const).flatMap((size) =>
        [false, true].map((disabled) => (
          <Stack
            key={`${size}-${disabled}`}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Chip
              label="Delete"
              size={size}
              disabled={disabled}
              onDelete={() => undefined}
            />
            <Chip
              label="Icon"
              size={size}
              disabled={disabled}
              icon={<LucideIcon icon={Star} />}
            />
            <Chip
              label="Icon and delete"
              size={size}
              disabled={disabled}
              icon={<LucideIcon icon={Star} />}
              onDelete={() => undefined}
            />
            <Chip
              label="Primary"
              color="primary"
              size={size}
              disabled={disabled}
              icon={<LucideIcon icon={Star} />}
              onDelete={() => undefined}
            />
            <Chip
              label="Outlined"
              color="primary"
              variant="outlined"
              size={size}
              disabled={disabled}
              icon={<LucideIcon icon={Star} />}
              onDelete={() => undefined}
            />
          </Stack>
        )),
      )}

      <Stack spacing={1}>
        {(["success", "info", "warning", "error"] as const).map((severity) => (
          <Alert key={severity} severity={severity} onClose={() => undefined}>
            {severity}
          </Alert>
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        {[
          { label: "Select" },
          { label: "Read-only", readOnly: true },
          { label: "Disabled", disabled: true },
        ].map(({ label, readOnly, disabled }) => (
          <FormControl key={label} disabled={disabled} sx={{ width: 200 }}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} defaultValue="Sample" readOnly={readOnly}>
              {selectOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        {[false, true].map((disabled) => (
          <Autocomplete
            key={String(disabled)}
            disabled={disabled}
            options={selectOptions}
            defaultValue="Sample"
            renderInput={(params) => (
              <TextField {...params} label="Autocomplete" />
            )}
            sx={{ width: 200 }}
          />
        ))}
      </Stack>

      <Pagination count={10} defaultPage={5} showFirstButton showLastButton />

      <Table sx={{ width: 480 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel active direction="asc">
                Sort label
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          <TableRow>
            <TablePagination
              count={100}
              page={2}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              onPageChange={() => undefined}
              showFirstButton
              showLastButton
            />
          </TableRow>
        </tbody>
      </Table>

      <Breadcrumbs maxItems={2}>
        <Link href="#">One</Link>
        <Link href="#">Two</Link>
        <Link href="#">Three</Link>
        <Link href="#">Four</Link>
      </Breadcrumbs>

      <Tabs
        value={0}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{ width: 240 }}
      >
        {["One", "Two", "Three", "Four", "Five", "Six"].map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      <Stack direction="row" spacing={2}>
        {[false, true].map((disabled) => (
          <TextField
            key={String(disabled)}
            label="Search"
            disabled={disabled}
            slotProps={searchAdornment}
          />
        ))}
      </Stack>
    </Stack>
  ),
};
