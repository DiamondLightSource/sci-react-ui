# Practical guidance

Diamond Design System uses MUI with Diamond semantic tokens layered on top.

This page covers:

- Using the theme
- Using components
- Colour usage
- Surfaces and elevation
- Borders
- Typography usage

See also [Feedback and errors](feedback-and-errors.md).

## Using the theme

Diamond Design System uses semantic design tokens mapped into MUI's theme system.

Design tokens are defined as CSS variables and remain the source of truth. The MUI theme maps those tokens into semantic roles exposed through the palette, typography, spacing, elevation, and interaction state APIs.

Components should consume semantic theme roles rather than hardcoded values. Theme customisation and component overrides should reference design tokens to maintain consistency across the system.

**Use theme roles in components and design tokens when defining or customising the theme.**

| Prefer                       | Avoid                      |
| ---------------------------- | -------------------------- |
| `theme.vars.palette.primary.main` | `#005bbb`             |
| `theme.palette.divider`      | Custom border greys        |
| `theme.spacing(2)`           | Arbitrary spacing values   |
| `surface.subtle`             | One-off background colours |

Using semantic roles keeps interfaces consistent across products, supports light and dark themes, and allows the system to evolve without rewriting component styles.

## Using components

Build with existing components and patterns before creating new ones.

Components should keep interfaces **predictable, efficient, readable, and consistent**. Users should be able to understand how an interface behaves, complete common tasks with minimal effort, and recognise the meaning of visual cues without additional explanation.

**Do**

- Reuse established layouts, behaviours, and interaction patterns.
- Use standard component variants consistently.
- Minimise unnecessary steps for common tasks.
- Use spacing, typography, and colour to create clear hierarchy.
- Keep disabled, read-only, selected, and error states visually distinct.
- Use visual styling that matches the meaning being communicated.

**Don't**

- Don't restyle components screen by screen.
- Don't introduce custom colours unnecessarily.
- Don't create multiple patterns for the same interaction.
- Don't require extra interactions when a direct action would be expected.
- Don't use error or warning styling for normal states.
- Don't override the theme without a reusable reason.

See [Working with components](working-with-components.md) for component standards and extension rules.

## Colour usage

Use colour semantically: choose colours based on what something does or means (for example, action, status, or brand identity), not how you want it to look. Separate structure, meaning, and brand.

DiamondDS supports:

- action intents: primary, secondary
- status intents: success, warning, error, info

These intent colours are used through component props such as `color="primary"` or `color="error"`. They help communicate importance, actions, status, and system state.

Brand colour is intentionally separate. Brand communicates Diamond identity rather than behaviour or status.

**Do**

- Use neutral roles for structure.
- Use intent roles for meaning.
- Use MUI component props, or `theme.vars.palette` inside `sx` and `styled()`, so colours follow light and dark mode. `theme.palette.<intent>.main` returns the default scheme's colour only.
- Ensure disabled and error states override hover, focus and selected styling.

**Don't**

- Don't hardcode hex values in components.
- Don't use strong intent colours as layout backgrounds.
- Don't rely on colour alone to communicate state.
- Don't invent one-off colour behaviour outside the theme.

For the full colour model and every token with its MUI role, see [Colour](foundation/colour.md) (including its [token reference](foundation/colour.md#10-token-reference)) and [Theme colours](foundation/theme-colours.md). `danger` tokens map to the MUI `error` role.

## Surfaces and elevation

Surfaces create structure and hierarchy. They should help users understand where content belongs without making dense scientific interfaces feel noisy.

Prefer layered surfaces and borders over heavy shadows.

MUI's default elevations (Dialog 24, Drawer 16) come from Material 2, where elevation meant shadow depth. DiamondDS takes inspiration from Material 3 instead: floating surfaces stay at moderate tones, and scrim and shadow carry the sense of lift.

Drop shadow (`--Paper-shadow`) is off by default on every Paper-based surface: Card, Accordion, plain Paper. It's restored only on true overlays that need to float above page content: Dialog, Menu/Select/Popover, Autocomplete's listbox, temporary Drawers, and Snackbar. Tonal elevation (the `--ds-elevation-*` background tint) still applies everywhere regardless of shadow. If tone alone isn't enough separation for a flat surface, use `variant="outlined"` rather than a manual border override (see [Borders](#borders)).

Surface tokens and their MUI roles are listed in the [neutral roles table](foundation/colour.md#neutral-roles). Pick between the two systems by what the surface represents, not by how it looks:

- `surface.subtle` and `surface.strong` are fixed, static roles for content that stays in normal page flow, such as secondary panels, nested containers and selected regions. There's no range: pick whichever of the two gives enough contrast.
- Paper `elevation` applies only to Paper-based components (Card, Dialog, Menu/Select/Popover, Drawer, Snackbar, Autocomplete), where the number also governs whether real shadow shows, per the table below. Don't reach for it to tint an arbitrary `Box` for layout grouping.

`surface.subtle` and `surface.strong` are tuned to land on the same tone as elevation 7 and 16, so a grouped panel and a Card at a similar elevation read as the same visual weight by design. That's shared vocabulary between the two systems, not a reason to use one in place of the other.

| Element                                  | Recommended treatment                                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Top nav bar                              | Elevation 0 + border-bottom. Elevate to 1-2 on scroll when sticky and no secondary nav is present                                                      |
| Sidebar                                  | Elevation 0 + border-right                                                                                                                             |
| Secondary header/nav bar                 | Elevation 1. Elevate to 1-2 on scroll when sticky                                                                                                      |
| Cards                                    | Elevation 0-4 + subtle border, or no border when the surface is already clear. Raise incrementally within this range if a card needs to read as more elevated than its neighbours |
| Temporary drawers                        | Elevation 4, shares the Cards band's ceiling. Shadow and scrim carry the floating cue                                                                  |
| Feedback surfaces                        | Elevation 5-7, such as Snackbar                                                                                                                        |
| Interactive cards                        | Elevation 8 via the `raised` prop, such as drag/drop cards. Shares its tone with the row below and gets real shadow, since a raised card is meant to float the same way |
| Menus, popovers, autocomplete listbox    | Elevation 8                                                                                                                                            |
| Dialogs                                  | Elevation 16, matching `surface.strong`'s tone. Scrim and shadow carry the floating cue, keeping the surface light enough for text                     |

Component-specific notes:

- Use `raised` for interactive cards rather than a manual `elevation` value. The theme gives it real shadow to match.
- `Autocomplete`'s listbox is themed to match `Menu`/`Select`/`Popover` automatically.
- When using `AppBar` as a top nav bar, add a border-bottom via `sx`.
- A custom `backgroundColor` on `Paper` (via `sx`) overrides the tonal elevation tint. This is useful for semantic surfaces like an error panel, but it means `elevation` then only affects shadow, not colour.

**Do**

- Use `background.default` for the application canvas.
- Use `background.paper` for primary content areas.
- Use `surface.subtle` to group related content.
- Use `surface.strong` for stronger grouping or selected regions.
- Use surface changes consistently across light and dark mode.
- Use the elevation band that matches a surface's role in the table above.
- Reach for `surface.subtle`/`surface.strong` for static layout regions, and Paper `elevation` only on Paper-based components.

**Don't**

- Don't use strong intent colours as general layout backgrounds.
- Don't stack too many nested surface colours.
- Don't use surface changes to compensate for unclear layout.
- Don't create one-off background colours for individual components.
- Don't make disabled surfaces look interactive.
- Don't add a custom `boxShadow` to fake elevation. Use the `elevation` prop.
- Don't use Paper `elevation` to tint a plain `Box` for layout grouping. Use `surface.subtle`/`surface.strong`.

## Borders

Borders define separation, grouping, and interaction boundaries. They should support structure without creating visual noise.

Use border roles instead of raw greys: `border.subtle` for quiet dividers, `border.emphasis` for interactive and important boundaries, `border.strong` for hover and active states. Token values are in the [neutral roles table](foundation/colour.md#neutral-roles).

MUI's native `divider` role and DiamondDS `border.subtle` use the same value. Use `divider` where an MUI component expects it, and `border.subtle` when writing DiamondDS border styles directly.

**Do**

- Use `border.subtle` for quiet dividers, separators, table boundaries, and disabled outlines.
- Use `border.emphasis` for interactive component boundaries and elements that need a stronger visual cue.
- Use `border.strong` for elevated interaction states such as hover, active, or selected elements.
- Use intent border colours only for meaningful states such as error or selected.
- Let disabled and error borders override hover and focus styling.

**Don't**

- Don't use raw grey values for component borders.
- Don't use borders as the only way to communicate status.
- Don't add heavy borders to compensate for weak spacing or grouping.
- Don't mix several border strengths in the same small area.
- Don't invent one-off border colours outside the theme.

## Typography usage

Typography should support readability, scanning, and technical clarity. Inter is the default interface typeface, Outfit is for brand and high-level headings, and IBM Plex Mono is for technical and aligned content.

**Do**

- Keep hierarchy consistent across products.
- Prefer short, clear labels.
- Make numbers and technical values easy to scan.
- Use mono type where alignment matters.

**Don't**

- Don't use brand typography for dense operational content.
- Don't rely on decorative styling for hierarchy.
- Don't hide important information in faint text.
- Don't introduce one-off font sizes.

See [Typography](foundation/typography.md) for the full scale.

## General principles

- Prefer theme palette roles and component props over raw values.
- Reuse patterns before creating new ones.
- Keep interactions predictable.
- Design for clarity and operational confidence.
- Similar things should look and behave similarly.

For button pairing see [Button guidance](components/buttons.md). For feedback, status and errors see [Feedback and errors](feedback-and-errors.md).
