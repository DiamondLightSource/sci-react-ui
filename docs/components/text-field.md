# Input guidance

Inputs capture and edit data. In DiamondDS, input styles communicate the context and consequences of an action, not simply visual preference.

> **Choose the input style based on context.** Outlined inputs are the default for forms, configuration, setup, and planning. Filled inputs are reserved for direct interaction with live systems, instruments, or time-sensitive operations.

**This guidance should be applied to select fields as well.**

## Overview

Input fields are used throughout acquisition, configuration, analysis, and operational workflows. Different input variants help communicate whether a value is being prepared, configured, or directly controlling equipment.

Use the least visual emphasis necessary while still providing clear feedback and confidence.

## Use inputs when

**Do**

- Use **outlined** inputs by default.
- Use **filled** inputs when interacting with live equipment.
- Keep variants consistent within a workflow.
- Provide labels and helper text.
- Validate after users complete input.

**Don't**

- Don't mix variants without a clear reason.
- Don't use filled inputs purely for decoration.
- Don't show validation errors while users are typing.
- Don't rely on placeholder text as a label.
- Don't use colour alone to communicate status.

## Input hierarchy

| Variant  | Use for                                                                 | Guidance         |
| -------- | ----------------------------------------------------------------------- | ---------------- |
| Outlined | General forms, configuration, setup, planning, metadata entry           | Default choice   |
| Filled   | Live equipment control, operational adjustments, values with immediate effect | Use deliberately |
| Standard | Inline or compact layouts                                               | Rarely used      |

See the TextField "Variants" story in [Storybook](https://diamondlightsource.github.io/sci-react-ui/) to compare them.

## Outlined inputs

Outlined inputs are the default input style in DiamondDS.

Use them when users are preparing values, configuring experiments, entering metadata, defining scans, editing parameters, or making changes that are not immediately applied to equipment.

- Best for acquisition setup and planning.
- Best for configuration screens.
- Best for structured forms.
- Supports dense layouts and scanning.

```tsx
<TextField label="Sample name" variant="outlined" />
```

See the TextField "Default input" story in Storybook.

## Filled inputs

Filled inputs indicate a stronger operational context.

Use them when a value directly affects a running system, instrument, motor, detector, or operational process.

- Live motor movement.
- Direct instrument control.
- Operational adjustments.
- Situations where changes have immediate consequences.

Filled inputs should be used sparingly so their meaning remains clear.

```tsx
<TextField label="Motor position" variant="filled" />
```

See the TextField "Live instrument input" story in Storybook.

## Input types

TextField supports a range of native HTML input types. Choose the type that best matches the data being entered.

Choosing the correct input type can improve validation, keyboard behaviour, browser autofill, and accessibility.

See the TextField "Input types" story in Storybook for the supported types.

## Future direction

DiamondDS may introduce additional filled variants for operational workflows.

One possibility is a subtle intent-based filled style using semantic container colours, allowing live controls to stand out without requiring strong visual emphasis. This pattern is still under evaluation and should not be considered part of the current guidance.

## Validation

Validation should support users, not interrupt them.

- Validate on blur or submit.
- Avoid showing errors while users are typing.
- Use helper text to prevent errors before they occur.
- Keep messages specific and actionable.

## Input states

| State     | Purpose                                  | Use when                                                                                              |
| --------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Default   | Ready for input.                         | The field is available for editing.                                                                   |
| Hover     | Indicates pointer interaction.           | The user is pointing at the field.                                                                    |
| Focus     | Indicates keyboard or active input.      | The field is currently being edited.                                                                  |
| Read-only | Displays a value that cannot be edited.  | The value should remain visible, selectable, and copyable, but editing is not permitted.              |
| Error     | Indicates validation or input problems.  | The value requires attention before the workflow can continue.                                        |
| Disabled  | Indicates interaction is unavailable.    | The field cannot currently be interacted with or modified.                                            |

Prefer **read-only** over **disabled** when displaying useful information. Read-only fields remain legible and can still be selected or copied, while disabled fields indicate that interaction is unavailable.

> **Read-only is set differently on similar MUI fields.** On **Select**, use the top-level `readOnly` prop. On **TextField**, which has no top-level `readOnly`, use `slotProps={{ input: { readOnly: true } }}`. Don't use `inputProps` on either: it doesn't apply the read-only styling.

Disabled and error states should remain clearly visible and should not be overridden by hover or focus styling.

See the TextField "States" story in Storybook.

## Token guidance

| Need         | Prefer                               | Avoid                      |
| ------------ | ------------------------------------ | -------------------------- |
| Input border | `border.emphasis`, `border.strong`   | Hardcoded greys            |
| Input text   | `text.primary`                       | Custom text colours        |
| Error state  | `error`                              | Custom red values          |
| Focus        | `--ds-focus-ring` tokens                    | Browser default focus only |

## Accessibility

- Always provide a visible label.
- Use helper text for guidance and validation.
- Ensure sufficient text and border contrast.
- Provide clear focus indicators.
- Do not rely solely on colour to communicate validation.

## Related components

- `TextField`: general text input.
- `Autocomplete`: searchable selection.
- `Select`: predefined option selection.
- `Checkbox`: independent choices.
- `Radio`: single selection from a group.
- `Switch`: immediate on/off state.
