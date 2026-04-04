# Tasks: Custom Web Chat Interface

**Input**: Design documents from `/specs/002-web-chat-interface/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Verification is performed manually via browser as per `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `static/` directory for frontend assets
- [x] T002 Update `server.py` to import `StaticFiles` and mount the `static/` directory
- [x] T003 Update `server.py` to add a root route `/` that serves `static/index.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Basic frontend skeleton

- [x] T004 [P] Create `static/index.html` with basic HTML5 structure and Tailwind CDN
- [x] T005 [P] Create `static/style.css` for custom animations and overrides
- [x] T006 [P] Create `static/app.js` with initial session management logic (UUID generation)

---

## Phase 3: User Story 1 - Interaction via Web (Priority: P1) 🎯 MVP

**Goal**: Functional chat window where users can send/receive messages.

**Independent Test**: Send "Hello" and receive a response from the agent in the UI.

### Implementation for User Story 1

- [x] T007 [P] Implement modern chat layout in `static/index.html` (header, history area, input form)
- [x] T008 [P] Add styling for message bubbles (user vs agent) in `static/style.css`
- [x] T009 Implement `fetch` logic in `static/app.js` to call the backend `/run` endpoint
- [x] T010 Implement DOM update logic in `static/app.js` to display new messages
- [x] T011 Add "typing" indicator visibility toggle in `static/app.js`

**Checkpoint**: Core chat functionality ready and testable in browser.

---

## Phase 4: User Story 2 - Persistent Sessions (Priority: P2)

**Goal**: Preserve history on page refresh.

**Independent Test**: Send a message, refresh page, and verify the message is still there.

### Implementation for User Story 2

- [x] T012 Implement `localStorage` read/write for session ID and message history in `static/app.js`
- [x] T013 Implement logic to render history from `localStorage` on page load in `static/app.js`

**Checkpoint**: Session persistence functional.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Refinement and final validation

- [x] T014 [P] Add Lucide icons for send button and restaurant branding in `static/index.html`
- [x] T015 Ensure mobile responsiveness (paddings, font sizes) in `static/style.css`
- [x] T016 Run all verification steps in `specs/002-web-chat-interface/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must complete T002/T003 to serve the frontend.
- **Foundational (Phase 2)**: Depends on T001.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on US1 completion.

---

## Parallel Example: Frontend Scaffolding

```bash
# Create files in parallel:
Task: "Create index.html" (T004)
Task: "Create style.css" (T005)
Task: "Create app.js" (T006)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Setup FastAPI serving (T001-T003)
2. Build core chat UI and logic (T004-T011)
3. **VALIDATE**: Ensure end-to-end messaging works.

### Incremental Delivery

1. Backend serving ready
2. Core chat functional -> MVP!
3. Session persistence added
4. Visual polish and mobile optimization
