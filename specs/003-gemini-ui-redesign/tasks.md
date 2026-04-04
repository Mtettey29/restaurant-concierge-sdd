# Tasks: Gemini-Inspired UI Redesign

**Input**: Design documents from `/specs/003-gemini-ui-redesign/`
**Prerequisites**: plan.md (required), spec.md (required)

**Organization**: Tasks are grouped by logical component updates.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Global Aesthetic Foundation

**Purpose**: Set up typography and global styles

- [ ] T001 [P] Import "Inter" font in `static/index.html`
- [ ] T002 [P] Update `static/style.css` with global typography and color variable overrides

---

## Phase 2: Layout Restructuring

**Purpose**: Move from header-heavy to centered-airy layout

- [ ] T003 Update `static/index.html` header to be minimalist and centered
- [ ] T004 Wrap chat container in a max-width centered `div` in `static/index.html`
- [ ] T005 Redesign the footer to be a floating "pill" input in `static/index.html`

---

## Phase 3: Component Redesign

**Purpose**: Refine bubbles and interactions

- [ ] T006 Update `static/style.css` to remove background from agent bubbles
- [ ] T007 [P] Style user bubbles with subtle gray/slate backgrounds in `static/style.css`
- [ ] T008 [P] Add CSS animations for smooth message entry in `static/style.css`
- [ ] T009 Update `appendBubble` in `static/app.js` to support icons and new HTML structure
- [ ] T010 Refine typing indicator to be more subtle in `static/index.html` and `static/app.js`

---

## Phase 4: Verification & Polish

**Purpose**: Ensure perfection across devices

- [ ] T011 [P] Fix any z-index or overflow issues with the floating input area
- [ ] T012 [P] Verify mobile responsiveness in browser dev tools
- [ ] T013 Final end-to-end check of reservation flow through the new UI
