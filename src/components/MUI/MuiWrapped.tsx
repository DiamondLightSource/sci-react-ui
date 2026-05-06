import MuiWrapper from "./MuiWrapper";

import MuiChip, { ChipProps as MuiChipProps } from "@mui/material/Chip";
import MuiAlert, { AlertProps as MuiAlertProps } from "@mui/material/Alert";

export const Chip = MuiWrapper<MuiChipProps>(MuiChip, "Chip");
export const Alert = MuiWrapper<MuiAlertProps>(MuiAlert, "Alert");
