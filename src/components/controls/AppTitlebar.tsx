import React from "react";
import {styled, Typography, TypographyProps, useTheme} from "@mui/material";

import { Bar, BarSlotsProps } from "./Bar";


interface AppTitleProps extends TypographyProps{
  title: string;
}

const TypographyStyled = styled(Typography)<TypographyProps>(({theme}) => ({
  color: theme.vars.palette.primary.contrastText,
  fontSize: "2em"
}));

/**
 * A simple wrapper for a H1 title
 * @param title The title to display
 */
const AppTitle = ({title, ...props} :AppTitleProps) => (
  <TypographyStyled {...props} id="app-title" variant="h1">
    {title}
  </TypographyStyled>
)


interface AppTitlebarProps extends BarSlotsProps {
  title?: string;
}

/**
A Title bar for your App.
 */
const AppTitlebar = ({
  title,
  children,
  ...props
}: AppTitlebarProps) => {
  const theme = useTheme();
  return (
    <Bar {...props}>
      {title && (
        <AppTitle title={title} />
      )}
      {children}
    </Bar>
  );
};

export { AppTitlebar, AppTitle };
export type { AppTitlebarProps, AppTitleProps };
