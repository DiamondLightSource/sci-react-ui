import React from "react";
import { Box, Link } from "@mui/material";
import { Logo } from "./Logo";
import { LogoDef } from "./NewAppBar";

interface AppBarLogoProps {
  variant?: "surface" | "brand";
  logo?: LogoDef | "theme";
  href?: string;
}

export const AppBarLogo = ({
  variant = "surface",
  logo,
  href = "/",
}: AppBarLogoProps) => {
  if (!logo) return null;

  const isBrand = variant === "brand";

  return (
    <Link href={href} underline="none" color="inherit">
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
