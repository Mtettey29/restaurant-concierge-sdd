# Feature Specification: Cloud Run Deployment

**Feature Branch**: `004-cloud-run-deployment`  
**Created**: 2026-04-04  
**Status**: Draft  
**Input**: User description: "Add Cloud Run deployment configuration. Create a Dockerfile that includes both the ADK agent server and the MCP Toolbox binary. Provide a deployment script to automate the process of building and deploying to Cloud Run."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Deploy to Cloud Run (Priority: P1)

As a developer, I want to deploy my restaurant concierge to Cloud Run so that it is accessible to guests on the public internet.

**Why this priority**: Essential for making the application production-ready and accessible.

**Independent Test**: Can be tested by running the deployment script, verifying the image is built and uploaded to Artifact Registry, and that the Cloud Run service starts successfully.

**Acceptance Scenarios**:

1. **Given** valid Google Cloud credentials and project setup, **When** I run the deployment script, **Then** the application should be built into a Docker image and deployed to Cloud Run.
2. **Given** the service is deployed, **When** I access the Cloud Run URL, **Then** I should see the "Cloud Kitchen" chat interface.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include a `Dockerfile` that packages the Python environment and the MCP Toolbox binary.
- **FR-002**: System MUST include an `entrypoint.sh` script to manage multiple processes (Toolbox and FastAPI).
- **FR-003**: System MUST provide a `scripts/deploy.sh` to automate the `gcloud` deployment command.
- **FR-004**: System MUST support configuration via environment variables (Project ID, Region, DB Password).
- **FR-005**: Cloud Run service MUST be configured to allow unauthenticated access (for this demo project).

### Technical Requirements

- **TR-001**: Use `uv` for efficient dependency management in the Docker image.
- **TR-002**: Download the specific version of MCP Toolbox (0.27.0) during the Docker build.
- **TR-003**: Ensure the health check port (8080) is correctly exposed and routed to the FastAPI server.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Deployment process (build + deploy) completes in under 5 minutes.
- **SC-002**: 100% of deployed services successfully connect to the existing Cloud SQL database.
- **SC-003**: Deployed application passes the same verification steps as the local version (booking, listing).
