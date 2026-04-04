# Quickstart: Reservation Booking

## Development Setup

1. **Update Database Schema**:
   Run the modified `scripts/seed_db.py` to create the `reservations` table.
   ```bash
   python scripts/seed_db.py
   ```

2. **Add Tools to MCP Toolbox**:
   Append the new tool definitions from `specs/001-add-reservation-booking/contracts/tools.yaml` to the root `tools.yaml`.

3. **Restart Services**:
   Restart MCP Toolbox to load the new tool definitions.
   Restart the agent server:
   ```bash
   uvicorn server:app --reload
   ```

## Verification Steps

1. **Manual Test - Booking**:
   Send the following message to the agent:
   "I'd like to book a table for 2 for tomorrow at 6 PM under the name Alex."
   Expect: The agent to ask for special requests and then confirm the booking details.

2. **Manual Test - Retrieval**:
   Ask: "Show my reservation for Alex."
   Expect: The agent to retrieve and display the booking made in step 1.
