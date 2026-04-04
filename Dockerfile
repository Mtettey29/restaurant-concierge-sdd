# Use Python 3.12 slim image
FROM python:3.12-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install uv for dependency management
RUN pip install --no-cache-dir uv==0.7.13

# Set work directory
WORKDIR /app

# Install MCP Toolbox (v0.27.0)
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "x86_64" ]; then TOOLBOX_ARCH="amd64"; elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then TOOLBOX_ARCH="arm64"; fi && \
    curl -so /usr/local/bin/toolbox "https://storage.googleapis.com/genai-toolbox/v0.27.0/linux/${TOOLBOX_ARCH}/toolbox" && \
    chmod +x /usr/local/bin/toolbox

# Copy project files
COPY . .

# Install dependencies using uv
RUN uv sync --frozen --no-dev

# Ensure entrypoint is executable
RUN chmod +x entrypoint.sh

# Expose ports
EXPOSE 8080

# Use entrypoint script to manage multiple processes
ENTRYPOINT ["./entrypoint.sh"]
