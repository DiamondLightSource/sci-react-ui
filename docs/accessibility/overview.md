# Accessibility (a11y)

Our goal is to make interfaces that are understandable, predictable, and usable across a wide range of abilities, environments, and levels of fatigue.

## Standards and approach

We follow WCAG 2.2 as the compliance baseline, and use APCA (Advanced Perceptual Contrast Algorithm) to keep text readable and comfortable in real-world conditions. See [Colour contrast and vision](colour-contrast.md) for details.

## Core principles

- **Clarity over cleverness**: interfaces should explain themselves.
- **Predictable behaviour**: similar things behave in similar ways.
- **Multiple ways to perceive information**: never rely on one signal alone.
- **Low cognitive effort by default**: minimise mental overhead.

## Do

### Interactive elements

- Ensure every interactive control has an accessible name.
- Provide this via a visible label, `aria-label`, or `aria-labelledby`.
- Make keyboard focus clearly visible at all times.
- Use a consistent focus indicator (outline) rather than transient effects such as ripples.
- Ensure disabled states are clearly distinguishable from enabled and default.

### Keyboard navigation

- All interactive elements must be reachable and usable using a keyboard alone.
- Follow a logical tab order that matches the visual and reading order.
- Do not trap focus. Users must be able to move in and out of components using standard keyboard interactions.
- Ensure focus is always visible and moves predictably between elements.
- Support standard keyboard interactions (for example Enter or Space to activate controls).

For overlays such as menus and dialogs, manage focus intentionally:

- Move focus into the component when it opens.
- Keep focus within modal dialogs while they are open. Non-modal menus and popovers should close on Escape or when focus leaves.
- Return focus to the triggering element when it closes.

### Icons and icon-only actions

- Icon-only controls must include an accessible name that describes the action (for example "Delete sample"), using `aria-label` or `aria-labelledby`.
- Tooltips support discoverability, but do not replace accessible names.
- Decorative icons should be hidden from assistive technologies using `aria-hidden="true"`.
- Do not rely on an icon alone to communicate critical meaning.
- If an icon represents a toggle or state, expose the state using appropriate ARIA attributes (for example `aria-pressed`).

For interactive icons, ensure both an accessible name and a visible affordance such as a tooltip or label.

In MUI, use `aria-label` on `IconButton`. Tooltips (for example `<Tooltip />`) should be used in addition to, not instead of, accessible labelling.

### Forms and inputs

- Always associate inputs with labels (even if visually hidden).
- Do not show validation errors while a user is actively typing. Validate on blur or submission.
- Make error messages clear, specific, and actionable.
- Associate errors programmatically with the relevant field.

### Content and layout

- Do not rely on colour alone to convey meaning.
- Do not rely on icons alone to convey critical meaning.
- Use a logical, predictable reading order.

## Don't

- Don't use placeholder text as a replacement for labels.
- Don't hide important information in faint or decorative text.
- Don't introduce unexpected interaction patterns.
- Don't create dense, unbroken blocks of content.

## Storybook guidance

- Simple component stories may be visually minimal, but should still expose an accessible name, or be documented as intentionally incomplete.

## Quick sense check

- Can this be used with a keyboard only?
- Is its purpose clear without colour or icons?
- Would it still make sense when someone is tired or distracted?

## Learn more

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [APCA (Advanced Perceptual Contrast Algorithm)](https://git.apcacontrast.com/documentation/APCAeasyIntro)

See also [Colour contrast and vision](colour-contrast.md) and [Cognitive accessibility and usability](cognitive.md).
