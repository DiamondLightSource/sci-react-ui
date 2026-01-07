import * as React from "react";
import MuiPortal from "@mui/material/Portal";

export type PortalProps = React.ComponentProps<typeof MuiPortal>;

export const Portal = (props: PortalProps) => <MuiPortal {...props} />;

Portal.displayName = "Portal";
