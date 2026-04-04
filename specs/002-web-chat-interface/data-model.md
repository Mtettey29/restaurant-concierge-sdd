# Data Model: Custom Web Chat Interface

## Entities (Client-side)

### ChatSession
- **Purpose**: Tracks the user's session and message history locally.
- **Fields**:
  - `id`: UUID (Mapped to ADK `sessionId`)
  - `messages`: List of objects {role: "user"|"agent", text: string, timestamp: number}

## Local Storage Schema
- `restaurant_concierge_session_id`: string
- `restaurant_concierge_history`: string (JSON stringified list of messages)
