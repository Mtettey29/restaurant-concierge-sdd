# Restaurant Concierge — SDD with ADK & Antigravity

This is the companion repository for the **"Spec-Driven AI Agent Development with Antigravity"** codelab.

## What's in this repo

A restaurant concierge application powered by a Google ADK agent. Features include:

- **Menu Search**: Keyword + RAG-powered semantic search via MCP Toolbox
- **Dietary Preference Tracking**: Persistent preferences via ToolContext
- **Reservation Booking**: Table reservation management (create + list) via MCP Toolbox and Cloud SQL
- **SDD Workflows**: Specification-driven development cycle using Antigravity

## Codelab

Follow the step-by-step tutorial to extend this starter code using Spec-Driven Development with Antigravity:

**[Spec-Driven AI Agent Development with Antigravity](#)** *(link to published codelab)*

## What you'll build

Using Antigravity's SDD workflows, you the following feature to the existing agent:

1. **Reservation Booking** — Add reservation management tools (create + list) via MCP Toolbox, backed by a new Cloud SQL table

## Prerequisites

- [Google Antigravity](https://antigravity.google) and git
- A Google Cloud account with trial billing
- Run `bash scripts/setup_prerequisites.sh` to install all other required tools

## Deployment

To deploy the restaurant concierge to Google Cloud Run:

1. **Configure Environment**: Ensure your `.env` file has the correct `GOOGLE_CLOUD_PROJECT` and `DB_PASSWORD`.
2. **Run Deploy Script**:
   ```bash
   bash scripts/deploy.sh
   ```
   This script will build the Docker image and deploy it to Cloud Run with unauthenticated access enabled.

The application uses a multi-process Docker container that runs both the ADK agent server and the MCP Toolbox for database access.
