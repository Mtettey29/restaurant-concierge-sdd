# Feature Specification: Gemini-Inspired UI Redesign

**Feature Branch**: `003-gemini-ui-redesign`  
**Created**: 2026-04-04  
**Status**: Draft  
**Input**: User description: "Redesign the web chat interface to look and feel like Gemini Chat, focusing on a clean, centered layout, airy message bubbles, and a floating pill-shaped input area."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Premium Chat Experience (Priority: P1)

As a guest, I want a modern and clean chat interface so that my interaction with the concierge feels premium and effortless.

**Why this priority**: Essential for aligning the user experience with modern expectations (like Gemini).

**Independent Test**: Can be tested by navigating to the root URL and observing the new centered layout and "airy" design.

**Acceptance Scenarios**:

1. **Given** the new UI is deployed, **When** I open the page, **Then** I should see a centered chat area with a floating input pill at the bottom.
2. **Given** I am chatting, **When** the agent responds, **Then** the message should appear without a heavy bubble, accompanied by a clean restaurant icon.

---

### User Story 2 - Enhanced Mobile Experience (Priority: P2)

As a mobile user, I want the chat interface to be perfectly optimized for my small screen so that the input area doesn't feel cramped.

**Why this priority**: Improves usability on the most common guest devices.

**Independent Test**: Can be tested by viewing the UI on a mobile device and verifying the floating input bar remains accessible and well-proportioned.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: UI MUST use a centered layout with a maximum width for the chat container.
- **FR-002**: UI MUST implement a floating, pill-shaped input area at the bottom center.
- **FR-003**: Agent messages MUST be displayed without a background bubble, using clean typography and an icon.
- **FR-004**: User messages MUST use a subtle, light-colored rounded bubble.
- **FR-005**: UI MUST use the "Inter" font family for improved readability.
- **FR-006**: UI MUST include smooth fade-in and slide-up animations for new messages.
- **FR-007**: The header MUST be minimalist, moving heavy branding to a subtle top bar.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: UI matches the "Gemini-inspired" aesthetic (centered, airy, clean).
- **SC-002**: Input bar remains floating and visible on all screen sizes (320px to 1440px).
- **SC-003**: User feedback on the interface "niceness" is positive compared to the previous version.
- **SC-004**: Zero regression in existing chat functionality (booking, listing, session persistence).
