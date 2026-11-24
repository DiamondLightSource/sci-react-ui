# Theme colours

The complete semantic colour palette available in DiamondDS, with the value of each token in light and dark mode. Use these through their semantic names, not by picking a colour for its appearance.

> This page is a token reference. To decide which colour role to use, read the [Colour](colour.md) guidance first.

Values come from `DiamondDSTokens.css`, which is in the repository under `src/styles/diamondDS/` and not in the installed package. This page lists every token. The mode is set by `data-mode="light"` or `data-mode="dark"` on `<html>`. In each table, **MUI role** is the matching theme palette path and **Token** is the CSS variable.

## Light mode

### Intent colours

Exposed as MUI palette roles, for example `theme.palette.primary.main`. The `danger` tokens map to the MUI `error` role.

#### Primary

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Primary | `primary.main` | `--ds-primary` | `#2a4db8` |
| On Primary | `primary.contrastText` | `--ds-on-primary` | `#ffffff` |
| Primary emphasis | `primary.dark` | `--ds-primary-emphasis` | `#1f3d96` |
| Primary accent | `primary.light` | `--ds-primary-accent` | `#6a86e4` |
| Primary container | `primary.container` | `--ds-primary-container` | `#e5ebff` |
| On Primary container | `primary.onContainer` | `--ds-on-primary-container` | `#1a2f6b` |
| Primary solid | `primary.solid` | `--ds-primary-solid` | `#3f63c9` |
| On Primary solid | `primary.onSolid` | `--ds-on-primary-solid` | `#ffffff` |

#### Secondary

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Secondary | `secondary.main` | `--ds-secondary` | `#007b84` |
| On Secondary | `secondary.contrastText` | `--ds-on-secondary` | `#ffffff` |
| Secondary emphasis | `secondary.dark` | `--ds-secondary-emphasis` | `#005f67` |
| Secondary accent | `secondary.light` | `--ds-secondary-accent` | `#27adb7` |
| Secondary container | `secondary.container` | `--ds-secondary-container` | `#ddf3f5` |
| On Secondary container | `secondary.onContainer` | `--ds-on-secondary-container` | `#00474d` |
| Secondary solid | `secondary.solid` | `--ds-secondary-solid` | `#0a858e` |
| On Secondary solid | `secondary.onSolid` | `--ds-on-secondary-solid` | `#ffffff` |

#### Info

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Info | `info.main` | `--ds-info` | `#355ec9` |
| On Info | `info.contrastText` | `--ds-on-info` | `#ffffff` |
| Info emphasis | `info.dark` | `--ds-info-emphasis` | `#2a4ea7` |
| Info accent | `info.light` | `--ds-info-accent` | `#6f8fe8` |
| Info container | `info.container` | `--ds-info-container` | `#e9efff` |
| On Info container | `info.onContainer` | `--ds-on-info-container` | `#1f3b85` |
| Info solid | `info.solid` | `--ds-info-solid` | `#4d72dd` |
| On Info solid | `info.onSolid` | `--ds-on-info-solid` | `#ffffff` |

#### Danger

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Danger | `error.main` | `--ds-danger` | `#ae1e13` |
| On Danger | `error.contrastText` | `--ds-on-danger` | `#ffffff` |
| Danger emphasis | `error.dark` | `--ds-danger-emphasis` | `#912018` |
| Danger accent | `error.light` | `--ds-danger-accent` | `#d94f45` |
| Danger container | `error.container` | `--ds-danger-container` | `#fde7e5` |
| On Danger container | `error.onContainer` | `--ds-on-danger-container` | `#6a1b15` |
| Danger solid | `error.solid` | `--ds-danger-solid` | `#d63c41` |
| On Danger solid | `error.onSolid` | `--ds-on-danger-solid` | `#ffffff` |

#### Warning

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Warning | `warning.main` | `--ds-warning` | `#a95703` |
| On Warning | `warning.contrastText` | `--ds-on-warning` | `#ffffff` |
| Warning emphasis | `warning.dark` | `--ds-warning-emphasis` | `#944b00` |
| Warning accent | `warning.light` | `--ds-warning-accent` | `#e98a15` |
| Warning container | `warning.container` | `--ds-warning-container` | `#fef0df` |
| On Warning container | `warning.onContainer` | `--ds-on-warning-container` | `#6f3200` |
| Warning solid | `warning.solid` | `--ds-warning-solid` | `#e97b12` |
| On Warning solid | `warning.onSolid` | `--ds-on-warning-solid` | `#ffffff` |

#### Success

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Success | `success.main` | `--ds-success` | `#137329` |
| On Success | `success.contrastText` | `--ds-on-success` | `#ffffff` |
| Success emphasis | `success.dark` | `--ds-success-emphasis` | `#146125` |
| Success accent | `success.light` | `--ds-success-accent` | `#2fb344` |
| Success container | `success.container` | `--ds-success-container` | `#d4f3df` |
| On Success container | `success.onContainer` | `--ds-on-success-container` | `#0d491d` |
| Success solid | `success.solid` | `--ds-success-solid` | `#1b8834` |
| On Success solid | `success.onSolid` | `--ds-on-success-solid` | `#ffffff` |

### Core brand colours

`brand` is exposed as a MUI palette role. `tertiary` and `highlight` are token families available as CSS variables, but are not exposed as MUI palette roles, so they have no MUI role to use.

#### Brand

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Brand | `brand.main` | `--ds-brand` | `#202945` |
| On Brand | `brand.contrastText` | `--ds-on-brand` | `#ffffff` |
| Brand emphasis | `brand.dark` | `--ds-brand-emphasis` | `#171f35` |
| Brand accent | `brand.light` | `--ds-brand-accent` | `#6a86db` |
| Brand container | `brand.container` | `--ds-brand-container` | `#e4e8f4` |
| On Brand container | `brand.onContainer` | `--ds-on-brand-container` | `#202945` |
| Brand solid | `brand.solid` | `--ds-brand-solid` | `#2f3b63` |
| On Brand solid | `brand.onSolid` | `--ds-on-brand-solid` | `#ffffff` |
| Brand fixed | `brand.fixed` | `--ds-brand-fixed` | `#202945` |
| Brand fixed dim | `brand.fixedDim` | `--ds-brand-fixed-dim` | `#586084` |
| On Brand fixed | `brand.onFixed` | `--ds-on-brand-fixed` | `#ffffff` |

#### Tertiary

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Tertiary | `n/a` | `--ds-tertiary` | `#950078` |
| On Tertiary | `n/a` | `--ds-on-tertiary` | `#ffffff` |
| Tertiary emphasis | `n/a` | `--ds-tertiary-emphasis` | `#7d0064` |
| Tertiary accent | `n/a` | `--ds-tertiary-accent` | `#d44ebb` |
| Tertiary container | `n/a` | `--ds-tertiary-container` | `#f8e0f2` |
| On Tertiary container | `n/a` | `--ds-on-tertiary-container` | `#560045` |
| Tertiary solid | `n/a` | `--ds-tertiary-solid` | `#b0008e` |
| On Tertiary solid | `n/a` | `--ds-on-tertiary-solid` | `#ffffff` |

#### Highlight

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Highlight | `n/a` | `--ds-highlight` | `#e5b800` |
| On Highlight | `n/a` | `--ds-on-highlight` | `#1a1c23` |
| Highlight emphasis | `n/a` | `--ds-highlight-emphasis` | `#c49b00` |
| Highlight accent | `n/a` | `--ds-highlight-accent` | `#fddc60` |
| Highlight container | `n/a` | `--ds-highlight-container` | `#fef4cc` |
| On Highlight container | `n/a` | `--ds-on-highlight-container` | `#6b5500` |
| Highlight solid | `n/a` | `--ds-highlight-solid` | `#fcd021` |
| On Highlight solid | `n/a` | `--ds-on-highlight-solid` | `#1a1c23` |

### Neutral colours

#### Surfaces

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Background | `background.default` | `--ds-background` | `#f6f6f9` |
| Surface | `background.paper` | `--ds-surface` | `#ffffff` |
| Surface container | `surface.subtle` | `--ds-surface-container` | `#eef1f5` |
| Surface container high | `surface.strong` | `--ds-surface-container-high` | `#e6e9f0` |
| Surface disabled | `action.disabledBackground` | `--ds-surface-disabled` | `rgba(26, 28, 35, 0.06)` |

#### Text and foreground

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| On surface | `text.primary` | `--ds-on-surface` | `#1a1c23` |
| On surface variant | `text.secondary` | `--ds-on-surface-variant` | `#505563` |
| On surface subtle | `text.tertiary` | `--ds-on-surface-subtle` | `#6c7484` |
| On surface muted | `text.muted` | `--ds-on-surface-muted` | `#8a90a0` |
| On surface disabled | `text.disabled / action.disabled` | `--ds-on-surface-disabled` | `rgba(26, 28, 35, 0.36)` |
| Placeholder | `text.placeholder` | `--ds-placeholder` | `#8a90a0` |
| Placeholder focus | `text.placeholderFocus` | `--ds-placeholder-focus` | `#505563` |
| On solid | `text.onSolid` | `--ds-on-solid` | `#ffffff` |

#### Borders

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Border subtle | `border.subtle` | `--ds-border-subtle` | `#dde1e8` |
| Border emphasis | `border.emphasis` | `--ds-border-emphasis` | `#bcc2cd` |
| Border strong | `border.strong` | `--ds-border-strong` | `#a5acb8` |

## Dark mode

### Intent colours

Exposed as MUI palette roles, for example `theme.palette.primary.main`. The `danger` tokens map to the MUI `error` role.

#### Primary

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Primary | `primary.main` | `--ds-primary` | `#8aa7ff` |
| On Primary | `primary.contrastText` | `--ds-on-primary` | `#0b1638` |
| Primary emphasis | `primary.dark` | `--ds-primary-emphasis` | `#c4d4ff` |
| Primary accent | `primary.light` | `--ds-primary-accent` | `#a5bcff` |
| Primary container | `primary.container` | `--ds-primary-container` | `#1b2c5f` |
| On Primary container | `primary.onContainer` | `--ds-on-primary-container` | `#e8eeff` |
| Primary solid | `primary.solid` | `--ds-primary-solid` | `#3f63c9` |
| On Primary solid | `primary.onSolid` | `--ds-on-primary-solid` | `#ffffff` |

#### Secondary

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Secondary | `secondary.main` | `--ds-secondary` | `#58d6de` |
| On Secondary | `secondary.contrastText` | `--ds-on-secondary` | `#002529` |
| Secondary emphasis | `secondary.dark` | `--ds-secondary-emphasis` | `#9af0f3` |
| Secondary accent | `secondary.light` | `--ds-secondary-accent` | `#7be4ea` |
| Secondary container | `secondary.container` | `--ds-secondary-container` | `#0d3338` |
| On Secondary container | `secondary.onContainer` | `--ds-on-secondary-container` | `#ccf7f9` |
| Secondary solid | `secondary.solid` | `--ds-secondary-solid` | `#0a858e` |
| On Secondary solid | `secondary.onSolid` | `--ds-on-secondary-solid` | `#ffffff` |

#### Info

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Info | `info.main` | `--ds-info` | `#9fb7ff` |
| On Info | `info.contrastText` | `--ds-on-info` | `#101936` |
| Info emphasis | `info.dark` | `--ds-info-emphasis` | `#d5e0ff` |
| Info accent | `info.light` | `--ds-info-accent` | `#bccdff` |
| Info container | `info.container` | `--ds-info-container` | `#1b2b57` |
| On Info container | `info.onContainer` | `--ds-on-info-container` | `#dce4ff` |
| Info solid | `info.solid` | `--ds-info-solid` | `#4d72dd` |
| On Info solid | `info.onSolid` | `--ds-on-info-solid` | `#ffffff` |

#### Danger

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Danger | `error.main` | `--ds-danger` | `#ff9088` |
| On Danger | `error.contrastText` | `--ds-on-danger` | `#2f0907` |
| Danger emphasis | `error.dark` | `--ds-danger-emphasis` | `#ffc7c2` |
| Danger accent | `error.light` | `--ds-danger-accent` | `#ffb0aa` |
| Danger container | `error.container` | `--ds-danger-container` | `#3a1613` |
| On Danger container | `error.onContainer` | `--ds-on-danger-container` | `#ffd9d6` |
| Danger solid | `error.solid` | `--ds-danger-solid` | `#d63c41` |
| On Danger solid | `error.onSolid` | `--ds-on-danger-solid` | `#ffffff` |

#### Warning

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Warning | `warning.main` | `--ds-warning` | `#ffb067` |
| On Warning | `warning.contrastText` | `--ds-on-warning` | `#311700` |
| Warning emphasis | `warning.dark` | `--ds-warning-emphasis` | `#ffd9b0` |
| Warning accent | `warning.light` | `--ds-warning-accent` | `#ffc68a` |
| Warning container | `warning.container` | `--ds-warning-container` | `#382006` |
| On Warning container | `warning.onContainer` | `--ds-on-warning-container` | `#ffe4c8` |
| Warning solid | `warning.solid` | `--ds-warning-solid` | `#f07a13` |
| On Warning solid | `warning.onSolid` | `--ds-on-warning-solid` | `#ffffff` |

#### Success

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Success | `success.main` | `--ds-success` | `#6fd88a` |
| On Success | `success.contrastText` | `--ds-on-success` | `#08210f` |
| Success emphasis | `success.dark` | `--ds-success-emphasis` | `#b3f0c0` |
| Success accent | `success.light` | `--ds-success-accent` | `#8ae5a2` |
| Success container | `success.container` | `--ds-success-container` | `#10341a` |
| On Success container | `success.onContainer` | `--ds-on-success-container` | `#d2f7da` |
| Success solid | `success.solid` | `--ds-success-solid` | `#23913c` |
| On Success solid | `success.onSolid` | `--ds-on-success-solid` | `#ffffff` |

### Core brand colours

`brand` is exposed as a MUI palette role. `tertiary` and `highlight` are token families available as CSS variables, but are not exposed as MUI palette roles, so they have no MUI role to use.

#### Brand

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Brand | `brand.main` | `--ds-brand` | `#aabdff` |
| On Brand | `brand.contrastText` | `--ds-on-brand` | `#0d1530` |
| Brand emphasis | `brand.dark` | `--ds-brand-emphasis` | `#d7e1ff` |
| Brand accent | `brand.light` | `--ds-brand-accent` | `#c4d2ff` |
| Brand container | `brand.container` | `--ds-brand-container` | `#202945` |
| On Brand container | `brand.onContainer` | `--ds-on-brand-container` | `#e3e8f7` |
| Brand solid | `brand.solid` | `--ds-brand-solid` | `#3a4a78` |
| On Brand solid | `brand.onSolid` | `--ds-on-brand-solid` | `#ffffff` |
| Brand fixed | `brand.fixed` | `--ds-brand-fixed` | `#202945` |
| Brand fixed dim | `brand.fixedDim` | `--ds-brand-fixed-dim` | `#586084` |
| On Brand fixed | `brand.onFixed` | `--ds-on-brand-fixed` | `#ffffff` |

#### Tertiary

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Tertiary | `n/a` | `--ds-tertiary` | `#e080cc` |
| On Tertiary | `n/a` | `--ds-on-tertiary` | `#2d0024` |
| Tertiary emphasis | `n/a` | `--ds-tertiary-emphasis` | `#f0b8e3` |
| Tertiary accent | `n/a` | `--ds-tertiary-accent` | `#e898d5` |
| Tertiary container | `n/a` | `--ds-tertiary-container` | `#3a0e30` |
| On Tertiary container | `n/a` | `--ds-on-tertiary-container` | `#f5d0eb` |
| Tertiary solid | `n/a` | `--ds-tertiary-solid` | `#9a007c` |
| On Tertiary solid | `n/a` | `--ds-on-tertiary-solid` | `#ffffff` |

#### Highlight

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Highlight | `n/a` | `--ds-highlight` | `#fddc60` |
| On Highlight | `n/a` | `--ds-on-highlight` | `#2b2000` |
| Highlight emphasis | `n/a` | `--ds-highlight-emphasis` | `#fee899` |
| Highlight accent | `n/a` | `--ds-highlight-accent` | `#fde070` |
| Highlight container | `n/a` | `--ds-highlight-container` | `#352b00` |
| On Highlight container | `n/a` | `--ds-on-highlight-container` | `#fef0b3` |
| Highlight solid | `n/a` | `--ds-highlight-solid` | `#e5b800` |
| On Highlight solid | `n/a` | `--ds-on-highlight-solid` | `#1a1c23` |

### Neutral colours

#### Surfaces

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Background | `background.default` | `--ds-background` | `#0e1017` |
| Surface | `background.paper` | `--ds-surface` | `#161820` |
| Surface container | `surface.subtle` | `--ds-surface-container` | `#222632` |
| Surface container high | `surface.strong` | `--ds-surface-container-high` | `#2c3140` |
| Surface disabled | `action.disabledBackground` | `--ds-surface-disabled` | `rgba(232, 234, 240, 0.08)` |

#### Text and foreground

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| On surface | `text.primary` | `--ds-on-surface` | `#e8eaf0` |
| On surface variant | `text.secondary` | `--ds-on-surface-variant` | `#b6bcc9` |
| On surface subtle | `text.tertiary` | `--ds-on-surface-subtle` | `#979eae` |
| On surface muted | `text.muted` | `--ds-on-surface-muted` | `#7c8394` |
| On surface disabled | `text.disabled / action.disabled` | `--ds-on-surface-disabled` | `rgba(232, 234, 240, 0.34)` |
| Placeholder | `text.placeholder` | `--ds-placeholder` | `#7c8394` |
| Placeholder focus | `text.placeholderFocus` | `--ds-placeholder-focus` | `#b6bcc9` |
| On solid | `text.onSolid` | `--ds-on-solid` | `#ffffff` |

#### Borders

| Role | MUI role | Token | Value |
| --- | --- | --- | --- |
| Border subtle | `border.subtle` | `--ds-border-subtle` | `#343a49` |
| Border emphasis | `border.emphasis` | `--ds-border-emphasis` | `#505664` |
| Border strong | `border.strong` | `--ds-border-strong` | `#7c8394` |

