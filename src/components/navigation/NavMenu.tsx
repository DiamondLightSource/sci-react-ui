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
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          borderLeft: "4px solid transparent",
          color: "inherit",

          "&:hover": {
            borderColor: "primary.onSolid",
          },

          "&.active": {
            borderColor: "primary.onSolid",
          },
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

  return (
    <>
      <Button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={openMenu}
        disableFocusRipple
        sx={{
          display: "flex",
          alignItems: "center",
          pt: 2,
          pb: 1.5,
          borderRadius: 0,
          borderBottom: "3px solid transparent",
          color: "inherit",

          "&:hover": {
            borderColor: "primary.onSolid",
          },

          ...(open && {
            borderColor: "primary.onSolid",
          }),
        }}
      >
        <Typography variant="body2">{label}</Typography>

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
              backgroundColor: "primary.solid",
              color: "primary.onSolid",
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

export { NavMenu, NavMenuLink, type NavMenuLinkProps, type NavMenuProps };
