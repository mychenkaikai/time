## ADDED Requirements

### Requirement: Scoped Client Initialization
Client-side interactive components SHALL initialize from their own rendered root element and MUST NOT depend on scanning the entire document for unrelated nodes.

#### Scenario: Component initializes from local root
- **WHEN** an interactive component such as the search modal, music player, or video embed is rendered
- **THEN** its client logic binds only to elements within that component's rendered root

#### Scenario: Multiple instances do not conflict
- **WHEN** more than one instance of an interactive component type is present on a page
- **THEN** each instance manages its own state and event bindings without overwriting another instance's controls

### Requirement: Explicit Shell Communication
Client components SHALL use explicit interfaces for shell-level behaviors rather than relying on ad hoc global functions attached to `window`.

#### Scenario: Search activation uses shell-owned interface
- **WHEN** a user activates the global search control
- **THEN** the search modal opens through a shell-owned interaction path rather than a page-global function

### Requirement: Predictable Global Event Usage
Any remaining global browser events used by interactive components SHALL have a clearly defined owner and purpose, with shell-level concerns owned by the shell and component-level concerns owned by the component.

#### Scenario: Theme and overlay events remain centralized
- **WHEN** theme or CRT-related behavior changes
- **THEN** the shared shell remains the owner of the corresponding global state transitions and components react through the defined interface
