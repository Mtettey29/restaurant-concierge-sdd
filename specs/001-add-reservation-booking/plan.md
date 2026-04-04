# Implementation Plan: Reservation Booking

**Branch**: `001-add-reservation-booking` | **Date**: 2026-04-04 | **Spec**: [specs/001-add-reservation-booking/spec.md]
**Input**: Feature specification from `/specs/001-add-reservation-booking/spec.md`

## Summary

This feature adds table reservation booking and retrieval capabilities to the restaurant concierge agent. The implementation involves creating a new `reservations` table in the Cloud SQL database, defining SQL tools in `tools.yaml`, and updating the ADK agent to use these tools for booking and checking reservations.

## Technical Context

**Language/Version**: Python 3.12+
**Primary Dependencies**: google-adk, toolbox-core, FastAPI
**Storage**: Cloud SQL Postgres (via MCP Toolbox)
**Testing**: [NEEDS CLARIFICATION: No test framework established in project context]
**Target Platform**: Linux / Google Cloud
**Project Type**: Single project (agent + server)
**Performance Goals**: Instant response for database operations (<500ms)
**Constraints**: All DB operations must go through `tools.yaml` (Constitution Principle I)
**Scale/Scope**: MVP for restaurant reservations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **External Tools**: Does every database operation use an MCP Toolbox definition in `tools.yaml`? (No raw SQL/ORM)
- [x] **Standard State**: Does all session state use ADK `ToolContext`? (No custom/external stores)
- [x] **Simplicity**: Does the design strictly follow existing file and naming conventions?
- [x] **Spec-Driven**: Does this feature begin with a clear, approved specification?
- [x] **Verification**: Are there independent validation steps planned for ADK components before UI integration?

## Project Structure

### Documentation (this feature)

```text
specs/001-add-reservation-booking/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
restaurant_concierge/
└── agent.py             # Update with new tools and instructions

scripts/
└── seed_db.py           # Update to include reservations table creation

tools.yaml               # Update with reservation booking/listing tool definitions
```

**Structure Decision**: Single project structure as per existing repository layout.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
