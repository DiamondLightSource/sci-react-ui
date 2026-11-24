# Colour

Colour helps users understand structure, meaning and system state across Diamond applications. In scientific software, colour must support complex workflows, dense information displays and operational decision-making without becoming distracting or overwhelming.

DiamondDS uses colour semantically. Colours are chosen for purpose, not appearance. Neutral colours provide structure and hierarchy, intent colours communicate actions and status, and brand colours express Diamond identity.

Most interfaces should be built mainly from neutral colours, with semantic colours used deliberately to draw attention to actions, changes in state, warnings, errors or other important information. This keeps the interface clear, reduces visual noise and makes meaningful information stand out when it matters.

> Colour should support understanding, not carry meaning on its own. Important information should also be communicated through text, icons, labels, layout or interaction patterns.

For the value of every token in light and dark mode, see [Theme colours](theme-colours.md).

## Contents

1. Colour principles
2. Colour model
3. Colour decision tree
4. Surface model
5. Colour anatomy
6. Interaction states
7. Scientific workflow guidance
8. Data visualisation guidance
9. Accessibility
10. Token reference

## 1. Colour principles

**Colour supports scientific work.** Colour should help users understand information, state and action without becoming visual noise. Scientific applications often display a lot of information at once, so colour must be deliberate, predictable and accessible.

**Structure before meaning.** Use neutral colours to build hierarchy, grouping and layout. Apply semantic colours only when meaning needs to be communicated.

**Meaning before brand.** Action and status colours communicate behaviour and system state. Brand colours communicate Diamond identity. Brand colour should rarely be responsible for functional meaning.

**Consistency over decoration.** The same colour role should always communicate the same thing throughout the system. Avoid using colour just to make an interface feel more decorative.

**Accessible by default.** Colour must never be the only method of communication. Use labels, icons, typography and spatial cues alongside colour.

## 2. Colour model

DiamondDS separates colour into three categories: **neutral**, **intent** and **brand**. This keeps visual structure, operational meaning and organisational identity distinct.

| Category | Purpose                           | Typical usage                                           |
| -------- | --------------------------------- | ------------------------------------------------------- |
| Neutral  | Structure and hierarchy           | Backgrounds, surfaces, borders, text, tables, layout    |
| Intent   | Actions, status and system meaning | Buttons, alerts, validation, feedback, selected states |
| Brand    | Diamond identity                  | Branding moments, facility identity, splash screens     |

### Neutral

Neutral colours define the structure of the interface.

Use neutral colours for:

- Page backgrounds
- Surfaces
- Containers
- Dividers
- Tables
- Text
- Data-heavy interfaces

Neutral should account for the majority of visible colour in most applications.

### Intent

Intent colours communicate behaviour, status and meaning. They answer the question: _What does this mean?_

| Intent       | Meaning                                    | Typical usage                                       |
| ------------ | ------------------------------------------ | --------------------------------------------------- |
| Primary      | Main action                                | Primary buttons, selected states, primary emphasis  |
| Secondary    | Alternative or supporting action           | Secondary buttons, filters, supporting controls     |
| Success      | Valid, complete or operational             | Confirmation, completion, available states          |
| Warning      | Caution or attention required              | Risk states, thresholds, degraded conditions        |
| Error/Danger | Blocking, failed, hazardous or destructive | Errors, failed actions, destructive actions         |
| Info         | Informational, contextual or in progress   | Guidance, progress, system messages                 |

### Brand

Brand colours communicate Diamond identity. They answer the question: _Who are we?_

**Use brand colour for:**

- Logos
- Branded pages
- Onboarding experiences
- Splash screens
- Facility identity

**Avoid using brand colour for:**

- Status
- Errors
- Warnings
- Destructive actions
- Operational state

## 3. Colour decision tree

When choosing a colour role, start with purpose rather than appearance.

```text
Do I need colour?
│
├─ No
│   └─ Neutral
│
└─ Yes
    │
    ├─ Communicating action?
    │   ├─ Primary
    │   └─ Secondary
    │
    ├─ Communicating status?
    │   ├─ Success
    │   ├─ Warning
    │   ├─ Error
    │   └─ Info
    │
    └─ Communicating identity?
        └─ Brand
```

## 4. Surface model

Neutral colours establish hierarchy and depth throughout the interface.

Surface roles define the relationship between areas of content, while elevation adds visual prominence where needed. In most Diamond applications, hierarchy should be communicated through surface roles, spacing, borders and layout before relying on elevation.

| Surface level          | Purpose                    | Typical usage                                           |
| ---------------------- | -------------------------- | ------------------------------------------------------- |
| Background             | Application canvas         | App shell, page background, full-screen layouts         |
| Surface                | Default content surface    | Cards, dialogs, menus, content panels                   |
| Surface container      | Quiet grouped surface      | Secondary panels, grouped controls, low-emphasis regions |
| Surface container high | Stronger grouped surface   | Nested containers, selected regions, raised sections    |
| Overlay                | Temporary elevated layer   | Menus, popovers, drawers                                |
| Modal                  | Highest-emphasis layer     | Dialogs and critical workflows                          |

### Surface hierarchy

```text
Background
 └─ Surface
     └─ Surface container
         └─ Surface container high
             └─ Overlay
                 └─ Modal
```

### Surface hierarchy and elevation

Surface roles and elevation work together but serve different purposes.

| Concept           | Purpose                                      | Examples                                  |
| ----------------- | -------------------------------------------- | ----------------------------------------- |
| Surface hierarchy | Defines content relationships and grouping   | Background, Surface, Container, Overlay   |
| Elevation         | Defines visual prominence and separation     | Cards, menus, dialogs, temporary layers   |

A surface may use elevation, but elevation alone should not be used to communicate hierarchy.

> Prefer surface hierarchy, spacing and borders before increasing elevation. Use elevation mainly for floating, temporary or high-attention content such as menus, popovers and dialogs.

## 5. Colour anatomy

Each semantic colour role contains related tokens that support different levels of emphasis and interaction.

| Part          | Purpose                          | Typical usage                                       |
| ------------- | -------------------------------- | --------------------------------------------------- |
| Default/Main  | Core semantic colour             | Actions, status indicators, emphasis                |
| Accent        | Supporting highlight             | Focus rings, highlights, supporting accents         |
| Emphasis      | Stronger emphasis                | Hover, active or stronger emphasis states           |
| Container     | Low-emphasis semantic surface    | Chips, alerts, selected regions, grouped states     |
| On Container  | Foreground for container         | Text and icons inside semantic containers           |
| Solid         | High-emphasis interactive surface | Contained buttons and strong interactive controls  |
| On Solid      | Foreground for solid             | Text and icons inside solid controls                |
| Contrast Text | Foreground for the main colour   | Text and icons placed directly on the main colour   |

### Light and dark comparison

The same roles exist in both modes. Each mode has its own hand-tuned values, so a dark value is not derived from its light value.

| Role              | Token                    | Light     | Dark      |
| ----------------- | ------------------------ | --------- | --------- |
| Primary           | `--ds-primary`           | `#2a4db8` | `#8aa7ff` |
| Primary container | `--ds-primary-container` | `#e5ebff` | `#1b2c5f` |
| Surface           | `--ds-surface`           | `#ffffff` | `#161820` |

### Container and solid patterns

DiamondDS uses two main semantic presentation patterns: **container** and **solid**.

| Pattern   | Emphasis | Purpose                                                 | Typical usage                                          |
| --------- | -------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Container | Low      | Provides a semantic surface without dominating the interface | Alerts, chips, selected regions, informational panels |
| Solid     | High     | Creates a strong interactive or semantic surface        | Contained buttons, primary actions, high-priority controls |

Use **container** when meaning should be visible but quiet. Use **solid** when an action or state needs stronger emphasis.

> **Looking for the implementation reference?** This page explains the principles behind colour in DiamondDS. For every semantic theme token in light and dark mode, see [Theme colours](theme-colours.md).

## 6. Interaction states

Colour changes should support interaction without becoming the only indication of state.

| State     | Purpose                 | Guidance                                                                                                          |
| --------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Rest      | Default appearance      | Use the base semantic role for the component or surface.                                                          |
| Hover     | Pointer interaction     | Use a subtle change in surface, border or emphasis.                                                               |
| Focus     | Keyboard focus          | Always use the focus ring. Do not rely only on colour changes.                                                    |
| Active    | Pressed state           | Use a stronger interaction treatment than hover.                                                                  |
| Selected  | Persistent selection    | Use a clear selected treatment that remains visible after interaction.                                            |
| Read-only | Viewable but not editable | Content remains selectable and readable. Users can focus, copy and inspect values, but cannot modify them.      |
| Disabled  | Unavailable interaction | Disabled styles always override hover, focus, active and selected states.                                         |

### Read-only

Read-only content is available for inspection but cannot be edited.

Use read-only when users need access to information while preventing modification. This is common in scientific and operational workflows where values may be locked, system-generated or controlled by permissions, but still need to be reviewed, verified, compared, copied or referenced.

> Prefer **read-only** over **disabled** whenever users still need access to the underlying information. Use disabled mainly for unavailable actions and controls, not for viewable data.

Disabled content may be omitted from form submissions, skipped during keyboard navigation, unavailable to some automation and testing tools, or inaccessible to integrations and data extraction workflows. Read-only content remains part of the interface and stays available for inspection, copying, automation and accessibility tooling.

Use read-only when users need to:

- Review values before making decisions.
- Compare settings or configuration.
- Copy text or data.
- Reference system-generated information.
- Access information that is currently locked for editing.

Read-only content should remain:

- Readable.
- Clearly identifiable as non-editable.
- Focusable where appropriate.
- Selectable and copyable where appropriate.
- Visually distinct from editable controls.

Read-only content should not appear disabled. Disabled content communicates that a control is unavailable. Read-only content communicates that a value is available but cannot be changed.

### Read-only vs disabled

| Capability                              | Read-only | Disabled    |
| --------------------------------------- | --------- | ----------- |
| Visible                                 | Yes       | Yes         |
| Readable                                | Yes       | Yes         |
| Focusable                               | Usually   | No          |
| Selectable                              | Yes       | Usually not |
| Copyable                                | Yes       | Usually not |
| Submitted with forms                    | Usually   | Usually not |
| Available to automation and integrations | Usually  | Not always  |
| Editable                                | No        | No          |

### State priority

When multiple states apply, use this priority order, highest first:

1. Disabled
2. Error
3. Selected
4. Active
5. Hover
6. Rest

Disabled and error states always win over other visual states.

## 7. Scientific workflow guidance

Scientific interfaces often contain:

- Large tables
- Live data
- Monitoring views
- Control panels
- Acquisition screens
- Alerts and operational feedback

In these environments, colour must keep a strong signal-to-noise ratio.

**Do**

- Use neutral colours for most layout and structure.
- Reserve semantic colours for meaningful changes in state.
- Use warning and error colours only when attention or action is needed.
- Ensure critical alerts remain visually distinct.
- Allow data visualisation colours to remain distinct from UI colours.

**Don't**

- Don't use large blocks of semantic colour as decoration.
- Don't colour every data point, metric or row.
- Don't use status colours for general layout structure.
- Don't create multiple competing status colours in the same view.
- Don't make visualisation colours compete with interface colours.

## 8. Data visualisation guidance

UI colours and visualisation colours serve different purposes.

| Colour system         | Purpose                                                  | Examples                                          |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------- |
| UI colours            | Communicate structure, actions and status                | Buttons, alerts, text, borders, surfaces          |
| Visualisation colours | Communicate data categories, measurements and trends     | Charts, plots, heatmaps, scientific visualisations |

Do not reuse UI intent colours as a general chart palette. Use visualisation colours for data and UI colours for interface meaning.

## 9. Accessibility

Colour plays an important role in accessibility but should not be relied on as the only means of communication.

Important information should be communicated through a combination of colour, text, icons, labels, layout and interaction patterns.

### Colour accessibility principles

- Do not communicate meaning through colour alone.
- Ensure important states remain distinguishable in both light and dark modes.
- Pair status colours with labels, icons or supporting text.
- Use semantic colour tokens rather than hardcoded values.
- Test colour usage in realistic workflows and data-dense interfaces.

> For contrast requirements, focus indicators and broader accessibility standards, see [Accessibility](../accessibility/overview.md) and [Colour contrast and vision](../accessibility/colour-contrast.md).

## 10. Token reference

The token reference connects DiamondDS semantic colour roles to CSS variables and MUI palette roles.

Use semantic tokens and MUI palette roles in components. Avoid hardcoded hex values.

### Semantic intent and brand roles

Intent and brand colours follow a shared semantic structure.

| Token pattern                | MUI role                      | Purpose                                  | Typical use                                        |
| ---------------------------- | ----------------------------- | ---------------------------------------- | -------------------------------------------------- |
| `--ds-[token]`               | `palette.[role].main`         | Main semantic colour                     | Actions, status communication, emphasis, identity  |
| `--ds-on-[token]`            | `palette.[role].contrastText` | Foreground colour paired with the role   | Text and icons shown on the role colour            |
| `--ds-[token]-emphasis`      | `palette.[role].dark`         | Stronger variation of the role           | Hover, active or stronger emphasis states          |
| `--ds-[token]-accent`        | `palette.[role].light`        | Lighter accent variation                 | Focus rings, highlights, supporting accents        |
| `--ds-[token]-container`     | `palette.[role].container`    | Lower-emphasis role surface              | Chips, alerts, selected regions, grouped states    |
| `--ds-on-[token]-container`  | `palette.[role].onContainer`  | Foreground colour paired with role containers | Text and icons inside semantic containers     |
| `--ds-[token]-solid`         | `palette.[role].solid`        | High-emphasis interactive surface        | Contained buttons and strong interactive controls  |
| `--ds-on-[token]-solid`      | `palette.[role].onSolid`      | Foreground colour paired with solid surfaces | Text and icons inside solid controls           |

> Token names and MUI role names are usually aligned. DiamondDS uses `danger` tokens internally, which map to the MUI `error` palette role.

### Neutral roles

Neutral tokens create the structure of the interface. They should be the default choice for layout, surfaces, borders, text and dense scientific workflows.

| Token                       | MUI role                              | Purpose                          | Typical use                                                       |
| --------------------------- | ------------------------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `--ds-background`           | `background.default`                  | Root application background      | App shell, page canvas, full-screen layouts                       |
| `--ds-surface`              | `background.paper`                    | Base content surface             | Cards, dialogs, menus, content panels                             |
| `--ds-surface-container`    | `surface.subtle`                      | Quiet grouped surface            | Secondary panels, grouped controls, low-emphasis regions          |
| `--ds-surface-container-high` | `surface.strong`                    | Stronger grouped surface         | Nested containers, selected regions, raised sections              |
| `--ds-surface-disabled`     | `action.disabledBackground`           | Disabled surface treatment       | Disabled filled controls and inactive regions                     |
| `--ds-on-surface`           | `text.primary`                        | Main foreground colour           | Primary text and icons                                            |
| `--ds-on-surface-variant`   | `text.secondary`                      | Lower-emphasis foreground colour | Secondary text, metadata, helper text                             |
| `--ds-on-surface-disabled`  | `text.disabled` / `action.disabled`   | Disabled foreground colour       | Disabled text, icons and interactive controls (buttons, tabs, inputs) |
| `--ds-control-disabled`     | Checkbox / Radio (`Mui-disabled`)     | Disabled control icon colour     | Disabled checkbox and radio icons                                 |
| `--ds-border-subtle`        | `border.subtle`                       | Quiet structural boundary        | Dividers, table lines, subtle outlines                            |
| `--ds-border-emphasis`      | `border.emphasis`                     | Stronger boundary                | Interactive boundaries and active regions                         |
| `--ds-border-strong`        | `border.strong`                       | Highest-emphasis neutral boundary | Hover states and high-attention boundaries                       |
