<!--
  Sync Impact Report:
  - Version change: N/A → 1.0.0
  - List of modified principles: (Initial principles added)
  - Added sections: Core Principles, Development Constraints, Workflow Standards, Governance
  - Templates requiring updates: ✅ .specify/templates/plan-template.md (updated)
  - Follow-up TODOs: None
-->

# restaurant-concierge Constitution

## Core Principles

### I. External Tool Definitions
All database operations MUST go through MCP Toolbox tool definitions in `tools.yaml`. No raw SQL in Python code, and no ORM usage allowed. This ensures a clean separation between the agent's logic and the data persistence layer.

### II. Standard Session State
Session state MUST use ADK `ToolContext`. No custom state management or external state stores are permitted. This ensures consistency and leverages the built-in capabilities of the ADK framework.

### III. Convention Over Configuration
Follow existing file and naming conventions exactly. Keep the architecture simple and avoid unnecessary abstractions. Use the established project structure (`restaurant_concierge/`, `scripts/`, etc.) and naming patterns.

## Development Constraints
- **Environment**: All development must be compatible with the `uv` package manager and Python 3.12+.
- **Tools**: Use `tools.yaml` for defining SQL tools that are then loaded via `ToolboxSyncClient`.
- **Server**: The application is served using FastAPI via `get_fast_api_app`.

## Workflow Standards
- **Spec-Driven**: All features must follow the Research -> Strategy -> Execution lifecycle.
- **Surgical Edits**: Use targeted `replace` calls for file modifications to maintain stability.
- **Validation**: Every change must be verified against the project's runtime behavior.

## Governance
- The constitution is the source of truth for all architectural decisions.
- Amendments require a version bump (Major/Minor/Patch).
- All feature implementations must pass a "Constitution Check" during the planning phase.

**Version**: 1.0.0 | **Ratified**: 2026-04-04 | **Last Amended**: 2026-04-04
