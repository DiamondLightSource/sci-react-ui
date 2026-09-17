import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Tooltip, Typography } from "../MuiWrapped";
import { colourSet } from "../../../utils/diamond";
import { TypographyProps } from "@mui/material/Typography";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const textSizes: TypographyProps["variant"][] = [
  "h1Display",
  "h2Display",
  "h3Display",
  "h4Display",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "lead",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "overline",
  "overlineSmall",
  "caption",
  "meta",
  "mono1",
  "mono2",
  "mono3",
  "button",
];

// Grouped by rendered font-size (largest to smallest), per the
// --ds-font-size-* scale, independent of semantic category or font family.
// See VariantGuide for the semantic/grouped tour of the same variants.
const sizeRamp: {
  px: number;
  variants: NonNullable<TypographyProps["variant"]>[];
}[] = [
  { px: 72, variants: ["h1Display"] },
  { px: 48, variants: ["h1", "h2Display"] },
  { px: 34, variants: ["h2", "h3Display"] },
  { px: 32, variants: ["h3"] },
  { px: 28, variants: ["h4", "h4Display"] },
  { px: 20, variants: ["h5", "lead"] },
  { px: 18, variants: ["h6"] },
  { px: 16, variants: ["body1", "subtitle1", "mono1"] },
  { px: 14, variants: ["body2", "subtitle2", "mono2", "button"] },
  { px: 12, variants: ["overline", "caption", "meta", "mono3"] },
  { px: 11, variants: ["overlineSmall"] },
];

const fontWeightScale: { token: string; label: string; value: string }[] = [
  { token: "--ds-font-weight-light", label: "Light", value: "300" },
  { token: "--ds-font-weight-regular", label: "Regular", value: "400" },
  { token: "--ds-font-weight-medium", label: "Medium", value: "500" },
  { token: "--ds-font-weight-semibold", label: "Semibold", value: "600" },
  { token: "--ds-font-weight-bold", label: "Bold", value: "700" },
];

const lineHeightScale: { token: string; label: string; value: string }[] = [
  { token: "--ds-line-height-tight", label: "Tight", value: "1.1" },
  { token: "--ds-line-height-condensed", label: "Condensed", value: "1.2" },
  { token: "--ds-line-height-normal", label: "Normal", value: "1.4" },
  { token: "--ds-line-height-relaxed", label: "Relaxed", value: "1.5" },
];

const letterSpacingScale: { token: string; label: string; value: string }[] = [
  { token: "--ds-letter-spacing-tight", label: "Tight", value: "-0.03em" },
  {
    token: "--ds-letter-spacing-condensed",
    label: "Condensed",
    value: "-0.01em",
  },
  { token: "--ds-letter-spacing-normal", label: "Normal", value: "0" },
  { token: "--ds-letter-spacing-wide", label: "Wide", value: "0.08em" },
];

type VariantGuideEntry = {
  variant: NonNullable<TypographyProps["variant"]>;
  note: string | string[];
};

type VariantGuideGroup = {
  group: string;
  fontFace: "Outfit" | "Inter" | "IBM Plex Mono";
  entries: VariantGuideEntry[];
};

const variantGuide: VariantGuideGroup[] = [
  {
    group: "Display",
    fontFace: "Outfit",
    entries: [
      {
        variant: "h1Display",
        note: [
          "Largest display heading. Use sparingly for landing pages, welcome screens and documentation hero areas.",
          "Not for application structure.",
        ],
      },
      {
        variant: "h2Display",
        note: "Secondary display heading for hero and high-level introductory areas.",
      },
      {
        variant: "h3Display",
        note: "Smaller display heading for supporting hero content.",
      },
      {
        variant: "h4Display",
        note: "Smallest display heading, still reserved for display contexts rather than in-app hierarchy.",
      },
    ],
  },
  {
    group: "Headings",
    fontFace: "Inter",
    entries: [
      {
        variant: "h1",
        note: [
          "Top-level heading for application and document structure.",
          "Use one per page.",
        ],
      },
      {
        variant: "h2",
        note: "Section heading, level below h1.",
      },
      {
        variant: "h3",
        note: [
          "Subsection heading.",
          "Also common for a group, panel or listing heading if that's the right depth on the page.",
        ],
      },
      {
        variant: "h4",
        note: "Heading one level below h3, e.g. a card or settings block title nested inside a subsection.",
      },
      {
        variant: "h5",
        note: "Minor heading for dense layouts, one level below h4.",
      },
      {
        variant: "h6",
        note: "Smallest heading, for compact groupings within dense UI.",
      },
    ],
  },
  {
    group: "Body",
    fontFace: "Inter",
    entries: [
      {
        variant: "lead",
        note: "Introductory paragraph that sets up a page or section before body copy.",
      },
      {
        variant: "body1",
        note: "Default body copy for prose and explanatory content.",
      },
      {
        variant: "body2",
        note: "Secondary body copy, slightly smaller than body1.",
      },
      {
        variant: "subtitle1",
        note: "Supporting heading or structured content above body text.",
      },
      {
        variant: "subtitle2",
        note: "Compact supporting heading or structured content.",
      },
    ],
  },
  {
    group: "Utility",
    fontFace: "Inter",
    entries: [
      {
        variant: "overline",
        note: "Uppercase grouping label above a heading, e.g. to introduce a section or card.",
      },
      {
        variant: "overlineSmall",
        note: "Compact grouping label for dense panels and cards.",
      },
      {
        variant: "caption",
        note: "Small explanatory or supporting text, e.g. helper text or figure captions.",
      },
      {
        variant: "meta",
        note: "Compact operational information: status bars, timestamps, counts, connection state.",
      },
    ],
  },
  {
    group: "Mono",
    fontFace: "IBM Plex Mono",
    entries: [
      {
        variant: "mono1",
        note: "Technical values where alignment or precision matters: IDs, timestamps, numeric values.",
      },
      {
        variant: "mono2",
        note: "Compact technical values, e.g. dense table cells or inline metadata.",
      },
      {
        variant: "mono3",
        note: "Smallest mono size, for the densest technical listings.",
      },
    ],
  },
];

type ColourGuideEntry = {
  color: NonNullable<TypographyProps["color"]>;
  swatch: string;
  note: string | string[];
  demoBackground?: string;
};

type ColourGuideGroup = {
  group: string;
  entries: ColourGuideEntry[];
};

const colourGuide: ColourGuideGroup[] = [
  {
    group: "Palette intents",
    entries: [
      {
        color: "primary",
        swatch: "primary.main",
        note: "Primary actions: buttons, links, active state, key interactive elements.",
      },
      {
        color: "secondary",
        swatch: "secondary.main",
        note: "Secondary actions: less prominent buttons and interactive elements alongside a primary action.",
      },
      {
        color: "success",
        swatch: "success.main",
        note: "Positive or successful status.",
      },
      {
        color: "error",
        swatch: "error.main",
        note: "Errors, destructive actions, validation failures.",
      },
      {
        color: "warning",
        swatch: "warning.main",
        note: "Warnings and states needing caution.",
      },
      {
        color: "info",
        swatch: "info.main",
        note: "Informational status, neutral notices.",
      },
    ],
  },
  {
    group: "Brand",
    entries: [
      {
        color: "brand",
        swatch: "brand.main",
        note: [
          "Diamond identity and accent colour, for recognition and selected visual highlights.",
          "Not a status or action signal (prefer a palette intent for those).",
        ],
      },
    ],
  },
  {
    group: "Text roles",
    entries: [
      {
        color: "text.primary",
        swatch: "text.primary",
        note: "Default text colour for body copy and headings.",
      },
      {
        color: "text.secondary",
        swatch: "text.secondary",
        note: "De-emphasised supporting text, e.g. captions or helper copy.",
      },
      {
        color: "text.tertiary",
        swatch: "text.tertiary",
        note: "Further de-emphasised text, e.g. low-priority metadata.",
      },
      {
        color: "text.muted",
        swatch: "text.muted",
        note: "Muted text for the least prominent content.",
      },
      {
        color: "text.onSolid",
        swatch: "text.onSolid",
        note: "Text and icons placed on a solid, coloured surface, e.g. inside a filled chip or banner.",
        demoBackground: "primary.main",
      },
      {
        color: "text.disabled",
        swatch: "text.disabled",
        note: "Disabled controls and read-only text.",
      },
      {
        color: "text.placeholder",
        swatch: "text.placeholder",
        note: "Placeholder text inside an empty input.",
      },
      {
        color: "text.placeholderFocus",
        swatch: "text.placeholderFocus",
        note: "Placeholder text inside a focused, empty input.",
      },
    ],
  },
];

const meta: Meta<typeof Typography> = {
  title: "MUI/Data Display/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: textSizes,
    },
    color: {
      control: { type: "select" },
      options: [
        ...new Set([
          ...colourSet,
          ...colourGuide.flatMap((group) =>
            group.entries.map((entry) => entry.color),
          ),
        ]),
      ],
    },
    align: {
      control: { type: "select" },
      options: ["inherit", "left", "center", "right", "justify"],
    },
    gutterBottom: { control: "boolean" },
    noWrap: { control: "boolean" },
    paragraph: { control: "boolean" },
    children: { name: "text", control: "text" },
    sx: { control: false },
  },
  args: {
    variant: "body1",
    color: "inherit",
    align: "inherit",
    gutterBottom: false,
    noWrap: false,
    paragraph: false,
    children:
      "The quick brown fox jumps over the lazy dog and again, the quick brown fox jumps over the lazy dog.",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Typography {...args} />,
};

export const VariantGuide: Story = {
  name: "Variant guide",
  parameters: {
    controls: { disable: true },
  },
  render: (_args) => (
    <Stack spacing={4} sx={{ maxWidth: 720 }}>
      {variantGuide.map(({ group, fontFace, entries }) => (
        <Box key={group}>
          <Typography variant="overline" color="text.secondary">
            {group}
          </Typography>
          <Typography variant="caption" color="text.tertiary" component="div">
            Font: {fontFace}
          </Typography>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {entries.map(({ variant, note }) => (
              <Box key={variant}>
                <Typography variant={variant} component="div">
                  {variant}
                </Typography>
                {Array.isArray(note) ? (
                  <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2.5 }}>
                    {note.map((line) => (
                      <Typography
                        key={line}
                        component="li"
                        variant="caption"
                        color="text.secondary"
                      >
                        {line}
                      </Typography>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    {note}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};

export const SizeRamp: Story = {
  name: "Size ramp",
  render: (args) => (
    <Stack spacing={2}>
      {sizeRamp.map(({ px, variants }) => (
        <Box key={px} sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
          <Typography
            variant="mono2"
            color="text.secondary"
            sx={{ width: 40, flexShrink: 0 }}
          >
            {px}px
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{ flexWrap: "wrap", rowGap: 1 }}
          >
            {variants.map((variant) => (
              <Typography key={variant} {...args} variant={variant}>
                {variant}
              </Typography>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};

export const ScaleTokens: Story = {
  name: "Weight, line height & letter spacing",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Weight, line height and letter spacing tokens underpin the typography variants above. Prefer the variants directly — these tokens are for building new variants or components.",
      },
    },
  },
  render: (_args) => (
    <Stack spacing={4} sx={{ maxWidth: 720 }}>
      <Box>
        <Typography variant="overline" color="text.secondary">
          Font weight
        </Typography>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {fontWeightScale.map(({ token, label, value }) => (
            <Box key={token}>
              <Typography variant="mono2" color="text.secondary">
                {label} · {value} · {token}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: `var(${token})`, mt: 0.5 }}
              >
                The quick brown fox jumps over the lazy dog.
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Line height
        </Typography>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {lineHeightScale.map(({ token, label, value }) => (
            <Box key={token}>
              <Typography variant="mono2" color="text.secondary">
                {label} · {value} · {token}
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: `var(${token})`, maxWidth: 320, mt: 0.5 }}
              >
                The quick brown fox jumps over the lazy dog and again, the quick
                brown fox jumps over the lazy dog.
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Letter spacing
        </Typography>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {letterSpacingScale.map(({ token, label, value }) => (
            <Box key={token}>
              <Typography variant="mono2" color="text.secondary">
                {label} · {value} · {token}
              </Typography>
              <Typography
                variant="h6"
                sx={{ letterSpacing: `var(${token})`, mt: 0.5 }}
              >
                Diamond
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  ),
};

export const ColourGuide: Story = {
  name: "Colour guide",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
The \`color\` prop accepts palette intents (\`primary\`, \`secondary\`, \`success\`, \`error\`, \`warning\`, \`info\`) and semantic text roles (\`text.primary\`, \`text.secondary\`, \`text.disabled\`, etc).

Prefer text roles for ordinary body and heading text, and reserve palette intents for content that communicates status or brand emphasis.`,
      },
    },
  },
  render: (_args) => (
    <Stack spacing={4}>
      {colourGuide.map(({ group, entries }) => (
        <Box key={group}>
          <Typography variant="overline" color="text.secondary">
            {group}
          </Typography>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            {entries.map(({ color, swatch, note, demoBackground }) => (
              <Box key={color} sx={{ display: "flex", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    mt: 0.5,
                    flexShrink: 0,
                    borderRadius: "50%",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: swatch,
                  }}
                />
                <Box>
                  <Box
                    sx={
                      demoBackground
                        ? {
                            display: "inline-block",
                            px: 1,
                            py: 0.25,
                            borderRadius: 0.5,
                            bgcolor: demoBackground,
                          }
                        : undefined
                    }
                  >
                    <Typography variant="body1" color={color} component="div">
                      {color}
                    </Typography>
                  </Box>
                  {Array.isArray(note) ? (
                    <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2.5 }}>
                      {note.map((line) => (
                        <Typography
                          key={line}
                          component="li"
                          variant="caption"
                          color="text.secondary"
                        >
                          {line}
                        </Typography>
                      ))}
                    </Stack>
                  ) : (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="div"
                    >
                      {note}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};

export const Alignment: Story = {
  render: (args) => (
    <Stack spacing={1}>
      <Typography {...args} align="left">
        Left aligned
      </Typography>
      <Typography {...args} align="center">
        Centre aligned
      </Typography>
      <Typography {...args} align="right">
        Right aligned
      </Typography>
    </Stack>
  ),
};

export const SemanticLevelVsVisualSize: Story = {
  name: "Semantic level vs. visual size",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
\`variant\` sets the visual size and weight; \`component\` sets the semantic HTML element that gets rendered. They don't have to match.

Use this when the document outline calls for an \`h1\` but the design calls for a smaller (or larger) visual treatment.`,
      },
    },
  },
  render: (_args) => (
    <Stack spacing={3} sx={{ maxWidth: 720 }}>
      <Box>
        <Typography variant="h5" component="h1">
          Semantic h1, sized like h5
        </Typography>
        <Typography variant="mono2" color="text.secondary">
          {'<Typography variant="h5" component="h1">'}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h1" component="h2">
          Semantic h2, sized like h1
        </Typography>
        <Typography variant="mono2" color="text.secondary">
          {'<Typography variant="h1" component="h2">'}
        </Typography>
      </Box>
    </Stack>
  ),
};

const longValue =
  "/dls/i15-1/data/2026/cm12345-1/processed/sample_0042_scan_00187.nxs";

export const TruncationAndOverflow: Story = {
  name: "Truncation & overflow",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use `noWrap` inside a width-constrained container to truncate long technical values with an ellipsis. Pair it with a `Tooltip` so the full value is still available on hover or focus.",
      },
    },
  },
  render: (_args) => (
    <Stack spacing={3} sx={{ maxWidth: 320 }}>
      <Box>
        <Typography variant="caption" color="text.secondary" component="div">
          Without noWrap — wraps and can push the layout
        </Typography>
        <Typography variant="mono2">{longValue}</Typography>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary" component="div">
          With noWrap — truncates to an ellipsis
        </Typography>
        <Typography variant="mono2" noWrap>
          {longValue}
        </Typography>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary" component="div">
          With noWrap + Tooltip — full value on hover/focus
        </Typography>
        <Tooltip title={longValue}>
          <Typography variant="mono2" noWrap tabIndex={0}>
            {longValue}
          </Typography>
        </Tooltip>
      </Box>
    </Stack>
  ),
};
