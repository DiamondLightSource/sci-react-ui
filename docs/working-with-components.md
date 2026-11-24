# Working with components

Diamond Design System components are built on MUI and adapted for Diamond scientific software.

Use MUI components first, then apply Diamond theme roles, variants, states, and patterns consistently.

> Components should be predictable before they are distinctive. Start with the standard MUI behaviour, then extend only when there is a reusable Diamond need.

## Component breakdown

Most components can be understood through five layers.

| Layer     | Purpose                              | Example                                                  |
| --------- | ------------------------------------ | -------------------------------------------------------- |
| Component | The base UI element                  | `Button`, `TextField`, `Alert`, `Card`                   |
| Variant   | The visual treatment                 | `contained`, `outlined`, `text`                          |
| Intent    | The semantic meaning                 | `primary`, `secondary`, `success`, `warning`, `error`, `info` |
| State     | The interaction or system condition  | `hover`, `focus`, `selected`, `disabled`, `error`        |
| Pattern   | How the component is used in context | Form field, toolbar action, dialog footer, queue row     |

## How to use components

Use existing components and variants before creating custom behaviour.

| Prefer                                                                | Avoid                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------ |
| Use MUI props such as `variant`, `color`, `size`, and `disabled`      | Restyling components with one-off CSS                  |
| Use Diamond semantic theme roles and tokens                           | Hardcoded colours, spacing, or shadows                 |
| Use standard interaction states consistently                          | Different hover, focus, or disabled behaviour per screen |
| Use established layout patterns                                       | Creating new arrangements for the same task            |

See [Layout patterns](layout-patterns.md) for the established arrangements.

## Component standards

All components should follow these standards:

- Use semantic tokens or MUI theme roles, not raw visual values.
- Work in both light and dark mode through `data-mode`.
- Use accessible labels, helper text, and keyboard behaviour.
- Make focus, disabled, selected, loading, and error states clear.
- Let disabled and error states override hover and active states.
- Keep behaviour consistent with MUI unless there is a clear reason to change it.

## Extending an existing component

Extend an existing component when the base MUI component is right, but Diamond needs a reusable variation.

Good reasons to extend include:

- a repeated scientific workflow pattern
- a consistent Diamond-specific layout
- a reusable status or feedback treatment
- a common data-heavy interaction
- a safer or clearer operational behaviour

Avoid extending a component just to make one screen look different.

## Creating a new component

Create a new component only when an existing MUI or Diamond component cannot support the pattern clearly.

Before creating one, check:

- Can this be done with an existing MUI component?
- Can this be done with an existing Diamond component?
- Is the pattern likely to be reused?
- Does it solve a real workflow problem?
- Can it follow existing theme, state, and accessibility rules?

> New components should feel like part of the system from day one. They should use the same tokens, states, spacing, naming, and interaction logic as existing components.

## Naming and scope

Name components by what they are, not where they first appear.

| Prefer                  | Avoid                                                  |
| ----------------------- | ------------------------------------------------------ |
| `ScanStatus`            | `I18StatusBox`                                         |
| `QueueItem`             | `MappingQueueCard` when it is reusable beyond mapping  |
| `DeviceConnectionStatus` | `BlueButtonPanel`                                     |

## Review checklist

Before adding or changing a component, check:

- Does it use existing MUI behaviour where possible?
- Does it use Diamond semantic roles and tokens?
- Does it work in light and dark mode?
- Are focus, disabled, error, loading, and empty states covered?
- Is the hierarchy clear?
- Is the pattern reusable?
- Is the documentation clear enough for another team to use it?
