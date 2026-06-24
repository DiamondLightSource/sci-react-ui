import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Bell,
  Briefcase,
  Check,
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
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Plus,
  Printer,
  RefreshCw,
  Save,
  Search,
  Send,
  Settings,
  Share2,
  Star,
  Trash2,
  X,
  Sun,
  Moon,
  UserRound,
  CheckCircle,
} from "lucide-react";

import { LucideIcon, type LucideIconProps } from "./LucideIcon";

type IconAliasProps = Omit<LucideIconProps, "icon">;

export const ArrowLeftIcon = (props: IconAliasProps) => (
  <LucideIcon icon={ArrowLeft} {...props} />
);

export const ArrowRightIcon = (props: IconAliasProps) => (
  <LucideIcon icon={ArrowRight} {...props} />
);

export const AddIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Plus} {...props} />
);

export const AssignmentIcon = (props: IconAliasProps) => (
  <LucideIcon icon={ClipboardList} {...props} />
);

export const DeleteIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Trash2} {...props} />
);

export const ExpandMoreIcon = (props: IconAliasProps) => (
  <LucideIcon icon={ChevronDown} {...props} />
);

export const FavoriteIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Heart} {...props} />
);

export const FileCopyIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Copy} {...props} />
);

export const FolderIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Folder} {...props} />
);

export const GrainIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Grid3x3} {...props} />
);

export const HomeIcon = (props: IconAliasProps) => (
  <LucideIcon icon={House} {...props} />
);

export const InboxIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Inbox} {...props} />
);

export const LocationOnIcon = (props: IconAliasProps) => (
  <LucideIcon icon={MapPin} {...props} />
);

export const MailIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Mail} {...props} />
);

export const MenuIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Menu} {...props} />
);

export const NotificationsIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Bell} {...props} />
);

export const PageviewIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Search} {...props} />
);

export const PrintIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Printer} {...props} />
);

export const RestoreIcon = (props: IconAliasProps) => (
  <LucideIcon icon={History} {...props} />
);

export const SaveIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Save} {...props} />
);

export const SendIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Send} {...props} />
);

export const ShareIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Share2} {...props} />
);

export const WhatshotIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Flame} {...props} />
);

export const WorkIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Briefcase} {...props} />
);

export const SearchIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Search} {...props} />
);

export const SettingsIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Settings} {...props} />
);

export const CheckIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Check} {...props} />
);

export const CloseIcon = (props: IconAliasProps) => (
  <LucideIcon icon={X} {...props} />
);

export const ChevronDownIcon = (props: IconAliasProps) => (
  <LucideIcon icon={ChevronDown} {...props} />
);

export const ChevronRightIcon = (props: IconAliasProps) => (
  <LucideIcon icon={ChevronRight} {...props} />
);

export const ChevronUpIcon = (props: IconAliasProps) => (
  <LucideIcon icon={ChevronUp} {...props} />
);

export const ChevronLeftIcon = (props: IconAliasProps) => (
  <LucideIcon icon={ChevronLeft} {...props} />
);

export const SuccessIcon = (props: IconAliasProps) => (
  <LucideIcon icon={CheckCircle} {...props} />
);
export const ErrorIcon = (props: IconAliasProps) => (
  <LucideIcon icon={CircleX} {...props} />
);
export const WarningIcon = (props: IconAliasProps) => (
  <LucideIcon icon={AlertTriangle} {...props} />
);
export const InfoIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Info} {...props} />
);

export const StarIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Star} {...props} />
);
export const LoginIcon = (props: IconAliasProps) => (
  <LucideIcon icon={LogIn} {...props} />
);
export const LogoutIcon = (props: IconAliasProps) => (
  <LucideIcon icon={LogOut} {...props} />
);

export const SunIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Sun} {...props} />
);

export const MoonIcon = (props: IconAliasProps) => (
  <LucideIcon icon={Moon} {...props} />
);

export const RefreshIcon = (props: IconAliasProps) => (
  <LucideIcon icon={RefreshCw} {...props} />
);

export const UserIcon = (props: IconAliasProps) => (
  <LucideIcon icon={UserRound} {...props} />
);
