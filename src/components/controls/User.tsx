// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Avatar,
  Button,
  Box,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { ReactElement, ReactNode, useState } from "react";
import { MdLogin } from "react-icons/md";

import { Auth } from "../systems/auth";

interface AuthState {
  fedid?: string;
  name?: string;
}

interface UserProps {
  user?: AuthState | null;
  onLogin?: () => void;
  onLogout?: () => void;
  avatar?: ReactNode;
  menuItems?: ReactElement<typeof MenuItem> | ReactElement<typeof MenuItem>[];
  auth?: Auth;
}

const User = ({
  user,
  onLogin,
  onLogout,
  avatar,
  menuItems,
  auth,
}: UserProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    if (auth) auth.login();
    if (onLogin) onLogin();
  };
  const handleLogout = () => {
    handleClose();
    if (auth) auth.logout();
    if (onLogout) onLogout();
  };

  if (!user && auth && auth.user) {
    user = { name: auth.user.name };
  }

  return (
    <>
      <Box flexGrow={1} />
      {user ? (
        <>
          <Button
            aria-label="User Avatar"
            onClick={handleClick}
            variant="text"
            sx={{
              px: 1,
              color: "inherit",
              textTransform: "none",

              "&:hover": {
                backgroundColor: "transparent",
                opacity: 0.85,
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {avatar || (
                <Avatar
                  alt={user.name + " avatar"}
                  variant="rounded"
                  sx={(theme) => ({
                    bgcolor:
                      theme.palette.surface?.strong ??
                      theme.palette.primary.light,
                    color: theme.palette.text.primary,
                    height: 32,
                    width: 32,
                  })}
                />
              )}

              <Box>
                <Typography variant="caption" display="block" textAlign="left">
                  {user.name ? user.name : user.fedid}
                </Typography>
                {user.name && (
                  <Typography
                    variant="caption"
                    display="block"
                    textAlign="left"
                    sx={{ opacity: 0.7 }}
                  >
                    {user.fedid}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Button>

          {(onLogout || menuItems || auth) && (
            <Menu
              id="menu-list"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              autoFocus={false}
              slotProps={{
                paper: {
                  sx: (theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.divider}`,
                  }),
                },
              }}
            >
              {menuItems}

              {auth && (
                <MenuItem
                  sx={(theme) => ({
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                      color: theme.palette.text.primary,
                    },
                  })}
                >
                  <Link
                    href={auth.getProfileUrl()}
                    underline="none"
                    color="inherit"
                  >
                    Profile
                  </Link>
                </MenuItem>
              )}

              <MenuItem
                onClick={handleLogout}
                aria-label="Logout"
                sx={(theme) => ({
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.text.primary,
                  },
                })}
              >
                <Link underline="none" color="inherit">
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          )}
        </>
      ) : (
        <Button
          onClick={handleLogin}
          startIcon={<MdLogin />}
          variant="contained"
          sx={(theme) => ({
            backgroundColor:
              theme.palette.primary.solid ?? theme.palette.primary.main,
            color:
              theme.palette.primary.onSolid ??
              theme.palette.primary.contrastText,
          })}
        >
          Login
        </Button>
      )}
    </>
  );
};

export { User };
export type { AuthState, UserProps };
