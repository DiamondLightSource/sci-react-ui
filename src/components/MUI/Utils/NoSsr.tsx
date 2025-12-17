import * as React from "react";
import MuiNoSsr from "@mui/material/NoSsr";

export type NoSsrProps = React.ComponentProps<typeof MuiNoSsr>;

export const NoSsr = (props: NoSsrProps) => <MuiNoSsr {...props} />;

NoSsr.displayName = "NoSsr";
