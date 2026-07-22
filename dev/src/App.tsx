import * as React from "react";
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BrowserRouter,
  Link as RouterLink,
  Route,
  Routes,
} from "react-router-dom";

import { ThemeProvider, DiamondDSTheme } from "../../src/index";
import type { Theme } from "@mui/material/styles";

import {
  Navbar,
  NavLinks,
  NavLink,
} from "../../src/components/navigation/Navbar";
import { ColourSchemeButton } from "../../src/components/controls/ColourSchemeButton";
import { Breadcrumbs } from "../../src/components/navigation/Breadcrumbs";
import { Bar } from "../../src/components/controls/Bar";

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
