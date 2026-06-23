import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import {
  BrowserRouter,
  Link as RouterLink,
  Route,
  Routes,
} from "react-router-dom";

import { ThemeProvider, DiamondDSTheme } from "../../src/index";
import {
  Navbar,
  NavLinks,
  NavLink,
} from "../../src/components/navigation/Navbar";
import { ColourSchemeButton } from "../../src/components/controls/ColourSchemeButton";
import { Breadcrumbs } from "../../src/components/navigation/Breadcrumbs";
import { Bar } from "../../src/components/controls/Bar";

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
    </Stack>
  );
};

const ThemePage = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Theme</Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box
          sx={(theme) => ({
            p: 2,
            minWidth: 180,
            borderRadius: 2,
            backgroundColor: theme.palette.surface.default,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.border.subtle}`,
          })}
        >
          <Typography variant="subtitle2">surface.default</Typography>
          <Typography variant="body2">border.subtle</Typography>
        </Box>

        <Box
          sx={(theme) => ({
            p: 2,
            minWidth: 180,
            borderRadius: 2,
            backgroundColor: theme.palette.surface.strong,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.border.subtle}`,
          })}
        >
          <Typography variant="subtitle2">surface.strong</Typography>
          <Typography variant="body2">text.primary</Typography>
        </Box>

        <Box
          sx={(theme) => ({
            p: 2,
            minWidth: 180,
            borderRadius: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: `1px solid ${theme.palette.primary.main}`,
          })}
        >
          <Typography variant="subtitle2">primary.main</Typography>
          <Typography variant="body2">primary.contrastText</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default App;
