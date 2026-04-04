# Research: Reservation Booking

## Decision 1: Database Schema for Reservations
- **Decision**: Create a `reservations` table with the following structure:
  ```sql
  CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      guest_name VARCHAR(255) NOT NULL,
      party_size INTEGER NOT NULL,
      reservation_date DATE NOT NULL,
      reservation_time TIME NOT NULL,
      special_requests TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
- **Rationale**: This schema directly supports all fields required by the feature specification (name, party size, date, time, special requests). Using `DATE` and `TIME` types allows for easy validation and sorting.
- **Alternatives considered**: 
  - Using a single `TIMESTAMP` for date and time: Rejected for MVP because the agent might receive them as separate entities, and separate columns are easier to query for specific dates.

## Decision 2: SQL Tool Definitions in `tools.yaml`
- **Decision**: Define two primary tools: `create_reservation` and `list_reservations`.
- **Rationale**: 
  - `create_reservation`: Handles the `INSERT` operation as required by FR-001 and FR-006.
  - `list_reservations`: Handles retrieval by name as required by FR-004.
- **Alternatives considered**: 
  - `check_availability` tool: Rejected for MVP to keep it simple, as the current requirement is just to book and check existing ones, not manage capacity.

## Decision 3: Testing Strategy
- **Decision**: Since no testing framework is established, I will use a manual validation script that uses the ADK agent's internal components to verify the tool logic.
- **Rationale**: Aligns with the "Verification" principle in the Constitution without introducing new dependencies like `pytest` unless requested.
- **Alternatives considered**: 
  - Introducing `pytest`: Rejected to maintain simplicity (Principle III).
