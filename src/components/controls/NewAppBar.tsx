import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Button,
  useTheme,
} from "@mui/material";
import { Logo } from "./Logo";
import { AppBarLogo } from "./AppBarLogo";

export interface LogoDef {
  src: string;
  srcInverse?: string;
  alt: string;
  width?: string;
  height?: string;
}

export interface NewAppBarProps {
  title?: string;
  variant?: "surface" | "brand";
  logo?: LogoDef | "theme";
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
  const theme = useTheme();

  const renderLogo = () => {
    if (!logo) return null;

    return (
      <Link href="/" underline="none" color="inherit">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "&:hover": { filter: "brightness(80%)" },
            mr: { xs: 0, md: "50px" },
          }}
        >
          {logo === "theme" && <Logo tone={isBrand ? "inverse" : "default"} />}
        </Box>
      </Link>
    );
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      enableColorOnDark
      sx={[
        {
          backgroundColor: isBrand
            ? theme.palette.brand?.fixed
            : theme.palette.background.paper,
          color: isBrand
            ? theme.palette.brand?.onFixed
            : theme.palette.text.primary,
          borderBottom: isBrand ? "none" : `1px solid ${theme.palette.divider}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <Toolbar sx={{ display: "flex" }}>
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <AppBarLogo variant={variant} logo={logo} />
          {startSlot ??
            (title && <Typography variant="h6">{title}</Typography>)}
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
