## ADDED Requirements

### Requirement: Unified Site Shell
The site SHALL provide a unified shell for all primary site pages that hosts shared navigation, global search entry, global overlays, and footer controls in a single composition point.

#### Scenario: Primary pages use shared shell
- **WHEN** a user visits a primary site page such as the home page, archive page, about page, tag index, or tag detail page
- **THEN** the page is rendered inside the shared site shell rather than assembling shared navigation and footer controls independently

#### Scenario: Shared shell owns global search
- **WHEN** a user activates the search entry from the shared navigation
- **THEN** the search UI is available from the shell without relying on a page-specific global function registration

### Requirement: Consistent Navigation State
The shared shell SHALL determine navigation active state from a normalized route source so that active styling remains correct across root-path and sub-path deployments.

#### Scenario: Active state on root deployment
- **WHEN** the site is deployed at the root path and a user visits a page with a matching navigation item
- **THEN** the corresponding navigation item is marked active

#### Scenario: Active state on sub-path deployment
- **WHEN** the site is deployed under a project sub-path and a user visits a page with a matching navigation item
- **THEN** the corresponding navigation item is marked active using the normalized deployed path

### Requirement: Global UI Registration
The shared shell SHALL be the single registration point for global overlays and controls, including theme selection, CRT overlay, and mobile warning behaviors.

#### Scenario: Global overlays are available across pages
- **WHEN** a user navigates between primary site pages
- **THEN** theme controls, CRT overlay behavior, and mobile warning behavior are provided consistently from the shared shell
