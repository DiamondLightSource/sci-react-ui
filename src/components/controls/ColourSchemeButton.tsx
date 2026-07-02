import { GlobalStyles, IconButton, IconButtonProps } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";

export const ColourSchemeButton = (props: IconButtonProps) => {
  const { mode, systemMode, setMode } = useColorScheme();

  const resolvedMode = mode === "system" ? systemMode : mode;
  const isReady = resolvedMode === "light" || resolvedMode === "dark";
  const isDark = resolvedMode === "dark";

  return (
    <>
      <GlobalStyles
        styles={`
          html.ds-mode-changing *,
          html.ds-mode-changing *::before,
          html.ds-mode-changing *::after {
            transition: none !important;
            animation: none !important;
          }
        `}
      />

      <IconButton
        aria-label={`Colour scheme switcher: ${resolvedMode ?? "unknown"}`}
        {...props}
        onClick={(event) => {
          document.documentElement.classList.add("ds-mode-changing");

          setMode(isDark ? "light" : "dark");

          window.setTimeout(() => {
            document.documentElement.classList.remove("ds-mode-changing");
          }, 250);

          props.onClick?.(event);
        }}
        sx={(theme) => ({
          ml: 1,
          width: 32,
          height: 32,
          borderRadius: 1,
          backgroundColor: theme.palette.surface.strong,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.surface.strong,
            borderColor: theme.palette.border.subtle,
          },
        })}
      >
        {isReady ? isDark ? <LightModeIcon /> : <BedtimeIcon /> : null}
      </IconButton>
    </>
  );
};
