import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  Drawer,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {/* LEFT: Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Typography variant="h6">MyApp</Typography>
          </Box>

          {/* RIGHT: Desktop Login */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit">Login</Button>
          </Box>

          {/* RIGHT: Burger (mobile) */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              onClick={() => setOpen(true)}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Stack spacing={2} sx={{ p: 2, width: 250 }}>
          <Button onClick={() => setOpen(false)}>Login</Button>
        </Stack>
      </Drawer>
    </>
  );
};

export default Navbar;
