import MuiWrapper from "./MuiWrapper";

import MuiAccordion, {
  AccordionProps as MuiAccordionProps,
} from "@mui/material/Accordion";
import MuiAccordionDetails, {
  AccordionDetailsProps as MuiAccordionDetailsProps,
} from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps as MuiAccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAlert, { AlertProps as MuiAlertProps } from "@mui/material/Alert";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardActions, {
  CardActionsProps as MuiCardActionsProps,
} from "@mui/material/CardActions";
import MuiCardContent, {
  CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";
import MuiCardMedia, {
  CardMediaProps as MuiCardMediaProps,
} from "@mui/material/CardMedia";
import MuiChip, { ChipProps as MuiChipProps } from "@mui/material/Chip";
import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";
import MuiPaper, { PaperProps as MuiPaperProps } from "@mui/material/Paper";
import MuiStack, { StackProps as MuiStackProps } from "@mui/material/Stack";
import MuiToolbar, {
  ToolbarProps as MuiToolbarProps,
} from "@mui/material/Toolbar";
import MuiTypography, {
  TypographyProps as MuiTypographyProps,
} from "@mui/material/Typography";

import MuiExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiMenuIcon from "@mui/icons-material/Menu";

export const Accordion = MuiWrapper<MuiAccordionProps>(
  MuiAccordion,
  "Accordion",
);
export const AccordionDetails = MuiWrapper<MuiAccordionDetailsProps>(
  MuiAccordionDetails,
  "AccordionDetails",
);
export const AccordionSummary = MuiWrapper<MuiAccordionSummaryProps>(
  MuiAccordionSummary,
  "AccordionSummary",
);
export const Alert = MuiWrapper<MuiAlertProps>(MuiAlert, "Alert");
export const AppBar = MuiWrapper<MuiAppBarProps>(MuiAppBar, "AppBar");
export const Button = MuiWrapper<MuiButtonProps>(MuiButton, "Button");
export const Card = MuiWrapper<MuiCardProps>(MuiCard, "Card");
export const CardActions = MuiWrapper<MuiCardActionsProps>(
  MuiCardActions,
  "CardActions",
);
export const CardContent = MuiWrapper<MuiCardContentProps>(
  MuiCardContent,
  "CardContent",
);
export const CardMedia = MuiWrapper<MuiCardMediaProps>(
  MuiCardMedia,
  "CardMedia",
);
export const Chip = MuiWrapper<MuiChipProps>(MuiChip, "Chip");
export const ExpandMoreIcon = MuiWrapper(MuiExpandMoreIcon, "ExpandMoreIcon");
export const IconButton = MuiWrapper<MuiIconButtonProps>(
  MuiIconButton,
  "IconButton",
);
export const MenuIcon = MuiWrapper(MuiMenuIcon, "MenuIcon");
export const Paper = MuiWrapper<MuiPaperProps>(MuiPaper, "Paper");
export const Stack = MuiWrapper<MuiStackProps>(MuiStack, "Stack");
export const Toolbar = MuiWrapper<MuiToolbarProps>(MuiToolbar, "Toolbar");
export const Typography = MuiWrapper<MuiTypographyProps>(
  MuiTypography,
  "Typography",
);
