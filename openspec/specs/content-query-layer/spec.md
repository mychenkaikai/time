## ADDED Requirements

### Requirement: Shared Published Post Query
The site SHALL provide a shared content query layer that returns published posts using a single source of truth for draft filtering and default sorting.

#### Scenario: Draft filtering is consistent
- **WHEN** any page or navigation component requests the published post list
- **THEN** draft content is excluded using the same filtering rule

#### Scenario: Default sorting is consistent
- **WHEN** any page or navigation component requests the default published post list
- **THEN** posts are returned in the same default order across home, archive, tag, and navigation views

### Requirement: Shared Category Tree
The site SHALL provide a shared category tree derived from published posts for use by navigational components.

#### Scenario: Side navigation uses shared category tree
- **WHEN** the side navigation is rendered
- **THEN** it consumes the shared category tree rather than recomputing category and subcategory groupings locally

#### Scenario: Category tree reflects published content only
- **WHEN** a published post is added, removed, or reclassified
- **THEN** the shared category tree updates to reflect only currently published content

### Requirement: Shared Tag Index
The site SHALL provide a shared tag index that powers tag listing and tag detail pages from the same aggregated data source.

#### Scenario: Tag list and tag detail agree
- **WHEN** a user opens the tag index and then visits a tag detail page
- **THEN** the set of posts shown for that tag is derived from the same shared aggregation logic
