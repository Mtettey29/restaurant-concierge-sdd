# Tasks: Cloud Run Deployment

**Input**: Design documents from `/specs/004-cloud-run-deployment/`
**Prerequisites**: plan.md (required), spec.md (required)

**Organization**: Sequential tasks for containerization and deployment.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Containerization

**Purpose**: Create the Docker environment

- [x] T001 [P] Create `Dockerfile` with multi-process setup
- [x] T002 [P] Create `entrypoint.sh` to start Toolbox and FastAPI
- [x] T003 Make `entrypoint.sh` executable
- [x] T004 [P] Update `.dockerignore` to exclude local environment and secrets

---

## Phase 2: Deployment Automation

**Purpose**: Script the deployment process

- [x] T005 [P] Create `scripts/deploy.sh` with `gcloud run deploy` command
- [x] T006 Make `scripts/deploy.sh` executable
- [x] T007 [P] Update `README.md` with deployment instructions

---

## Phase 3: Verification

**Purpose**: Test the container locally and then deploy

- [ ] T008 [P] Build Docker image locally: `docker build -t concierge .`
- [ ] T009 [P] Run Docker container locally (mocking DB if needed) to verify entrypoint
- [ ] T010 Execute `bash scripts/deploy.sh` to deploy to Cloud Run
- [ ] T011 Verify Cloud Run service is healthy and accessible via public URL
