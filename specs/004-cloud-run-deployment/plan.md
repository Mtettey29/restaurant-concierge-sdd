# Implementation Plan: Cloud Run Deployment

**Branch**: `004-cloud-run-deployment` | **Date**: 2026-04-04 | **Spec**: [specs/004-cloud-run-deployment/spec.md]
**Input**: Feature specification from `/specs/004-cloud-run-deployment/spec.md`

## Summary

This feature involves containerizing the entire application (FastAPI + ADK + MCP Toolbox) into a single Docker image and providing an automation script for Google Cloud Run deployment. The key challenge is running both the Toolbox binary and the Python server in the same container, which we will solve using a lightweight `entrypoint.sh` process manager.

## Technical Context

**Language/Version**: Docker (Dockerfile), Bash (entrypoint.sh, deploy.sh), Python 3.12+
**Primary Dependencies**: uv, gcloud CLI, MCP Toolbox (v0.27.0)
**Storage**: Cloud SQL Postgres (existing instance)
**Testing**: Local Docker verification, Cloud Run URL smoke test.
**Target Platform**: Google Cloud Run
**Project Type**: Containerized microservice
**Performance Goals**: Efficient startup (<30s), low memory overhead.
**Constraints**: Must follow "Keep it simple" principle.
**Scale/Scope**: Production-ready deployment artifacts.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **External Tools**: (Configuration uses existing tools.yaml)
- [x] **Standard State**: (N/A for deployment)
- [x] **Simplicity**: (Uses a simple shell script for multi-process management)
- [x] **Spec-Driven**: (Based on approved specification)
- [x] **Verification**: (Includes local container testing)

## Project Structure

### Documentation (this feature)

```text
specs/004-cloud-run-deployment/
├── plan.md              # This file
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
Dockerfile               # New: Build instructions
entrypoint.sh            # New: Process manager
scripts/
└── deploy.sh            # New: gcloud run deploy command
```

**Structure Decision**: Root-level Dockerfile and entrypoint for standard Cloud Run compatibility.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
