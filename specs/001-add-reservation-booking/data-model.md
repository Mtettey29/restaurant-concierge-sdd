# Data Model: Reservation Booking

## Entities

### reservations
- **Purpose**: Stores restaurant table reservations.
- **Fields**:
  - `id`: SERIAL PRIMARY KEY (Unique identifier)
  - `guest_name`: VARCHAR(255) NOT NULL (Name of the guest booking)
  - `party_size`: INTEGER NOT NULL (Number of guests)
  - `reservation_date`: DATE NOT NULL (Date of the reservation)
  - `reservation_time`: TIME NOT NULL (Time of the reservation)
  - `special_requests`: TEXT (Additional notes like "window seat")
  - `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

## Validation Rules
- `party_size` must be greater than 0.
- `reservation_date` and `reservation_time` combination must be in the future.
- `guest_name` cannot be empty.
