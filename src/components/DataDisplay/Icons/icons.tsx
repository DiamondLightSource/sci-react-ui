import { forwardRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Briefcase,
  Check,
  ChartLine,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleX,
  ClipboardList,
  Copy,
  Flame,
  Folder,
  Grid3x3,
  Heart,
  History,
  House,
  Inbox,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Moon,
  Plus,
  Printer,
  RefreshCw,
  ScanQrCode,
  Save,
  Search,
  Send,
  Settings,
  SlidersHorizontal,
  Share2,
  Star,
  Sun,
  Trash2,
  UserRound,
  X,
  CircleCheck,
  TriangleAlert,
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
export const BellIcon = /*#__PURE__*/ createIcon(Bell, "BellIcon");
export const BriefcaseIcon = /*#__PURE__*/ createIcon(
  Briefcase,
  "BriefcaseIcon",
);
export const ChartIcon = /*#__PURE__*/ createIcon(ChartLine, "ChartIcon");
export const CheckIcon = /*#__PURE__*/ createIcon(Check, "CheckIcon");
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
export const ClipboardListIcon = /*#__PURE__*/ createIcon(
  ClipboardList,
  "ClipboardListIcon",
);
export const CopyIcon = /*#__PURE__*/ createIcon(Copy, "CopyIcon");
export const FlameIcon = /*#__PURE__*/ createIcon(Flame, "FlameIcon");
export const FolderIcon = /*#__PURE__*/ createIcon(Folder, "FolderIcon");
export const GridIcon = /*#__PURE__*/ createIcon(Grid3x3, "GridIcon");
export const HeartIcon = /*#__PURE__*/ createIcon(Heart, "HeartIcon");
export const HistoryIcon = /*#__PURE__*/ createIcon(History, "HistoryIcon");
export const HomeIcon = /*#__PURE__*/ createIcon(House, "HomeIcon");
export const InboxIcon = /*#__PURE__*/ createIcon(Inbox, "InboxIcon");
export const DashboardIcon = /*#__PURE__*/ createIcon(
  LayoutDashboard,
  "DashboardIcon",
);
export const InfoIcon = /*#__PURE__*/ createIcon(Info, "InfoIcon");
export const LoginIcon = /*#__PURE__*/ createIcon(LogIn, "LoginIcon");
export const LogoutIcon = /*#__PURE__*/ createIcon(LogOut, "LogoutIcon");
export const MailIcon = /*#__PURE__*/ createIcon(Mail, "MailIcon");
export const MapPinIcon = /*#__PURE__*/ createIcon(MapPin, "MapPinIcon");
export const MenuIcon = /*#__PURE__*/ createIcon(Menu, "MenuIcon");
export const MoonIcon = /*#__PURE__*/ createIcon(Moon, "MoonIcon");
export const PlusIcon = /*#__PURE__*/ createIcon(Plus, "PlusIcon");
export const PrinterIcon = /*#__PURE__*/ createIcon(Printer, "PrinterIcon");
export const RefreshIcon = /*#__PURE__*/ createIcon(RefreshCw, "RefreshIcon");
export const QrScanIcon = /*#__PURE__*/ createIcon(ScanQrCode, "QrScanIcon");
export const SaveIcon = /*#__PURE__*/ createIcon(Save, "SaveIcon");
export const SearchIcon = /*#__PURE__*/ createIcon(Search, "SearchIcon");
export const SendIcon = /*#__PURE__*/ createIcon(Send, "SendIcon");
export const SettingsIcon = /*#__PURE__*/ createIcon(Settings, "SettingsIcon");
export const SlidersIcon = /*#__PURE__*/ createIcon(
  SlidersHorizontal,
  "SlidersIcon",
);
export const ShareIcon = /*#__PURE__*/ createIcon(Share2, "ShareIcon");
export const StarIcon = /*#__PURE__*/ createIcon(Star, "StarIcon");
export const SunIcon = /*#__PURE__*/ createIcon(Sun, "SunIcon");
export const TrashIcon = /*#__PURE__*/ createIcon(Trash2, "TrashIcon");
export const UserIcon = /*#__PURE__*/ createIcon(UserRound, "UserIcon");
export const CloseIcon = /*#__PURE__*/ createIcon(X, "CloseIcon");
