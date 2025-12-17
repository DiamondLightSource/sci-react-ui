import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import InfoIcon from "@mui/icons-material/Info";

const iconMap = {
  home: <HomeIcon />,
  favorite: <FavoriteIcon />,
  search: <SearchIcon />,
  settings: <SettingsIcon />,
  add: <AddIcon />,
  edit: <EditIcon />,
  delete: <DeleteIcon />,
  send: <SendIcon />,
  save: <SaveIcon />,
  info: <InfoIcon />,
} as const;

export type MaterialIconsProps = {
  name: keyof typeof iconMap;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "action"
    | "disabled"
    | "error"
    | "info"
    | "success"
    | "warning";
  fontSize?: "inherit" | "small" | "medium" | "large";
};

export const MaterialIcons = React.forwardRef<
  SVGSVGElement,
  MaterialIconsProps
>(({ name, color = "inherit", fontSize = "medium" }, ref) => {
  const el = iconMap[name];
  return React.cloneElement(el, { color, fontSize, ref });
});

MaterialIcons.displayName = "MaterialIcons";
