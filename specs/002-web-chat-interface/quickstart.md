# Quickstart: Custom Web Chat Interface

## Development Setup

1. **Start Backend**:
   Ensure the agent and toolbox are running.
   ```bash
   uv run uvicorn server:app --reload --port 8080
   ```

2. **Access UI**:
   Navigate to `http://localhost:8080` in your browser.

## Verification Steps

1. **Initial Greeting**:
   Verify that the "Cloud Kitchen" branding is visible.

2. **Send Message**:
   Type "What's on the menu?" and verify the agent's response appears in a bubble.

3. **Session Persistence**:
   Refresh the page. Verify the message history is still present.

4. **Mobile Check**:
   Open browser dev tools, switch to mobile view (e.g., iPhone SE). Verify the UI scales correctly.
