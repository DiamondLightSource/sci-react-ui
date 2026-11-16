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

export type ContextPanelProps = {
  title: string;
  variant: ContextPanelVariant;
  items: CardItem[];
  totalCount: number;
  density: ContextPanelDensity;
  selectedAll?: boolean;
  controls?: ReactNode;
  footer?: ReactNode;
  loading: boolean;
  emptyMessage: string;
  noResultsMessage?: string;
  noResultsAction?: ReactNode;
} & (
  | (ViewProps & { interaction: "view" })
  | (SelectProps & { interaction: "select" })
  | (ViewProps &
      SelectProps & { interaction: "view-and-select"; checkboxes?: boolean })
);

export type ViewProps = {
  shownId: string | null;
  onShownChange: (id: string | null) => void;
};

export type SelectProps = {
  selectedIds: ContextPanelSelection;
  onSelectedChange: (selection: ContextPanelSelection) => void;
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
