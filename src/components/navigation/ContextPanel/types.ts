import { ReactNode } from "react";

export type StatusIntent = "default" | "info" | "success" | "warning" | "error";

export type StatusChip = {
  label: string;
  intent?: StatusIntent;
  icon?: ReactNode; // colour is never the only cue
};

export type Interaction = "view" | "view-and-select" | "select";

export type CardItem = {
  id: string;
  title: string;
  subtitle?: ReactNode;
  thumbnail?: ReactNode;
  status?: StatusChip;
  metadata?: {
    key: string;
    value: ReactNode;
    label?: string; // tooltip and accessible name
    priority?: number; // lower is kept longer
  }[];
  tags?: string[];
  linked?: {
    key: string;
    label: string;
    state?: StatusChip;
    href?: string;
    onClick?: () => void;
  }[];
  footer?: { start?: ReactNode; end?: ReactNode };
  actions?: { key: string; label: string; onClick: () => void }[];
};

export type ContextPanelVariant = "cards";
export type ContextPanelDensity = "comfortable" | "compact";

export type ContextPanelProps =
  | ViewAndSelectContextPanelProps
  | ViewContextPanelProps
  | SelectContextPanelProps;

export type BaseContextPanelProps = {
  title: string;
  variant: ContextPanelVariant;
  items: CardItem[];
  totalCount: number;
  density: ContextPanelDensity;
  controls?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  emptyMessage?: string;
  noResultsMessage?: string;
  noResultsAction?: ReactNode;
};

export function isViewContextPanel(
  props: ContextPanelProps,
): props is ViewContextPanelProps {
  return props.interaction === "view";
}
export function isSelectContextPanel(
  props: ContextPanelProps,
): props is SelectContextPanelProps {
  return props.interaction === "select";
}
export function isViewAndSelectContextPanel(
  props: ContextPanelProps,
): props is ViewAndSelectContextPanelProps {
  return props.interaction === "view-and-select";
}

export type ViewContextPanelProps = BaseContextPanelProps &
  ShownId & {
    interaction: "view";
  };

export type SelectContextPanelProps = BaseContextPanelProps &
  SelectedIds & {
    interaction: "select";
  };

type ShownId = {
  shownId: string | null;
  onShownChange: (id: string | null) => void;
};

type SelectedIds = {
  selectAll?: boolean;
  selectedIds: ContextPanelSelection;
  onSelectedChange: (selection: ContextPanelSelection) => void;
};

export type ViewAndSelectContextPanelProps = BaseContextPanelProps &
  ShownId &
  SelectedIds & {
    interaction: "view-and-select";
    checkboxes?: boolean;
  };

export type ContextPanelSelection = { [id: string]: boolean };

export type CardClick = { idx: number; id: string };

export type ClickHandlerProps = {
  data: CardItem[];
  newCard: CardClick;
  event: React.MouseEvent<Element, MouseEvent>;
  currentSelection: ContextPanelSelection;
  prevCard: React.MutableRefObject<CardClick | null>;
};
