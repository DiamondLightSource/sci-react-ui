import {
  Typography,
  Menu,
  Button,
  useTheme,
  type MenuListProps,
  MenuItem,
  type MenuItemProps,
} from "@mui/material";
import React, { useState, forwardRef, useId } from "react";
import { ExpandMore } from "@mui/icons-material";
import { NavLink, NavLinkProps } from "./Navbar";

type NavMenuLinkProps = MenuItemProps & NavLinkProps;

const NavMenuLink = forwardRef<HTMLElement, NavMenuLinkProps>(
  function NavMenuLink({ children, ...props }: NavMenuLinkProps, ref) {
    const theme = useTheme();

    return (
      <MenuItem
        ref={ref}
        component={NavLink}
        {...props}
        sx={{
          "&:hover": {
            color: theme.palette.secondary.main,
            borderLeft: "solid 4px",
            borderBottom: "none",
          },
          "&:focus": {
            color: theme.palette.secondary.main,
            borderLeft: "solid 4px",
          },
          textDecoration: "none",
          alignItems: "center",
          display: "flex",
          borderLeft: "4px solid transparent",
          backgroundColor: { md: "none" },
          color: theme.palette.primary.contrastText,
        }}
      >
        {children}
      </MenuItem>
    );
  },
);

interface NavMenuProps extends MenuListProps {
  label: string;
}

const NavMenu = ({ label, children }: NavMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);
  const [menuWidth, setMenuWidth] = useState(0);
  const menuId = useId();

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!open) {
      setAnchorElement(e.currentTarget);
      setMenuWidth(e.currentTarget.offsetWidth);
    }
  };

  const closeMenu = () => {
    setAnchorElement(null);
  };

  const theme = useTheme();

  return (
    <>
      <Button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={(e) => openMenu(e)}
        disableFocusRipple
        sx={{
          "&:hover": {
            color: theme.palette.secondary.main,
            borderBottom: "solid 4px",
          },
          "&:focus": {
            color: theme.palette.secondary.main,
            borderBottom: "solid 4px",
          },
          backgroundColor: theme.palette.primary.main,
          transition: "none",
          alignItems: "center",
          display: "flex",
          padding: "13px 3px 0",
          borderRadius: 0,
          ...(open
            ? {
                color: theme.palette.secondary.main,
                borderBottom: "solid 4px",
              }
            : {
                color: theme.palette.primary.contrastText,
                borderBottom: "4px solid transparent",
              }),
        }}
      >
        <Typography>{label}</Typography>
        <ExpandMore
          sx={{
            transition: "transform .25s",
            transform: `rotate(${open ? -180 : 0}deg)`,
          }}
        />
      </Button>
      <Menu
        id={menuId}
        open={open}
        onClose={closeMenu}
        anchorEl={anchorElement}
        disableAutoFocusItem
        MenuListProps={{ sx: { minWidth: menuWidth } }}
        slotProps={{
          paper: { style: { backgroundColor: theme.palette.primary.light } },
        }}
      >
        {children}
      </Menu>
    </>
  );
};

export { NavMenu, NavMenuLink, type NavMenuLinkProps, type NavMenuProps };
