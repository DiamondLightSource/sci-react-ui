# Typography

Typography in Diamond DS should support readability and technical clarity. Interfaces are often used in dense scientific workflows, so type should feel consistent and easy to parse.

## Typefaces

| Typeface      | Token                       | Variants                                                                               | Purpose                          | Typical usage                                               |
| ------------- | --------------------------- | -------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------- |
| Inter         | `--ds-font-family-default`  | `body1`, `body2`, `subtitle1`, `subtitle2`, `caption`, `meta`, `button`                | Default interface typeface       | UI text, controls, tables, navigation, forms                |
| Outfit        | `--ds-font-family-display`  | `h1Display`, `h2Display`, `h3Display`, `h4Display`                                     | Display and high-level headings  | Product headings, landing areas, documentation hero areas   |
| IBM Plex Mono | `--ds-font-family-mono`     | `mono1`, `mono2`, `mono3`                                                              | Technical and aligned content    | IDs, timestamps, code, logs, numeric values, instrument output |

## Core principle

Use typography to make information easier to understand, not more decorative.

Scientific interfaces often contain dense data, status information, technical labels, long identifiers, and changing values. Typography should help users see what matters, compare values, and act with confidence.

## Hierarchy

Use a clear and repeatable hierarchy across products.

- Use headings to structure the page.
- Use body text for explanation and supporting content.
- Use meta text for compact operational information and status.
- Use labels for controls, fields, table headers, and short descriptors.
- Use mono type for technical values where alignment or precision matters.

Avoid creating one-off heading sizes or local typographic styles unless there is a reusable reason.

Use heading levels in order where possible. Avoid jumping directly from h1 to h4 unless the surrounding structure justifies it.

## Do and don't

**Do**

- Keep hierarchy consistent across products.
- Prefer short, clear labels.
- Make numbers and technical values easy to scan.
- Use mono type where alignment matters.
- Use display variants sparingly for high-level moments.
- Use meta for compact operational information.
- Use overlines for lightweight grouping.
- Keep dense UI text legible and readable.

**Don't**

- Don't create new type styles screen by screen.
- Don't use decorative typography in operational interfaces.
- Don't use display variants as the default heading style inside applications.
- Don't use mono type for long paragraphs.
- Don't rely on font weight alone to show status or severity.
- Don't mix heading styles without a clear structure.
- Don't use caption when the content is operational metadata.
- Don't make technical values harder to copy or compare.

## Typography variants

| Group    | Variants                                               | Use for                                                                                      |
| -------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Display  | `h1Display`, `h2Display`, `h3Display`, `h4Display`     | Public-facing pages, landing areas, documentation hero sections                              |
| Headings | `h1` to `h6`                                           | Application and document structure                                                           |
| Body     | `lead`, `body1`, `body2`, `subtitle1`, `subtitle2`     | Readable interface text and supporting content                                               |
| Utility  | `caption`, `meta`, `overline`, `overlineSmall`         | Supporting text, operational metadata, grouping labels, status bars and compact section labels |
| Mono     | `mono1`, `mono2`, `mono3`                              | Logs, console output, IDs, paths, timestamps, technical values                               |

> Subtitle variants are intended for supporting headings and structured content. Use body variants for prose and explanatory text.

## Typography scale

Diamond DS provides a shared typography scale that underpins all typography variants.

| Token                | Size              |
| -------------------- | ----------------- |
| `--ds-font-size-100` | 0.6875rem (11px)  |
| `--ds-font-size-200` | 0.75rem (12px)    |
| `--ds-font-size-300` | 0.875rem (14px)   |
| `--ds-font-size-400` | 1rem (16px)       |
| `--ds-font-size-500` | 1.125rem (18px)   |
| `--ds-font-size-600` | 1.25rem (20px)    |
| `--ds-font-size-700` | 1.75rem (28px)    |
| `--ds-font-size-800` | 2rem (32px)       |
| `--ds-font-size-900` | 2.125rem (34px)   |
| `--ds-font-size-1000` | 3rem (48px)     |
| `--ds-font-size-1100` | 4.5rem (72px)    |

Typography variants should normally be used directly.

Font size tokens are primarily intended for creating reusable components, defining typography variants, and establishing consistent scale across the design system.

Avoid applying arbitrary font sizes when an existing typography variant already communicates the correct hierarchy and meaning.

## Font weight scale

| Token                         | Weight | Typical use                                                                                  |
| ----------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| `--ds-font-weight-light`      | 300    | Not used by any variant. Reserve for deliberate light treatments in large display type.      |
| `--ds-font-weight-regular`    | 400    | Body copy, captions, meta text and mono values                                               |
| `--ds-font-weight-medium`     | 500    | `h1`/`h2` and `h1Display`/`h2Display`                                                        |
| `--ds-font-weight-semibold`   | 600    | `h3` to `h6`, `h3Display`/`h4Display`, subtitles, overlines and buttons                      |
| `--ds-font-weight-bold`       | 700    | Not used by any variant. Reserve for inline emphasis within body text rather than a whole heading. |

## Line height scale

| Token                         | Value | Typical use                    |
| ----------------------------- | ----- | ------------------------------ |
| `--ds-line-height-tight`      | 1.1   | Large display headings         |
| `--ds-line-height-condensed`  | 1.2   | Headings and utility text      |
| `--ds-line-height-normal`     | 1.4   | Captions and dense text        |
| `--ds-line-height-relaxed`    | 1.5   | Body copy and long-form reading |

## Letter spacing scale

| Token                           | Value   | Typical use                    |
| ------------------------------- | ------- | ------------------------------ |
| `--ds-letter-spacing-tight`     | -0.03em | Large display headings         |
| `--ds-letter-spacing-condensed` | -0.01em | Headings                       |
| `--ds-letter-spacing-normal`    | 0       | Body and most UI text          |
| `--ds-letter-spacing-wide`      | 0.08em  | Overlines and uppercase labels |

Weight, line height and letter spacing tokens are primarily intended for creating reusable components, defining typography variants, and establishing consistent scale across the design system.

Avoid applying arbitrary weights, line heights or letter spacing when an existing typography variant already communicates the correct hierarchy and meaning.

## Display and heading variants

Use display variants for large, high-level moments such as landing pages, welcome screens, product introductions, and documentation hero areas.

Use heading variants for application structure and content hierarchy.

Display variants should be used sparingly and are not intended to replace the standard heading hierarchy within operational interfaces.

> The current typography model uses dedicated display variants (`h1Display` to `h4Display`) for display typography and `h1` to `h6` for application hierarchy.
>
> As the design system evolves, `h1` and/or `h2` may adopt the display typeface in some contexts. This decision is still under review and may change based on application and public-facing usage patterns.

## Choosing a typeface

### Inter

The default interface typeface.

Use for:

- Navigation
- Body text
- Buttons
- Forms
- Tables
- Dialogues
- Cards
- Labels
- Status messages

Inter should be the default choice unless there is a specific reason to use Outfit or IBM Plex Mono.

### Outfit

Used for display and high-level headings.

Use sparingly for:

- Product names
- Major page titles
- Welcome or landing areas
- Documentation hero headings

Do not use Outfit for dense application UI, tables, forms, or technical values.

### IBM Plex Mono

Used for technical and aligned information.

Use for:

- Code
- Logs
- Console output
- Timestamps
- Numeric values where alignment helps comparison
- IDs (proposals, samples, beamlines)
- Numeric columns
- Technical table values
- File paths
- API-like values

Do not use mono type for general UI text.

## Technical values

Technical values should be easy to scan, compare, and copy.

Use mono type where users need to inspect precise values:

```tsx
<Typography variant="mono1">
  energy=12.4 keV · exposure=0.5 s · frames=100
</Typography>
```

For tables with mixed content, use mono only for the technical cells rather than the whole table.

## Truncation and overflow

Long technical values (paths, IDs, timestamps) can overflow a constrained layout such as a table cell or a narrow panel.

Use `noWrap` inside a width-constrained container to truncate the value to a single line with an ellipsis, and pair it with a tooltip so the full value is still available on hover or focus.

```tsx
<Box sx={{ maxWidth: 240 }}>
  <Tooltip title="/dls/i15-1/data/2026/cm12345-1/processed/sample_0042.nxs">
    <Typography variant="mono2" noWrap tabIndex={0}>
      /dls/i15-1/data/2026/cm12345-1/processed/sample_0042.nxs
    </Typography>
  </Tooltip>
</Box>
```

Don't truncate a value without also giving users a way to read it in full. Prefer a tooltip, or reflow the layout so the value has room to wrap.

## Numbers and units

Keep numbers and units readable.

```text
12.4 keV
0.5 s
180 ms
1,024 frames
```

Prefer a space between number and unit unless the notation convention says otherwise.

Avoid inconsistent formatting:

```text
12.4keV
0.5sec
180 milliseconds
1024 Frames
```

## Overlines and grouping

Overlines provide lightweight hierarchy and grouping without introducing a full heading.

They are particularly useful in dense scientific interfaces where additional structure is needed without increasing visual weight.

Use overlines to:

- Group related controls
- Separate sections within cards or panels
- Label groups of settings
- Introduce collections of information
- Provide context above headings or values

```tsx
<Typography variant="overline">
  Acquisition
</Typography>

<Typography variant="h4">
  Detector settings
</Typography>
```

Prefer overlines when a full heading would create unnecessary visual weight.

## Utility text

| Variant         | Purpose                              | Typical usage                                                   |
| --------------- | ------------------------------------ | --------------------------------------------------------------- |
| `caption`       | Small explanatory or supporting text | Helper text, figure captions, secondary descriptions            |
| `meta`          | Small operational information        | Status bars, timestamps, counts, short technical metadata       |
| `overline`      | Grouping and categorisation          | Section labels, grouped controls, settings groups, card sections |
| `overlineSmall` | Compact grouping and dense labelling | Dense panels, compact cards, highly constrained layouts         |

### Meta

Use meta for compact operational information such as:

- Status bars
- Timestamps
- Counts
- Short technical metadata
- Connection status
- Acquisition state

## Logs and console output

Logs and console output should use mono type.

```tsx
<Typography component="pre" variant="mono1">
  [14:30:15] Starting data acquisition pipeline
  <br />
  [14:30:18] Detector initialised successfully
  <br />
  [14:30:22] Scan started: energy 12.4 keV, exposure 0.5 s
</Typography>
```

Use colour and status tokens carefully. Typography should not be the only way to communicate severity.

## Light and dark behaviour

Typography should remain readable in both light and dark modes.

Use semantic foreground roles rather than raw colour values:

```tsx
<Typography color="text.primary">
  Primary text
</Typography>

<Typography color="text.secondary">
  Secondary text
</Typography>

<Typography color="text.disabled">
  Disabled text
</Typography>
```

Avoid hard-coded greys for text. They may pass in one mode and fail in another.

## Accessibility

Typography must support legibility, contrast, and predictable reading order.

- Use sufficient contrast for text and icons.
- Do not use colour alone to communicate meaning.
- Keep line lengths comfortable for reading.
- Avoid very small text in dense operational areas.
- Preserve semantic headings where possible.
