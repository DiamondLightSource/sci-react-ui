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
import { LoginIcon, LogoutIcon, UserIcon } from "../DataDisplay/Icons";

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
            color="inherit"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {avatar || (
                <Avatar
                  alt={`${user.name} avatar`}
                  variant="rounded"
                  sx={{
                    backgroundColor: theme.vars.palette.primary.light,
                    color: colour || "textPrimary",
                    height: 35,
                    width: 35,
                  }}
                >
                  <UserIcon size="md" />
                </Avatar>
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
            >
              {menuItems}

              {auth && (
                <MenuItem>
                  <Link
                    href={auth.getProfileUrl()}
                    underline="none"
                    color="inherit"
                  >
                    Profile
                  </Link>
                </MenuItem>
              )}

              <MenuItem onClick={handleLogout} aria-label="Logout">
                <LogoutIcon size="sm" />
                <Link sx={{ textDecoration: "none", ml: 1 }}>Logout</Link>
              </MenuItem>
            </Menu>
          )}
        </>
      ) : (
        <Button
          onClick={handleLogin}
          startIcon={<LoginIcon />}
          sx={{
            backgroundColor: theme.vars.palette.primary.light,
            color: theme.vars.palette.primary.contrastText,
          }}
        >
          Login
        </Button>
      )}
    </>
  );
};

export { User };
export type { AuthState, UserProps };
