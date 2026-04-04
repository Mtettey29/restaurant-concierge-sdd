# 🍽️ Restaurant Concierge AI

A modern, AI-powered restaurant concierge agent built with **Google's Agent Development Kit (ADK)** and designed using **Spec-Driven Development (SDD)** with **Antigravity**.

This application provides a seamless guest experience for "The Cloud Kitchen," allowing users to explore the menu, save dietary preferences, and book table reservations through a clean, Gemini-inspired web interface.

![Gemini-inspired UI](https://img.shields.io/badge/UI-Gemini--Inspired-emerald)
![ADK](https://img.shields.io/badge/Powered%20by-Google%20ADK-blue)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)

## ✨ Features

- **🧠 Intelligent Concierge**: Powered by Gemini 2.5 Flash for natural, helpful conversations.
- **🔍 Smart Menu Search**: 
  - **Keyword Search**: Find specific items quickly.
  - **Semantic RAG**: Search for vibes like "something light and spicy" using vector embeddings (pgvector).
- **📅 Reservation Booking**: Fully functional table booking and retrieval system backed by Cloud SQL.
- **🥗 Dietary Awareness**: Remembers guest preferences (e.g., "vegetarian", "gluten-free") throughout the session.
- **📱 Gemini-Inspired UI**: A clean, airy, and mobile-responsive web interface built with Vanilla JS and Tailwind CSS.
- **🚀 Cloud Ready**: Pre-configured for seamless deployment to Google Cloud Run.

## 🛠️ Tech Stack

- **Framework**: [Google ADK](https://github.com/google/adk)
- **Backend**: FastAPI (Python 3.12)
- **Database**: Cloud SQL (PostgreSQL) with `pgvector`
- **Tooling**: MCP Toolbox for database abstraction
- **Frontend**: Vanilla JS, Tailwind CSS, Lucide Icons
- **Deployment**: Docker, Google Cloud Run

## 🚀 Quick Start

### 1. Prerequisites
- [Google Cloud Account](https://cloud.google.com/) with a project enabled.
- [uv](https://github.com/astral-sh/uv) installed locally.
- MCP Toolbox installed (run the setup script below).

### 2. Setup
```bash
# Clone the repository
git clone https://github.com/Mtettey29/restaurant-concierge-sdd.git
cd restaurant-concierge-sdd

# Install dependencies and setup prerequisites
bash scripts/setup_prerequisites.sh

# Configure environment variables
cp .env.example .env
# Edit .env with your GOOGLE_CLOUD_PROJECT and DB_PASSWORD
```

### 3. Initialize Database
```bash
# Source env and run seeding
source .env
uv run python scripts/seed_db.py
uv run python scripts/generate_embeddings.py
```

### 4. Run Locally
```bash
# Start MCP Toolbox (Port 5000)
toolbox --tools-file tools.yaml --address 127.0.0.1 --port 5000 &

# Start the Agent Server (Port 8080)
uv run uvicorn server:app --reload --port 8080
```
Visit `http://localhost:8080` to start chatting!

## ☁️ Deployment

Deploy to **Google Cloud Run** in a single command:

```bash
bash scripts/deploy.sh
```

The application is containerized using a multi-process Docker setup that packages both the FastAPI server and the MCP Toolbox binary for robust cloud execution.

## 📐 Spec-Driven Development

This project was built using the SDD workflow. You can find the full history of specifications, implementation plans, and tasks in the `specs/` directory:

- `specs/001-add-reservation-booking/`: Backend logic and schema.
- `specs/002-web-chat-interface/`: Initial web implementation.
- `specs/003-gemini-ui-redesign/`: Visual overhaul.
- `specs/004-cloud-run-deployment/`: Cloud infrastructure.

---
Built with ❤️ by Mtettey29 using Antigravity.
