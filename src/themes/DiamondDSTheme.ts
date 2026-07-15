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
import "../styles/diamondDS/DiamondDSTokens.css";

// Enables `theme.vars` typings for MUI CSS variable themes.
import type {} from "@mui/material/themeCssVarsAugmentation";
import { extendTheme } from "@mui/material/styles";
import type { CSSObject, PaletteColor, Theme } from "@mui/material/styles";

/**
 * Component prop types are used to type `ownerState` inside MUI style overrides.
 */
import type { AlertProps } from "@mui/material/Alert";
import type { ButtonProps } from "@mui/material/Button";
import type { ToggleButtonProps } from "@mui/material/ToggleButton";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { ChipProps } from "@mui/material/Chip";
import type { CircularProgressProps } from "@mui/material/CircularProgress";
import type { LinearProgressProps } from "@mui/material/LinearProgress";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import type { RadioProps } from "@mui/material/Radio";

import logoImageLightSurface from "../public/diamond/logo-light-surface.svg";
import logoImageDarkSurface from "../public/diamond/logo-dark-surface.svg";
import logoShort from "../public/diamond/logo-short.svg";
import type { ImageColourSchemeSwitchType } from "components/controls/ImageColourSchemeSwitch";

/**
 * Standard argument shape for MUI style override callbacks.
 */
type OverrideArgs<OwnerState = unknown> = {
  ownerState: OwnerState;
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
 * MUI-compatible palette colours generated for supported DiamondDS intents.
 *
 * These are adapter values for MUI APIs. DiamondDS-specific roles such as
 * container, solid and accent should be consumed directly as `var(--ds-*)`
 * tokens in component overrides.
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

type BrandPaletteColor = PaletteColor & {
  /**
   * Optional fixed brand roles for persistent Diamond identity accents.
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
    /** Adding more subtleties to text colours */
    tertiary?: string;
    muted?: string;

    /** Input placeholder text. Kept here for MUI compatibility. */
    placeholder?: string;
    placeholderFocus?: string;

    /** Text/icons placed on solid coloured surfaces. */
    onSolid?: string;
    primaryChannel?: string;
    secondaryChannel?: string;
  }

  interface TypeTextOptions {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    muted?: string;
    disabled?: string;
    placeholder?: string;
    placeholderFocus?: string;
    onSolid?: string;
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
      elevated: (level: number) => string;
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

  /**
   * DiamondDS semantic colour roles exposed on MUI palette colours.
   *
   * These mirror CSS tokens for developer ergonomics. CSS variables remain the
   * source of truth.
   */
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

type PaletteAdapter = {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
};

/*  MUI palette adapter values.

    These are parseable colours for MUI and third-party libraries that call
    alpha(), lighten(), or darken() on standard palette slots.

    They are replicated in the CSS variable layer, which remains the source of truth for DiamondDS 
    component styling, and use semantic `var(--ds-*)` tokens.

    Light: accent/focus-adjacent role 
    Main: default semantic/text colour
    Dark: stronger emphasis role, not simply a darker colour
    contrastText: foreground on default semantic colour (if used as a background)

    Note: in dark mode, `dark` may be visually lighter. In DiamondDS this
    represents stronger emphasis, not a literal darker shade.
*/
const paletteAdapterValues: Record<DSMode, Record<string, PaletteAdapter>> = {
  light: {
    primary: {
      light: "#6a86e4", // --ds-primary-accent
      main: "#2a4db8", // --ds-primary
      dark: "#1f3d96", // --ds-primary-emphasis
      contrastText: "#ffffff", // --ds-on-primary
    },
    secondary: {
      light: "#27adb7", // --ds-secondary-accent
      main: "#007b84", // --ds-secondary
      dark: "#005f67", // --ds-secondary-emphasis
      contrastText: "#ffffff", // --ds-on-secondary
    },
    danger: {
      light: "#d94f45", // --ds-danger-accent
      main: "#b42318", // --ds-danger
      dark: "#912018", // --ds-danger-emphasis
      contrastText: "#ffffff", // --ds-on-danger
    },
    warning: {
      light: "#e98a15", // --ds-warning-accent
      main: "#c96a04", // --ds-warning
      dark: "#a95703", // --ds-warning-emphasis
      contrastText: "#ffffff", // --ds-on-warning
    },
    success: {
      light: "#2fb344", // --ds-success-accent
      main: "#187a2f", // --ds-success
      dark: "#146125", // --ds-success-emphasis
      contrastText: "#ffffff", // --ds-on-success
    },
    info: {
      light: "#6f8fe8", // --ds-info-accent
      main: "#355ec9", // --ds-info
      dark: "#2a4ea7", // --ds-info-emphasis
      contrastText: "#ffffff", // --ds-on-info
    },
  },

  dark: {
    // same as light mode, but with different values
    primary: {
      light: "#a5bcff",
      main: "#8aa7ff",
      dark: "#c4d4ff",
      contrastText: "#0b1638",
    },
    secondary: {
      light: "#7be4ea",
      main: "#58d6de",
      dark: "#9af0f3",
      contrastText: "#002529",
    },
    danger: {
      light: "#ffb0aa",
      main: "#ff9088",
      dark: "#ffc7c2",
      contrastText: "#2f0907",
    },
    warning: {
      light: "#ffc68a",
      main: "#ffb067",
      dark: "#ffd9b0",
      contrastText: "#311700",
    },
    success: {
      light: "#8ae5a2",
      main: "#6fd88a",
      dark: "#b3f0c0",
      contrastText: "#08210f",
    },
    info: {
      light: "#bccdff",
      main: "#9fb7ff",
      dark: "#d5e0ff",
      contrastText: "#101936",
    },
  },
};

/**
 * Type guard that checks whether a value is a supported semantic intent.
 *
 * Returning `colour is IntentColour` allows TypeScript to safely narrow the
 * type after this check succeeds.
 */
const isIntentColour = (colour: unknown): colour is IntentColour =>
  typeof colour === "string" && intentColours.includes(colour as IntentColour);

/**
 * Creates a MUI-compatible palette colour from adapter values.
 *
 * CSS variables remain the source of truth. The MUI palette is an adapter layer
 * that lets component overrides use stable semantic names, while standard MUI slots
 * receive parseable fallback values.
 *
 * MUI mapping follows the DiamondDS/Radix-style role logic:
 * - light        -> accent / focus-adjacent role
 * - main         -> default semantic and text colour
 * - dark         -> stronger emphasis role, not simply a darker colour
 * - container    -> subtle semantic surface
 * - onContainer  -> foreground on subtle semantic surface
 * - solid        -> filled interactive surface
 * - onSolid      -> foreground on filled interactive surface
 */
const createPaletteColour = (
  tokenName: string,
  mode: DSMode,
): ExtendedPaletteColor => {
  const paletteAdapter = paletteAdapterValues[mode][tokenName];

  return {
    light: paletteAdapter.light, // --ds-${tokenName}-accent
    main: paletteAdapter.main, // --ds-${tokenName}
    dark: paletteAdapter.dark, // --ds-${tokenName}-emphasis
    contrastText: paletteAdapter.contrastText, // --ds-on-${tokenName}

    container: `var(--ds-${tokenName}-container)`,
    onContainer: `var(--ds-on-${tokenName}-container)`,
    solid: `var(--ds-${tokenName}-solid)`,
    onSolid: `var(--ds-on-${tokenName}-solid)`,

    mainChannel: `var(--ds-${tokenName}-mainChannel)`,
    lightChannel: `var(--ds-${tokenName}-lightChannel)`,
    darkChannel: `var(--ds-${tokenName}-darkChannel)`,
    contrastTextChannel: `var(--ds-on-${tokenName}-channel)`,
  };
};

/**
 * Creates the DiamondDS brand palette adapter.
 *
 * Brand includes the regular semantic palette roles plus fixed brand roles.
 * Fixed roles remain stable across light and dark mode and should only be used
 * for persistent Diamond identity surfaces or accents.
 */
const createBrandPaletteColour = (): BrandPaletteColor => ({
  light: "var(--ds-brand-accent)",
  main: "var(--ds-brand)",
  dark: "var(--ds-brand-emphasis)",
  contrastText: "var(--ds-on-brand)",

  container: "var(--ds-brand-container)",
  onContainer: "var(--ds-on-brand-container)",
  solid: "var(--ds-brand-solid)",
  onSolid: "var(--ds-on-brand-solid)",

  contrastTextChannel: "var(--ds-on-brand-channel)",
  mainChannel: "var(--ds-brand-mainChannel)",
  lightChannel: "var(--ds-brand-lightChannel)",
  darkChannel: "var(--ds-brand-darkChannel)",

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
 * Builds the MUI-compatible intent palette for a colour scheme.
 */
const createIntentPalette = (mode: DSMode): IntentPaletteRecord => ({
  primary: createPaletteColour(intentTokenName.primary, mode),
  secondary: createPaletteColour(intentTokenName.secondary, mode),
  error: createPaletteColour(intentTokenName.error, mode),
  warning: createPaletteColour(intentTokenName.warning, mode),
  success: createPaletteColour(intentTokenName.success, mode),
  info: createPaletteColour(intentTokenName.info, mode),
});

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
  const intentPalette = createIntentPalette(mode);

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
      tertiary: "var(--ds-on-surface-subtle)",
      muted: "var(--ds-on-surface-muted)",
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
     * Divider is the default border role for general structure and separation.
     * Border.subtle is a semantic utility role for components that need to reference a border colour directly.
     * Border.emphasis is an emphasised border role for actionable elements and highlighted states.
     * Border.strong is a stronger border role for hover and focus states.
     *
     */
    divider: "var(--ds-border-subtle)",
    dividerChannel: "var(--ds-border-subtle-channel)",

    border: {
      subtle: "var(--ds-border-subtle)",
      emphasis: "var(--ds-border-emphasis)",
      strong: "var(--ds-border-strong)",
    },

    surface: {
      subtle: "var(--ds-surface-container)",
      strong: "var(--ds-surface-container-high)",
      elevated: (level: number) =>
        `var(--ds-elevation-${Math.max(0, Math.min(24, level))})`,
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
      src: logoImageLightSurface,
      srcDark: logoImageDarkSurface ?? logoImageLightSurface,
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
     *   MuiButtonGroup      → selection, border and hover states
     *
     * Inputs and forms:
     *   MuiInputBase        → placeholder behaviour
     *   MuiOutlinedInput    → border priority and validation states
     *   MuiInputLabel       → label response to focus and validation
     *
     * Navigation and display:
     *   MuiTabs             → height
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
        root: ({ ownerState }: OverrideArgs<ButtonProps>): CSSObject => {
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
            if (variant === "outlined") {
              return {
                ...base,
                ...getFocusOutline(),

                color: "inherit",
                backgroundColor: "transparent",
                border: "1px solid var(--ds-border-emphasis)",

                "&:hover": {
                  backgroundColor: "var(--ds-overlay-hover)",
                  borderColor: "var(--ds-border-strong)",
                  boxShadow: getOverlayInset(),
                },

                "&:active": {
                  borderColor: "var(--ds-border-strong)",
                  boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
                },

                "&.Mui-disabled": {
                  ...getDisabledControlStyles(),
                  borderColor: "var(--ds-border-subtle)",
                },
              };
            }

            if (variant === "contained") {
              return {
                ...base,
                ...getFocusOutline(),
              };
            }

            return {
              ...base,
              ...getFocusOutline(),

              color: "inherit",

              "&.Mui-disabled": {
                color: "var(--ds-on-surface-disabled)",
              },
            };
          }

          const colour = getIntentFromColourProp(rawColour);
          const tokenName = colour === "error" ? "danger" : colour;

          const main = `var(--ds-${tokenName})`;
          const accent = `var(--ds-${tokenName}-accent)`;
          const emphasis = `var(--ds-${tokenName}-emphasis)`;
          const container = `var(--ds-${tokenName}-container)`;
          const onContainer = `var(--ds-on-${tokenName}-container)`;
          const solid = `var(--ds-${tokenName}-solid)`;
          const onSolid = `var(--ds-on-${tokenName}-solid)`;

          if (variant === "contained") {
            return {
              ...base,

              backgroundColor: solid,
              color: onSolid,

              ...getInteractiveSurfaceStateStyles(
                solid,
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

              color: onContainer,
              backgroundColor: container,
              border: `1px solid ${accent}`,

              ...getInteractiveSurfaceStateStyles(container),

              "&:hover": {
                backgroundColor: container,
                borderColor: main,
                boxShadow: getOverlayInset(),
              },

              "&:active": {
                backgroundColor: container,
                borderColor: emphasis,
                boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
              },

              "&.Mui-disabled": {
                ...getDisabledControlStyles(),
                borderColor: "var(--ds-border-subtle)",
              },
            };
          }

          if (variant === "text") {
            return {
              ...base,
              ...getFocusOutline(),

              color: main,

              "&:hover": {
                backgroundColor: container,
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
          const tokenName = colour === "error" ? "danger" : colour;

          return {
            color: `var(--ds-${tokenName})`,

            "&:hover": {
              backgroundColor: `var(--ds-${tokenName}-container)`,
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
        root: ({ ownerState }: OverrideArgs<ToggleButtonProps>): CSSObject => {
          const colour = ownerState?.color ?? "standard";
          const isPrimary = colour === "primary";

          return {
            textTransform: "none",
            border: "1px solid var(--ds-border-emphasis)",

            color: "inherit",

            "&:hover": {
              borderColor: "var(--ds-border-strong)",
              boxShadow: getOverlayInset(),
            },

            "&.Mui-selected": {
              backgroundColor: isPrimary
                ? "var(--ds-primary-container)"
                : "var(--ds-overlay-selected)",

              color: isPrimary ? "var(--ds-on-primary-container)" : "inherit",

              borderColor: isPrimary
                ? "var(--ds-primary-accent)"
                : "var(--ds-border-strong)",
            },

            "&.Mui-selected:hover": {
              backgroundColor: isPrimary
                ? "var(--ds-primary-container)"
                : "var(--ds-overlay-selected)",

              borderColor: isPrimary
                ? "var(--ds-primary)"
                : "var(--ds-border-strong)",

              boxShadow: getOverlayInset(),
            },

            "&.Mui-disabled": {
              color: "var(--ds-on-surface-disabled)",
              borderColor: "var(--ds-border-subtle)",
              boxShadow: "none",
            },
          };
        },
      },
    },

    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },

        contained: {
          boxShadow: "none",
        },

        grouped: {
          boxShadow: "none",

          "&.Mui-disabled": {
            boxShadow: "none",
          },
        },

        groupedContained: {
          boxShadow: "none",

          "&:hover": {
            boxShadow: getOverlayInset("var(--ds-overlay-hover-solid)"),
          },

          "&:active": {
            boxShadow: getOverlayInset("var(--ds-overlay-selected)"),
          },

          "&.Mui-disabled": {
            color: "var(--ds-on-surface-disabled)",
            borderColor: "var(--ds-border-subtle)",
          },
        },
      },
    },

    MuiChip: {
      /**
       * Chip supports both neutral metadata and semantic status/action usage.
       *
       * Interactive chips receive focus and overlay states; static chips remain calm.
       */
      styleOverrides: {
        root: ({ ownerState }: OverrideArgs<ChipProps>): CSSObject => {
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
          const tokenName = colour === "error" ? "danger" : colour;

          const accent = `var(--ds-${tokenName}-accent)`;
          const container = `var(--ds-${tokenName}-container)`;
          const onContainer = `var(--ds-on-${tokenName}-container)`;
          const solid = `var(--ds-${tokenName}-solid)`;
          const onSolid = `var(--ds-on-${tokenName}-solid)`;

          if (isOutlined) {
            return {
              ...base,
              ...(isInteractive ? getFocusOutline() : {}),

              color: onContainer,
              borderColor: accent,
              backgroundColor: container,

              ...(isInteractive && {
                ...getInteractiveSurfaceStateStyles(container),

                "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                  {
                    backgroundColor: container,
                    borderColor: accent,
                    boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                  },

                "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                  {
                    backgroundColor: container,
                    borderColor: accent,
                    boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                  },
              }),
            };
          }

          return {
            ...base,
            ...(isInteractive ? getFocusOutline() : {}),

            color: onSolid,
            backgroundColor: solid,

            ...(isInteractive && {
              ...getInteractiveSurfaceStateStyles(
                solid,
                "var(--ds-overlay-hover-solid)",
              ),

              "&&.MuiChip-clickable.Mui-focusVisible, &&.MuiChip-deletable.Mui-focusVisible":
                {
                  backgroundColor: solid,
                  boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                },

              "&&.MuiChip-clickable.Mui-focusVisible:hover, &&.MuiChip-deletable.Mui-focusVisible:hover":
                {
                  backgroundColor: solid,
                  boxShadow: getOverlayInset("var(--ds-overlay-focus)"),
                },
            }),
          };
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: (): CSSObject => ({
          "&::placeholder": {
            color: "var(--ds-placeholder)",
            opacity: 1,
          },

          "&::-webkit-input-placeholder": {
            color: "var(--ds-placeholder)",
            opacity: 1,
          },

          "&::-moz-placeholder": {
            color: "var(--ds-placeholder)",
            opacity: 1,
          },

          "&:focus::placeholder": {
            color: "var(--ds-placeholder-focus)",
          },

          "&:focus::-webkit-input-placeholder": {
            color: "var(--ds-placeholder-focus)",
            opacity: 1,
          },

          "&:focus::-moz-placeholder": {
            color: "var(--ds-placeholder-focus)",
            opacity: 1,
          },
        }),

        root: (): CSSObject => ({
          /** Error and disabled placeholder states win over normal focus. */
          "&.Mui-error input::placeholder, &.Mui-error input::-webkit-input-placeholder, &.Mui-error input::-moz-placeholder":
            {
              color: "var(--ds-danger-accent)",
              opacity: 1,
            },

          "&.Mui-disabled input::placeholder, &.Mui-disabled input::-webkit-input-placeholder, &.Mui-disabled input::-moz-placeholder":
            {
              color: "var(--ds-on-surface-disabled)",
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
        root: ({ ownerState }: OverrideArgs<OutlinedInputProps>): CSSObject => {
          const colour = getIntentFromColourProp(ownerState.color);
          const tokenName = colour === "error" ? "danger" : colour;
          const accent = `var(--ds-${tokenName}-accent)`;

          return {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--ds-border-emphasis)",
            },

            "&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "var(--ds-border-strong)",
              },

            "&.Mui-focused:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: accent,
                borderWidth: 2,
              },

            "&.Mui-focused:hover:not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: accent,
                borderWidth: 2,
              },

            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--ds-danger-accent)",
            },

            "&.Mui-error:hover:not(.Mui-disabled):not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "var(--ds-danger-accent)",
              },

            "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--ds-danger-accent)",
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
        root: (): CSSObject => ({
          "&:not(.MuiInputLabel-shrink)": {
            color: "var(--ds-on-surface-variant)",
          },

          "&.Mui-disabled:not(.MuiInputLabel-shrink)": {
            color: "var(--ds-on-surface-disabled)",
          },

          "&.Mui-focused": {
            color: "var(--ds-primary)",
          },

          "&.Mui-focused.MuiFormLabel-colorSecondary": {
            color: "var(--ds-secondary)",
          },

          "&.Mui-focused.MuiFormLabel-colorSuccess": {
            color: "var(--ds-success)",
          },

          "&.Mui-focused.MuiFormLabel-colorWarning": {
            color: "var(--ds-warning)",
          },

          "&.Mui-focused.MuiFormLabel-colorError": {
            color: "var(--ds-danger)",
          },

          "&.Mui-focused.MuiFormLabel-colorInfo": {
            color: "var(--ds-info)",
          },

          "&.Mui-focused.Mui-error": {
            color: "var(--ds-danger)",
          },

          "&.Mui-disabled": {
            color: "var(--ds-on-surface-disabled)",
          },
        }),
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: (): CSSObject => ({
          "&:has(.MuiAvatar-fallback)": {
            backgroundColor: "var(--ds-surface-container-high)",
            color: "var(--ds-on-surface)",
          },
        }),
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 44,
        },
        indicator: {
          backgroundColor: "var(--ds-primary-accent)",
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: (): CSSObject => ({
          textTransform: "none",
          color: "var(--ds-on-surface-variant)",
          fontWeight: 500,
          minHeight: 44,

          "&:hover": {
            color: "var(--ds-on-surface)",
            backgroundColor: "var(--ds-surface-container-high)",
          },

          "&.Mui-selected": {
            color: "var(--ds-primary)",
            borderBottom: "2px solid var(--ds-primary)",
            fontWeight: 600,
            backgroundColor: "inherit",
          },

          "&.Mui-disabled": {
            color: "var(--ds-on-surface-disabled)",
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
        root: ({ ownerState }: OverrideArgs<AlertProps>): CSSObject => {
          const severity = getIntentFromColourProp(
            ownerState.severity,
            "success",
          );
          const tokenName = severity === "error" ? "danger" : severity;

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
              backgroundColor: `var(--ds-${tokenName}-solid)`,
              color: `var(--ds-on-${tokenName}-solid)`,
            };
          }

          if (ownerState.variant === "outlined") {
            return {
              ...common,
              backgroundColor: `var(--ds-${tokenName}-container)`,
              color: `var(--ds-on-${tokenName}-container)`,
              border: `1px solid var(--ds-${tokenName}-accent)`,
            };
          }

          return {
            ...common,
            backgroundColor: `var(--ds-${tokenName}-container)`,
            color: `var(--ds-on-${tokenName}-container)`,
            border: "1px solid var(--ds-border-subtle)",
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

        bar: ({ ownerState }: OverrideArgs<LinearProgressProps>): CSSObject => {
          const colour = getIntentFromColourProp(ownerState.color);
          const tokenName = colour === "error" ? "danger" : colour;

          return {
            backgroundColor: `var(--ds-${tokenName})`,
          };
        },
      },
    },

    MuiCircularProgress: {
      styleOverrides: {
        root: ({
          ownerState,
        }: OverrideArgs<CircularProgressProps>): CSSObject => {
          const colour = getIntentFromColourProp(ownerState.color);
          const tokenName = colour === "error" ? "danger" : colour;

          return {
            color: `var(--ds-${tokenName})`,
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
          border: "1px solid var(--ds-border-subtle)",
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
        root: ({ ownerState }: OverrideArgs<CheckboxProps>): CSSObject => {
          const rawColour = ownerState.color ?? "primary";
          const isDefault = rawColour === "default";
          const colour = getIntentFromColourProp(rawColour);
          const tokenName = colour === "error" ? "danger" : colour;
          const checkedColour = isDefault
            ? "var(--ds-on-surface)"
            : `var(--ds-${tokenName})`;

          return {
            color: "var(--ds-on-surface-variant)",
            borderRadius: 8,

            "&:hover": {
              backgroundColor: "var(--ds-overlay-hover)",
            },

            ...getFocusOutline(),

            "&.Mui-checked": {
              color: checkedColour,
            },

            "&.MuiCheckbox-indeterminate": {
              color: checkedColour,
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
        root: ({ ownerState }: OverrideArgs<RadioProps>): CSSObject => {
          const rawColour = ownerState.color ?? "primary";
          const isDefault = rawColour === "default";
          const colour = getIntentFromColourProp(rawColour);
          const tokenName = colour === "error" ? "danger" : colour;
          const checkedColour = isDefault
            ? "var(--ds-on-surface)"
            : `var(--ds-${tokenName})`;

          return {
            color: "var(--ds-on-surface-variant)",
            borderRadius: "50%",

            "&:hover": {
              backgroundColor: "var(--ds-overlay-hover)",
            },

            ...getFocusOutline(),

            "&.Mui-checked": {
              color: checkedColour,
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
