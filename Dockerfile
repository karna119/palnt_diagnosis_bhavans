# Unified "One-Box" Dockerfile

# --- Stage 1: Build Frontend ---
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Final Runtime ---
FROM python:3.10-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1-mesa-glx \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python backend dependencies
# (Merged requirements at root for easier Vercel/Docker detection)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/
COPY ml_models/ ./ml_models/

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/out ./frontend/out

# Set environment paths
ENV PYTHONPATH=$PYTHONPATH:/app
ENV UPLOADS_PATH=/app/data/uploads
ENV DATABASE_URL=sqlite:////app/data/plant_health.db

# Create necessary directories
RUN mkdir -p /app/data/uploads

# Expose port (Cloud platforms use PORT env var)
EXPOSE 8000

# Start unified server
CMD uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT:-8000}
