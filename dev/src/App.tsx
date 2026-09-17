import * as React from "react";
import {
  AppBar,
  Box,
  Checkbox,
  Chip,
  Container,
  IconButton,
  Link,
  Paper,
  Stack,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Blocks as ComponentsIcon,
  Home as HomeIcon,
  Layers as LayersIcon,
  Menu as MenuIcon,
  Palette as PaletteIcon,
  Type as TypeIcon,
} from "lucide-react";
import {
  BrowserRouter,
  Link as RouterLink,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import type { MRT_ColumnDef } from "material-react-table";

import {
  ThemeProvider,
  DiamondDSTheme,
  DiamondDSIntegrations,
} from "../../src/index";
import type { Theme } from "@mui/material/styles";
import type { TypographyProps } from "@mui/material/Typography";

import {
  SidebarNav,
  type Navigation,
} from "../../src/components/navigation/SidebarNav";
import { ColourSchemeButton } from "../../src/components/controls/ColourSchemeButton";
import { Breadcrumbs } from "../../src/components/navigation/Breadcrumbs";
import { Bar } from "../../src/components/controls/Bar";
import { Logo } from "../../src/components/controls/Logo";

/* TABLE */

export const SimpleMuiTableExample = () => {
  const [selected, setSelected] = React.useState<string[]>(["EXP-1003"]);

  const isSelected = (id: string) => selected.includes(id);

  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? data.map((row) => row.id) : []);
  };

  const allSelected = selected.length === data.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small" aria-label="Simple MUI table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={someSelected}
                checked={allSelected}
                onChange={handleToggleAll}
                inputProps={{ "aria-label": "select all rows" }}
              />
            </TableCell>
            <TableCell>Experiment ID</TableCell>
            <TableCell>Scientist</TableCell>
            <TableCell>Beamline</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Energy</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} hover selected={isSelected(row.id)}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected(row.id)}
                  onChange={() => handleToggle(row.id)}
                  inputProps={{ "aria-label": `select row ${row.id}` }}
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.scientist}</TableCell>
              <TableCell>{row.beamline}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={row.status}
                  color={statusColour[row.status]}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">{row.energy.toFixed(1)} keV</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/* MATERIAL REACT TABLE - mid-level (per-table) overrides */

export const MidLevelMrtExample = () => {
  const table = useMaterialReactTable({
    columns: mrtColumns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    initialState: { rowSelection: { "EXP-1003": true } },
    mrtTheme: DiamondDSIntegrations.mrtTheme,
    ...DiamondDSIntegrations.mrtOptions(),
  });

  return <MaterialReactTable table={table} />;
};

const mrtColumns: MRT_ColumnDef<Experiment>[] = [
  { accessorKey: "id", header: "Experiment ID" },
  { accessorKey: "scientist", header: "Scientist" },
  { accessorKey: "beamline", header: "Beamline" },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ cell }) => {
      const status = cell.getValue() as ExperimentStatus;
      return (
        <Chip
          size="small"
          label={status}
          color={statusColour[status]}
          variant="outlined"
        />
      );
    },
  },
  {
    accessorKey: "energy",
    header: "Energy",
    Cell: ({ cell }) => `${cell.getValue<number>().toFixed(1)} keV`,
  },
];

type Experiment = {
  id: string;
  scientist: string;
  beamline: string;
  status: ExperimentStatus;
  energy: number;
};

const data: Experiment[] = [
  {
    id: "EXP-1001",
    scientist: "Ada Lovelace",
    beamline: "I24",
    status: "Running",
    energy: 12.4,
  },
  {
    id: "EXP-1002",
    scientist: "Alan Turing",
    beamline: "I03",
    status: "Queued",
    energy: 9.8,
  },
  {
    id: "EXP-1003",
    scientist: "Grace Hopper",
    beamline: "B24",
    status: "Completed",
    energy: 7.2,
  },
  {
    id: "EXP-1004",
    scientist: "Dorothy Vaughan",
    beamline: "I24",
    status: "Failed",
    energy: 13.1,
  },
  {
    id: "EXP-1005",
    scientist: "Katherine Johnson",
    beamline: "DIAD",
    status: "Paused",
    energy: 15.7,
  },
];

type ExperimentStatus =
  | "Running"
  | "Queued"
  | "Completed"
  | "Failed"
  | "Paused";

const statusColour: Record<
  ExperimentStatus,
  "success" | "info" | "default" | "error" | "warning"
> = {
  Running: "success",
  Queued: "info",
  Completed: "default",
  Failed: "error",
  Paused: "warning",
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={DiamondDSTheme}>
        <AppLayout />
      </ThemeProvider>
    </BrowserRouter>
  );
};

const navigation: Navigation = [
  {
    navItems: [
      {
        label: "Home",
        icon: <HomeIcon />,
        linkProps: { to: "/", component: NavLink },
      },
      {
        label: "Components",
        icon: <ComponentsIcon />,
        linkProps: { to: "/components", component: NavLink },
      },
      {
        label: "Colours",
        icon: <PaletteIcon />,
        linkProps: { to: "/colours", component: NavLink },
      },
      {
        label: "Typography",
        icon: <TypeIcon />,
        linkProps: { to: "/typography", component: NavLink },
      },
      {
        label: "Elevation",
        icon: <LayersIcon />,
        linkProps: { to: "/elevation", component: NavLink },
      },
    ],
  },
];

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            aria-label={
              sidebarOpen ? "Collapse navigation" : "Expand navigation"
            }
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            component={RouterLink}
            to="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Logo />
          </Link>
          <Box sx={{ ml: "auto" }}>
            <ColourSchemeButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        <SidebarNav
          navigation={navigation}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Toolbar />
          <Container sx={{ py: 4 }}>
            <Stack spacing={3}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/components" element={<ComponentsPage />} />
                <Route path="/colours" element={<ColoursPage />} />
                <Route path="/elevation" element={<ElevationPage />} />
                <Route path="/typography" element={<TypographyPage />} />
              </Routes>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

const HomePage = () => {
  return (
    <Stack spacing={3}>
      <Bar surface="surface" variant="container" sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h6">SciReactUI playground</Typography>
          <Typography variant="body2" color="text.secondary">
            Use this app to validate theming SciReactUI components in a
            downstream-like environment.
          </Typography>
        </Stack>
      </Bar>
    </Stack>
  );
};

const ComponentsPage = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Components</Typography>

      <Box>
        <Typography variant="h6" gutterBottom>
          Breadcrumbs
        </Typography>
        <Breadcrumbs
          path="/components/navigation/breadcrumbs"
          linkComponent={RouterLink}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Bar: slots
        </Typography>
        <Stack spacing={2}>
          <Bar
            surface="surface"
            variant="container"
            leftSlot={<Typography>Left</Typography>}
            centreSlot={<Typography>Centre</Typography>}
            rightSlot={<Typography>Right</Typography>}
          />
          <Bar
            surface="surface"
            variant="container"
            leftSlot={<Typography>Left</Typography>}
          >
            <Typography>Children</Typography>
          </Bar>
        </Stack>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Table - Simple Table
        </Typography>
        <SimpleMuiTableExample />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Table - Material React Table (mid-level overrides)
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Uses <code>DiamondDSIntegrations.mrtTheme</code> and{" "}
          <code>mrtOptions()</code> for per-table DS styling.
        </Typography>
        <MidLevelMrtExample />
      </Box>
    </Stack>
  );
};

type IntentGroup = {
  key: string;
  label: string;
  getPalette: (theme: Theme) => Record<string, string> | undefined;
  /** `theme.palette` path for this group, e.g. "primary". Omit when the group isn't a real MUI role. */
  muiPath?: string;
  /** Raw `--ds-*` variable name per row key, for groups with no MUI path — shows the actual token instead of an MUI-shaped label that doesn't exist yet. */
  cssVarNames?: Record<string, string>;
};

// Order matches Foundations/Theme Colours: primary, secondary, info, danger, warning, success.
const intentGroups: IntentGroup[] = [
  {
    key: "primary",
    label: "Primary",
    muiPath: "primary",
    getPalette: (theme) => theme.vars?.palette.primary ?? theme.palette.primary,
  },
  {
    key: "secondary",
    label: "Secondary",
    muiPath: "secondary",
    getPalette: (theme) =>
      theme.vars?.palette.secondary ?? theme.palette.secondary,
  },
  {
    key: "info",
    label: "Info",
    muiPath: "info",
    getPalette: (theme) => theme.vars?.palette.info ?? theme.palette.info,
  },
  {
    key: "error",
    label: "Danger",
    muiPath: "error",
    getPalette: (theme) => theme.vars?.palette.error ?? theme.palette.error,
  },
  {
    key: "warning",
    label: "Warning",
    muiPath: "warning",
    getPalette: (theme) => theme.vars?.palette.warning ?? theme.palette.warning,
  },
  {
    key: "success",
    label: "Success",
    muiPath: "success",
    getPalette: (theme) => theme.vars?.palette.success ?? theme.palette.success,
  },
];

/**
 * Builds the row -> `--ds-*` variable name map for a CSS-var-only token
 * family (no MUI palette role exists for it yet).
 */
const cssVarTokenNames = (prefix: string): Record<string, string> => ({
  main: `--ds-${prefix}`,
  contrastText: `--ds-on-${prefix}`,
  dark: `--ds-${prefix}-emphasis`,
  light: `--ds-${prefix}-accent`,
  container: `--ds-${prefix}-container`,
  onContainer: `--ds-on-${prefix}-container`,
  solid: `--ds-${prefix}-solid`,
  onSolid: `--ds-on-${prefix}-solid`,
});

/**
 * Brand is a full MUI palette role. Tertiary and Highlight are token
 * families available as CSS variables only (not exposed as MUI intents),
 * so their swatches read straight from `var(--ds-*)` instead of `theme.palette`,
 * and their captions show the raw variable name rather than an MUI-shaped
 * path that doesn't exist yet.
 */
const coreBrandGroups: IntentGroup[] = [
  {
    key: "brand",
    label: "Brand",
    muiPath: "brand",
    getPalette: (theme) => theme.vars?.palette.brand ?? theme.palette.brand,
  },
  {
    key: "tertiary",
    label: "Tertiary",
    cssVarNames: cssVarTokenNames("tertiary"),
    getPalette: () =>
      Object.fromEntries(
        Object.entries(cssVarTokenNames("tertiary")).map(([token, name]) => [
          token,
          `var(${name})`,
        ]),
      ),
  },
  {
    key: "highlight",
    label: "Highlight",
    cssVarNames: cssVarTokenNames("highlight"),
    getPalette: () =>
      Object.fromEntries(
        Object.entries(cssVarTokenNames("highlight")).map(([token, name]) => [
          token,
          `var(${name})`,
        ]),
      ),
  },
];

const intentRows = [
  { bg: "main", fg: "contrastText", label: "" },
  { bg: "dark", fg: "contrastText", label: "Emphasis" },
  { bg: "light", fg: "contrastText", label: "Accent" },
  { bg: "container", fg: "onContainer", label: "Container" },
  { bg: "onContainer", fg: "container", label: "On Container" },
  { bg: "solid", fg: "onSolid", label: "Solid" },
  { bg: "onSolid", fg: "solid", label: "On Solid" },
  { bg: "fixed", fg: "onFixed", label: "Fixed" },
  { bg: "fixedDim", fg: "onFixed", label: "Fixed Dim" },
  { bg: "onFixed", fg: "fixed", label: "On Fixed" },
];

const getPaletteValue = (theme: Theme, path: string): string | undefined => {
  const value = path.split(".").reduce<unknown>((obj, key) => {
    if (obj && typeof obj === "object") {
      return (obj as Record<string, unknown>)[key];
    }
    return undefined;
  }, theme.palette);

  return typeof value === "string" ? value : undefined;
};

type ColourRowProps = {
  label: string;
  background: string;
  foreground: string;
};

const ColourRow = ({ label, background, foreground }: ColourRowProps) => (
  <Box
    sx={(theme) => ({
      px: 1.25,
      py: 1,
      minHeight: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: getPaletteValue(theme, background),
      color: getPaletteValue(theme, foreground),
    })}
  >
    <Typography variant="body2">{label}</Typography>

    <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
      {background}
    </Typography>
  </Box>
);

const IntentGroupGrid = ({ groups }: { groups: IntentGroup[] }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
      gap: 2,
    }}
  >
    {groups.map((group) => (
      <Stack key={group.key}>
        {intentRows.map((row) => (
          <Box
            key={`${group.key}-${row.bg}`}
            sx={(theme) => {
              const palette = group.getPalette(theme);

              if (!palette?.[row.bg] || !palette?.[row.fg]) {
                return { display: "none" };
              }

              return {
                px: 1.25,
                py: 1,
                minHeight: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                backgroundColor: palette[row.bg],
                color: palette[row.fg],
              };
            }}
          >
            <Typography variant="body2">
              {row.label ? `${group.label} ${row.label}` : group.label}
            </Typography>

            <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
              {group.cssVarNames?.[row.bg] ??
                (group.muiPath ? `${group.muiPath}.${row.bg}` : row.bg)}
            </Typography>
          </Box>
        ))}
      </Stack>
    ))}
  </Box>
);

const ColoursPage = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Colours</Typography>

      <Box
        sx={(theme) => ({
          p: 2,
          backgroundColor: theme.palette.surface.subtle,
        })}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Intent colours
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Exposed as MUI palette roles (e.g.{" "}
              <code>theme.palette.primary.main</code>).
            </Typography>
            <IntentGroupGrid groups={intentGroups} />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Core brand colours
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <code>Brand</code> is exposed as a MUI palette role.{" "}
              <code>Tertiary</code> and <code>Highlight</code> are token
              families available as CSS variables, but are not currently exposed
              as MUI palette roles.
            </Typography>
            <IntentGroupGrid groups={coreBrandGroups} />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Neutral colours
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 2,
              }}
            >
              <Stack spacing={1}>
                <ColourRow
                  label="Background"
                  background="background.default"
                  foreground="text.primary"
                />
                <ColourRow
                  label="Surface"
                  background="background.paper"
                  foreground="text.primary"
                />
                <ColourRow
                  label="Surface Container"
                  background="surface.subtle"
                  foreground="text.primary"
                />
                <ColourRow
                  label="Surface Container High"
                  background="surface.strong"
                  foreground="text.primary"
                />
                <ColourRow
                  label="Surface Disabled"
                  background="action.disabledBackground"
                  foreground="text.disabled"
                />
              </Stack>

              <Stack spacing={1}>
                <ColourRow
                  label="On Surface"
                  background="text.primary"
                  foreground="background.paper"
                />
                <ColourRow
                  label="On Surface Variant"
                  background="text.secondary"
                  foreground="background.paper"
                />
                <ColourRow
                  label="On Surface Subtle"
                  background="text.tertiary"
                  foreground="background.paper"
                />
                <ColourRow
                  label="On Surface Muted"
                  background="text.muted"
                  foreground="background.paper"
                />
                <ColourRow
                  label="On Surface Disabled"
                  background="text.disabled"
                  foreground="background.paper"
                />
              </Stack>

              <Stack spacing={1}>
                <ColourRow
                  label="Placeholder"
                  background="text.placeholder"
                  foreground="background.paper"
                />
                <ColourRow
                  label="Placeholder Focus"
                  background="text.placeholderFocus"
                  foreground="background.paper"
                />
                <ColourRow
                  label="On Solid"
                  background="text.onSolid"
                  foreground="text.primary"
                />
                <ColourRow
                  label="Border Subtle"
                  background="border.subtle"
                  foreground="text.primary"
                />
                <ColourRow
                  label="Border Emphasis"
                  background="border.emphasis"
                  foreground="text.primary"
                />
                <ColourRow
                  label="Border Strong"
                  background="border.strong"
                  foreground="background.paper"
                />
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

const elevationLevels = Array.from({ length: 25 }, (_, level) => level);

const shadowExamples = [
  { label: "Dropdown / Menu / Select", level: 8 },
  { label: "Autocomplete listbox", level: 8 },
  { label: "Card (raised)", level: 8 },
  { label: "Temporary Drawer", level: 16 },
  { label: "Modal / Dialog", level: 24 },
];

type ColourLayer = {
  label: string;
  /** A `theme.palette` dot-path, or a resolver for tokens that aren't plain strings (e.g. `surface.elevated`). */
  bg: string | ((theme: Theme) => string);
  /** Mono caption text. Defaults to `bg` when it's a path string. */
  tokenLabel?: string;
  fg: string;
};

const baseColourLayers: ColourLayer[] = [
  { label: "Background", bg: "background.default", fg: "text.primary" },
  { label: "Surface", bg: "background.paper", fg: "text.primary" },
  { label: "Surface subtle", bg: "surface.subtle", fg: "text.primary" },
  {
    label: "Elevated surface",
    bg: (theme) => theme.palette.surface.elevated(4),
    tokenLabel: "surface.elevated(4)",
    fg: "text.primary",
  },
];

const buildIntentLayers = (
  title: string,
  intent: "primary" | "error",
): ColourLayer[] => [
  ...baseColourLayers,
  {
    label: `${title} container`,
    bg: `${intent}.container`,
    fg: `${intent}.onContainer`,
  },
  { label: `${title} solid`, bg: `${intent}.solid`, fg: `${intent}.onSolid` },
];

const layeringChains = [
  {
    key: "primary",
    title: "Primary",
    layers: buildIntentLayers("Primary", "primary"),
  },
  {
    key: "error",
    title: "Danger",
    layers: buildIntentLayers("Danger", "error"),
  },
];

const resolveLayerBg = (theme: Theme, bg: ColourLayer["bg"]) =>
  typeof bg === "function" ? bg(theme) : getPaletteValue(theme, bg);

/** Nests each colour token inside the previous one, to show how surfaces stack in real layouts. */
const ColourLayers = ({ layers }: { layers: ColourLayer[] }) => {
  const [layer, ...rest] = layers;
  if (!layer) return null;

  return (
    <Box
      sx={(theme) => ({
        p: 3,
        borderRadius: 2,
        backgroundColor: resolveLayerBg(theme, layer.bg),
        color: getPaletteValue(theme, layer.fg),
      })}
    >
      <Stack spacing={1}>
        <Typography variant="body2">{layer.label}</Typography>
        <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
          {layer.tokenLabel ?? (typeof layer.bg === "string" ? layer.bg : "")}
        </Typography>
        {rest.length > 0 && <ColourLayers layers={rest} />}
      </Stack>
    </Box>
  );
};

const ElevationPage = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Elevation</Typography>
      <Typography variant="body2" color="text.secondary">
        MUI&apos;s <code>Paper</code> <code>elevation</code> prop (0-24) picks
        up DiamondDS&apos;s tonal surface tint plus box-shadow. Toggle
        light/dark mode to see the tokens respond.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
          gap: 2,
        }}
      >
        {elevationLevels.map((level) => (
          <Paper
            key={level}
            elevation={level}
            sx={{
              height: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            <Typography variant="body2">{level}</Typography>
          </Paper>
        ))}
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Layering
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Surfaces are meant to nest: each token sits on top of the one before
          it, from the page background up to a solid, high-emphasis surface. The
          elevated step reuses the same <code>surface.elevated()</code> token as
          the swatches above.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
          }}
        >
          {layeringChains.map((chain) => (
            <Box key={chain.key}>
              <Typography variant="subtitle2" gutterBottom>
                {chain.title}
              </Typography>
              <ColourLayers layers={chain.layers} />
            </Box>
          ))}
        </Box>

        <Typography variant="subtitle2" sx={{ mt: 3 }} gutterBottom>
          Composed: elevated + Danger container
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          A <code>Paper</code> with both <code>elevation</code> and a custom{" "}
          <code>backgroundColor</code>.
        </Typography>
        <Paper
          elevation={8}
          sx={(theme) => ({
            p: 2,
            borderRadius: 2,
            maxWidth: 220,
            backgroundColor: theme.palette.error.container,
            color: theme.palette.error.onContainer,
          })}
        >
          <Stack spacing={1}>
            <Typography variant="body2">Danger container</Typography>
            <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
              elevation=8 · error.container
            </Typography>
          </Stack>
        </Paper>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Shadow-restoring components
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          A handful of components explicitly restore{" "}
          <code>var(--Paper-shadow)</code> on top of the tonal default, since
          they need to visually float above the page.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 2,
          }}
        >
          {shadowExamples.map((example) => (
            <Paper
              key={example.label}
              elevation={example.level}
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: "var(--Paper-shadow)",
              }}
            >
              <Stack spacing={1}>
                <Typography variant="body2">{example.label}</Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontFamily: "monospace" }}
                >
                  elevation={example.level}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

type TypographySample = {
  variant: NonNullable<TypographyProps["variant"]>;
  sample: string;
};

type TypographySection = {
  title: string;
  variants: TypographySample[];
};

const typographySections: TypographySection[] = [
  {
    title: "Display",
    variants: [
      { variant: "h1Display", sample: "Display H1" },
      { variant: "h2Display", sample: "Display H2" },
      { variant: "h3Display", sample: "Display H3" },
      { variant: "h4Display", sample: "Display H4" },
    ],
  },
  {
    title: "Headings",
    variants: [
      { variant: "h1", sample: "Heading H1" },
      { variant: "h2", sample: "Heading H2" },
      { variant: "h3", sample: "Heading H3" },
      { variant: "h4", sample: "Heading H4" },
      { variant: "h5", sample: "Heading H5" },
      { variant: "h6", sample: "Heading H6" },
    ],
  },
  {
    title: "Body",
    variants: [
      { variant: "lead", sample: "Lead paragraph text" },
      { variant: "body1", sample: "Body 1 paragraph text" },
      { variant: "body2", sample: "Body 2 paragraph text" },
    ],
  },
  {
    title: "Subtitle",
    variants: [
      { variant: "subtitle1", sample: "Subtitle 1" },
      { variant: "subtitle2", sample: "Subtitle 2" },
    ],
  },
  {
    title: "Overline & caption",
    variants: [
      { variant: "overline", sample: "Overline" },
      { variant: "overlineSmall", sample: "Overline small" },
      { variant: "caption", sample: "Caption text" },
      { variant: "meta", sample: "Meta text" },
    ],
  },
  {
    title: "Monospace",
    variants: [
      { variant: "mono1", sample: "Mono 1: const x = 1;" },
      { variant: "mono2", sample: "Mono 2: const x = 1;" },
      { variant: "mono3", sample: "Mono 3: const x = 1;" },
    ],
  },
  {
    title: "Other",
    variants: [{ variant: "button", sample: "Button label" }],
  },
];

const TypographyRow = ({ variant, sample }: TypographySample) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 2,
      py: 1,
      borderBottom: "1px solid",
      borderColor: "divider",
    }}
  >
    <Typography variant={variant}>{sample}</Typography>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ fontFamily: "monospace", flexShrink: 0 }}
    >
      {variant}
    </Typography>
  </Box>
);

const TypographyPage = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Typography</Typography>
      <Typography variant="body2" color="text.secondary">
        DiamondDS&apos;s type scale, driven by <code>--ds-type-*</code> and{" "}
        <code>--ds-font-*</code> tokens.
      </Typography>

      <Stack spacing={4}>
        {typographySections.map((section) => (
          <Box key={section.title}>
            <Typography variant="overline" color="text.secondary" gutterBottom>
              {section.title}
            </Typography>
            <Stack>
              {section.variants.map((item) => (
                <TypographyRow key={item.variant} {...item} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default App;
