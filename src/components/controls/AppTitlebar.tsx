import { Typography, TypographyProps } from "@mui/material";
import { Bar, BarSlotsProps } from "./Bar";

interface AppTitleProps extends TypographyProps {
  title: string;
}

const AppTitle = ({ title, ...props }: AppTitleProps) => (
  <Typography id="app-title" variant="h4" color="inherit" {...props}>
    {title}
  </Typography>
);

interface AppTitlebarProps extends BarSlotsProps {
  title?: string;
}

/**
A Title bar for your App.
 */
const AppTitlebar = ({ title, children, ...props }: AppTitlebarProps) => {
  return (
    <Bar {...props}>
      {title && <AppTitle title={title} />}
      {children}
    </Bar>
  );
};

export { AppTitlebar, AppTitle };
