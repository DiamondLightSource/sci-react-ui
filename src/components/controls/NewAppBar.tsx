import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { AppBarLogo } from "./AppBarLogo";

export interface NewAppBarProps {
  title?: string;
  variant?: "surface" | "brand";
  logo?: "theme";
  startSlot?: React.ReactNode;
  centreSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  children?: React.ReactNode;
  sx?: any;
}

const NewAppBar = ({
  title,
  variant = "surface",
  logo,
  startSlot,
  centreSlot,
  endSlot,
  children,
  sx,
  ...props
}: NewAppBarProps) => {
  const isBrand = variant === "brand";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      enableColorOnDark
      sx={[
        (theme) =>
          isBrand
            ? {
                backgroundColor: theme.palette.brand?.solid,
                color: theme.palette.brand?.onSolid,
              }
            : {
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderBottom: `1px solid ${theme.palette.divider}`,
              },
        sx,
      ]}
      {...props}
    >
      <Toolbar sx={{ display: "flex" }}>
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <AppBarLogo variant={variant} logo={logo} />

          {startSlot ??
            (title && (
              <Typography variant="h6" color="inherit">
                {title}
              </Typography>
            ))}
        </Box>

        {/* CENTRE */}
        {centreSlot && (
          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            {centreSlot}
          </Box>
        )}

        {/* RIGHT */}
        {(endSlot || children) && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {endSlot}
            {children}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NewAppBar;
