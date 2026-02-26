@echo off
echo Starting Bhavan's AI Plant Health System...

:: 1. Start Backend
echo Launching Backend (FastAPI)...
start "Plant Health Backend" cmd /k "cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000"

:: 2. Start Tunnel
echo Launching External Tunnel...
start "Plant Health Tunnel" cmd /k "npx localtunnel --port 8000 --subdomain bhavans-plant-health"

:: 3. Start Frontend
echo Launching Frontend (Next.js)...
start "Plant Health Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo All services are starting in separate windows.
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:3000 (or 3001)
echo - External URL: https://bhavans-plant-health.loca.lt
echo.
pause
