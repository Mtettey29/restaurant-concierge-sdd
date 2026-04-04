"""FastAPI server wrapping the ADK restaurant concierge agent.

Pre-built dev server with in-memory session storage.
"""

import os
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from google.adk.cli.fast_api import get_fast_api_app

app = get_fast_api_app(web=True, agents_dir=".")

# Mount the static directory for CSS, JS, and other assets
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    """Serve the custom web chat interface."""
    return FileResponse("static/index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("server:app", host="0.0.0.0", port=port)
