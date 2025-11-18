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
  useTheme,
} from "@mui/material";
import {ReactElement, ReactNode, useState} from "react";
import {MdLogin} from "react-icons/md";

import {Auth} from "../systems/auth"

interface AuthState {
  fedid?: string;
  name?: string;
}

interface UserProps {
  user?: AuthState | null;
  onLogin?: () => void;
  onLogout?: () => void;
  avatar?: ReactNode;
  colour?: string;
  menuItems?: ReactElement<typeof MenuItem> | ReactElement<typeof MenuItem>[];
  auth?: Auth;
}

const User = ({
  user,
  onLogin,
  onLogout,
  avatar,
  colour,
  menuItems,
  auth
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
    if(auth) auth.login()
    if(onLogin) onLogin();
  };
  const handleLogout = () => {
    handleClose();
    if(auth) auth.logout()
    if(onLogout) onLogout();
  };

  const theme = useTheme();

  if( !user && auth && auth.user ) {
    user = { name: auth.user.name }
  }
  
  return (
    <>
      <Box flexGrow={1} />
      {user ? (
        <>
          <Button
            aria-label="User Avatar"
            onClick={handleClick}
            sx={{
              border: "none",
              cursor: "pointer",
              minWidth: 0,
              marginLeft: "10px !important",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <Stack direction="row" alignItems="center">
              {avatar || (
                <Avatar
                  alt={user.name + " avatar"}
                  variant="rounded"
                  sx={{
                    backgroundColor: theme.vars.palette.primary.light,
                    color: colour || "textPrimary",
                    height: 35,
                    width: 35,
                  }}
                />
              )}
              <Box
                sx={{
                  padding: "5px",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Typography
                  fontSize="0.75rem"
                  textTransform="none"
                  textAlign="left"
                  pl={"1px"}
                  color={colour || "textPrimary"}
                >
                  {user.name ? user.name : user.fedid}
                </Typography>
                {user.name && (
                  <Typography
                    fontSize="0.75rem"
                    textTransform="none"
                    textAlign="left"
                    pl={"1px"}
                    color={colour || "textPrimary"}
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
            >
              {menuItems}
              {auth && (
				        <MenuItem>
					        <Link href={auth.getProfileUrl()} sx={{ textDecoration: "none" }}>Profile</Link>
				        </MenuItem>
              )}
              <MenuItem onClick={handleLogout} aria-label="Logout">
                <Link sx={{ textDecoration: "none" }}>Logout</Link>
              </MenuItem>
            </Menu>
          )}
        </>
      ) : (
        <Button
          onClick={handleLogin}
          startIcon={<MdLogin />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
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
