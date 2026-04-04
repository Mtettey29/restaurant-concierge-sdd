# Project Context: restaurant-concierge

**Last Updated**: April 4, 2026
**Updated By**: Initial Research

## Project Identity

- **Name**: restaurant-concierge (sdd-adk-agents-agy)
- **Type**: web-app / agent
- **Purpose**: Restaurant Concierge — ADK Agent with SDD Workflows. Companion repository for "Spec-Driven AI Agent Development with Antigravity" codelab.
- **Domain**: Restaurant services, menu search, dietary preference tracking.

## Technology Stack

### Languages & Versions
- Python: >= 3.12 (added by initial research)

### Frameworks & Libraries
- google-adk: >= 1.0.0 (added by initial research)
- toolbox-core: >= 0.1.0 (added by initial research)
- google-genai: >= 1.0.0 (added by initial research)
- cloud-sql-python-connector: >= 1.0.0 (added by initial research)
- uvicorn: >= 0.30.0 (added by initial research)

### Storage
- Cloud SQL Postgres: (added by initial research)
  - Features: Vector support for embeddings (gemini-embedding-001)

### Testing
- [Test Framework]: [Version] (added by [feature-branch])

## Project Structure

```
./
├── .env.example
├── .gitignore
├── LICENSE
├── pyproject.toml
├── README.md
├── server.py
├── tools.yaml
├── uv.lock
├── .adk/
│   └── artifacts/
├── .agents/
│   ├── rules/
│   │   └── project-context.md
│   ├── skills/
│   │   ├── adk-agent-development/
│   │   └── repo-research/
│   └── workflows/
├── .specify/
│   ├── memory/
│   ├── scripts/
│   └── templates/
├── restaurant_concierge/
│   ├── __init__.py
│   ├── .env
│   ├── .adk/
│   │   └── session.db
│   └── agent.py
└── scripts/
    ├── generate_embeddings.py
    ├── seed_db.py
    └── setup_prerequisites.sh
```

## API Surface

| Method | Path | Purpose |
|--------|------|---------|
| POST | /run | Execute the ADK agent with a user message. |
| POST | /run_sse | Execute the ADK agent with Server-Sent Events (streaming). |
| GET | /health | Health check endpoint. |
| GET | / | Serve the ADK Web UI. |

## Runtime Dependency Graph

```
Browser → FastAPI :8080 → ADK Agent → MCP Toolbox :5000 → Cloud SQL (restaurant-db)
```

- **FastAPI (server.py)**: Web server hosting the ADK agent. Starts on port 8080 by default.
- **ADK Agent (agent.py)**: Core logic for the restaurant concierge, using Gemini 2.5 Flash.
- **MCP Toolbox**: Middleware providing database tools to the agent.
- **Cloud SQL**: PostgreSQL database with pgvector for storing and searching menu items.

## Local Dev Runbook

1. **Install Prerequisites**: `bash scripts/setup_prerequisites.sh`
2. **Configure Environment**: Create `.env` from `.env.example` and set required variables.
3. **Seed Database**: `python scripts/seed_db.py`
4. **Generate Embeddings**: `python scripts/generate_embeddings.py`
5. **Start MCP Toolbox**: (Assumed to be part of setup or started separately, default URL http://127.0.0.1:5000)
6. **Start Agent Server**: `uvicorn server:app --reload --port 8080`
7. **Access UI**: Open `http://localhost:8080` in a browser.

## Data Model Overview

### Entities (Cross-Feature)
- **menu_items** (defined in scripts/seed_db.py):
  - Purpose: Stores restaurant menu items and metadata.
  - Key fields: id (SERIAL), name (VARCHAR), category (VARCHAR), description (TEXT), price (DECIMAL), dietary_tags (TEXT[]), embedding (vector 3072).
- **reservations** (defined in 001-add-reservation-booking):
  - Purpose: Stores restaurant table reservations.
  - Key fields: id (SERIAL), guest_name (VARCHAR), party_size (INTEGER), reservation_date (DATE), reservation_time (TIME), special_requests (TEXT).

### Tool Definitions
- **search_menu**: menu_items — SELECT (Keyword search)
- **semantic_search_menu**: menu_items — SELECT (Semantic search with embeddings)
- **get_menu_by_category**: menu_items — SELECT (Filter by category)
- **save_dietary_preference**: tool_context.state — UPDATE (Save preference to session state)
- **get_dietary_preferences**: tool_context.state — SELECT (Read preferences from session state)
- **create_reservation**: reservations — INSERT (Book a table)
- **list_reservations**: reservations — SELECT (Retrieve reservations by name)

## Domain Glossary

| Term | Definition |
|------|-----------|
| ADK | Google's Agent Development Kit for building AI agents. |
| SDD | Spec-Driven Development, a process of designing and building features based on explicit specifications. |
| ToolContext | ADK object that provides access to session state and other runtime context. |
| gemini-embedding-001 | Google model used to generate 3072-dimensional vector embeddings. |
| MCP Toolbox | Model Context Protocol toolbox for exposing tools (like SQL) to LLMs. |

## External Integrations

- **Google Cloud Platform**: Hosting environment for Cloud SQL and AI models (added by initial research)
- **Cloud SQL (Postgres)**: Database for storing menu and agent state (added by initial research)
- **Gemini (Vertex AI)**: Used for embeddings and LLM reasoning (added by initial research)
- **MCP Toolbox**: Tool provider for database operations (added by initial research)

## Development Workflow

- **Branch Strategy**: Feature branches numbered `###-feature-name`
- **Setup Command**: `bash scripts/setup_prerequisites.sh`
- **Local Run**: `uvicorn server:app`

## Architecture Patterns

- **Agent-based Architecture**: Built using Google ADK, leveraging LLMs for reasoning and tool use.
- **RAG (Retrieval-Augmented Generation)**: Uses semantic search over menu embeddings for informed responses.
- **Stateful Interaction**: Tracks user preferences across turns using `ToolContext` state.
- **FastAPI Wrapper**: Uses `google.adk.cli.fast_api` for rapid deployment and UI generation.

## Recent Features

- 001-add-reservation-booking: Added reservation booking capability and Cloud SQL schema.
- initial-research: Researched project structure and core stack.

## Configuration

- **Config Files**: pyproject.toml, tools.yaml, .env.example

### Environment Variable Dependency Chain

| Variable | Consumed By | What Breaks If Missing |
|----------|-------------|----------------------|
| GOOGLE_CLOUD_PROJECT | tools.yaml, scripts/ | GCS/Vertex/Cloud SQL connection fails |
| GOOGLE_CLOUD_LOCATION | server.py, scripts/ | Model initialization fails |
| REGION | tools.yaml, scripts/ | Cloud SQL instance connection fails |
| DB_PASSWORD | tools.yaml, scripts/ | Database authentication fails |
| TOOLBOX_URL | server.py | Agent cannot connect to MCP Toolbox |

## Known Constraints

- **Google Cloud Requirement**: Requires a Google Cloud project with trial billing and specific services enabled (Cloud SQL, Vertex AI).
- **Database Extensions**: Relies on `vector` and `google_ml_integration` extensions in PostgreSQL.
- **MCP Toolbox Dependency**: All database operations for the agent are proxied through MCP Toolbox.
- **In-Memory State**: By default, `server.py` uses in-memory session storage, which will be lost on server restart.
- **Single Instance**: The Cloud SQL connection is configured for a single instance `restaurant-db`.

<!-- MANUAL ADDITIONS START -->
<!-- Add any manual context below this line -->
<!-- MANUAL ADDITIONS END -->
