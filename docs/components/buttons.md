# Button guidance

Buttons are used for actions such as saving, submitting, progressing a workflow, opening a dialog, changing a mode, or performing an operation on data.

> **Buttons represent actions.** Use emphasis to show priority and colour to show intent. Do not use button colour as decoration.

## Overview

In DiamondDS, buttons should feel calm, predictable, and intentional. They should help users understand what action is available, what matters most, and what will happen next.

The main action should be easy to find. Supporting actions should remain available without competing with it. Alternative actions or modes can use the secondary intent when they represent a distinct path or interaction state.

## Do and don't

**Do**

- Use one clear main action per decision area.
- Use `primary contained` for the main action.
- Use `primary outlined` for supporting actions.
- Use `secondary` only for distinct alternative actions or modes.
- Use `error` for destructive or risky actions.

**Don't**

- Don't use colour only for decoration.
- Don't use `secondary` to mean "second most important".
- Don't show multiple competing contained buttons in one decision area.
- Don't place destructive actions too close to safe primary actions.
- Don't override button colours with raw hex values.

## Button hierarchy

| Type                      | Meaning                                                                                                                                      | Recommended style                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Main action               | The action users are expected to take now. The clearest action in the view, section, dialog, or workflow step.                               | `primary contained`                                                                  |
| Secondary action          | A supporting action in the same workflow. Useful, but with less visual weight than the main action.                                          | `primary outlined`                                                                   |
| Alternative action or mode | A distinct action family, path, or interaction mode. Not just a lower-priority action.                                                      | `secondary outlined` by default; `secondary contained` when active or strongly emphasised |
| Destructive action        | A risky, destructive, or irreversible action, such as delete, clear, or abort.                                                               | `error outlined` or `error text` by default; `error contained` only when the destructive action is the main confirmed action |

## Main actions

Use `primary contained` for the main action in a view, section, dialog, or workflow step.

- Use it for the action users are expected to take now.
- Use it when the action needs clear visual priority.
- Avoid having more than one main action in the same decision area.

If multiple actions look equally primary, users lose clarity on what to do next.

## Secondary actions

Secondary actions support the main action within the same workflow. They should remain visible and available, but they should not compete with the main action.

Use `primary outlined` for secondary actions. This keeps the action connected to the main workflow while giving it less visual weight.

- Use secondary actions for save draft, cancel, preview, edit, or configure.
- Use outlined styling when the action appears next to the main action.
- Use text styling for low-priority or inline actions.

Do not use `secondary` colour just because an action is less important. In DiamondDS, `secondary` means a different intent, path, or mode.

## Alternative actions

Alternative actions often represent a different workflow, interaction mode, or action family rather than a supporting action within the current workflow.

When an alternative action is available but inactive, use `secondary outlined`. When the alternative mode becomes active, `secondary contained` can be used to communicate its active state.

As workflows progress, the main action may change. A `primary contained` action may become `primary outlined` when it acts as a response to an active process rather than the main action used to begin it.

### Same-weight alternatives

When two alternative actions should carry similar visual weight, use outlined buttons rather than two contained buttons.

### Active alternative mode

When an alternative mode is active, a `secondary contained` button can be used to communicate that state. The primary action may become outlined when it represents a response to an active process rather than the action used to start it.

This pattern allows users to understand both the current mode and the actions available to leave, stop, or change it.

### Active primary and alternative actions

A `primary contained` button can appear alongside a `secondary contained` button when their roles are clearly different: one represents the main action, while the other represents an active alternative mode.

Avoid this pairing when the buttons represent competing choices or when both appear to be primary actions.

## Destructive actions

Use `error` styling for actions that are destructive, risky, or irreversible.

- Use `error` for destructive actions such as delete, abort, or clear.
- Prefer `error outlined` or `error text` by default.
- Use `error contained` only when the destructive action is the main confirmed action, such as in a confirmation dialog.
- Avoid placing destructive actions next to safe main actions without separation.

## Multiple actions

When multiple buttons appear together, use hierarchy first, then intent.

- Use `primary contained` for the main action.
- Use `primary outlined` for supporting actions in the same workflow.
- Use `secondary outlined` for distinct alternative paths or modes.
- Use `secondary contained` only when the secondary intent is active or clearly emphasised.

In most cases, prefer one contained button per decision area. More than one contained button is acceptable only when the buttons do not compete for the same meaning.

## Common pairings

Use one contained button for the main action, then reduce emphasis for nearby supporting actions.

| Pattern                         | Use when                                                  | Recommended pairing                                   |
| ------------------------------- | --------------------------------------------------------- | ----------------------------------------------------- |
| Main action + cancel            | The user needs a clear way to proceed or back out         | `primary contained` + `text`                          |
| Main action + supporting action | The second action helps prepare or configure the main action | `primary contained` + `outlined`                   |
| Main action + more actions      | Additional actions are available but should not compete   | `primary contained` + menu button                     |
| Destructive confirmation        | The user is confirming a destructive or irreversible action | `error contained` + neutral `text` or `outlined`    |
| Promoted secondary workflow     | A secondary action is intentionally more useful in context | Lower-emphasis primary action + `secondary contained` |

- Use text buttons for cancel, dismiss and low-risk exits.
- Use menu buttons for overflow actions that should not compete visually.
- Don't place `primary contained` and `secondary contained` next to each other by default.
- Don't make cancel actions visually compete with the main action.
- Don't promote secondary actions just for visual variety.

## State and emphasis

| Variant     | Emphasis | Use for                                                               |
| ----------- | -------- | --------------------------------------------------------------------- |
| `contained` | High     | Main actions, active modes, or confirmed high-emphasis actions.       |
| `outlined`  | Medium   | Supporting actions, available alternative modes, and actions near a main action. |
| `text`      | Low      | Inline, optional, or low-priority actions.                            |

Use emphasis to guide decisions. Use colour only when it communicates intent.

## State priority

| State    | Purpose                                                   | Priority |
| -------- | --------------------------------------------------------- | -------- |
| Disabled | Shows that interaction is unavailable.                    | Highest  |
| Error    | Shows that an action is risky, destructive, or has failed. | High     |
| Active   | Shows that a mode or toggle-like action is currently on.  | High     |
| Focus    | Shows keyboard position.                                  | High     |
| Hover    | Shows pointer interaction.                                | Low      |

Disabled and error states should always win over active, hover, focus, or selected states.

## Token guidance

| Need                       | Prefer                                                      | Avoid                                                |
| -------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| Main actions               | `primary`                                                   | Raw brand hex values                                 |
| Alternative actions or modes | `secondary`                                               | Using secondary as decoration or "less important primary" |
| Destructive actions        | `error` mapped from danger tokens                           | Custom red values                                    |
| Button text                | `contrastText`, `onSolid`, semantic foreground tokens       | Hardcoded white or black text                        |
| Outlined border            | `border.subtle`, `border.emphasis`                          | Hardcoded grey borders                               |
| Hover state                | `action.hover`, `overlay.hover`                             | One-off hover colours                                |
| Focus state                | `--ds-focus-ring` tokens                    | Browser default focus only                           |

## Accessibility

Button labels should describe the action clearly. Avoid vague labels such as "OK" or "Submit" when a more specific label would help users understand the result.

- Use visible focus states for keyboard users.
- Do not rely on colour alone to communicate meaning.
- Use disabled states only when the reason is clear from context.
- Use confirmation steps for destructive or high-risk actions.
- Make active modes clear through label, state, and context, not colour alone.

## Related components

- `Button`: actions in forms, dialogs, toolbars, and workflows.
- `IconButton`: compact icon-only actions.
- `ButtonGroup`: groups related button actions.
- `ToggleButton`: selectable or persistent action states.
