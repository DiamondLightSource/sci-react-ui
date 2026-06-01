import {
  Typography,
  Menu,
  Button,
  type MenuListProps,
  MenuItem,
  type MenuItemProps,
} from "@mui/material";
import React, { useState, forwardRef, useId } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink, NavLinkProps } from "./Navbar";

type NavMenuLinkProps = MenuItemProps & NavLinkProps;

const NavMenuContext = React.createContext({ close: () => {} });

const NavMenuLink = forwardRef<HTMLElement, NavMenuLinkProps>(
  function NavMenuLink({ children, ...props }, ref) {
    const { close } = React.useContext(NavMenuContext);

    return (
      <MenuItem
        ref={ref}
        component={NavLink}
        onClick={close}
        {...props}
        sx={{
          "&:hover": {
            borderLeft: "4px solid currentColor",
            backgroundColor: (theme) => theme.palette.action.hover,
          },
          "&:focus": {
            borderLeft: "4px solid currentColor",
            backgroundColor: (theme) => theme.palette.action.hover,
          },
          display: "flex",
          alignItems: "center",
          borderLeft: "4px solid transparent",
          color: "inherit",
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

  const closeMenu = () => setAnchorElement(null);

  return (
    <>
      <Button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={openMenu}
        disableFocusRipple
        sx={{
          color: "inherit",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 1,
          borderRadius: 0,

          borderBottom: "4px solid transparent",

          "&:hover": {
            borderBottomColor: "currentColor",
            backgroundColor: (theme) => theme.palette.action.hover,
          },

          "&:focus": {
            borderBottomColor: "currentColor",
            backgroundColor: (theme) => theme.palette.action.hover,
          },

          ...(open && {
            borderBottomColor: "currentColor",
          }),
        }}
      >
        <Typography>{label}</Typography>

        <ExpandMoreIcon
          sx={{
            ml: 0.5,
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
          paper: {
            sx: {
              backgroundColor: (theme) =>
                theme.palette.primary.solid ?? theme.palette.primary.main,

              color: (theme) =>
                theme.palette.primary.onSolid ??
                theme.palette.primary.contrastText,
            },
          },
        }}
      >
        <NavMenuContext.Provider value={{ close: closeMenu }}>
          {children}
        </NavMenuContext.Provider>
      </Menu>
    </>
  );
};

export { NavMenu, NavMenuLink };
export type { NavMenuLinkProps, NavMenuProps };
