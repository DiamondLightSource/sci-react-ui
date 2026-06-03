/**
 * DiamondDS MUI theme
 *
 * Maps DiamondDS semantic design tokens, palette roles and interaction rules
 * into MUI's theme system, component model and runtime styling APIs.
 *
 * CSS variables are the source of truth.
 * These are defined in diamond-ds-tokens.css.
 *
 * Tokens are the CSS variables.
 * Roles are the semantic values exposed through the MUI palette and component APIs.
 *
 * The MUI theme acts as the semantic adapter consumed by components.
 *
 * Components should consume semantic roles from the theme or semantic CSS
 * variables rather than raw colour values.
 */
import "../styles/diamondDS/diamond-ds-tokens.css";

// Enables `theme.vars` typings for MUI CSS variable themes.
import type {} from "@mui/material/themeCssVarsAugmentation";
import { extendTheme } from "@mui/material/styles";
import type { CSSObject, Theme } from "@mui/material/styles";

/**
 * Component prop types are used to type `ownerState` inside MUI style overrides.
 */
import type { AlertProps } from "@mui/material/Alert";
import type { ButtonProps } from "@mui/material/Button";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { ChipProps } from "@mui/material/Chip";
import type { CircularProgressProps } from "@mui/material/CircularProgress";
import type { LinearProgressProps } from "@mui/material/LinearProgress";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import type { RadioProps } from "@mui/material/Radio";
import type { TabProps } from "@mui/material/Tab";

import logoImageLight from "../public/diamond/logo-light.svg";
import logoImageDark from "../public/diamond/logo-dark.svg";
import logoShort from "../public/diamond/logo-short.svg";
import type { ImageColourSchemeSwitchType } from "components/controls/ImageColourSchemeSwitch";

/**
 * Standard argument shape for MUI style override callbacks.
 *
 * `ownerState` is MUI's current component prop/state snapshot.
 */
type OverrideArgs<OwnerState = unknown> = {
  ownerState: OwnerState;
  theme: Theme;
};

/**
 * Theme-only argument shape for MUI style overrides.
 */
type ThemeOnlyArgs = {
  theme: Theme;
};

/**
 * Canonical list of supported DiamondDS intent colours.
 *
 * DiamondDS supports:
 * - action intents: primary, secondary
 * - status intents: success, warning, error, info
 *
 * Intent colours communicate hierarchy, meaning and state through component
 * APIs such as `color="primary"` or `color="error"`.
 *
 * Brand is intentionally excluded. Brand communicates Diamond identity rather
 * than behaviour or status.
 */
const intentColours = [
  "primary",
  "secondary",
  "error",
  "warning",
  "info",
  "success",
] as const;

type IntentColour = (typeof intentColours)[number];

/**
 * Internal DiamondDS palette contract.
 *
 * Every supported intent colour must provide the roles needed for text,
 * container, solid and interaction states. MUI's public palette option types
 * remain partial, but DiamondDS helpers use this stricter resolved contract.
 */
type ExtendedPaletteColor = {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
  mainChannel: string;
  lightChannel: string;
  darkChannel: string;
  contrastTextChannel: string;
  container: string;
  onContainer: string;
  solid: string;
  onSolid: string;
};

type BrandPaletteColor = ExtendedPaletteColor & {
  /**
   * Fixed brand roles stay stable across light and dark mode.
   *
   * Use for persistent Diamond identity surfaces or accents only.
   */
  fixed: string;
  fixedDim: string;
  onFixed: string;
};

type BrandPaletteOptions = Partial<BrandPaletteColor>;

/**
 * Strict DiamondDS intent palette map.
 *
 * Every supported intent colour must provide the full semantic role set.
 */
type IntentPaletteRecord = Record<IntentColour, ExtendedPaletteColor>;

/**
 * Theme shape used by DiamondDS intent helpers.
 *
 * `theme.palette` is treated as the resolved strict contract.
 * `theme.vars.palette` remains partial because MUI controls CSS variable
 * resolution.
 */
type ThemeWithIntentPalette = Theme & {
  vars?: {
    palette?: Partial<Record<IntentColour, Partial<ExtendedPaletteColor>>>;
  };
  palette: Theme["palette"] & IntentPaletteRecord;
};

/**
 * MUI theme augmentation for DiamondDS semantic roles.
 *
 * CSS variables remain the source of truth. These typings expose DiamondDS
 * text, surface, border and palette roles through the MUI theme API.
 */
declare module "@mui/material/styles" {
  interface CssVarsTheme {
    logos?: {
      normal: ImageColourSchemeSwitchType;
      short?: ImageColourSchemeSwitchType;
    };
  }

  interface CssVarsThemeOptions {
    logos?: {
      normal: ImageColourSchemeSwitchType;
      short?: ImageColourSchemeSwitchType;
    };
  }

  interface TypeBackground {
    default: string;
    paper: string;
  }

  interface TypeText {
    placeholder?: string;
    placeholderFocus?: string;
    onSolid?: string;
    primaryChannel?: string;
    secondaryChannel?: string;
  }

  interface TypeTextOptions {
    primary?: string;
    secondary?: string;
    disabled?: string;
    placeholder?: string;
    placeholderFocus?: string;
    primaryChannel?: string;
    secondaryChannel?: string;
  }

  interface Palette {
    /**
     * Brand is an identity/accent colour, not an intent colour.
     *
     * Use it for Diamond recognition, product identity and selected visual
     * accents. Avoid using it as a general status or behaviour signal.
     */
    brand?: BrandPaletteColor;

    /** Neutral border roles used for structure, not meaning. */
    border: {
      subtle: string;
      emphasis: string;
      strong: string;
    };

    /** Neutral surface roles used to create hierarchy without semantic state. */
    surface: {
      subtle: string;
      strong: string;
    };
  }

  /**
   * Theme authoring interface.
   *
   * Unlike the resolved runtime palette, theme options remain intentionally
   * partial so themes can provide only the values they need to override.
   *
   * DiamondDS extends MUI's palette options with:
   * - brand identity roles
   * - semantic border roles
   * - semantic surface roles
   *
   * The stricter runtime intent contract is enforced separately through
   * IntentPaletteRecord and ExtendedPaletteColor.
   */
  interface PaletteOptions {
    brand?: BrandPaletteOptions;

    border?: {
      subtle?: string;
      emphasis?: string;
      strong?: string;
    };
    surface?: {
      subtle?: string;
      strong?: string;
    };
  }

  interface PaletteColor {
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
    contrastTextChannel?: string;
    container?: string;
    onContainer?: string;
    solid?: string;
    onSolid?: string;
  }

  interface SimplePaletteColorOptions {
    mainChannel?: string;
    lightChannel?: string;
    darkChannel?: string;
    contrastTextChannel?: string;
    container?: string;
    onContainer?: string;
    solid?: string;
    onSolid?: string;
  }
}

export type DSMode = "light" | "dark";

// --- Semantic palette and interaction helpers ---

const isIntentColour = (colour: unknown): colour is IntentColour =>
  typeof colour === "string" && intentColours.includes(colour as IntentColour);

/**
 * Creates a DiamondDS semantic palette entry from a token namespace.
 *
 * CSS variables remain the source of truth. The MUI palette is an adapter layer
 * that lets component overrides use stable semantic names instead of repeating
 * raw `var(--ds-*)` references everywhere.
 *
 * MUI mapping follows the DiamondDS/Radix-style role logic:
 * - light        -> accent / focus-adjacent role
 * - main         -> default semantic colour
 * - dark         -> stronger emphasis role (not simply a darker colour)
 * - container    -> subtle semantic surface
 * - onContainer  -> foreground on subtle semantic surface
 * - solid        -> filled interactive surface
 * - onSolid      -> foreground on filled interactive surface
 */
const createPaletteColour = (tokenName: string): ExtendedPaletteColor => ({
  light: `var(--ds-${tokenName}-accent)`,
  main: `var(--ds-${tokenName})`,
  dark: `var(--ds-${tokenName}-emphasis)`,
  contrastText: `var(--ds-on-${tokenName})`,
  container: `var(--ds-${tokenName}-container)`,
  onContainer: `var(--ds-on-${tokenName}-container)`,
  solid: `var(--ds-${tokenName}-solid)`,
  onSolid: `var(--ds-on-${tokenName}-solid)`,

  contrastTextChannel: `var(--ds-on-${tokenName}-channel)`,
  mainChannel: `var(--ds-${tokenName}-mainChannel)`,
  lightChannel: `var(--ds-${tokenName}-lightChannel)`,
  darkChannel: `var(--ds-${tokenName}-darkChannel)`,
});

/**
 * Creates the DiamondDS brand palette.
 *
 * Brand includes the regular semantic palette roles plus fixed brand roles.
 * Fixed roles remain stable across light and dark mode and should only be used
 * for persistent Diamond identity surfaces or accents.
 */
const createBrandPaletteColour = (): BrandPaletteColor => ({
  ...createPaletteColour("brand"),

  fixed: "var(--ds-brand-fixed)",
  fixedDim: "var(--ds-brand-fixed-dim)",
  onFixed: "var(--ds-on-brand-fixed)",
});

/**
 * MUI uses `error`; DiamondDS tokens use `danger`.
 *
 * Keep the translation here so component code can continue to speak MUI while
 * the CSS token layer can use DiamondDS language.
 */
const intentTokenName: Record<IntentColour, string> = {
  primary: "primary",
  secondary: "secondary",
  error: "danger",
  warning: "warning",
  success: "success",
  info: "info",
};

/**
 * Builds the complete DiamondDS intent palette from token namespaces.
 *
 * Keeping this generated from `intentTokenName` avoids repeating the same MUI
 * palette mapping for every supported intent.
 */
const createIntentPalette = (): IntentPaletteRecord => ({
  primary: createPaletteColour(intentTokenName.primary),
  secondary: createPaletteColour(intentTokenName.secondary),
  error: createPaletteColour(intentTokenName.error),
  warning: createPaletteColour(intentTokenName.warning),
  success: createPaletteColour(intentTokenName.success),
  info: createPaletteColour(intentTokenName.info),
});

/**
 * Returns a supported intent palette.
 *
 * `theme.vars.palette` can be present when MUI CSS variables are enabled. When
 * it exists, it may contain the resolved variable-aware values. We merge it over
 * `theme.palette` while preserving the DiamondDS contract.
 *
 * Fallback policy:
 * - unsupported colour values fall back to primary before this function is used
 * - missing palette entries fall back to primary in development with a warning
 *
 * That fallback has a deliberate meaning: primary is the safest non-destructive
 * action intent. We do not silently fall back from error/warning to decorative
 * or brand values.
 */
const getIntentPalette = (
  theme: Theme,
  colour: IntentColour,
): ExtendedPaletteColor => {
  const { vars, palette } = theme as ThemeWithIntentPalette;

  const paletteColour = palette[colour];
  const varsColour = vars?.palette?.[colour];

  if (paletteColour) {
    return {
      ...paletteColour,
      ...varsColour,
    };
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[DiamondDS] getIntentPalette: colour "${colour}" not found. Falling back to primary.`,
    );
  }

  return {
    ...palette.primary,
    ...vars?.palette?.primary,
  };
};

/**
 * Normalises external MUI colour props into DiamondDS-supported intents.
 *
 * Component `ownerState` values come from MUI props and internal state. They can
 * include values such as `inherit`, `default`, or custom app colours. DiamondDS
 * only treats the declared `IntentColour` set as semantic intents.
 */
const getIntentFromColourProp = (
  colour: unknown,
  fallback: IntentColour = "primary",
): IntentColour => (isIntentColour(colour) ? colour : fallback);

/**
 * Focus rings use one shared DiamondDS focus token.
 *
 * Focus shows keyboard/navigation state. It should not change by intent,
 * status or validation colour.
 */
const getFocusOutline = (): CSSObject => ({
  "&.Mui-focusVisible": {
    outline: "var(--ds-focus-ring-width) solid var(--ds-focus-ring)",
    outlineOffset: "var(--ds-focus-ring-offset)",
  },
});

/**
 * Interaction overlays are layered on top of the base surface.
 *
 * This keeps hover/active/focus feedback separate from semantic colour roles,
 * which is especially useful across light and dark modes.
 */
const getOverlayInset = (token = "var(--ds-overlay-hover)") =>
  `inset 0 0 0 9999px ${token}`;

/**
 * Shared interaction treatment for semantic interactive surfaces.
 *
 * Keeps hover and active overlays visually consistent across components.
 */
const getInteractiveSurfaceStateStyles = (
  backgroundColor: string,
  overlay = "var(--ds-overlay-hover)",
): CSSObject => ({
  "&:hover": {
    backgroundColor,
    boxShadow: getOverlayInset(overlay),
  },

  "&:active": {
    backgroundColor,
    boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
  },
});

/**
 * Disabled state intentionally removes interactive affordances.
 *
 * Disabled styles should visually override hover, focus and active states.
 */
const getDisabledControlStyles = (backgroundColor = "transparent"): CSSObject =>
  ({
    opacity: 1,
    backgroundColor,
    color: "var(--ds-on-surface-disabled)",
    boxShadow: "none",
  }) satisfies CSSObject;

/**
 * Creates the resolved DiamondDS MUI theme.
 *
 * This factory:
 * - maps DiamondDS semantic tokens into MUI
 * - configures component defaults and overrides
 * - applies light/dark semantic role resolution
 * - keeps CSS variables as the source of truth
 *
 * The resulting theme should expose semantic roles rather than raw colours.
 */

/**
 * Creates the shared DiamondDS semantic palette for a colour scheme.
 *
 * Light and dark schemes intentionally reference the same semantic CSS
 * variables. The actual values are resolved by the `data-mode` attribute on
 * `<html>`, keeping CSS variables as the source of truth while still giving
 * MUI a proper colour-scheme-aware theme.
 */
const createDiamondPalette = (mode: DSMode) => {
  const intentPalette = createIntentPalette();

  return {
    mode,

    /**
     * MUI action tokens are mapped to DiamondDS overlay and disabled roles.
     *
     * Components should prefer semantic CSS variables directly where they need
     * precise behaviour, but these values keep MUI defaults aligned with the
     * design system.
     */
    action: {
      hover: "var(--ds-overlay-hover)",
      selected: "var(--ds-overlay-selected)",
      selectedChannel: "var(--ds-overlay-selected-channel)",
      focus: "var(--ds-overlay-focus)",
      disabled: "var(--ds-on-surface-disabled)",
      disabledBackground: "var(--ds-surface-disabled)",

      hoverOpacity: 0.04,
      selectedOpacity: 0.08,
      disabledOpacity: 0.38,
      focusOpacity: 0.16,
    },

    /**
     * Text roles describe hierarchy and surface relationship.
     *
     * Prefer these semantic roles over raw greys so dark mode and future
     * accessibility refinements can be made centrally.
     */
    text: {
      primary: "var(--ds-on-surface)",
      secondary: "var(--ds-on-surface-variant)",
      onSolid: "var(--ds-on-solid)",
      disabled: "var(--ds-on-surface-disabled)",
      placeholder: "var(--ds-placeholder)",
      placeholderFocus: "var(--ds-placeholder-focus)",

      primaryChannel: "var(--ds-on-surface-channel)",
      secondaryChannel: "var(--ds-on-surface-variant-channel)",
    },

    background: {
      default: "rgb(var(--ds-background-channel))",
      paper: "rgb(var(--ds-surface-channel))",
    },

    /**
     * Divider and border roles describe structure and separation, not meaning.
     *
     * Divider is the default border role for general structure and separatio.
     * Border.subtle is a semantic utlisity role for components that need to reference a border colour directly.
     * Border.emphasis is a emphasised border role for actionable elements and highlighted states.
     * Border.strong is a stronger border role for hover and focus states.
     *
     */
    divider: "var(--ds-border-subtle)",
    dividerChannel: "var(--ds-border-subtle-channel)",

    border: {
      subtle: "var(--ds-border)",
      emphasis: "var(--ds-border-emphasis)",
      strong: "var(--ds-border-strong)",
    },

    surface: {
      subtle: "var(--ds-surface-container)",
      strong: "var(--ds-surface-container-high)",
    },

    ...intentPalette,

    /**
     * Brand is provided as a palette entry for places that need Diamond visual
     * identity, but it is not part of the intent-colour helper path.
     */
    brand: createBrandPaletteColour(),

    grey: {
      50: "#f8f8fa",
      100: "#eef1f5",
      200: "#e6e9f0",
      300: "#dde1e8",
      400: "#bcc2cd",
      500: "#a5acb8",
      600: "#8a90a0",
      700: "#505563",
      800: "#2c3140",
      900: "#1a1c23",
    },
  };
};

/**
 * Resolved DiamondDS MUI theme.
 *
 * MUI handles the colour-scheme state. DiamondDS handles the actual role values
 * through `html[data-mode="light"]` and `html[data-mode="dark"]` CSS variables.
 */
const DiamondDSTheme = extendTheme({
  /**
   * Match the DiamondDS runtime selector:
   *
   * <html data-mode="light"> or <html data-mode="dark">
   */
  colorSchemeSelector: '[data-mode="%s"]',

  colorSchemes: {
    light: {
      palette: createDiamondPalette("light"),
    },
    dark: {
      palette: createDiamondPalette("dark"),
    },
  },

  typography: {
    fontFamily: [
      '"Inter Variable"',
      "Inter",
      "system-ui",
      "-apple-system",
      '"Segoe UI"',
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },

  logos: {
    normal: {
      src: logoImageLight,
      srcDark: logoImageDark ?? logoImageLight,
      alt: "Diamond Light Source Logo",
      width: "100",
    },
    short: {
      src: logoShort,
      alt: "Diamond Light Source Logo",
      width: "35",
    },
  },

  components: {
    /**
     * Component overrides translate DiamondDS semantic roles into MUI behaviour.
     *
     * Keep overrides token-led:
     * - use semantic tokens or palette roles
     * - avoid raw colours
     * - keep disabled and error states visually dominant
     * - prefer scoped/additive changes over breaking MUI defaults
     *
     * Component override summary
     *
     * Base interaction:
     *   MuiButtonBase       → ripple and focus behaviour
     *
     * Actions and selection:
     *   MuiButton           → contained, outlined and text variants
     *   MuiIconButton       → intent-aware icon actions
     *   MuiToggleButton     → selection, border and hover states
     *
     * Inputs and forms:
     *   MuiInputBase        → placeholder behaviour
     *   MuiOutlinedInput    → border priority and validation states
     *   MuiInputLabel       → label response to focus and validation
     *
     * Navigation and display:
     *   MuiTab              → navigation hierarchy and selected state
     *   MuiAlert            → semantic feedback variants
     *   MuiChip             → metadata, status and interactive chips
     *
     * Progress and loading:
     *   MuiLinearProgress   → semantic activity indicators
     *   MuiCircularProgress → semantic activity indicators
     *   MuiSkeleton         → loading placeholders and shimmer
     *
     * Selection controls:
     *   MuiCheckbox         → checked and disabled states
     *   MuiRadio            → checked and disabled states
     *
     * Feedback surfaces:
     *   MuiSnackbar         → layout constraints
     *   MuiSnackbarContent  → surface styling and actions
     */

    MuiButtonBase: {
      /**
       * Keeps MUI ripple behaviour available while using DiamondDS focus outlines.
       */
      defaultProps: {
        disableRipple: false,
        disableTouchRipple: false,
        focusRipple: false,
      },
    },

    MuiButton: {
      /**
       * Button uses the DiamondDS intent model:
       *
       * - contained = solid action surface
       * - outlined  = subtle intent container with border
       * - text      = low-emphasis action
       *
       * Disabled styles are declared inside each variant so they override
       * hover, active and focus treatments for that variant.
       */
      defaultProps: {
        disableFocusRipple: true,
      },

      styleOverrides: {
        root: ({ ownerState, theme }: OverrideArgs<ButtonProps>): CSSObject => {
          const base: CSSObject = {
            textTransform: "none",
            boxShadow: "none",

            "&:hover": {
              boxShadow: "none",
            },
          };

          const variant = ownerState.variant ?? "text";
          const rawColour = ownerState.color ?? "primary";

          if (rawColour === "inherit") {
            return {
              ...base,
              ...getFocusOutline(),
            };
          }

          const colour = getIntentFromColourProp(rawColour);
          const p = getIntentPalette(theme, colour);

          if (variant === "contained") {
            return {
              ...base,

              backgroundColor: p.solid,
              color: p.onSolid,

              ...getInteractiveSurfaceStateStyles(
                p.solid,
                "var(--ds-overlay-hover-solid)",
              ),

              "&.Mui-focusVisible": {
                outline:
                  "var(--ds-focus-ring-width) solid var(--ds-focus-ring)",
                outlineOffset: "var(--ds-focus-ring-offset)",
                boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
              },

              "&.Mui-disabled": getDisabledControlStyles(
                "var(--ds-surface-disabled)",
              ),
            };
          }

          if (variant === "outlined") {
            return {
              ...base,
              ...getFocusOutline(),

              color: p.onContainer,
              backgroundColor: p.container,
              border: `1px solid ${p.light}`,

              ...getInteractiveSurfaceStateStyles(p.container),

              "&:hover": {
                backgroundColor: p.container,
                borderColor: p.main,
                boxShadow: getOverlayInset(),
              },

              "&:active": {
                backgroundColor: p.container,
                borderColor: p.dark,
                boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
              },

              "&.Mui-disabled": {
                ...getDisabledControlStyles(),
                borderColor: "var(--ds-border)",
              },
            };
          }

          if (variant === "text") {
            return {
              ...base,
              ...getFocusOutline(),

              color: p.main,

              "&:hover": {
                backgroundColor: p.container,
                boxShadow: getOverlayInset(),
              },

              "&.Mui-disabled": {
                color: "var(--ds-on-surface-disabled)",
              },
            };
          }

          return {
            ...base,
            ...getFocusOutline(),
          };
        },
      },
    },

    MuiIconButton: {
      /**
       * IconButton follows the same intent model as Button, but default/inherit
       * colours stay neutral unless an explicit intent is provided.
       */
      defaultProps: {
        disableRipple: false,
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: ({
          ownerState,
          theme,
        }: OverrideArgs<{
          color?: "inherit" | "default" | IntentColour;
        }>): CSSObject => {
          const rawColour = ownerState.color ?? "default";

          if (rawColour === "inherit" || rawColour === "default") {
            return {
              "&:hover": {
                boxShadow: getOverlayInset(),
              },
              "&.Mui-disabled": {
                color: "var(--ds-on-surface-disabled)",
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              ...getFocusOutline(),
            };
          }

          const colour = getIntentFromColourProp(rawColour);
          const p = getIntentPalette(theme, colour);

          return {
            color: p.main,

            "&:hover": {
              backgroundColor: p.container,
              boxShadow: getOverlayInset(),
            },

            "&.Mui-disabled": {
              color: "var(--ds-on-surface-disabled)",
              backgroundColor: "transparent",
              boxShadow: "none",
            },
            ...getFocusOutline(),
          };
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }: ThemeOnlyArgs): CSSObject => ({
          textTransform: "none",
          border: `1px solid ${theme.palette.border.emphasis}`,

          "&:hover": {
            borderColor: theme.palette.border.strong,
          },

          "&.Mui-selected": {
            backgroundColor: "var(--ds-primary-container)",
            color: "var(--ds-on-primary-container)",
            borderColor: "var(--ds-primary-accent)",
          },

          "&.Mui-selected:hover": {
            backgroundColor: "var(--ds-primary-container)",
            borderColor: "var(--ds-primary)",
            boxShadow: getOverlayInset(),
          },

          "&.Mui-disabled": {
            color: "var(--ds-on-surface-disabled)",
            borderColor: "var(--ds-border)",
          },
        }),
      },
    },

    MuiChip: {
      /**
       * Chip supports both neutral metadata and semantic status/action usage.
       *
       * Interactive chips receive focus and overlay states; static chips remain calm.
       */
      styleOverrides: {
        root: ({ ownerState, theme }: OverrideArgs<ChipProps>): CSSObject => {
          const base: CSSObject = {
            "& .MuiChip-icon": {
              color: "currentColor",
            },
          };

          const rawColour = ownerState.color ?? "default";
          const isDefault = rawColour === "default";
          const isOutlined = ownerState.variant === "outlined";
          const isInteractive = !!(ownerState.clickable || ownerState.onDelete);

          if (isDefault) {
            const backgroundColor = "var(--ds-surface-container-high)";

            return {
              ...base,
              ...(isInteractive ? getFocusOutline() : {}),

              color: "var(--ds-on-surface)",
              borderColor: "var(--ds-border-emphasis)",
              backgroundColor,

              ...(isInteractive && {
                ...getInteractiveSurfaceStateStyles(backgroundColor),

                "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                  {
                    backgroundColor,
                    boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                  },

                "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                  {
                    backgroundColor,
                    boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                  },
              }),
            };
          }

          const colour = getIntentFromColourProp(rawColour);
          const p = getIntentPalette(theme, colour);

          if (isOutlined) {
            return {
              ...base,
              ...(isInteractive ? getFocusOutline() : {}),

              color: p.onContainer,
              borderColor: p.light,
              backgroundColor: p.container,

              ...(isInteractive && {
                ...getInteractiveSurfaceStateStyles(p.container),

                "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                  {
                    backgroundColor: p.container,
                    borderColor: p.light,
                    boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                  },

                "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                  {
                    backgroundColor: p.container,
                    borderColor: p.light,
                    boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                  },
              }),
            };
          }

          return {
            ...base,
            ...(isInteractive ? getFocusOutline() : {}),

            color: p.onSolid,
            backgroundColor: p.solid,

            ...(isInteractive && {
              ...getInteractiveSurfaceStateStyles(
                p.solid,
                "var(--ds-overlay-hover-solid)",
              ),

              "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                {
                  backgroundColor: p.solid,
                  boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                },

              "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                {
                  backgroundColor: p.solid,
                  boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                },
            }),
          };
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: ({ theme }: ThemeOnlyArgs): CSSObject => ({
          "&::placeholder": {
            color: theme.palette.text.placeholder,
            opacity: 1,
          },

          "&::-webkit-input-placeholder": {
            color: theme.palette.text.placeholder,
            opacity: 1,
          },

          "&::-moz-placeholder": {
            color: theme.palette.text.placeholder,
            opacity: 1,
          },

          "&:focus::placeholder": {
            color: theme.palette.text.placeholderFocus,
          },

          "&:focus::-webkit-input-placeholder": {
            color: theme.palette.text.placeholderFocus,
            opacity: 1,
          },

          "&:focus::-moz-placeholder": {
            color: theme.palette.text.placeholderFocus,
            opacity: 1,
          },
        }),

        root: ({ theme }: ThemeOnlyArgs): CSSObject => ({
          /** Error and disabled placeholder states win over normal focus. */
          "&.Mui-error input::placeholder, &.Mui-error input::-webkit-input-placeholder, &.Mui-error input::-moz-placeholder":
            {
              color: theme.palette.error.light,
              opacity: 1,
            },

          "&.Mui-disabled input::placeholder, &.Mui-disabled input::-webkit-input-placeholder, &.Mui-disabled input::-moz-placeholder":
            {
              color: theme.palette.text.disabled,
              opacity: 1,
            },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        /**
         * Outlined inputs prioritise state clarity:
         *
         * disabled > error > focused > hover > default
         *
         * This order avoids a focused or hover style masking validation state.
         */
        root: ({
          ownerState,
          theme,
        }: OverrideArgs<OutlinedInputProps>): CSSObject => {
          const colour = getIntentFromColourProp(ownerState.color);
          const p = getIntentPalette(theme, colour);

          return {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.border.emphasis,
            },

            "&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: theme.palette.border.strong,
              },

            "&.Mui-focused:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: p.light,
                borderWidth: 2,
              },

            "&.Mui-focused:hover:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: p.light,
                borderWidth: 2,
              },

            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.light,
            },

            "&.Mui-error:hover:not(.Mui-disabled):not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: theme.palette.error.light,
              },

            "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.light,
              borderWidth: 2,
            },

            "&.Mui-focusVisible": {
              outline: "var(--ds-focus-ring-width) solid var(--ds-focus-ring)",
              outlineOffset: "var(--ds-focus-ring-offset)",
            },

            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--ds-border-subtle)",
            },

            "&:has(input[readonly]) .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--ds-border-subtle)",
            },

            "&:has(input[readonly]):hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--ds-border-subtle)",
            },
          };
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }: ThemeOnlyArgs): CSSObject => ({
          "&:not(.MuiInputLabel-shrink)": {
            color: theme.palette.text.secondary,
          },

          "&.Mui-disabled:not(.MuiInputLabel-shrink)": {
            color: theme.palette.text.disabled,
          },

          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },

          "&.Mui-focused.MuiFormLabel-colorSecondary": {
            color: theme.palette.secondary.main,
          },

          "&.Mui-focused.MuiFormLabel-colorSuccess": {
            color: theme.palette.success.main,
          },

          "&.Mui-focused.MuiFormLabel-colorWarning": {
            color: theme.palette.warning.main,
          },

          "&.Mui-focused.MuiFormLabel-colorError": {
            color: theme.palette.error.main,
          },

          "&.Mui-focused.MuiFormLabel-colorInfo": {
            color: theme.palette.info.main,
          },

          "&.Mui-focused.Mui-error": {
            color: theme.palette.error.main,
          },

          "&.Mui-disabled": {
            color: theme.palette.text.disabled,
          },
        }),
      },
    },

    MuiTab: {
      styleOverrides: {
        root: ({ theme }: OverrideArgs<TabProps>): CSSObject => ({
          textTransform: "none",
          color: theme.palette.text.secondary,
          fontWeight: 500,
          minHeight: 44,

          "&:hover": {
            color: theme.palette.text.primary,
            boxShadow: getOverlayInset(),
          },

          "&.Mui-selected": {
            color: theme.palette.primary.main,
            fontWeight: 600,
          },

          "&.Mui-disabled": {
            color: theme.palette.text.disabled,
          },

          "&.Mui-focusVisible, &:focus-visible": {
            outline: "var(--ds-focus-ring-width) solid var(--ds-focus-ring)",
            outlineOffset: "-2px",
          },
        }),
      },
    },

    MuiAlert: {
      /**
       * Alerts use status intents only. Filled alerts use solid/onSolid; standard and
       * outlined alerts use container/onContainer.
       */
      styleOverrides: {
        root: ({ ownerState, theme }: OverrideArgs<AlertProps>): CSSObject => {
          const severity = getIntentFromColourProp(
            ownerState.severity,
            "success",
          );
          const p = getIntentPalette(theme, severity);

          const common: CSSObject = {
            borderRadius: 8,
            alignItems: "flex-start",

            "& .MuiAlert-icon": {
              color: "currentColor",
              opacity: 1,
            },

            "& .MuiAlert-action": {
              color: "inherit",

              "& .MuiIconButton-root:hover": {
                boxShadow: getOverlayInset(),
              },
            },
          };

          if (ownerState.variant === "filled") {
            return {
              ...common,
              backgroundColor: p.solid,
              color: p.onSolid,
            };
          }

          if (ownerState.variant === "outlined") {
            return {
              ...common,
              backgroundColor: p.container,
              color: p.onContainer,
              border: `1px solid ${p.light}`,
            };
          }

          return {
            ...common,
            backgroundColor: p.container,
            color: p.onContainer,
            border: "1px solid var(--ds-border)",
          };
        },
      },
    },

    /**
     * Progress indicators use intent `main` as an activity signal, not a filled
     * surface. This keeps them visually lighter than buttons or alerts.
     */
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 999,
          overflow: "hidden",
          backgroundColor: "var(--ds-surface-container-high)",
        },

        bar: ({
          ownerState,
          theme,
        }: OverrideArgs<LinearProgressProps>): CSSObject => {
          const colour = getIntentFromColourProp(ownerState.color);
          const p = getIntentPalette(theme, colour);

          return {
            backgroundColor: p.main,
          };
        },
      },
    },

    MuiCircularProgress: {
      styleOverrides: {
        root: ({
          ownerState,
          theme,
        }: OverrideArgs<CircularProgressProps>): CSSObject => {
          const colour = getIntentFromColourProp(ownerState.color);
          const p = getIntentPalette(theme, colour);

          return {
            color: p.main,
          };
        },
      },
    },

    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--ds-surface-container-high)",
        },

        wave: {
          backgroundColor: "var(--ds-surface-container-high)",
          position: "relative",
          overflow: "hidden",

          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            transform: "translateX(-100%)",
            backgroundImage:
              "linear-gradient(90deg, transparent, var(--ds-overlay-hover), transparent)",
          },
        },
      },
    },

    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiSnackbarContent-root, & .MuiAlert-root": {
            minWidth: 320,
            maxWidth: 560,
          },
        },
      },
    },

    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--ds-surface-container)",
          color: "var(--ds-on-surface)",
          border: "1px solid var(--ds-border)",
          borderRadius: 8,
        },

        message: {
          padding: "8px 0",
        },

        action: {
          color: "inherit",

          "& .MuiIconButton-root:hover": {
            boxShadow: getOverlayInset(),
          },
        },
      },
    },

    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: ({
          ownerState,
          theme,
        }: OverrideArgs<CheckboxProps>): CSSObject => {
          const rawColour = ownerState.color ?? "primary";
          const isDefault = rawColour === "default";
          const colour = getIntentFromColourProp(rawColour);

          const p = !isDefault ? getIntentPalette(theme, colour) : null;

          return {
            color: "var(--ds-on-surface-variant)",
            borderRadius: 8,

            "&:hover": {
              backgroundColor: "var(--ds-overlay-hover)",
            },

            ...getFocusOutline(),

            "&.Mui-checked": {
              color: isDefault ? "var(--ds-on-surface)" : p?.main,
            },

            "&.MuiCheckbox-indeterminate": {
              color: isDefault ? "var(--ds-on-surface)" : p?.main,
            },

            "&.Mui-disabled": {
              color: "var(--ds-action-disabled)",
            },
          };
        },
      },
    },

    MuiRadio: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: ({ ownerState, theme }: OverrideArgs<RadioProps>): CSSObject => {
          const rawColour = ownerState.color ?? "primary";
          const isDefault = rawColour === "default";
          const colour = getIntentFromColourProp(rawColour);

          const p = !isDefault ? getIntentPalette(theme, colour) : null;

          return {
            color: "var(--ds-on-surface-variant)",
            borderRadius: "50%",

            "&:hover": {
              backgroundColor: "var(--ds-overlay-hover)",
            },

            ...getFocusOutline(),

            "&.Mui-checked": {
              color: isDefault ? "var(--ds-on-surface)" : p?.main,
            },

            "&.Mui-disabled": {
              color: "var(--ds-action-disabled)",
            },
          };
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "var(--ds-surface-container)",
        },

        stickyHeader: {
          backgroundColor: "var(--ds-surface-container)",
          borderBottom: "1px solid var(--ds-border-emphasis)",
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--ds-surface)",
          boxShadow: "none",
        },
      },
    },
  },
});

/**
 * Backwards-compatible factory for older call sites.
 *
 * Mode is now controlled through MUI colour schemes and `html[data-mode]`, so
 * the same theme object is returned for both modes.
 */
export const createDiamondTheme = (_mode?: DSMode): Theme =>
  DiamondDSTheme as Theme;

/**
 * Pre-built theme for convenience.
 */
export { DiamondDSTheme };

/**
 * Backwards compatibility aliases. Prefer `DiamondDSTheme` for new code.
 */
export const DiamondDSThemeDark = DiamondDSTheme;
export const createMuiTheme = createDiamondTheme;
