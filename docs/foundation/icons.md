# Icons

Icons support visual recognition. They should reinforce meaning, not replace clear language. Diamond DS uses Lucide as its primary icon family.

## Overview

Diamond DS uses **Lucide** as its primary icon family.

Lucide icons are simple, line-based icons that support dense scientific interfaces without introducing unnecessary visual noise.

Applications should use Lucide icons wherever possible.

When creating bespoke icons, follow the same visual language:

- Line-based rather than filled.
- Consistent stroke weights.
- Rounded line caps and joins.
- Simple and recognisable shapes.
- Minimal detail at small sizes.

Avoid mixing multiple icon families within the same application.

> **Material Icons** may remain in existing screens during the transition. For new components, new patterns, and new application work, use Lucide.

## Choosing icons

Icons should communicate familiar concepts quickly.

Good uses include:

- Navigation
- Actions
- Status indicators
- Object types
- Menus and command lists
- Toolbars

Icons should not be used purely as decoration.

### Prefer labels over icons

Where understanding is important, pair icons with text.

```tsx
<Button startIcon={<SettingsIcon />}>Settings</Button>
```

Avoid relying on icons alone for unfamiliar, complex, or high-risk actions.

## Consistency

Use the same icon for the same concept across products.

| Concept  | Example icon (`lucide-react`) |
| -------- | ----------------------------- |
| Add      | `Plus`                        |
| Search   | `Search`                      |
| Expand   | `ChevronDown`                 |
| Settings | `Settings`                    |
| Delete   | `Trash2`                      |
| Download | `Download`                    |
| Upload   | `Upload`                      |

Changing icon metaphors between applications increases cognitive load and reduces predictability.

> When selecting or creating icons, follow the naming conventions used by the underlying icon library to maintain consistency and discoverability.

## Icon sizes

Diamond DS defines five standard icon sizes.

| Icon size | Size | Stroke weight |
| --------- | ---- | ------------- |
| XS        | 16px | 1.5px         |
| SM        | 20px | 1.75px        |
| MD        | 24px | 2px           |
| LG        | 32px | 2.25px        |
| XL        | 40px | 2.25px        |

Use the smallest icon size that remains recognisable and readable.

> The `LucideIcon` wrapper is still in development. Until it ships, import icons directly from `lucide-react` and size them by hand using the sizes and stroke weights above.

```tsx
import { Search } from "lucide-react";

<Search size={20} strokeWidth={1.75} />
```

## Icons in navigation

Icons may support navigation but should rarely replace labels in desktop scientific applications.

Navigation labels should remain visible wherever space allows.

Icons are most useful for:

- Application launchers
- Navigation rails
- Collapsed side navigation
- Toolbar actions

## Status and feedback

Icons can reinforce status messages but should not be the only indicator.

| Status      | Typical icon (`lucide-react`) |
| ----------- | ----------------------------- |
| Success     | `CircleCheckBig`              |
| Information | `Info`                        |
| Warning     | `TriangleAlert`               |
| Error       | `CircleX`                     |

Always combine icons with text and colour.

## Accessibility

### Decorative icons

Hide decorative icons from assistive technologies.

```tsx
<InfoIcon aria-hidden="true" />
```

### Interactive icons

Provide a meaningful accessible name.

```tsx
<IconButton aria-label="Open settings">
  <SettingsIcon />
</IconButton>
```

### Status icons

Do not rely on icon shape or colour alone to communicate meaning.

Always provide accompanying text.

## Do and don't

**Do**

- Use Lucide icons consistently.
- Pair icons with text where clarity matters.
- Let components control icon sizing.
- Use icons to improve visual recognition.
- Follow Lucide conventions for bespoke icons.

**Don't**

- Mix multiple icon families.
- Use icons purely as decoration.
- Depend on icons alone for critical actions.
- Resize button icons manually.
- Use different icons for the same concept across products.

## Scientific and operational interfaces

In scientific applications, icons should support task completion rather than branding.

Prefer clear text labels for:

- Instrument controls
- Acquisition actions
- Safety-related actions
- Experimental workflows
- Administrative actions

Icons work best as supporting cues alongside clear terminology.
