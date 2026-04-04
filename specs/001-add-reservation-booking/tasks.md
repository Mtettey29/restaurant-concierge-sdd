# Tasks: Reservation Booking

**Input**: Design documents from `/specs/001-add-reservation-booking/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT explicitly requested in the feature specification, so no automated test tasks are included. Verification is performed manually via `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Create `specs/001-add-reservation-booking/contracts/tools.yaml` with reservation tools (Done in Planning)
- [x] T002 [P] Update `tools.yaml` at root by appending `create_reservation` and `list_reservations` from `specs/001-add-reservation-booking/contracts/tools.yaml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Update `scripts/seed_db.py` to include `CREATE TABLE reservations` schema from `data-model.md`
- [x] T004 Run `python scripts/seed_db.py` to initialize the database table
- [x] T005 [P] Verify `reservations` table existence in Cloud SQL

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Make a New Reservation (Priority: P1) 🎯 MVP

**Goal**: Allow guests to book a table by providing name, party size, date, and time.

**Independent Test**: Successfully book a table for "Alex" for 2 people tomorrow at 6 PM and confirm the agent handles special requests.

### Implementation for User Story 1

- [x] T006 Update `restaurant_concierge/agent.py` SYSTEM_INSTRUCTION to include Reservation Booking capabilities and guidelines
- [x] T007 [P] Update `restaurant_concierge/agent.py` to ensure `create_reservation` tool is available to the agent via `toolbox_tools`
- [x] T008 [US1] Test reservation flow manually: "I'd like to book a table for 4 for dinner this Friday at 7pm under the name Smith"
- [x] T009 [US1] Verify confirmation logic: Agent must confirm all details before "finalizing" (calling the tool)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Check Existing Reservations (Priority: P2)

**Goal**: Allow guests to check their existing reservations by name.

**Independent Test**: Ask "Show my reservation for Alex" and verify the details match the booking.

### Implementation for User Story 2

- [x] T010 [P] Update `restaurant_concierge/agent.py` to ensure `list_reservations` tool is available to the agent
- [x] T011 [US2] Test retrieval flow manually: "Check my reservation for Smith"
- [x] T012 [US2] Verify empty state: "Check my reservation for Jones" (where Jones has no booking)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation

- [x] T013 [P] Run all verification steps in `specs/001-add-reservation-booking/quickstart.md`
- [x] T014 [P] Update `README.md` with mention of new reservation booking capability (Optional)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on T002 - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Phase 2 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2). It is logically better to do after US1 to have data to check.

---

## Parallel Example: Setup & Foundation

```bash
# Update tools.yaml and seed_db.py in parallel:
Task: "Update tools.yaml at root" (T002)
Task: "Update scripts/seed_db.py" (T003)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2 (Setup & Foundation)
2. Complete Phase 3 (User Story 1)
3. **STOP and VALIDATE**: Verify a reservation can be created in the database.

### Incremental Delivery

1. Foundation ready (T001-T005)
2. Booking capability added (T006-T009) -> MVP Ready
3. Checking capability added (T010-T012)
4. Final Polish (T013-T014)
