#!/bin/bash
set -e

# Start MCP Toolbox in the background
echo "Starting MCP Toolbox..."
toolbox --tools-file tools.yaml --address 127.0.0.1 --port 5000 &
TOOLBOX_PID=$!

# Start the FastAPI server
echo "Starting Restaurant Concierge Server..."
uv run uvicorn server:app --host 0.0.0.0 --port 8080 &
SERVER_PID=$!

# Handle shutdown signals
trap "kill $TOOLBOX_PID $SERVER_PID; exit" SIGINT SIGTERM

# Wait for processes
wait -n $TOOLBOX_PID $SERVER_PID
