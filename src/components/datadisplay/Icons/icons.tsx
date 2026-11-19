import { forwardRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  CircleX,
  House,
  Info,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  TriangleAlert,
  UserRound,
  X,
  type LucideIcon as LucideIconType,
} from "lucide-react";

import { LucideIcon, type LucideIconProps } from "./LucideIcon";

type IconAliasProps = Omit<LucideIconProps, "icon">;

const createIcon = (icon: LucideIconType, displayName: string) => {
  const Icon = forwardRef<SVGSVGElement, IconAliasProps>((props, ref) => (
    <LucideIcon ref={ref} icon={icon} {...props} />
  ));
  Icon.displayName = displayName;
  return Icon;
};

export const AlertTriangleIcon = /*#__PURE__*/ createIcon(
  TriangleAlert,
  "AlertTriangleIcon",
);
export const ArrowLeftIcon = /*#__PURE__*/ createIcon(
  ArrowLeft,
  "ArrowLeftIcon",
);
export const ArrowRightIcon = /*#__PURE__*/ createIcon(
  ArrowRight,
  "ArrowRightIcon",
);
export const CheckCircleIcon = /*#__PURE__*/ createIcon(
  CircleCheck,
  "CheckCircleIcon",
);
export const ChevronDownIcon = /*#__PURE__*/ createIcon(
  ChevronDown,
  "ChevronDownIcon",
);
export const ChevronLeftIcon = /*#__PURE__*/ createIcon(
  ChevronLeft,
  "ChevronLeftIcon",
);
export const ChevronRightIcon = /*#__PURE__*/ createIcon(
  ChevronRight,
  "ChevronRightIcon",
);
export const ChevronUpIcon = /*#__PURE__*/ createIcon(
  ChevronUp,
  "ChevronUpIcon",
);
export const CircleXIcon = /*#__PURE__*/ createIcon(CircleX, "CircleXIcon");
export const HomeIcon = /*#__PURE__*/ createIcon(House, "HomeIcon");
export const InfoIcon = /*#__PURE__*/ createIcon(Info, "InfoIcon");
export const LoginIcon = /*#__PURE__*/ createIcon(LogIn, "LoginIcon");
export const LogoutIcon = /*#__PURE__*/ createIcon(LogOut, "LogoutIcon");
export const MenuIcon = /*#__PURE__*/ createIcon(Menu, "MenuIcon");
export const MoonIcon = /*#__PURE__*/ createIcon(Moon, "MoonIcon");
export const PlusIcon = /*#__PURE__*/ createIcon(Plus, "PlusIcon");
export const SearchIcon = /*#__PURE__*/ createIcon(Search, "SearchIcon");
export const SettingsIcon = /*#__PURE__*/ createIcon(Settings, "SettingsIcon");
export const SunIcon = /*#__PURE__*/ createIcon(Sun, "SunIcon");
export const UserIcon = /*#__PURE__*/ createIcon(UserRound, "UserIcon");
export const CloseIcon = /*#__PURE__*/ createIcon(X, "CloseIcon");
