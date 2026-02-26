
# Bhavan's Vivekananda College – AI Plant Health Detection System

Deployable Machine Learning system for plant disease detection using Deep Learning (Xception).

## 🚀 Features
- **High Accuracy Inference**: Leveraging Xception (Primary Model) with ~95% target accuracy.
- **38 Disease Classes**: Detection for Tomato, Potato, Apple, Corn, and more.
- **Biological Explanation Engine**: Provides symptoms, causes, and preventive measures for farmers.
- **Premium Dashboard**: Modern Glassmorphism UI with real-time analytics.
- **Production Ready**: Fully dockerized backend and frontend.

## 📁 Project Structure
- `backend/`: FastAPI application with SQLAlchemy and Model services.
- `frontend/`: Next.js application with premium design system.
- `ml_models/`: Model architecture scripts and trained weights.
- `data/`: Dataset storage and preprocessing utilities.

## 🛠️ Deployment Instructions

### Local (Docker - Recommended)
1. Ensure Docker and Docker Compose are installed.
2. Run: `docker-compose up --build`
3. Frontend: `http://localhost:3000`
4. Backend API: `http://localhost:8000`

### Local (Manual)
1. **Backend**:
   - `cd backend`
   - `pip install -r requirements.txt`
   - `uvicorn app.main:app --reload`
2. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

### Production Cloud (Render/AWS/Railway)
- Use the provided `Dockerfile.backend` for the API service.
- Deploy the frontend as a static or SSR Next.js site.
- Set environment variables as per `.env`.

## 🧬 Scientific Credits
Project developed for **Bhavan's Vivekananda College**.
Department of Computer Science & Biotechnology.
© 2026 AI Plant Health Detection Project.
