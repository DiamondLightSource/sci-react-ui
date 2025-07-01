SciReactUI Changelog
====================


[v0.2.1alpha] - 2025-??-??
--------------------

### Added
- Logo component, to easily add the theme logo to anywhere

### Fixed
- 

### Changed
- Breaking change: ImageColorSchemeSwitch, ImageColorSchemeSwitchType and ImageColorSchemeSwitchProps renamed to ImageColourSchemeSwitch, ImageColourSchemeSwitchType and ImageColourSchemeSwitchProps. 
- Breaking change: User component color prop renamed to colour.
- ImageColourSchemeSwitch takes a parameter to interchange images on colour scheme switch.


[v0.2.0] - 2025-06-11
---------------------

### Fixed
- Styles added to Navbar and Footer incorrectly remove built in styles.
- Logo not appearing when no dark src set in dark mode.

### Changed
- Breadcrumbs component takes optional linkComponent prop for page routing. 
- Navbar, NavLink and FooterLink will use routing library for links if provided with linkComponent and to props.
- Navbar uses slots for positioning elements. Breaking change: elements must now use rightSlot for positioning to the far right.
- User can take additional menu items through the menuItems prop.
- Footer uses slots for positioning elements. Breaking change: elements must now use rightSlot for positioning to the far right.


[v0.1.0] - 2025-04-10
---------------------

### Added
- Breadcrumbs take object array (CustomLink) for total control over names and links.

### Fixed
- Stopped flicker between colour modes when starting an app in dark mode.
- Footer links stopped from moving on hover when only showing links.
- Footer links now correctly center horizontally, if needed.
- NavBar positions items correctly in multiple screen widths.
- User hides id and name when on very small screens

### Changed
- Footer links now align with copyright when there is no logo.


[v0.0.3] - 2025-01-27
--------------------

### Fixed
- Moved unnecessary build dependencies to devDependencies

### Changed
- Return key now submits VisitInput (but that can be turned off).


[v0.0.2] - 2025-01-20
--------------------

### Fixed
- Not importing correctly in some external projects.


[v0.0.1] - 2024-12-19
--------------------
### Added
- Components added:
  - Breadcrumbs - Highlight position of page in hierarchy
  - ColourSchemeButton - Switch between light and dark schemes.
  - Footer - A footer, with logo, menu and copyright
    - FooterLinks - A group of links for Footer
    - FooterLink - A link for FooterLinks
  - ImageColorSchemeSwitch - Allow images to be determined by colour scheme
  - Navbar - A header with a menu, and login
    - NavbarLinks - a group of menu items for Navbar
    - NavbarLink - a menuitem
  - ThemeProvider - A provider of a theme
  - User - User control, for login, logoff.
  - VisitInput - A Input for Diamonds visits/sessions
- Themes added:
  - Diamond
  - Generic


[v0.0.0] - 2024-06-04
--------------------

### Added
- 

### Fixed
- 

### Changed
-