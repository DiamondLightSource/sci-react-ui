import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  LinearProgress,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  BrowserRouter,
  Link as RouterLink,
  Route,
  Routes,
} from "react-router-dom";

import {
  ThemeProvider,
  DiamondDSIntegrations,
  DiamondDSTheme,
} from "../../src/index";
import type { Theme } from "@mui/material/styles";

import {
  Navbar,
  NavLinks,
  NavLink,
} from "../../src/components/navigation/Navbar";
import { ColourSchemeButton } from "../../src/components/controls/ColourSchemeButton";
import { Breadcrumbs } from "../../src/components/navigation/Breadcrumbs";
import { Bar } from "../../src/components/controls/Bar";

import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";

// import { useTheme } from "@mui/material/styles";

/* TABLE */

export const SimpleMuiTableExample = () => (
  <TableContainer component={Paper} elevation={0}>
    <Table size="small" aria-label="Simple MUI table">
      <TableHead>
        <TableRow>
          <TableCell>Experiment ID</TableCell>
          <TableCell>Scientist</TableCell>
          <TableCell>Beamline</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align="right">Energy</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id} hover>
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

/* MRT TABLE */

type ExperimentStatus =
  | "Running"
  | "Queued"
  | "Completed"
  | "Failed"
  | "Paused";

type Experiment = {
  id: string;
  scientist: string;
  beamline: string;
  proposal: string;
  sample: string;
  status: ExperimentStatus;
  priority: "Low" | "Medium" | "High" | "Critical";
  progress: number;
  energy: number;
  temperature: number;
  updated: string;
};

const data: Experiment[] = [
  {
    id: "EXP-1001",
    scientist: "Ada Lovelace",
    beamline: "I24",
    proposal: "MX-28451",
    sample: "Protein crystal sample",
    status: "Running",
    priority: "High",
    progress: 72,
    energy: 12.4,
    temperature: 100,
    updated: "2026-06-30 09:14",
  },
  {
    id: "EXP-1002",
    scientist: "Alan Turing",
    beamline: "I03",
    proposal: "MX-28452",
    sample: "Beamline calibration",
    status: "Queued",
    priority: "Medium",
    progress: 18,
    energy: 9.8,
    temperature: 120,
    updated: "2026-06-30 09:32",
  },
  {
    id: "EXP-1003",
    scientist: "Grace Hopper",
    beamline: "B24",
    proposal: "BIO-78121",
    sample: "Cell imaging sample",
    status: "Completed",
    priority: "Low",
    progress: 100,
    energy: 7.2,
    temperature: 295,
    updated: "2026-06-30 10:05",
  },
  {
    id: "EXP-1004",
    scientist: "Dorothy Vaughan",
    beamline: "I24",
    proposal: "MX-28453",
    sample: "Sample holder test",
    status: "Failed",
    priority: "Critical",
    progress: 44,
    energy: 13.1,
    temperature: 90,
    updated: "2026-06-30 10:22",
  },
  {
    id: "EXP-1005",
    scientist: "Katherine Johnson",
    beamline: "DIAD",
    proposal: "ENG-55291",
    sample: "Detector alignment",
    status: "Paused",
    priority: "High",
    progress: 51,
    energy: 15.7,
    temperature: 180,
    updated: "2026-06-30 10:48",
  },
];

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

const useExperimentColumns = () =>
  React.useMemo<MRT_ColumnDef<Experiment>[]>(
    () => [
      { accessorKey: "id", header: "Experiment ID", size: 130 },
      { accessorKey: "scientist", header: "Scientist", size: 180 },
      { accessorKey: "beamline", header: "Beamline", size: 120 },
      { accessorKey: "proposal", header: "Proposal", size: 130 },
      { accessorKey: "sample", header: "Sample", size: 220 },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const value = cell.getValue<ExperimentStatus>();

          return (
            <Chip
              size="small"
              label={value}
              color={statusColour[value]}
              variant="outlined"
            />
          );
        },
      },
      {
        accessorKey: "priority",
        header: "Priority",
        Cell: ({ cell }) => (
          <Chip size="small" label={cell.getValue<string>()} variant="filled" />
        ),
      },
      {
        accessorKey: "progress",
        header: "Progress",
        Cell: ({ cell }) => {
          const value = cell.getValue<number>();

          return (
            <Box sx={{ minWidth: 120 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LinearProgress
                  variant="determinate"
                  value={value}
                  sx={{ flex: 1 }}
                />
                <Typography variant="caption">{value}%</Typography>
              </Stack>
            </Box>
          );
        },
      },
      {
        accessorKey: "energy",
        header: "Energy",
        Cell: ({ cell }) => `${cell.getValue<number>().toFixed(1)} keV`,
      },
      {
        accessorKey: "temperature",
        header: "Temp",
        Cell: ({ cell }) => `${cell.getValue<number>()} K`,
      },
      { accessorKey: "updated", header: "Last updated", size: 170 },
    ],
    [],
  );

export const SimpleMRTExample = () => {
  const columns = useExperimentColumns();

  const table = useMaterialReactTable({
    columns,
    data,

    ...DiamondDSIntegrations.mrtOptions(),
    mrtTheme: DiamondDSIntegrations.mrt(),

    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,

    muiTableBodyRowProps: {
      hover: false,
    },
  });

  return <MaterialReactTable table={table} />;
};

export const AdvancedMRTExample = () => {
  const columns = useExperimentColumns();

  const table = useMaterialReactTable({
    columns,
    data,

    ...DiamondDSIntegrations.mrtOptions(),
    mrtTheme: DiamondDSIntegrations.mrt(),

    enableFilterMatchHighlighting: true,
    enableGlobalFilter: true,
    positionGlobalFilter: "left",
    positionToolbarAlertBanner: "top",
    enableColumnFilters: true,
    enableColumnActions: true,
    enableSorting: true,
    enableMultiSort: true,
    enablePagination: true,
    enableRowSelection: true,
    enableRowActions: true,
    enableRowNumbers: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableColumnResizing: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableHiding: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableExpanding: true,

    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
      globalFilter: "MX",
      density: "comfortable",
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
      columnPinning: {
        left: ["mrt-row-select", "mrt-row-numbers", "id"],
        right: ["mrt-row-actions"],
      },
    },
    renderDetailPanel: ({ row }) => (
      <Box sx={{ p: 2 }}>
        {row.getIsSelected() ? (
          <Typography variant="body2">{row.original.id} selected</Typography>
        ) : (
          <>
            <Typography variant="subtitle2">Experiment notes</Typography>
            <Typography variant="body2" color="text.secondary">
              {row.original.sample} is assigned to {row.original.beamline}.
              Search for “beamline”, “sample”, or “MX” to test match highlight.
            </Typography>
          </>
        )}
      </Box>
    ),

    muiToolbarAlertBannerProps: ({ table }) => ({
      color: "inherit",
      sx: {
        backgroundColor: "var(--ds-surface-container)",
        color: "var(--ds-on-surface)",
        "& .MuiAlert-icon": {
          display: "none",
        },
      },
    }),
    renderRowActions: () => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined">
          View
        </Button>
        <Button size="small" variant="contained">
          Resume
        </Button>
      </Stack>
    ),

    renderTopToolbarCustomActions: ({ table }) => {
      const selectedCount = table.getSelectedRowModel().rows.length;

      return selectedCount > 0 ? (
        <Typography variant="body2" color="text.secondary"></Typography>
      ) : null;
    },
  });

  return <MaterialReactTable table={table} />;
};

/* APP */

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={DiamondDSTheme}>
        <AppLayout />
      </ThemeProvider>
    </BrowserRouter>
  );
};

const AppLayout = () => {
  return (
    <>
      <Navbar
        surface="brand"
        logo="theme"
        linkComponent={RouterLink}
        rightSlot={<ColourSchemeButton />}
      >
        <NavLinks>
          <NavLink linkComponent={RouterLink} to="/">
            Home
          </NavLink>
          <NavLink linkComponent={RouterLink} to="/components">
            Components
          </NavLink>
          <NavLink linkComponent={RouterLink} to="/theme">
            Theme
          </NavLink>
        </NavLinks>
      </Navbar>
      <Container sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/theme" element={<ThemePage />} />
          </Routes>
        </Stack>
      </Container>
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
          Table - Simple MRT
        </Typography>
        <SimpleMRTExample />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Table - Advanced MRT
        </Typography>
        <AdvancedMRTExample />
      </Box>
    </Stack>
  );
};

type IntentGroup = {
  key: string;
  label: string;
  getPalette: (theme: Theme) => Record<string, string> | undefined;
};

const intentGroups: IntentGroup[] = [
  {
    key: "primary",
    label: "Primary",
    getPalette: (theme) => theme.vars?.palette.primary ?? theme.palette.primary,
  },
  {
    key: "secondary",
    label: "Secondary",
    getPalette: (theme) =>
      theme.vars?.palette.secondary ?? theme.palette.secondary,
  },
  {
    key: "tertiary",
    label: "Tertiary",
    getPalette: (theme) =>
      theme.vars?.palette.tertiary ?? theme.palette.tertiary,
  },
  {
    key: "brand",
    label: "Brand",
    getPalette: (theme) => theme.vars?.palette.brand ?? theme.palette.brand,
  },
  {
    key: "error",
    label: "Danger",
    getPalette: (theme) => theme.vars?.palette.error ?? theme.palette.error,
  },
  {
    key: "warning",
    label: "Warning",
    getPalette: (theme) => theme.vars?.palette.warning ?? theme.palette.warning,
  },
  {
    key: "success",
    label: "Success",
    getPalette: (theme) => theme.vars?.palette.success ?? theme.palette.success,
  },
  {
    key: "info",
    label: "Info",
    getPalette: (theme) => theme.vars?.palette.info ?? theme.palette.info,
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

const ThemePage = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Theme</Typography>

      <Box
        sx={(theme) => ({
          p: 2,
          backgroundColor: theme.palette.surface.subtle,
        })}
      >
        <Stack spacing={3}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            {intentGroups.map((group) => (
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

                    <Typography
                      variant="caption"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {row.bg}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ))}
          </Box>
          <Box>
            <Typography variant="h6">Neutral colours</Typography>

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
                label="Surface Subtle"
                background="surface.subtle"
                foreground="text.primary"
              />

              <ColourRow
                label="Surface Strong"
                background="surface.strong"
                foreground="text.primary"
              />
            </Stack>
          </Box>
          {/* rest of surface / border sections can stay as before */}
        </Stack>
      </Box>
    </Stack>
  );
};

export default App;
