import {
  Plus,
  Save,
  Trash2,
  Send,
  Home,
  Star,
  Search,
  Settings,
} from "lucide-react";

export const dsIcons = {
  add: Plus,
  save: Save,
  delete: Trash2,
  send: Send,
  home: Home,
  favourite: Star,
  search: Search,
  settings: Settings,
} as const;

export type DsIconName = keyof typeof dsIcons;