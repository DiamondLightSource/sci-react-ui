# Feedback and errors

How interfaces should report system state, progress, success, warnings and problems, and how they should help users recover.

## Feedback and status

> Interfaces should continuously communicate system state, progress, success, warnings, and problems. Clear feedback helps users understand what is happening, what requires attention, and whether it is safe to continue.

### Communicate state clearly

Provide feedback for important actions, transitions, and system events.

Users should understand:

- what is happening
- whether an action succeeded
- whether attention is required
- whether work is still in progress
- what they can safely do next

Avoid relying on colour alone. Combine colour with labels, icons, text, or layout changes where appropriate.

### Status intent meanings

| Status       | Purpose                           | Typical usage                                                    |
| ------------ | --------------------------------- | ---------------------------------------------------------------- |
| Success      | Positive or valid outcome         | Completed actions, successful operations, valid system state     |
| Warning      | Caution or attention required     | Risk states, interruptions, unusual conditions, partial issues   |
| Error/Danger | Critical issue or failed action   | Validation failures, failed operations, destructive actions      |
| Info         | Informational or transitional state | Progress updates, guidance, active processes, system messages  |

### Progress and transitional states

Use informational feedback for active or changing system states.

Examples include:

- scanning in progress
- moving motors
- connecting to device
- processing data
- queue paused

Prefer persistent inline or contextual feedback over temporary notifications for long-running operations.

### Success feedback

Use success feedback sparingly.

Not every successful action requires a notification.

Prefer lightweight confirmation for routine actions, especially in repetitive scientific workflows.

| Prefer                                           | Avoid                                                          |
| ------------------------------------------------ | -------------------------------------------------------------- |
| Quiet inline confirmation after saving           | Large celebratory success states for routine operations        |
| Small status update in a queue or table row      | Stacking repeated success toasts during repetitive workflows   |
| Temporary confirmation for destructive actions   | Interrupting workflow with unnecessary success messaging       |

## Errors and recovery

> Error handling should help users recover safely and confidently. Focus on clarity, next steps, and preventing further mistakes.

### Make errors actionable

Good error messages explain:

- what happened
- what caused the issue, if known
- what the user can do next

Avoid vague or technical-only messaging where possible.

| Avoid               | Prefer                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `Operation failed`  | `Unable to connect to detector`                                                             |
| `Validation error`  | `Exposure time must be greater than 0`                                                      |
| `Device unavailable` | `Motor controller is offline.` A message can be added: `Reconnect or contact beamline staff.` |

### Prefer recovery over dead ends

Where possible, help users continue safely.

Provide:

- retry actions
- alternative paths
- clear recovery guidance
- safe defaults

Avoid trapping users in blocked states without explanation.

### Error severity

Not all errors require the same visual weight.

| Severity | Typical treatment                                  |
| -------- | -------------------------------------------------- |
| Minor    | Inline validation or local helper text             |
| Moderate | Inline alert, panel warning, persistent message    |
| Critical | Blocking alert, dialog, or operational interruption |

### Safety and operational awareness

In scientific and operational environments, errors may affect hardware, beamtime, experiments, or data integrity.

Use stronger emphasis when actions may:

- interrupt experiments
- move hardware
- discard data
- affect safety
- impact other users or systems

Destructive or irreversible actions should require clear confirmation and should never compete visually with safe actions.
